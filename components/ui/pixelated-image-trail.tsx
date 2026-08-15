'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TrailConfig {
  imageLifespan: number;
  inDuration: number;
  outDuration: number;
  staggerIn: number;
  staggerOut: number;
  slideDuration: number;
  slideEasing: string;
  easing: string;
}

export interface PixelatedImageTrailProps {
  className?: string;
  images?: string[];
  config?: Partial<TrailConfig>;
  slices?: number;
  spawnThreshold?: number;
  smoothing?: number;
  imageSize?: number;
}

const DEFAULT_CONFIG: TrailConfig = {
  imageLifespan: 750,
  inDuration: 140,
  outDuration: 260,
  staggerIn: 6,
  staggerOut: 5,
  slideDuration: 450,
  slideEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

const DEFAULT_IMAGES = [
  // 1. Microprocessor & Silicon Circuits
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
  // 2. AI Brain & Neural Networks
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
  // 3. Clean Computer Science Code & Algorithm Syntax
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
  // 4. Cyber Security & Binary Matrix Stream
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
  // 5. High-Performance GPU Chipset & Hardware
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop',
  // 6. Cloud Datacenter & Fiber Optic Network
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
  // 7. Cybernetic Robotics & Neural Interface
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&auto=format&fit=crop',
  // 8. Dark Architecture Cybersecurity Server
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
];

interface ShapeVariant {
  aspectW: number;
  aspectH: number;
  borderRadius: string;
  maskShape: string;
  rotation?: number;
}

const SHAPE_VARIANTS: ShapeVariant[] = [
  // 1. Vertical Architectural Arch / Capsule
  {
    aspectW: 0.85,
    aspectH: 1.15,
    borderRadius: '40px',
    maskShape: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
  },
  // 2. Soft Circle / Sphere
  {
    aspectW: 1.0,
    aspectH: 1.0,
    borderRadius: '50%',
    maskShape: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 48%, rgba(0, 0, 0, 0) 96%)',
  },
  // 3. Wide Pill / Stadium
  {
    aspectW: 1.25,
    aspectH: 0.85,
    borderRadius: '9999px',
    maskShape: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 48%, rgba(0, 0, 0, 0) 96%)',
  },
  // 4. Smooth Squircle
  {
    aspectW: 1.05,
    aspectH: 1.0,
    borderRadius: '24px',
    maskShape: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
  },
  // 5. Dynamic Angled Diamond
  {
    aspectW: 0.95,
    aspectH: 0.95,
    borderRadius: '16px',
    rotation: 8,
    maskShape: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 96%)',
  },
];

