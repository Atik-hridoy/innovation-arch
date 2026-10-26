"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ========================================
// SHAPE DEFINITIONS & GENERATORS
// ========================================

function createGlobe(count: number): Float32Array {
  const result = new Float32Array(count * 3);
  const radius = 2.15;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const jitter = (Math.random() - 0.5) * 0.035;

    result[i3] = Math.cos(theta) * ringRadius * (radius + jitter);
    result[i3 + 1] = y * (radius + jitter);
    result[i3 + 2] = Math.sin(theta) * ringRadius * (radius + jitter);
  }
  return result;
}

function createInfinity(count: number): Float32Array {
  const result = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const t = (i / count) * Math.PI * 2;
    const denominator = 1 + Math.cos(t) ** 2;

    const x = (3.1 * Math.sin(t)) / denominator;
    const y = (2.1 * Math.sin(t) * Math.cos(t)) / denominator;
    const spread = (Math.random() - 0.5) * 0.3;

    result[i3] = x + spread;
    result[i3 + 1] = y + spread;
    result[i3 + 2] = (Math.random() - 0.5) * 0.8;
  }
  return result;
}

function createNeuralNetwork(count: number): Float32Array {
  const result = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const side = Math.random() < 0.5 ? -1 : 1;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random());
    const centerX = side * 0.95;

    result[i3] = centerX + Math.cos(angle) * radius * 1.15;
    result[i3 + 1] = Math.sin(angle) * radius * 1.55;
    result[i3 + 2] = (Math.random() - 0.5) * 1.0;
  }
  return result;
}

function createNetwork(count: number): Float32Array {
  const result = new Float32Array(count * 3);
  const nodes = [
    [-2.2, 0.8, 0],
    [-1.0, 1.5, 0.3],
    [0.5, 1.0, -0.2],
    [2.0, 1.4, 0.2],
    [-1.8, -0.8, 0.3],
    [-0.4, -1.3, 0],
    [1.0, -0.8, -0.3],
    [2.1, -0.7, 0.2],
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const node = nodes[Math.floor(Math.random() * nodes.length)];

    result[i3] = node[0] + (Math.random() - 0.5) * 0.7;
    result[i3 + 1] = node[1] + (Math.random() - 0.5) * 0.7;
    result[i3 + 2] = node[2] + (Math.random() - 0.5) * 0.9;
  }
  return result;
}

export function InnovativeArcParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneInfo, setSceneInfo] = useState({
    number: "01",
    title: "DIGITAL UNIVERSE",
    description: "Every possibility starts somewhere.",
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. BASIC SCENE
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // 2. PARTICLE SETTINGS
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 4500 : 12000;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targets = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const isDark = () => document.documentElement.classList.contains("dark");
    const darkBlue = new THREE.Color("#3185ff");
    const cyan = new THREE.Color("#67e8f9");
    const white = new THREE.Color("#dcecff");
    const colorOptions = [darkBlue, cyan, white];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 16;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 3. PARTICLE MATERIAL
    const material = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.x = isMobile ? 0.3 : 1.85;
    particles.position.y = isMobile ? -0.2 : 0.1;
    scene.add(particles);

    // 4. SHAPES CACHE & SEQUENCE
    const shapes = [
      {
        title: "DIGITAL UNIVERSE",
        description: "Every possibility starts somewhere.",
        points: createGlobe(PARTICLE_COUNT),
        duration: 5,
      },
      {
        title: "AI & INTELLIGENCE",
        description: "Turning information into intelligence.",
        points: createNeuralNetwork(PARTICLE_COUNT),
        duration: 5,
      },
      {
        title: "CONNECTED SYSTEMS",
        description: "Ideas, data, and technology working together.",
        points: createNetwork(PARTICLE_COUNT),
        duration: 5,
      },
      {
        title: "ENDLESS POSSIBILITIES",
        description: "Innovation never stops moving forward.",
        points: createInfinity(PARTICLE_COUNT),
        duration: 6,
      },
    ];

    let currentShapeIndex = 0;
    let shapeStartTime = 0;
    let elapsedTime = 0;

    function setTargetShape(shapeIndex: number) {
      const shape = shapes[shapeIndex];
      targets.set(shape.points);
      currentShapeIndex = shapeIndex;
      shapeStartTime = elapsedTime;

      setSceneInfo({
        number: String(shapeIndex + 1).padStart(2, "0"),
        title: shape.title,
        description: shape.description,
      });
    }

    setTargetShape(0);

    // 5. MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let cameraTargetX = 0;
    let cameraTargetY = 0;

    const onPointerMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // 6. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      elapsedTime += delta;

      const shape = shapes[currentShapeIndex];
      if (elapsedTime - shapeStartTime >= shape.duration) {
        const nextIndex = (currentShapeIndex + 1) % shapes.length;
        setTargetShape(nextIndex);
      }

      const positionAttribute = geometry.attributes.position;
      const ease = 1 - Math.exp(-2.2 * delta);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        const targetX = targets[i3];
        const targetY = targets[i3 + 1];
        const targetZ = targets[i3 + 2];

        const currentX = positions[i3];
        const currentY = positions[i3 + 1];
        const currentZ = positions[i3 + 2];

        // Organic living drift
        const phase = elapsedTime * 0.65 + i * 0.017;
        const driftX = Math.sin(phase) * 0.025;
        const driftY = Math.cos(phase * 0.8) * 0.025;
        const driftZ = Math.sin(phase * 0.5) * 0.025;

        positions[i3] += (targetX + driftX - currentX) * ease;
        positions[i3 + 1] += (targetY + driftY - currentY) * ease;
        positions[i3 + 2] += (targetZ + driftZ - currentZ) * ease;
      }

      positionAttribute.needsUpdate = true;

      // Slow 3D rotation
      particles.rotation.y += delta * 0.055;
      particles.rotation.x = Math.sin(elapsedTime * 0.18) * 0.08;

      // Subtle mouse camera movement
      cameraTargetX = mouseX * 0.18;
      cameraTargetY = -mouseY * 0.12;
      camera.position.x += (cameraTargetX - camera.position.x) * 0.035;
      camera.position.y += (cameraTargetY - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    // 7. RESPONSIVE RESIZE
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      particles.position.x = w < 768 ? 0.3 : 1.85;
      particles.position.y = w < 768 ? -0.2 : 0.1;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      {/* 3D WebGL Particle Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Scene Indicator Badge (bottom-right of Hero) */}
      <div className="hidden sm:flex absolute right-6 md:right-12 bottom-6 md:bottom-8 z-20 items-center gap-3.5 px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#05070b]/80 backdrop-blur-md shadow-xs transition-all duration-300">
        <span className="font-mono text-xs font-bold text-cyan-500 dark:text-cyan-400">
          {sceneInfo.number}
        </span>
        <div className="flex flex-col text-left">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-900 dark:text-white font-bold leading-tight">
            {sceneInfo.title}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
            {sceneInfo.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InnovativeArcParticles;
