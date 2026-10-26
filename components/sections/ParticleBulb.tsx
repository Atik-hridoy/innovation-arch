"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const BULB_SRC = "/images/idea-bulb.png";
const CUBE_SRC = "/images/cube-world.png";
const TOTAL_PARTICLES = 30000;
const DUST_PARTICLES = 2200;
const SHAPE_PARTICLES = TOTAL_PARTICLES - DUST_PARTICLES; // 27800
const LOOSE_FRACTION = 0.07;
const WORLD_HEIGHT = 3.1;
const FOV = 45;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph; // 0.0 = scatter, 1.0 = bulb, 2.0 = cube
  uniform float uPixelRatio;
  uniform float uMotion;
  uniform float uDarkMode; // 0.0 = Light, 1.0 = Dark

  attribute vec3 aScatter;
  attribute vec3 aBulbPos;
  attribute vec3 aBulbCol;
  attribute vec3 aCubePos;
  attribute vec3 aCubeCol;
  attribute float aSize;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float seedOffset = (aSeed - 0.5) * 0.18;
    vec3 currentPos;
    vec3 currentColor;

    if (uMorph < 1.0) {
      // Phase 1: Cosmic Scatter -> Idea Bulb (snappy initial crystallization)
      float local = clamp((uMorph + seedOffset) / 0.95, 0.0, 1.0);
      float eased = local < 0.5 ? 4.0 * local * local * local : 1.0 - pow(-2.0 * local + 2.0, 3.0) / 2.0;
      float chaosAmt = 1.0 - eased;
      vec3 chaos = vec3(
        sin(uTime * (0.9 + aSeed * 1.6) + aSeed * 53.0) + 0.5 * sin(uTime * 2.3 + aSeed * 91.0),
        cos(uTime * (0.8 + aSeed * 1.4) + aSeed * 37.0) + 0.5 * cos(uTime * 2.1 + aSeed * 71.0),
        sin(uTime * (0.7 + aSeed) + aSeed * 23.0)
      ) * 0.45 * chaosAmt * uMotion;
      currentPos = mix(aScatter, aBulbPos, eased) + chaos;
      currentColor = aBulbCol;
    } else {
      // Phase 2: Idea Bulb <-> 3D Rubik's Cube Continuous Morph
      float morphT = clamp((uMorph - 1.0) + seedOffset * 0.35, 0.0, 1.0);
      float eased = smoothstep(0.0, 1.0, morphT);

      // Organic starlight turbulence while particles travel between shapes
      float inTransit = sin(morphT * 3.14159265);
      vec3 transitDrift = vec3(
        sin(uTime * 2.4 + aSeed * 60.0 + aBulbPos.y * 2.5),
        cos(uTime * 2.1 + aSeed * 45.0 + aBulbPos.x * 2.5),
        sin(uTime * 1.9 + aSeed * 30.0)
      ) * 0.32 * inTransit * uMotion;

      currentPos = mix(aBulbPos, aCubePos, eased) + transitDrift;
      currentColor = mix(aBulbCol, aCubeCol, eased);
    }

    // Ambient 3D drift and living breathing motion
    float t = uTime * 0.6;
    vec3 drift = vec3(
      sin(t + currentPos.y * 3.5 + aSeed * 6.28),
      cos(t * 0.9 + currentPos.x * 3.5 + aSeed * 12.5),
      sin(t * 0.7 + (currentPos.x + currentPos.y) * 2.5 + aSeed * 3.14)
    );
    float breathe = 0.5 + 0.5 * sin(uTime * 0.85);
    float looseness = aSeed > 0.92 ? 5.0 : 1.0;
    currentPos += drift * (0.002 + 0.002 * breathe) * looseness * uMotion;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Optical size scaling
    float sizeFactor = mix(3.2, 2.8, uDarkMode);
    gl_PointSize = aSize * uPixelRatio * (sizeFactor / -mvPosition.z);

    // Jewel-tone enhancement for light mode vs neon glow for dark mode
    vec3 darkTint = currentColor * 1.25;
    vec3 lightTint = currentColor * 0.95;
    vec3 finalColor = mix(lightTint, darkTint, uDarkMode);

    float hasColor = step(0.02, length(currentColor));
    vec3 dustTint = mix(vec3(0.18, 0.40, 0.80), vec3(0.35, 0.75, 1.0), uDarkMode);
    vColor = mix(dustTint, finalColor, hasColor);

    float twinkle = 0.88 + 0.12 * sin(uTime * 2.2 + aSeed * 40.0);
    float baseAlpha = mix(0.92, 0.65, uDarkMode);
    vAlpha = twinkle * baseAlpha * mix(1.0, 0.90, hasColor);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uDarkMode;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);

    // Glowing core & halo
    float darkCore = smoothstep(0.5, 0.32, d);
    float darkHalo = smoothstep(0.5, 0.0, d) * 0.25;
    float darkAlpha = max(darkCore, darkHalo);

    // Light mode sharp crisp edge
    float lightAlpha = smoothstep(0.5, 0.38, d);

    float alpha = mix(lightAlpha, darkAlpha, uDarkMode);
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

