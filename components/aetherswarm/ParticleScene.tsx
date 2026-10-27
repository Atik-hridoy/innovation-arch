import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, motion, useSpring, useTransform } from 'framer-motion';

// --- CONFIGURATION CONSTANTS ---
export const PARTICLE_COUNT = 9000;

export interface ParticleSceneProps {
  mode?: 'dark' | 'light';
  particleCount?: number;
  colorSphere?: string;
  colorWave?: string;
  colorTorus?: string;
  turbulenceIntensity?: number;
  pointSize?: number;
  className?: string;
  onMorphChange?: (morphValue: number) => void;
  showScrollIndicator?: boolean;
  embedded?: boolean;
  autoPlay?: boolean;
}

// Software WebGL detection for headless browsers and low-power devices
export const isSoftwareGl = (() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
})();

// --- GLSL SHADER DEFINITION ---
const ParticleShaderMaterialDef = {
  uniforms: {
    uMorph: { value: 0.0 }, // 0 = Idea, 1 = Process, 2 = Success, 3 = seamless return
    uTime: { value: 0.0 },
    uPixelRatio: { value: 1.0 },
    uPointSize: { value: 38.0 },
    uTurbulenceScale: { value: 1.0 },
    uIsLightMode: { value: 0.0 }, // 0.0 = dark background, 1.0 = white/light background
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorSphere: { value: new THREE.Color('#38bdf8') }, // Radiant Cyan / Starlight
    uColorWave: { value: new THREE.Color('#c084fc') },   // Neon Violet / Nebula
    uColorTorus: { value: new THREE.Color('#fb923c') },  // Solar Amber / Core
  },
  vertexShader: /* glsl */ `
    uniform float uMorph;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uPointSize;
    uniform float uTurbulenceScale;
    uniform vec2 uMouse;

    attribute vec3 aSphere;
    attribute vec3 aWave;
    attribute vec3 aTorus;
    attribute vec3 aArc;
    attribute vec3 aRand;

    varying vec3 vColor;
    varying float vAlpha;
    varying float vCore;

    uniform vec3 uColorSphere;
    uniform vec3 uColorWave;
    uniform vec3 uColorTorus;

    #define PI 3.1415926535897932384626433832795

    // Fast 3D Simplex-like periodic pseudo curl noise
    vec3 organicCurl(vec3 p) {
      float t = uTime * 0.9;
      return vec3(
        sin(p.y * 1.4 + t) * cos(p.z * 1.3 - t * 0.7),
        sin(p.z * 1.2 + t * 0.8) * cos(p.x * 1.5 + t * 1.1),
        sin(p.x * 1.3 - t * 1.0) * cos(p.y * 1.2 + t * 0.6)
      );
    }

    void main() {
      // --- STAGE 1: SPHERE -> WAVE GRID (uMorph: 0.0 to 1.0) ---
      float m1 = clamp(uMorph, 0.0, 1.0);
      float lag1 = aRand.x * 0.40; // Staggered swarm lag: points do NOT move all at once
      float p1 = clamp((m1 - lag1) / (1.0 - 0.40), 0.0, 1.0);
      float eased1 = smoothstep(0.0, 1.0, p1);

      // Mid-flight swarm turbulence during Phase 1
      float turbEnvelope1 = sin(p1 * PI);
      vec3 turb1 = organicCurl(aSphere * 0.75 + aRand * 2.0) * turbEnvelope1 * 1.75 * uTurbulenceScale;
      vec3 pos1 = mix(aSphere, aWave, eased1) + turb1;

      // --- STAGE 2: WAVE GRID -> HOLLOW TORUS (uMorph: 1.0 to 2.0) ---
      float m2 = clamp(uMorph - 1.0, 0.0, 1.0);
      float lag2 = aRand.y * 0.40;
      float p2 = clamp((m2 - lag2) / (1.0 - 0.40), 0.0, 1.0);
      float eased2 = smoothstep(0.0, 1.0, p2);

      // Mid-flight swarm turbulence during Phase 2
      float turbEnvelope2 = sin(p2 * PI);
      vec3 turb2 = organicCurl(pos1 * 0.75 + aRand.yzx * 2.0) * turbEnvelope2 * 1.75 * uTurbulenceScale;
      vec3 pos2 = mix(pos1, aTorus, eased2) + turb2;

      // --- STAGE 3: TORUS -> INNOVATION ARC (uMorph: 2.0 to 3.0) ---
      float m3 = clamp(uMorph - 2.0, 0.0, 1.0);
      float lag3 = aRand.z * 0.32;
      float p3 = clamp((m3 - lag3) / (1.0 - 0.32), 0.0, 1.0);
      float eased3 = smoothstep(0.0, 1.0, p3);
      float turbEnvelope3 = sin(p3 * PI);
      vec3 turb3 = organicCurl(pos2 * 0.7 + aRand.zxy * 2.0) * turbEnvelope3 * 1.35 * uTurbulenceScale;
      vec3 pos3 = mix(pos2, aArc, eased3) + turb3;

      // --- STAGE 4: INNOVATION ARC -> SPHERE (uMorph: 3.0 to 4.0) ---
      float m4 = clamp(uMorph - 3.0, 0.0, 1.0);
      float lag4 = aRand.x * 0.28;
      float p4 = clamp((m4 - lag4) / (1.0 - 0.28), 0.0, 1.0);
      float eased4 = smoothstep(0.0, 1.0, p4);
      float turbEnvelope4 = sin(p4 * PI);
      vec3 turb4 = organicCurl(pos3 * 0.72 + aRand.yzx * 2.0) * turbEnvelope4 * 1.2 * uTurbulenceScale;
      vec3 finalPos = mix(pos3, aSphere, eased4) + turb4;

      // --- CONTINUOUS IDLE MOVEMENTS ---
      // Wave ambient idle undulation when at or near Wave stage
      float waveInfluence = 1.0 - clamp(abs(uMorph - 1.0), 0.0, 1.0);
      if (waveInfluence > 0.001) {
        float waveDisplacement = sin(finalPos.x * 0.85 + uTime * 1.5) * cos(finalPos.z * 0.85 + uTime * 1.2) * 0.32;
        finalPos.y += waveDisplacement * waveInfluence;
      }

      // Sphere subtle celestial shimmer
      float sphereInfluence = max(1.0 - clamp(uMorph, 0.0, 1.0), smoothstep(3.0, 4.0, uMorph));
      if (sphereInfluence > 0.001) {
        finalPos += normalize(finalPos + 0.0001) * sin(uTime * 1.8 + aRand.z * 6.28) * 0.045 * sphereInfluence;
      }

      // Torus harmonic breathing pulse
      float torusInfluence = smoothstep(1.0, 2.0, uMorph) * (1.0 - smoothstep(2.0, 3.0, uMorph));
      if (torusInfluence > 0.001) {
        float pulse = sin(uTime * 2.2 + aRand.z * PI * 2.0) * 0.08;
        vec2 radialDir = normalize(finalPos.xy + 0.0001);
        finalPos.xy += radialDir * pulse * torusInfluence;
        finalPos.z += cos(uTime * 1.6 + aRand.x * PI * 2.0) * 0.06 * torusInfluence;
      }

      // Interactive mouse parallax drift (subtle spring response)
      finalPos.xy += uMouse * (0.25 + aRand.z * 0.2);

      // --- COLOR MORPHING & SPECULAR CORE BLEND ---
      vec3 currentColor = mix(uColorSphere, uColorWave, eased1);
      currentColor = mix(currentColor, uColorTorus, eased2);
      vec3 arcColor = mix(uColorSphere, uColorTorus, 0.28);
      currentColor = mix(currentColor, arcColor, eased3);
      currentColor = mix(currentColor, uColorSphere, eased4);

      // Individual particle luminance variance
      vColor = currentColor + (aRand.z - 0.5) * 0.18;
      vAlpha = 0.65 + aRand.x * 0.35;
      vCore = aRand.y;

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Point size attenuation with camera distance
      float pointScale = (0.7 + aRand.y * 0.6);
      gl_PointSize = uPointSize * pointScale * (1.0 / -mvPosition.z) * (uPixelRatio / 1.5);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uIsLightMode;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vCore;

    void main() {
      // Coordinate in point sprite [-0.5, 0.5]
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Dual-tier soft halo falloff + bright pinpoint core
      float halo = smoothstep(0.5, 0.02, dist);
      float coreGlow = smoothstep(0.18, 0.0, dist);

      if (uIsLightMode > 0.5) {
        // --- LIGHT MODE (WHITE BACKGROUND) ---
        // Smooth pigment gradient: deep saturated core with clean anti-aliased edge
        vec3 pigment = mix(vColor * 0.68, vColor * 0.92, dist * 1.5);
        float alpha = halo * (0.94 + vAlpha * 0.06);
        gl_FragColor = vec4(pigment, alpha);
      } else {
        // --- DARK MODE (DARK BACKGROUND) ---
        // Additive glow with white-hot core
        vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), coreGlow * (0.6 + vCore * 0.35));
        gl_FragColor = vec4(finalColor, halo * vAlpha);
      }
    }
  `,
};