const MAX_ACTIVE_IMAGES = 16;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function PixelatedImageTrail({
  className,
  images,
  config: configOverride = {},
  slices = 5,
  spawnThreshold = 14,
  smoothing = 0.45,
  imageSize = 115,
}: PixelatedImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentImageIndexRef = useRef(0);
  const shapeIndexRef = useRef(0);
  const activeImagesRef = useRef<HTMLDivElement[]>([]);
  const pointerActiveRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const lastSpawnPosRef = useRef({ x: 0, y: 0 });
  const interpolatedPointerPosRef = useRef({ x: 0, y: 0 });

  const finalImages = useMemo(() => (images?.length ? images : DEFAULT_IMAGES), [images]);
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...configOverride }), [configOverride]);

  useEffect(() => {
    // Preload images into memory
    finalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [finalImages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parent = container.parentElement || container;
    const safeSlices = Math.max(1, Math.floor(slices));
    const safeSmoothing = clamp(smoothing, 0.01, 1);
    const safeSpawnThreshold = Math.max(1, spawnThreshold);
    const safeBaseSize = Math.max(40, imageSize);
    const getSliceDelay = (index: number, stagger: number) =>
      Math.abs(index - (safeSlices - 1) / 2) * stagger;
    const getMaxSliceDelay = (stagger: number) => ((safeSlices - 1) / 2) * stagger;

    const schedule = (callback: () => void, delay: number) => {
      const timeout = window.setTimeout(callback, delay);
      return timeout;
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nextPosition = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };

      pointerPosRef.current = nextPosition;

      if (!pointerActiveRef.current) {
        pointerActiveRef.current = true;
        interpolatedPointerPosRef.current = nextPosition;
        lastSpawnPosRef.current = nextPosition;
      }
    };

    const handlePointerLeave = () => {
      pointerActiveRef.current = false;
    };

    const distanceFromLastSpawn = () => {
      const dx = interpolatedPointerPosRef.current.x - lastSpawnPosRef.current.x;
      const dy = interpolatedPointerPosRef.current.y - lastSpawnPosRef.current.y;
      return Math.hypot(dx, dy);
    };

    const createTrailImage = () => {
      const imageSource = finalImages[currentImageIndexRef.current % finalImages.length];
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % finalImages.length;

      const shape = SHAPE_VARIANTS[shapeIndexRef.current % SHAPE_VARIANTS.length];
      shapeIndexRef.current = (shapeIndexRef.current + 1) % SHAPE_VARIANTS.length;

      const width = Math.round(safeBaseSize * shape.aspectW);
      const height = Math.round(safeBaseSize * shape.aspectH);
      const rotation = shape.rotation || 0;

      const startX = interpolatedPointerPosRef.current.x - width / 2;
      const startY = interpolatedPointerPosRef.current.y - height / 2;
      const targetX = startX + (pointerPosRef.current.x - interpolatedPointerPosRef.current.x) * 0.35;
      const targetY = startY + (pointerPosRef.current.y - interpolatedPointerPosRef.current.y) * 0.35;

      const imageElement = document.createElement('div');
      const layerFragment = document.createDocumentFragment();

      Object.assign(imageElement.style, {
        position: 'absolute',
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        overflow: 'hidden',
        borderRadius: shape.borderRadius,
        opacity: '1',
        transform: `translate3d(0, 0, 0) rotate(${rotation}deg) scale(1)`,
        transition: [
          `left ${config.slideDuration}ms ${config.slideEasing}`,
          `top ${config.slideDuration}ms ${config.slideEasing}`,
          `opacity ${config.outDuration}ms ${config.easing}`,
          `transform ${config.outDuration}ms ${config.easing}`,
        ].join(', '),
        willChange: 'left, top, opacity, transform',
        zIndex: '30',
        filter: 'drop-shadow(0 6px 18px rgba(0, 0, 0, 0.35))',
        WebkitMaskImage: shape.maskShape,
        maskImage: shape.maskShape,
        contain: 'layout style paint',
        backfaceVisibility: 'hidden',
      });

      const layers: HTMLDivElement[] = [];

      for (let index = 0; index < safeSlices; index += 1) {
        const sliceSize = 100 / safeSlices;
        const startClipY = index * sliceSize;
        const endClipY = (index + 1) * sliceSize;
        const layer = document.createElement('div');
        const imageLayer = document.createElement('div');

        Object.assign(layer.style, {
          position: 'absolute',
          inset: '0',
          overflow: 'hidden',
          clipPath: `polygon(50% ${startClipY}%, 50% ${startClipY}%, 50% ${endClipY}%, 50% ${endClipY}%)`,
          transition: `clip-path ${config.inDuration}ms ${config.easing}`,
          transitionDelay: `${getSliceDelay(index, config.staggerIn)}ms`,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: 'clip-path',
          contain: 'layout style',
        });

        Object.assign(imageLayer.style, {
          position: 'absolute',
          inset: '0',
          backgroundImage: `url("${imageSource}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: shape.borderRadius,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        });

        layer.appendChild(imageLayer);
        layerFragment.appendChild(layer);
        layers.push(layer);
      }

      imageElement.appendChild(layerFragment);
      container.appendChild(imageElement);
      activeImagesRef.current.push(imageElement);

      while (activeImagesRef.current.length > MAX_ACTIVE_IMAGES) {
        activeImagesRef.current.shift()?.remove();
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (imageElement.parentElement !== container) return;

          imageElement.style.left = `${targetX}px`;
          imageElement.style.top = `${targetY}px`;

          layers.forEach((layer, index) => {
            const sliceSize = 100 / safeSlices;
            const startClipY = index * sliceSize;
            const endClipY = (index + 1) * sliceSize;

            layer.style.clipPath = `polygon(0% ${startClipY}%, 100% ${startClipY}%, 100% ${endClipY}%, 0% ${endClipY}%)`;
          });
        });
      });

      schedule(() => {
        imageElement.style.opacity = '0';
        imageElement.style.transform = `translate3d(0, 0, 0) rotate(${rotation}deg) scale(0.3)`;

        layers.forEach((layer, index) => {
          const sliceSize = 100 / safeSlices;
          const startClipY = index * sliceSize;
          const endClipY = (index + 1) * sliceSize;

          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
          layer.style.transitionDelay = `${getSliceDelay(index, config.staggerOut)}ms`;
          layer.style.clipPath = `polygon(50% ${startClipY}%, 50% ${startClipY}%, 50% ${endClipY}%, 50% ${endClipY}%)`;
        });

        schedule(() => {
          activeImagesRef.current = activeImagesRef.current.filter((element) => element !== imageElement);
          imageElement.remove();
        }, config.outDuration + getMaxSliceDelay(config.staggerOut));
      }, config.imageLifespan);
    };

    const render = () => {
      if (pointerActiveRef.current) {
        interpolatedPointerPosRef.current = {
          x: interpolatedPointerPosRef.current.x + (pointerPosRef.current.x - interpolatedPointerPosRef.current.x) * safeSmoothing,
          y: interpolatedPointerPosRef.current.y + (pointerPosRef.current.y - interpolatedPointerPosRef.current.y) * safeSmoothing,
        };

        if (distanceFromLastSpawn() > safeSpawnThreshold) {
          lastSpawnPosRef.current = { ...interpolatedPointerPosRef.current };
          createTrailImage();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    parent.addEventListener('pointerenter', handlePointerMove as EventListener);
    parent.addEventListener('pointermove', handlePointerMove as EventListener);
    parent.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerenter', handlePointerMove as EventListener);
    container.addEventListener('pointermove', handlePointerMove as EventListener);
    container.addEventListener('pointerleave', handlePointerLeave);
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      parent.removeEventListener('pointerenter', handlePointerMove as EventListener);
      parent.removeEventListener('pointermove', handlePointerMove as EventListener);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerenter', handlePointerMove as EventListener);
      container.removeEventListener('pointermove', handlePointerMove as EventListener);
      container.removeEventListener('pointerleave', handlePointerLeave);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      activeImagesRef.current = [];
      container.replaceChildren();
      pointerActiveRef.current = false;
    };
  }, [
    config.easing,
    config.imageLifespan,
    config.inDuration,
    config.outDuration,
    config.slideDuration,
    config.slideEasing,
    config.staggerIn,
    config.staggerOut,
    finalImages,
    imageSize,
    slices,
    smoothing,
    spawnThreshold,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden pointer-events-auto touch-none', className)}
    />
  );
}

export default PixelatedImageTrail;