type MorphData = {
  scatter: Float32Array;
  bulbPos: Float32Array;
  bulbCol: Float32Array;
  cubePos: Float32Array;
  cubeCol: Float32Array;
  sizes: Float32Array;
  seeds: Float32Array;
  count: number;
};

let cachedMorphData: MorphData | null = null;

function extractRawPoints(
  img: HTMLImageElement,
  isCube: boolean,
  targetCount: number
): { x: number; y: number; r: number; g: number; b: number }[] {
  const w = img.naturalWidth || 512;
  const h = img.naturalHeight || 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D unavailable");
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, w, h);

  const candidates: { x: number; y: number; r: number; g: number; b: number; peak: number }[] = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const peak = Math.max(r, g, b);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      const pass = isCube ? (peak > 45 || lum > 30) : (peak > 80 || lum > 45);

      if (pass) {
        candidates.push({ x, y, r, g, b, peak });
      }
    }
  }

  const n = candidates.length;
  const keepChance = Math.min(1.0, (targetCount * 1.05) / n);
  const selected: { x: number; y: number; r: number; g: number; b: number }[] = [];

  for (let c = 0; c < n; c++) {
    const cand = candidates[c];
    const weight = keepChance * (0.60 + 0.40 * (cand.peak / 255));
    if (Math.random() <= weight) {
      selected.push(cand);
    }
  }

  const pool = selected.length > 0 ? selected : candidates;
  const result: { x: number; y: number; r: number; g: number; b: number }[] = [];

  for (let i = 0; i < targetCount; i++) {
    if (i < pool.length) {
      result.push(pool[i]);
    } else {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      result.push(pick);
    }
  }

  return result;
}

function sampleMorphImages(imgBulb: HTMLImageElement, imgCube: HTMLImageElement): MorphData {
  if (cachedMorphData) return cachedMorphData;

  const bulbRaw = extractRawPoints(imgBulb, false, SHAPE_PARTICLES);
  const cubeRaw = extractRawPoints(imgCube, true, SHAPE_PARTICLES);

  const total = TOTAL_PARTICLES;
  const scatter = new Float32Array(total * 3);
  const bulbPos = new Float32Array(total * 3);
  const bulbCol = new Float32Array(total * 3);
  const cubePos = new Float32Array(total * 3);
  const cubeCol = new Float32Array(total * 3);
  const sizes = new Float32Array(total);
  const seeds = new Float32Array(total);

  const bulbH = imgBulb.naturalHeight || 736;
  const bulbScale = WORLD_HEIGHT / bulbH;

  // Process Bulb shape particles
  for (let i = 0; i < SHAPE_PARTICLES; i++) {
    const p = bulbRaw[i];
    const loose = Math.random() < LOOSE_FRACTION;
    const spread = loose ? Math.pow(Math.random(), 2) * 0.32 : 0;
    const angle = Math.random() * Math.PI * 2;

    bulbPos[i * 3] = (p.x - 275 + Math.random() - 0.5) * bulbScale + Math.cos(angle) * spread;
    bulbPos[i * 3 + 1] = -(p.y - 325 + Math.random() - 0.5) * bulbScale + Math.sin(angle) * spread;
    bulbPos[i * 3 + 2] = (Math.random() - 0.5) * (loose ? 0.45 : 0.03);

    // Bulb color: glowing vertical gradient cyan -> purple -> magenta -> gold
    const isSocket = p.y > bulbH * 0.78;
    const gy = Math.max(0, Math.min(1, 1.0 - (p.y - 33) / 580)); // 0 bottom, 1 top

    let cr = 0, cg = 0, cb = 0;
    if (gy < 0.33) {
      const t = gy / 0.33;
      cr = 0.10 + (0.62 - 0.10) * t;
      cg = 0.55 + (0.18 - 0.55) * t;
      cb = 1.00 + (0.95 - 1.00) * t;
    } else if (gy < 0.66) {
      const t = (gy - 0.33) / 0.33;
      cr = 0.62 + (1.00 - 0.62) * t;
      cg = 0.18 + (0.20 - 0.18) * t;
      cb = 0.95 + (0.62 - 0.95) * t;
    } else {
      const t = (gy - 0.66) / 0.34;
      cr = 1.00;
      cg = 0.20 + (0.66 - 0.20) * t;
      cb = 0.62 + (0.20 - 0.62) * t;
    }

    if (isSocket) {
      cr = p.r / 255;
      cg = p.g / 255;
      cb = p.b / 255;
    }

    bulbCol[i * 3] = cr;
    bulbCol[i * 3 + 1] = cg;
    bulbCol[i * 3 + 2] = cb;
  }

  // Process Cube shape particles
  // Cube is centered at (301, 262) with height ~518 in the 583x609 image
  const cubeScale = (WORLD_HEIGHT * 0.90) / 518;
  for (let i = 0; i < SHAPE_PARTICLES; i++) {
    const p = cubeRaw[i];
    cubePos[i * 3] = (p.x - 301 + (Math.random() - 0.5) * 0.8) * cubeScale;
    cubePos[i * 3 + 1] = -(p.y - 262 + (Math.random() - 0.5) * 0.8) * cubeScale;
    cubePos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;

    // Authentic illustration colors from the cube
    cubeCol[i * 3] = p.r / 255;
    cubeCol[i * 3 + 1] = p.g / 255;
    cubeCol[i * 3 + 2] = p.b / 255;
  }

  // Ambient 3D cosmic dust particles (indexes SHAPE_PARTICLES to TOTAL_PARTICLES)
  for (let i = SHAPE_PARTICLES; i < total; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = Math.pow(Math.random(), 0.75) * 2.8;

    const dx = r * Math.sin(phi) * Math.cos(theta);
    const dy = r * Math.sin(phi) * Math.sin(theta) * 0.95;
    const dz = r * Math.cos(phi) * 0.65;

    bulbPos[i * 3] = dx;
    bulbPos[i * 3 + 1] = dy;
    bulbPos[i * 3 + 2] = dz;

    cubePos[i * 3] = dx;
    cubePos[i * 3 + 1] = dy;
    cubePos[i * 3 + 2] = dz;

    bulbCol[i * 3] = 0;
    bulbCol[i * 3 + 1] = 0;
    bulbCol[i * 3 + 2] = 0;

    cubeCol[i * 3] = 0;
    cubeCol[i * 3 + 1] = 0;
    cubeCol[i * 3 + 2] = 0;
  }

  // Radial scatter field & particle metadata
  for (let i = 0; i < total; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = Math.pow(Math.random(), 0.65) * 3.2;

    scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    scatter[i * 3 + 2] = r * Math.cos(phi) * 0.7;

    const isDust = i >= SHAPE_PARTICLES;
    sizes[i] = isDust ? 1.2 + Math.random() * 2.0 : 1.65 + Math.random() * 0.8;
    seeds[i] = Math.random();
  }

  cachedMorphData = {
    scatter,
    bulbPos,
    bulbCol,
    cubePos,
    cubeCol,
    sizes,
    seeds,
    count: total,
  };

  return cachedMorphData;
}