// Sparse background-only field: enough depth for a cosmic atmosphere without
// competing with the primary morphing formation.
const CosmicField: React.FC<{ mode: 'dark' | 'light' }> = ({ mode }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const targetMouseRef = useRef(new THREE.Vector2());
  const [positions, sizes, seeds, depthBands] = useMemo(() => {
    const count = mode === 'light' ? 2300 : 1700;
    const positionData = new Float32Array(count * 3);
    const sizeData = new Float32Array(count);
    const seedData = new Float32Array(count);
    const bandData = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const chance = Math.random();
      const band = chance < 0.52 ? 0 : chance < 0.86 ? 1 : 2;
      bandData[i] = band;
      seedData[i] = Math.random() * 100;
      positionData[k] = (Math.random() - 0.5) * 19;
      positionData[k + 1] = (Math.random() - 0.5) * 11;
      positionData[k + 2] = band === 0
        ? -5.0 - Math.random() * 6.0
        : band === 1
          ? -1.2 - Math.random() * 3.8
          : 1.2 + Math.random() * 4.0;
      sizeData[i] = band === 0
        ? 0.55 + Math.random() * 0.5
        : band === 1
          ? 0.9 + Math.random() * 0.75
          : 1.35 + Math.random() * 1.15;
    }

    return [positionData, sizeData, seedData, bandData];
  }, [mode]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      targetMouseRef.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        -(event.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime();
    pointsRef.current.rotation.y = Math.sin(elapsed * 0.028) * 0.032;
    pointsRef.current.rotation.x = Math.cos(elapsed * 0.021) * 0.014;
    if (materialRef.current) {
      mouseRef.current.lerp(targetMouseRef.current, 0.035);
      materialRef.current.uniforms.uTime.value = elapsed;
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aDepthBand" args={[depthBands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 1.75) },
          uLightMode: { value: mode === 'light' ? 1 : 0 },
          uMouse: { value: new THREE.Vector2() },
        }}
        vertexShader={/* glsl */ `
          attribute float aSize;
          attribute float aSeed;
          attribute float aDepthBand;
          uniform float uTime;
          uniform float uPixelRatio;
          uniform float uLightMode;
          uniform vec2 uMouse;
          varying float vSeed;
          varying float vBand;
          varying float vDepthFade;

          void main() {
            vec3 p = position;
            float speed = mix(0.035, 0.13, aDepthBand * 0.5);
            p.x += sin(uTime * speed + aSeed) * (0.05 + aDepthBand * 0.055);
            p.y += cos(uTime * speed * 0.8 + aSeed * 1.7) * (0.04 + aDepthBand * 0.045);
            p.z += sin(uTime * speed * 0.55 + aSeed * 0.6) * (0.04 + aDepthBand * 0.07);
            float parallax = mix(0.025, 0.32, aDepthBand * 0.5);
            p.xy += uMouse * parallax;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            float depth = max(-mv.z, 1.0);
            float lightBoost = mix(1.0, 1.2, uLightMode);
            gl_PointSize = clamp((27.0 * aSize / depth) * uPixelRatio * lightBoost, 0.95, 8.2);
            gl_Position = projectionMatrix * mv;
            vSeed = aSeed;
            vBand = aDepthBand;
            vDepthFade = mix(0.48, 1.0, aDepthBand * 0.5);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uTime;
          uniform float uLightMode;
          varying float vSeed;
          varying float vBand;
          varying float vDepthFade;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = exp(-d * d * 78.0);
            float halo = exp(-d * d * 18.0);
            float twinkle = 0.72 + 0.28 * sin(uTime * (0.35 + vBand * 0.18) + vSeed);

            vec3 deepAmber = vec3(0.64, 0.25, 0.025);
            vec3 softGold = vec3(0.93, 0.52, 0.075);
            vec3 starlight = vec3(1.0, 0.78, 0.30);
            vec3 darkColor = mix(deepAmber, softGold, clamp(vBand * 0.5 + core * 0.28, 0.0, 1.0));
            darkColor = mix(darkColor, starlight, core * 0.55);

            // Adaptive pigment palette for white surfaces. The distant plane is
            // cool and compact, while particles closer to camera become warmer.
            vec3 farInk = vec3(0.025, 0.18, 0.48);
            vec3 midBronze = vec3(0.46, 0.25, 0.09);
            vec3 nearAmber = vec3(0.72, 0.29, 0.025);
            vec3 lightColor = mix(farInk, midBronze, smoothstep(0.0, 1.0, vBand));
            lightColor = mix(lightColor, nearAmber, smoothstep(1.0, 2.0, vBand));
            // A dark, crisp core preserves definition; only the rim becomes gold.
            lightColor = mix(lightColor, vec3(0.92, 0.53, 0.10), halo * 0.18);
            lightColor = mix(lightColor, farInk, core * 0.18 * (1.0 - vBand * 0.5));

            vec3 color = mix(darkColor, lightColor, uLightMode);
            float darkAlpha = (core * 0.78 + halo * 0.22) * twinkle * vDepthFade;
            float lightAlpha = (core * 0.90 + halo * 0.10) * (0.82 + twinkle * 0.18) * vDepthFade;
            float alpha = mix(darkAlpha, lightAlpha, uLightMode);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </points>
  );
};

// --- R3F PARTICLE SWARM COMPONENT ---
interface SwarmParticlesProps {
  mode: 'dark' | 'light';
  scrollYProgress: any;
  colorSphere: string;
  colorWave: string;
  colorTorus: string;
  turbulenceIntensity: number;
  pointSize: number;
  onMorphChange?: (morphValue: number) => void;
  autoPlay?: boolean;
  embedded?: boolean;
}

const SwarmParticles: React.FC<SwarmParticlesProps> = ({
  mode,
  scrollYProgress,
  colorSphere,
  colorWave,
  colorTorus,
  turbulenceIntensity,
  pointSize,
  onMorphChange,
  autoPlay = false,
  embedded = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Mouse coordinate tracker for parallax tilt
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseRef.current.set(nx * 0.4, ny * 0.4);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Compute all 3 3D shape coordinate buffers once in useMemo
  const [sphereBuffer, waveBuffer, torusBuffer, arcBuffer, randBuffer] = useMemo(() => {
    const sphere = new Float32Array(PARTICLE_COUNT * 3);
    const wave = new Float32Array(PARTICLE_COUNT * 3);
    const torus = new Float32Array(PARTICLE_COUNT * 3);
    const arc = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT * 3);

    // --- 1. FIBONACCI SPHERE (70%) + TILTED SATURN RING (30%) ---
    const sphereCount = Math.floor(PARTICLE_COUNT * 0.7);
    const ringCount = PARTICLE_COUNT - sphereCount;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Sphere shell
    for (let i = 0; i < sphereCount; i++) {
      const y = 1 - (i / Math.max(1, sphereCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      const r = 2.45;

      sphere[i * 3 + 0] = Math.cos(theta) * radiusAtY * r;
      sphere[i * 3 + 1] = y * r;
      sphere[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;
    }

    // Saturn ring tilted at 28 degrees (0.49 rad)
    const tilt = 0.49;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const innerR = 3.3;
    const outerR = 5.3;

    for (let i = 0; i < ringCount; i++) {
      const idx = sphereCount + i;
      const pseudoR = ((i * 9301 + 49297) % 233280) / 233280;
      const pseudoAngle = ((i * 12345 + 67891) % 233280) / 233280;
      const pseudoZ = ((i * 54321 + 13579) % 233280) / 233280;

      const r = Math.sqrt(pseudoR * (outerR * outerR - innerR * innerR) + innerR * innerR);
      const theta = pseudoAngle * Math.PI * 2;

      const lx = r * Math.cos(theta);
      const ly = (pseudoZ - 0.5) * 0.12; // Thin disk
      const lz = r * Math.sin(theta);

      sphere[idx * 3 + 0] = lx * cosT - ly * sinT;
      sphere[idx * 3 + 1] = lx * sinT + ly * cosT;
      sphere[idx * 3 + 2] = lz;
    }

    // --- 2. UNDULATING 3D SINE/COSINE WAVE TERRAIN (Grid) ---
    const gridDim = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % gridDim;
      const row = Math.floor(i / gridDim);

      const u = (col / Math.max(1, gridDim - 1) - 0.5) * 14.0;
      const v = (row / Math.max(1, gridDim - 1) - 0.5) * 12.0;
      const y = Math.sin(u * 0.72) * Math.cos(v * 0.72) * 0.75 - 1.85;

      wave[i * 3 + 0] = u;
      wave[i * 3 + 1] = y;
      wave[i * 3 + 2] = v;
    }

    // --- 3. GLOWING HOLLOW TORUS RING (Framing CTA) ---
    const majorR = 3.35;
    const minorR = 0.65;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute u uniformly over full circle [0, 2*PI]
      const u = (i / PARTICLE_COUNT) * Math.PI * 2;
      // Golden angle distribution around minor tube circle
      const v = i * goldenAngle;

      // Face the camera in the XY plane so it forms a glowing hollow ring around CTA
      torus[i * 3 + 0] = (majorR + minorR * Math.cos(v)) * Math.cos(u);
      torus[i * 3 + 1] = (majorR + minorR * Math.cos(v)) * Math.sin(u) + 0.1;
      torus[i * 3 + 2] = minorR * Math.sin(v);
    }

    // --- 4. VOLUMETRIC INNOVATION ARC / INFINITY RIBBON ---
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (i / PARTICLE_COUNT) * Math.PI * 2;
      const denominator = 1 + Math.cos(t) * Math.cos(t);
      const x = (4.4 * Math.sin(t)) / denominator;
      const y = (2.8 * Math.sin(t) * Math.cos(t)) / denominator;
      const next = t + 0.004;
      const nextDenominator = 1 + Math.cos(next) * Math.cos(next);
      const dx = (4.4 * Math.sin(next)) / nextDenominator - x;
      const dy = (2.8 * Math.sin(next) * Math.cos(next)) / nextDenominator - y;
      const tangentLength = Math.hypot(dx, dy) || 1;
      const ribbonAngle = i * goldenAngle;
      const ribbonRadius = 0.18 + (((i * 9301 + 49297) % 233280) / 233280) * 0.38;

      arc[i * 3 + 0] = x - (dy / tangentLength) * Math.cos(ribbonAngle) * ribbonRadius;
      arc[i * 3 + 1] = y + (dx / tangentLength) * Math.cos(ribbonAngle) * ribbonRadius;
      arc[i * 3 + 2] = Math.sin(t * 2.0) * 0.42 + Math.sin(ribbonAngle) * ribbonRadius;
    }

    // --- 4. RANDOM SEEDS (Lag, Scale, Turbulence) ---
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      rand[i * 3 + 0] = ((i * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
      rand[i * 3 + 1] = ((i * 1664525 + 1013904223) & 0x7fffffff) / 0x7fffffff;
      rand[i * 3 + 2] = ((i * 214013 + 2531011) & 0x7fffffff) / 0x7fffffff;
    }

    return [sphere, wave, torus, arc, rand];
  }, []);

  // Update uniform colors and blending mode when props change
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uColorSphere.value.set(colorSphere);
    materialRef.current.uniforms.uColorWave.value.set(colorWave);
    materialRef.current.uniforms.uColorTorus.value.set(colorTorus);
    materialRef.current.uniforms.uTurbulenceScale.value = turbulenceIntensity;
    materialRef.current.uniforms.uPointSize.value = pointSize;
    materialRef.current.uniforms.uIsLightMode.value = mode === 'light' ? 1.0 : 0.0;
    materialRef.current.blending = mode === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
    materialRef.current.needsUpdate = true;
  }, [colorSphere, colorWave, colorTorus, turbulenceIntensity, pointSize, mode]);

  // Frame Loop: 60 FPS uniform updates & zero-state scroll damping
  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    // Read Framer Motion scroll directly without triggering React re-renders!
    const progress = typeof scrollYProgress?.get === 'function' ? scrollYProgress.get() : 0.0;
    // Embedded hero mode loops through all original AetherSwarm formations
    // without requiring the archive's standalone 300vh demo layout.
    const cycle = clock.getElapsedTime() % 25.5;
    let autoMorph = 0;
    if (cycle < 4.0) autoMorph = 0;
    else if (cycle < 6.5) autoMorph = (cycle - 4.0) / 2.5;
    else if (cycle < 10.0) autoMorph = 1;
    else if (cycle < 12.5) autoMorph = 1 + (cycle - 10.0) / 2.5;
    else if (cycle < 16.0) autoMorph = 2;
    else if (cycle < 18.5) autoMorph = 2 + (cycle - 16.0) / 2.5;
    else if (cycle < 22.5) autoMorph = 3;
    else autoMorph = 3 + (cycle - 22.5) / 3.0;
    const targetMorph = autoPlay ? autoMorph : progress * 2.0;

    // Smooth damping (lerp) toward target morph
    let currentMorph = materialRef.current.uniforms.uMorph.value;
    // uMorph 4 and uMorph 0 are both the exact same sphere formation.
    // Reset on that visually identical frame so the next cycle never scrubs
    // backward through Arc -> Torus -> Wave.
    if (autoPlay && currentMorph > 3.72 && targetMorph === 0) {
      currentMorph = 0;
      materialRef.current.uniforms.uMorph.value = 0;
    }
    const lerpedMorph = THREE.MathUtils.lerp(currentMorph, targetMorph, 0.08);
    materialRef.current.uniforms.uMorph.value = lerpedMorph;

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

    // Smooth mouse parallax lerp
    mouseRef.current.lerp(targetMouseRef.current, 0.05);
    materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);

    // Stage-aware rotation:
    // When lerpedMorph is near 0 (planet): rotate Y
    // When lerpedMorph is near 1 (wave): face camera flat
    // When lerpedMorph is near 2 (torus): spin around Z axis like an open cosmic portal
    if (pointsRef.current) {
      const sphereWeight = Math.max(0, 1.0 - Math.min(1.0, lerpedMorph));
      const torusWeight = Math.max(0, Math.min(1.0, lerpedMorph - 1.0));

      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.035 * sphereWeight;
      pointsRef.current.rotation.z = clock.getElapsedTime() * 0.05 * torusWeight;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.03;
      pointsRef.current.position.x = embedded ? (size.width < 768 ? 0.35 : 2.15) : 0;
    }

    if (onMorphChange && Math.abs(currentMorph - lerpedMorph) > 0.001) {
      onMorphChange(lerpedMorph);
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[sphereBuffer, 3]}
        />
        <bufferAttribute
          attach="attributes-aSphere"
          args={[sphereBuffer, 3]}
        />
        <bufferAttribute
          attach="attributes-aWave"
          args={[waveBuffer, 3]}
        />
        <bufferAttribute
          attach="attributes-aTorus"
          args={[torusBuffer, 3]}
        />
        <bufferAttribute
          attach="attributes-aArc"
          args={[arcBuffer, 3]}
        />
        <bufferAttribute
          attach="attributes-aRand"
          args={[randBuffer, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[ParticleShaderMaterialDef]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// --- PRODUCTION-READY COMPONENT WITH SECTION SCROLLING ---
export default function ParticleScene({
  mode = 'dark',
  particleCount = PARTICLE_COUNT,
  colorSphere = '#38bdf8',
  colorWave = '#c084fc',
  colorTorus = '#fb923c',
  turbulenceIntensity = 1.0,
  pointSize = 38.0,
  className = '',
  onMorphChange,
  showScrollIndicator = true,
  embedded = false,
  autoPlay = false,
}: ParticleSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = mode === 'light';

  // Framer Motion useScroll hook tracking scroll progress (0.0 to 1.0)
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress for DOM progress bars
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (embedded) {
    return (
      <div className={`absolute inset-0 h-full w-full overflow-hidden pointer-events-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 9.2], fov: 48, near: 0.1, far: 50 }}
          gl={{ antialias: !isSoftwareGl, alpha: true, powerPreference: 'high-performance' }}
          dpr={isSoftwareGl ? 1 : [1, 1.75]}
          className="h-full w-full"
        >
          <CosmicField mode={mode} />
          <SwarmParticles
            mode={mode}
            scrollYProgress={scrollYProgress}
            colorSphere={colorSphere}
            colorWave={colorWave}
            colorTorus={colorTorus}
            turbulenceIntensity={turbulenceIntensity}
            pointSize={pointSize}
            onMorphChange={onMorphChange}
            autoPlay={autoPlay}
            embedded
          />
        </Canvas>
        <div className={`absolute inset-0 ${isLight ? 'bg-[radial-gradient(circle_at_76%_48%,rgba(245,158,11,0.045),transparent_30%),radial-gradient(ellipse_at_72%_48%,transparent_44%,rgba(248,250,252,0.34)_80%)]' : 'bg-[radial-gradient(circle_at_76%_48%,rgba(245,158,11,0.09),transparent_32%),radial-gradient(ellipse_at_72%_48%,transparent_42%,rgba(2,6,23,0.4)_82%)]'}`} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isLight ? 'bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white' : 'bg-slate-950 text-white selection:bg-purple-500 selection:text-white'} ${className}`}
      data-testid="particle-scene-root"
    >
      {/* FIXED 3D CANVAS BACKGROUND */}
      <div className="fixed inset-0 h-screen w-full pointer-events-none z-0 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 48, near: 0.1, far: 50 }}
          gl={{
            antialias: !isSoftwareGl,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={isSoftwareGl ? 1 : [1, 2]}
          className="w-full h-full"
        >
          <SwarmParticles
            mode={mode}
            scrollYProgress={scrollYProgress}
            colorSphere={colorSphere}
            colorWave={colorWave}
            colorTorus={colorTorus}
            turbulenceIntensity={turbulenceIntensity}
            pointSize={pointSize}
            onMorphChange={onMorphChange}
          />
        </Canvas>

        {/* Ambient Vignette Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLight
              ? 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(241,245,249,0.8)_100%)]'
              : 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.75)_100%)]'
          }`}
        />
      </div>

      {/* FIXED LATERAL SCROLL TIMELINE & HUD INDICATORS */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6 pointer-events-auto">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
            aria-label="Navigate to Planet Stage"
          >
            <span className={`text-[11px] font-mono tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              01 Planet
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border border-sky-500 transition-transform group-hover:scale-125 ${isLight ? 'bg-sky-500/30' : 'bg-sky-400/20'}`} />
          </button>

          <div className={`w-px h-8 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          <button
            type="button"
            onClick={() => {
              if (containerRef.current) {
                const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
                window.scrollTo({ top: totalHeight * 0.5, behavior: 'smooth' });
              }
            }}
            className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
            aria-label="Navigate to Wave Terrain Stage"
          >
            <span className={`text-[11px] font-mono tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              02 Wave Grid
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border border-purple-500 transition-transform group-hover:scale-125 ${isLight ? 'bg-purple-500/30' : 'bg-purple-400/20'}`} />
          </button>

          <div className={`w-px h-8 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          <button
            type="button"
            onClick={() => {
              if (containerRef.current) {
                const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
                window.scrollTo({ top: totalHeight, behavior: 'smooth' });
              }
            }}
            className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
            aria-label="Navigate to Torus Singularity Stage"
          >
            <span className={`text-[11px] font-mono tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              03 Torus Ring
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border border-amber-500 transition-transform group-hover:scale-125 ${isLight ? 'bg-amber-500/30' : 'bg-amber-400/20'}`} />
          </button>
        </div>

        {/* Vertical Progress Bar */}
        <div className={`w-1 h-28 rounded-full overflow-hidden p-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800/80'}`}>
          <motion.div
            className="w-full bg-gradient-to-b from-sky-500 via-purple-500 to-amber-500 rounded-full origin-top"
            style={{ scaleY: smoothProgress, height: '100%' }}
          />
        </div>
      </div>

      {/* FOREGROUND WEBPAGE CONTENT SECTIONS (300vh Total Scroll Track) */}
      <div className="relative z-10 w-full">
        {/* SECTION 1: HERO / TOP OF PAGE (RINGED PLANET) */}
        <section
          id="hero-planet"
          className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none"
        >
          <div className="flex flex-col items-center max-w-4xl">
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-6 ${
              isLight
                ? 'border-sky-500/30 bg-sky-100/90 text-sky-800 shadow-[0_0_20px_rgba(2,132,199,0.12)]'
                : 'border-sky-400/30 bg-sky-950/60 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Shape 01 : Celestial Shell & Ring
            </div>

            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] ${
              isLight
                ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-700 bg-clip-text text-transparent'
                : 'bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'
            }`}>
              9,000 Points in Perpetual Orbit
            </h1>

            <p className={`mt-6 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Fibonacci planetary lattice with tilted Saturn ring.
              Scroll downwards to perturb gravitational equilibrium and trigger GPU-accelerated swarm morphing.
            </p>

            {showScrollIndicator && (
              <div className={`mt-12 flex flex-col items-center gap-3 text-xs font-mono uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>Scroll to Morph</span>
                <div className={`w-5 h-9 rounded-full border-2 flex items-start justify-center p-1 ${isLight ? 'border-slate-400' : 'border-slate-500/60'}`}>
                  <div className="w-1.5 h-2.5 rounded-full bg-sky-500 animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: MIDDLE SECTION (3D UNDULATING WAVE GRID) */}
        <section
          id="wave-terrain"
          className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none"
        >
          <div className="flex flex-col items-center max-w-4xl">
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-6 ${
              isLight
                ? 'border-purple-500/30 bg-purple-100/90 text-purple-800 shadow-[0_0_20px_rgba(147,51,234,0.12)]'
                : 'border-purple-500/30 bg-purple-950/60 text-purple-300 shadow-[0_0_20px_rgba(192,132,252,0.15)]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Shape 02 : Harmonic Wave Grid
            </div>

            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] ${
              isLight
                ? 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-800 bg-clip-text text-transparent'
                : 'bg-gradient-to-b from-white via-purple-100 to-purple-400 bg-clip-text text-transparent'
            }`}>
              Mathematical Terrain Undulation
            </h2>

            <p className={`mt-6 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Every particle breaks formation with a stochastic lag delay and procedural curl turbulence,
              reassembling into a dynamic sine-cosine mathematical landscape.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-lg text-left">
              <div className={`p-3.5 rounded-xl border backdrop-blur-sm ${isLight ? 'border-slate-200 bg-white/90 shadow-sm' : 'border-slate-800 bg-slate-900/60'}`}>
                <div className="text-[11px] font-mono text-purple-600 uppercase">Draw Call</div>
                <div className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>1 Single</div>
              </div>
              <div className={`p-3.5 rounded-xl border backdrop-blur-sm ${isLight ? 'border-slate-200 bg-white/90 shadow-sm' : 'border-slate-800 bg-slate-900/60'}`}>
                <div className="text-[11px] font-mono text-purple-600 uppercase">Stagger Lag</div>
                <div className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>40% Range</div>
              </div>
              <div className={`p-3.5 rounded-xl border backdrop-blur-sm ${isLight ? 'border-slate-200 bg-white/90 shadow-sm' : 'border-slate-800 bg-slate-900/60'}`}>
                <div className="text-[11px] font-mono text-purple-600 uppercase">Pipeline</div>
                <div className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>100% GPU</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BOTTOM / CALL TO ACTION (HOLLOW TORUS RING) */}
        <section
          id="torus-singularity"
          className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center select-none"
        >
          <div className="flex flex-col items-center max-w-3xl">
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-6 ${
              isLight
                ? 'border-amber-500/30 bg-amber-100/90 text-amber-900 shadow-[0_0_20px_rgba(217,119,6,0.12)]'
                : 'border-amber-500/30 bg-amber-950/60 text-amber-300 shadow-[0_0_20px_rgba(251,146,60,0.15)]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Shape 03 : Glowing Torus Singularity
            </div>

            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-3xl leading-[1.1] ${
              isLight
                ? 'bg-gradient-to-b from-slate-950 via-amber-950 to-slate-800 bg-clip-text text-transparent'
                : 'bg-gradient-to-b from-white via-amber-100 to-amber-500 bg-clip-text text-transparent'
            }`}>
              Concentrated Focus & Action
            </h2>

            <p className={`mt-6 text-base sm:text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              The particle swarm coalesces into a luminous hollow ring framing your primary call to action.
              Zero React re-renders on scroll, butter-smooth 60 FPS interpolation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                  isLight
                    ? 'text-white bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 shadow-[0_0_30px_rgba(234,88,12,0.35)] hover:shadow-[0_0_45px_rgba(234,88,12,0.55)] hover:scale-[1.03] active:scale-[0.98]'
                    : 'text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 shadow-[0_0_40px_rgba(251,146,60,0.45)] hover:shadow-[0_0_60px_rgba(251,146,60,0.7)] hover:scale-[1.03] active:scale-[0.98]'
                }`}
              >
                Return to Orbit
              </button>

              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById('wave-terrain');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-6 py-4 rounded-xl font-medium transition-all cursor-pointer ${
                  isLight
                    ? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
                    : 'border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Inspect Terrain Waves
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
