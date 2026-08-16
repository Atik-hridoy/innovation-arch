'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuroraHeroBg } from '@/components/ui/aurora-hero';
import { PhaseHero } from './scrollytelling/PhaseHero';
import { PhaseBlueprint } from './scrollytelling/PhaseBlueprint';
import { PhaseSpatial } from './scrollytelling/PhaseSpatial';
import { PhaseSupremacy } from './scrollytelling/PhaseSupremacy';
import { PhaseNeural } from './scrollytelling/PhaseNeural';
import { PhaseFinale } from './scrollytelling/PhaseFinale';

const DESKTOP_FRAMES = 240;
const MOBILE_FRAMES = 300;

const DESKTOP_FRAME_PATH = (index: number) => {
  const pad = String(index).padStart(3, '0');
  return `/ezgif-39322c0c1b972c68-jpg/ezgif-frame-${pad}.jpg`;
};

const MOBILE_FRAME_PATH = (index: number) => {
  const pad = String(index).padStart(3, '0');
  return `/ezgif-7a49adbe3b30bbc0-jpg/ezgif-frame-${pad}.jpg`;
};

export function AboutUsScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Phase DOM refs for direct transform/opacity manipulation (zero React re-renders on scroll)
  const heroAuroraRef = useRef<HTMLDivElement>(null);
  const finaleBgRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const phase5Ref = useRef<HTMLDivElement>(null);
  const phase6Ref = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const isMobileDeviceRef = useRef(false);

  // 1. Device-Adaptive Progressive Frame Preloading
  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    isMobileDeviceRef.current = isMobile;

    const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const getPath = isMobile ? MOBILE_FRAME_PATH : DESKTOP_FRAME_PATH;

    const imgs: HTMLImageElement[] = new Array(totalFrames);

    // Load initial critical frames first (Phases 1-2)
    const initialBatchSize = Math.min(30, totalFrames);
    for (let i = 1; i <= initialBatchSize; i++) {
      const img = new Image();
      img.src = getPath(i);
      imgs[i - 1] = img;
    }

    // Progressively stream remaining frames in background chunks without saturating main thread
    let nextIndex = initialBatchSize + 1;
    const loadNextChunk = () => {
      if (!isMounted || nextIndex > totalFrames) return;
      const chunkSize = 20;
      const limit = Math.min(totalFrames, nextIndex + chunkSize);
      for (let i = nextIndex; i <= limit; i++) {
        const img = new Image();
        img.src = getPath(i);
        imgs[i - 1] = img;
      }
      nextIndex = limit + 1;
      if (nextIndex <= totalFrames) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextChunk);
        } else {
          setTimeout(loadNextChunk, 80);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNextChunk);
    } else {
      setTimeout(loadNextChunk, 150);
    }

    imagesRef.current = imgs;

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Optimized Canvas Rendering
  const renderFrame = (frameIndex: number, progressVal: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const isMobile = isMobileDeviceRef.current;
    const maxFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const safeIndex = Math.min(maxFrames, Math.max(1, frameIndex));
    const img = imagesRef.current[safeIndex - 1];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const bgBaseColor = isDarkMode ? '#080103' : '#0F2027';

    ctx.fillStyle = bgBaseColor;
    ctx.fillRect(0, 0, width, height);

    const isHookOrFinale = isMobile
      ? progressVal < 0.08 || progressVal > 0.84
      : progressVal < 0.08 || progressVal > 0.91;

    if (isHookOrFinale || !img || !img.complete || img.naturalWidth === 0) {
      ctx.restore();
      return;
    }

    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = isMobile
      ? (height / img.naturalHeight) * 0.96
      : Math.max(hRatio, vRatio) * 1.02;

    const renderW = img.naturalWidth * ratio;
    const renderH = img.naturalHeight * ratio;
    const renderX = (width - renderW) / 2;
    const renderY = (height - renderH) / 2;

    ctx.drawImage(img, renderX, renderY, renderW, renderH);

    // 4-Sided Edge Feather Gradients
    const edgeSize = isMobile ? 35 : 70;
    
    const gradTop = ctx.createLinearGradient(0, 0, 0, edgeSize);
    gradTop.addColorStop(0, bgBaseColor);
    gradTop.addColorStop(1, 'transparent');
    ctx.fillStyle = gradTop;
    ctx.fillRect(0, 0, width, edgeSize);

    const gradBottom = ctx.createLinearGradient(0, height - edgeSize, 0, height);
    gradBottom.addColorStop(0, 'transparent');
    gradBottom.addColorStop(1, bgBaseColor);
    ctx.fillStyle = gradBottom;
    ctx.fillRect(0, height - edgeSize, width, edgeSize);

    const gradLeft = ctx.createLinearGradient(0, 0, edgeSize, 0);
    gradLeft.addColorStop(0, bgBaseColor);
    gradLeft.addColorStop(1, 'transparent');
    ctx.fillStyle = gradLeft;
    ctx.fillRect(0, 0, edgeSize, height);

    const gradRight = ctx.createLinearGradient(width - edgeSize, 0, width, 0);
    gradRight.addColorStop(0, 'transparent');
    gradRight.addColorStop(1, bgBaseColor);
    ctx.fillStyle = gradRight;
    ctx.fillRect(width - edgeSize, 0, edgeSize, height);

    ctx.restore();
  };

  // Helper for zero-re-render phase opacity/transform updates
  const setPhaseStyle = (
    ref: React.RefObject<HTMLDivElement | null>,
    opacity: number,
    translateY: number,
    scale: number = 1
  ) => {
    if (!ref.current) return;
    const el = ref.current;
    el.style.opacity = `${opacity}`;
    el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
  };

  // 3. GSAP Scroll Choreography
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const isMobileDevice = window.innerWidth < 768;
      isMobileDeviceRef.current = isMobileDevice;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: isMobileDevice ? '+=3200' : '+=4200',
        pin: true,
        scrub: isMobileDevice ? 0.35 : 0.6,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Frame calculation
          let frameIndex = 1;
          if (isMobileDevice) {
            if (p < 0.08) {
              frameIndex = 1;
            } else if (p <= 0.84) {
              const forwardProgress = (p - 0.08) / 0.76;
              frameIndex = Math.min(
                MOBILE_FRAMES,
                Math.max(1, Math.floor(forwardProgress * (MOBILE_FRAMES - 1)) + 1)
              );
            } else {
              frameIndex = MOBILE_FRAMES;
            }
          } else {
            if (p <= 0.08) {
              frameIndex = 1;
            } else if (p > 0.08 && p <= 0.74) {
              const forwardProgress = (p - 0.08) / 0.66;
              frameIndex = Math.min(
                DESKTOP_FRAMES,
                Math.max(1, Math.floor(forwardProgress * (DESKTOP_FRAMES - 1)) + 1)
              );
            } else if (p > 0.74 && p <= 0.90) {
              const reverseProgress = (p - 0.74) / 0.16;
              frameIndex = Math.max(
                1,
                Math.floor(DESKTOP_FRAMES - reverseProgress * (DESKTOP_FRAMES - 1))
              );
            } else {
              frameIndex = 1;
            }
          }

          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex, p);

          // Direct DOM phase transforms
          // Phase 1 (Hero)
          if (p < 0.08) {
            const phaseP = Math.min(1, p / 0.08);
            setPhaseStyle(phase1Ref, 1 - phaseP, -phaseP * 40, 1 - phaseP * 0.05);
            if (heroAuroraRef.current) heroAuroraRef.current.style.opacity = `${1 - phaseP}`;
          } else {
            setPhaseStyle(phase1Ref, 0, -40);
            if (heroAuroraRef.current) heroAuroraRef.current.style.opacity = '0';
          }

          // Phase 2 (Blueprint)
          if (isMobileDevice) {
            if (p >= 0.08 && p < 0.26) {
              const fadeIn = Math.min(1, (p - 0.08) / 0.05);
              const fadeOut = Math.min(1, (0.26 - p) / 0.05);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase2Ref, activeP, (1 - activeP) * 20);
            } else {
              setPhaseStyle(phase2Ref, 0, 20);
            }
          } else {
            if (p >= 0.08 && p < 0.22) {
              const fadeIn = Math.min(1, (p - 0.08) / 0.04);
              const fadeOut = Math.min(1, (0.22 - p) / 0.04);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase2Ref, activeP, (1 - activeP) * 25);
            } else {
              setPhaseStyle(phase2Ref, 0, 25);
            }
          }

          // Phase 3 (Spatial)
          if (isMobileDevice) {
            if (p >= 0.26 && p < 0.44) {
              const fadeIn = Math.min(1, (p - 0.26) / 0.05);
              const fadeOut = Math.min(1, (0.44 - p) / 0.05);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase3Ref, activeP, (1 - activeP) * 20);
            } else {
              setPhaseStyle(phase3Ref, 0, 20);
            }
          } else {
            if (p >= 0.22 && p < 0.38) {
              const fadeIn = Math.min(1, (p - 0.22) / 0.04);
              const fadeOut = Math.min(1, (0.38 - p) / 0.04);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase3Ref, activeP, (1 - activeP) * 25);
            } else {
              setPhaseStyle(phase3Ref, 0, 25);
            }
          }

          // Phase 4 (Supremacy)
          if (isMobileDevice) {
            if (p >= 0.44 && p < 0.62) {
              const fadeIn = Math.min(1, (p - 0.44) / 0.05);
              const fadeOut = Math.min(1, (0.62 - p) / 0.05);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase4Ref, activeP, (1 - activeP) * 20);
            } else {
              setPhaseStyle(phase4Ref, 0, 20);
            }
          } else {
            if (p >= 0.38 && p < 0.54) {
              const fadeIn = Math.min(1, (p - 0.38) / 0.04);
              const fadeOut = Math.min(1, (0.54 - p) / 0.04);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase4Ref, activeP, (1 - activeP) * 25);
            } else {
              setPhaseStyle(phase4Ref, 0, 25);
            }
          }

          // Phase 5 (Neural AI)
          if (isMobileDevice) {
            if (p >= 0.62 && p < 0.80) {
              const fadeIn = Math.min(1, (p - 0.62) / 0.05);
              const fadeOut = Math.min(1, (0.80 - p) / 0.05);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase5Ref, activeP, (1 - activeP) * 20);
            } else {
              setPhaseStyle(phase5Ref, 0, 20);
            }
          } else {
            if (p >= 0.54 && p < 0.72) {
              const fadeIn = Math.min(1, (p - 0.54) / 0.04);
              const fadeOut = Math.min(1, (0.72 - p) / 0.04);
              const activeP = Math.max(0, Math.min(fadeIn, fadeOut));
              setPhaseStyle(phase5Ref, activeP, (1 - activeP) * 25);
            } else {
              setPhaseStyle(phase5Ref, 0, 25);
            }
          }

          // Phase 6 (Grand Finale)
          const finaleThreshold = isMobileDevice ? 0.82 : 0.88;
          if (p >= finaleThreshold) {
            const finaleProgress = Math.min(1, (p - finaleThreshold) / (1 - finaleThreshold));
            setPhaseStyle(phase6Ref, finaleProgress, (1 - finaleProgress) * 30);
            if (finaleBgRef.current) finaleBgRef.current.style.opacity = `${finaleProgress}`;
          } else {
            setPhaseStyle(phase6Ref, 0, 30);
            if (finaleBgRef.current) finaleBgRef.current.style.opacity = '0';
          }

          // Canvas fade in / out
          if (canvasRef.current) {
            const maxActiveP = isMobileDevice ? 0.84 : 0.90;
            let canvasOpacity = 0;
            if (p >= 0.06 && p <= maxActiveP) {
              const fadeIn = Math.min(1, (p - 0.06) / 0.05);
              const fadeOut = Math.min(1, (maxActiveP - p) / 0.05);
              canvasOpacity = Math.max(0, Math.min(fadeIn, fadeOut));
            }
            canvasRef.current.style.opacity = `${canvasOpacity}`;
          }
        },
      });
    }, section);

    const initialTimer = setTimeout(() => {
      renderFrame(1, 0);
    }, 150);

    const onResize = () => {
      isMobileDeviceRef.current = window.innerWidth < 768;
      renderFrame(currentFrameRef.current, 0);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      ctx.revert();
      clearTimeout(initialTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#080103] select-none"
    >
      {/* 2D Accelerated Scrollytelling Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-[2] transition-opacity duration-200"
        style={{ opacity: 0 }}
      />

      {/* Ambient background glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[75vw] h-[90vw] sm:h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full bg-radial from-emerald-600/20 via-emerald-950/10 to-transparent blur-[160px]" />
      </div>

      {/* Hero Aurora Background Layer */}
      <div
        ref={heroAuroraRef}
        className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300"
        style={{ opacity: 1 }}
      >
        <AuroraHeroBg />
      </div>

      {/* Phase 6 Grand Finale Background */}
      <div
        ref={finaleBgRef}
        className="absolute inset-0 z-[4] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-[#0F2027] via-[#163629] to-[#28623A] dark:from-[#080103] dark:via-[#140207] dark:to-[#080103]"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-[#28623A]/50 to-[#28623A] dark:from-transparent dark:via-[#080103]/70 dark:to-[#080103]" />
      </div>

      {/* Modular Phase Content Components */}
      <div className="relative z-10 w-full h-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none flex items-center">
        <PhaseHero ref={phase1Ref} />
        <PhaseBlueprint ref={phase2Ref} />
        <PhaseSpatial ref={phase3Ref} />
        <PhaseSupremacy ref={phase4Ref} />
        <PhaseNeural ref={phase5Ref} />
        <PhaseFinale ref={phase6Ref} />
      </div>
    </section>
  );
}

export default AboutUsScrollytelling;
