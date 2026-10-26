"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"

const IMAGE_SRC = "/images/idea-bulb.png"
const MAX_PARTICLES = 28000
const DUST_PARTICLES = 2200
const LOOSE_FRACTION = 0.08
const CHAOS_DURATION = 2.4
const FORM_DURATION = 3.8
const WORLD_HEIGHT = 3.1
const FOV = 45

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uMinY;
  uniform float uMaxY;
  uniform float uMotion;

  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  attribute float aKeepColor;

  varying vec3 vColor;
  varying float vAlpha;

  vec3 gradient(float t) {
    vec3 cyan = vec3(0.10, 0.55, 1.00);
    vec3 purple = vec3(0.62, 0.18, 0.95);
    vec3 magenta = vec3(1.00, 0.20, 0.62);
    vec3 gold = vec3(1.00, 0.66, 0.20);
    if (t < 0.33) return mix(cyan, purple, smoothstep(0.0, 0.33, t));
    if (t < 0.66) return mix(purple, magenta, smoothstep(0.33, 0.66, t));
    return mix(magenta, gold, smoothstep(0.66, 1.0, t));
  }

  void main() {
    float p = uProgress;
    float local = clamp(p * 1.4 - aSeed * 0.4, 0.0, 1.0);
    float eased = local < 0.5 ? 4.0 * local * local * local : 1.0 - pow(-2.0 * local + 2.0, 3.0) / 2.0;
    float chaosAmt = 1.0 - eased;
    vec3 chaos = vec3(
      sin(uTime * (0.9 + aSeed * 1.6) + aSeed * 53.0) + 0.5 * sin(uTime * 2.3 + aSeed * 91.0),
      cos(uTime * (0.8 + aSeed * 1.4) + aSeed * 37.0) + 0.5 * cos(uTime * 2.1 + aSeed * 71.0),
      sin(uTime * (0.7 + aSeed) + aSeed * 23.0)
    ) * 0.45 * chaosAmt * uMotion;
    vec3 pos = mix(aScatter, position, eased) + chaos;

    float t = uTime * 0.6;
    vec3 drift = vec3(
      sin(t + position.y * 4.0 + aSeed * 6.2831),
      cos(t * 0.9 + position.x * 4.0 + aSeed * 12.566),
      sin(t * 0.7 + (position.x + position.y) * 3.0 + aSeed * 3.14)
    );
    float breathe = 0.5 + 0.5 * sin(uTime * 0.8);
    float looseness = aSeed > 0.92 ? 6.0 : 1.0;
    pos += drift * (0.0025 + 0.002 * breathe) * looseness * uMotion * eased;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (2.8 / -mvPosition.z);

    float gy = clamp((position.y - uMinY) / (uMaxY - uMinY), 0.0, 1.0);
    vColor = mix(gradient(gy), aColor, aKeepColor);

    float twinkle = 0.88 + 0.12 * sin(uTime * 2.2 + aSeed * 40.0);
    vAlpha = twinkle * (0.5 + 0.5 * eased) * mix(1.0, 0.8, aKeepColor);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.32, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.25;
    float alpha = max(core, halo);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`

type ParticleData = {
  positions: Float32Array
  scatter: Float32Array
  colors: Float32Array
  sizes: Float32Array
  seeds: Float32Array
  keep: Float32Array
  count: number
  minY: number
  maxY: number
}

function sampleImage(img: HTMLImageElement): ParticleData {
  const w = img.naturalWidth
  const h = img.naturalHeight
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Canvas 2D context unavailable")
  ctx.drawImage(img, 0, 0)
  const { data } = ctx.getImageData(0, 0, w, h)

  const candidates: number[] = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const peak = Math.max(r, g, b)
      const lum = 0.299 * r + 0.587 * g + 0.114 * b
      if (peak > 120 || lum > 70) candidates.push(x, y, peak)
    }
  }

  const candidateCount = candidates.length / 3
  const keepChance = Math.min(1, MAX_PARTICLES / candidateCount)
  const scale = WORLD_HEIGHT / h

  const pos: number[] = []
  const col: number[] = []
  const keep: number[] = []
  const bright: number[] = []

  for (let c = 0; c < candidateCount; c++) {
    const x = candidates[c * 3]
    const y = candidates[c * 3 + 1]
    const peak = candidates[c * 3 + 2]
    const weight = keepChance * (0.55 + 0.45 * (peak / 255))
    if (Math.random() > weight) continue
    const i = (y * w + x) * 4
    const loose = Math.random() < LOOSE_FRACTION
    const spread = loose ? Math.pow(Math.random(), 2) * 0.32 : 0
    const angle = Math.random() * Math.PI * 2
    pos.push(
      (x - w / 2 + Math.random() - 0.5) * scale + Math.cos(angle) * spread,
      -(y - h / 2 + Math.random() - 0.5) * scale + Math.sin(angle) * spread,
      (Math.random() - 0.5) * (loose ? 0.5 : 0.03),
    )
    col.push(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255)
    keep.push(y > h * 0.8 ? 1 : 0)
    bright.push(peak / 255)
  }

  const imageCount = pos.length / 3
  let minY = Infinity
  let maxY = -Infinity
  for (let i = 0; i < imageCount; i++) {
    const py = pos[i * 3 + 1]
    if (keep[i] === 0) {
      if (py < minY) minY = py
      if (py > maxY) maxY = py
    }
  }

  for (let i = 0; i < DUST_PARTICLES; i++) {
    pos.push(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4.5,
      (Math.random() - 0.5) * 3 - 0.5,
    )
    col.push(0, 0, 0)
    keep.push(0)
    bright.push(0.15)
  }

  const count = pos.length / 3
  const positions = new Float32Array(pos)
  const scatter = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    scatter[i * 3] = (Math.random() - 0.5) * 6.5
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 4.2
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 2.5
    const isDust = i >= imageCount
    sizes[i] = isDust ? 1.2 + Math.random() * 2 : 1.6 + bright[i] * 1.4 + Math.random() * 0.6
    seeds[i] = Math.random()
  }

  return {
    positions,
    scatter,
    colors: new Float32Array(col),
    sizes,
    seeds,
    keep: new Float32Array(keep),
    count,
    minY,
    maxY,
  }
}

export function ParticleBulb() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let disposed = false
    let frameId = 0
    let cleanupScene: (() => void) | undefined

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = IMAGE_SRC
    img.onload = () => {
      if (disposed) return
      cleanupScene = buildScene(container, sampleImage(img), reducedMotion, (id) => {
        frameId = id
      })
    }

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      cleanupScene?.()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}

function assemblyProgress(t: number) {
  if (t < CHAOS_DURATION) return 0
  return Math.min(1, (t - CHAOS_DURATION) / FORM_DURATION)
}

function buildScene(
  container: HTMLDivElement,
  particles: ParticleData,
  reducedMotion: boolean,
  setFrame: (id: number) => void,
) {
  const width = container.clientWidth
  const height = container.clientHeight

  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" })
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 1)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 100)

  const fitCamera = (aspect: number) => {
    const halfFov = THREE.MathUtils.degToRad(FOV / 2)
    const distForHeight = (WORLD_HEIGHT * 1.12) / 2 / Math.tan(halfFov)
    const distForWidth = (WORLD_HEIGHT * 0.86) / 2 / Math.tan(halfFov) / aspect
    camera.position.set(0, 0, Math.max(distForHeight, distForWidth))
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }
  fitCamera(width / height)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(particles.positions, 3))
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(particles.scatter, 3))
  geometry.setAttribute("aColor", new THREE.BufferAttribute(particles.colors, 3))
  geometry.setAttribute("aSize", new THREE.BufferAttribute(particles.sizes, 1))
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(particles.seeds, 1))
  geometry.setAttribute("aKeepColor", new THREE.BufferAttribute(particles.keep, 1))

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: reducedMotion ? 1 : 0 },
    uPixelRatio: { value: pixelRatio },
    uMinY: { value: particles.minY },
    uMaxY: { value: particles.maxY },
    uMotion: { value: reducedMotion ? 0.25 : 1 },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.5, 0.12, 0.25)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h)
    composer.setSize(w, h)
    bloom.setSize(w, h)
    fitCamera(w / h)
  }

  window.addEventListener("resize", onResize)

  const clock = new THREE.Clock()
  const tick = () => {
    const elapsed = clock.getElapsedTime()
    uniforms.uTime.value = elapsed
    if (!reducedMotion) {
      uniforms.uProgress.value = assemblyProgress(elapsed)
    }
    points.rotation.y = Math.sin(elapsed * 0.25) * 0.08 * uniforms.uMotion.value * uniforms.uProgress.value

    composer.render()
    setFrame(requestAnimationFrame(tick))
  }
  tick()

  return () => {
    window.removeEventListener("resize", onResize)
    geometry.dispose()
    material.dispose()
    composer.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