function buildScene(
  container: HTMLDivElement,
  particles: MorphData,
  reducedMotion: boolean,
  setFrame: (id: number) => void
) {
  const width = container.clientWidth || 600;
  const height = container.clientHeight || 600;

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
  });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0); // Transparent canvas for seamless light/dark integration
  renderer.domElement.style.overflow = "visible";
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 100);

  const fitCamera = (aspect: number) => {
    const halfFov = THREE.MathUtils.degToRad(FOV / 2);
    const distForHeight = (WORLD_HEIGHT * 1.12) / 2 / Math.tan(halfFov);
    const distForWidth = (WORLD_HEIGHT * 0.86) / 2 / Math.tan(halfFov) / aspect;
    camera.position.set(0, 0, Math.max(distForHeight, distForWidth));
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  };
  fitCamera(width / height);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(particles.bulbPos, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(particles.scatter, 3));
  geometry.setAttribute("aBulbPos", new THREE.BufferAttribute(particles.bulbPos, 3));
  geometry.setAttribute("aBulbCol", new THREE.BufferAttribute(particles.bulbCol, 3));
  geometry.setAttribute("aCubePos", new THREE.BufferAttribute(particles.cubePos, 3));
  geometry.setAttribute("aCubeCol", new THREE.BufferAttribute(particles.cubeCol, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(particles.sizes, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(particles.seeds, 1));

  const isDark = () => document.documentElement.classList.contains("dark");
  let currentDarkMode = isDark() ? 1.0 : 0.0;
  let targetDarkMode = currentDarkMode;

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uMotion: { value: reducedMotion ? 0.25 : 1 },
    uDarkMode: { value: currentDarkMode },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: currentDarkMode > 0.45 ? THREE.AdditiveBlending : THREE.NormalBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  renderPass.clearAlpha = 0;
  composer.addPass(renderPass);

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    currentDarkMode > 0.45 ? 0.50 : 0.0,
    0.12,
    0.25
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const onResize = () => {
    const w = container.clientWidth || 600;
    const h = container.clientHeight || 600;
    renderer.setSize(w, h);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    fitCamera(w / h);
  };
  window.addEventListener("resize", onResize);

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const onPointerMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    targetMouseX = x * 0.15;
    targetMouseY = y * 0.10;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const observer = new MutationObserver(() => {
    targetDarkMode = isDark() ? 1.0 : 0.0;
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsed = clock.getElapsedTime();
    uniforms.uTime.value = elapsed;

    // ========================================================
    // CONTINUOUS MORPH SEQUENCE:
    // 0.0 -> 1.0 : Cosmic Scatter -> Idea Bulb (0.9s fast form)
    // 1.0        : Hold Idea Bulb (2.5s)
    // 1.0 -> 2.0 : Morph Idea Bulb -> 3D Rubik's Cube (1.4s)
    // 2.0        : Hold 3D Rubik's Cube (2.5s)
    // 2.0 -> 1.0 : Morph 3D Rubik's Cube -> Idea Bulb (1.4s)
    // Loops continuously!
    // ========================================================
    const INITIAL_FORM = 0.9;
    let targetMorph = 1.0;

    if (elapsed < INITIAL_FORM) {
      targetMorph = elapsed / INITIAL_FORM;
    } else {
      const cycleTime = elapsed - INITIAL_FORM;
      const HOLD = 2.5;
      const TRANSIT = 1.4;
      const TOTAL_PERIOD = (HOLD + TRANSIT) * 2; // ~7.8s full continuous loop
      const modTime = cycleTime % TOTAL_PERIOD;

      if (modTime < HOLD) {
        // Holding Idea Bulb
        targetMorph = 1.0;
      } else if (modTime < HOLD + TRANSIT) {
        // Morphing Idea Bulb -> 3D Rubik's Cube
        const p = (modTime - HOLD) / TRANSIT;
        targetMorph = 1.0 + p;
      } else if (modTime < HOLD * 2 + TRANSIT) {
        // Holding 3D Rubik's Cube
        targetMorph = 2.0;
      } else {
        // Morphing 3D Rubik's Cube -> Idea Bulb
        const p = (modTime - (HOLD * 2 + TRANSIT)) / TRANSIT;
        targetMorph = 2.0 - p;
      }
    }

    uniforms.uMorph.value = targetMorph;

    // Theme lerping
    currentDarkMode += (targetDarkMode - currentDarkMode) * 0.08;
    uniforms.uDarkMode.value = currentDarkMode;

    const shouldBeAdditive = currentDarkMode > 0.45;
    const targetBlending = shouldBeAdditive ? THREE.AdditiveBlending : THREE.NormalBlending;
    if (material.blending !== targetBlending) {
      material.blending = targetBlending;
      material.needsUpdate = true;
    }

    bloom.strength = THREE.MathUtils.lerp(0.0, 0.50, currentDarkMode);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Responsive 3D layout across the unbounded full-screen hero canvas
    const isDesktop = camera.aspect > 1.15;
    points.position.x = isDesktop ? camera.aspect * 0.70 : 0;
    points.position.y = isDesktop ? 0 : -0.22;
    points.scale.setScalar(isDesktop ? 1.0 : 0.82);

    // Subtle 3D rotation & mouse responsiveness
    points.rotation.y =
      Math.sin(elapsed * 0.25) * 0.08 * uniforms.uMotion.value + mouseX;
    points.rotation.x = mouseY;

    if (currentDarkMode < 0.05) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }

    setFrame(requestAnimationFrame(tick));
  };
  tick();

  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    composer.dispose();
    renderer.dispose();
    if (renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function ParticleBulb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let frameId = 0;
    let cleanupScene: (() => void) | undefined;

    const startSceneWithData = (data: MorphData) => {
      if (disposed) return;
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        const checkVisible = () => {
          if (disposed) return;
          if (container.clientWidth > 0 && container.clientHeight > 0) {
            window.removeEventListener("resize", checkVisible);
            cleanupScene = buildScene(container, data, reducedMotion, (id) => {
              frameId = id;
            });
          }
        };
        window.addEventListener("resize", checkVisible);
        return;
      }
      cleanupScene = buildScene(container, data, reducedMotion, (id) => {
        frameId = id;
      });
    };

    if (cachedMorphData) {
      startSceneWithData(cachedMorphData);
    } else {
      Promise.all([loadImage(BULB_SRC), loadImage(CUBE_SRC)])
        .then(([bulbImg, cubeImg]) => {
          if (disposed) return;
          const data = sampleMorphImages(bulbImg, cubeImg);
          startSceneWithData(data);
        })
        .catch((err) => {
          console.error("Failed to load particle textures:", err);
        });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cleanupScene?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-visible pointer-events-auto"
      aria-hidden="true"
    />
  );
}

export default ParticleBulb;
