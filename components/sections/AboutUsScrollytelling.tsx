'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';
import { AuroraHeroBg } from '@/components/ui/aurora-hero';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const desktopImagesRef = useRef<HTMLImageElement[]>([]);
  const mobileImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);

  // 1. High-Speed Progressive Preloading (Both Desktop & Mobile Sequences)
  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    setIsMobileDevice(isMobile);

    // Preload Mobile Frames (300 Frames from public/ezgif-7a49adbe3b30bbc0-jpg)
    const mobileImgs: HTMLImageElement[] = [];
    for (let i = 1; i <= MOBILE_FRAMES; i++) {
      const img = new Image();
      img.src = MOBILE_FRAME_PATH(i);
      img.onload = () => {
        if (!isMounted) return;
        if (isMobile && i >= 10 && !isReady) {
          setIsReady(true);
        }
      };
      mobileImgs.push(img);
    }
    mobileImagesRef.current = mobileImgs;

    // Preload Desktop Frames (240 Frames from public/ezgif-39322c0c1b972c68-jpg)
    const desktopImgs: HTMLImageElement[] = [];
    for (let i = 1; i <= DESKTOP_FRAMES; i++) {
      const img = new Image();
      img.src = DESKTOP_FRAME_PATH(i);
      img.onload = () => {
        if (!isMounted) return;
        if (!isMobile && i >= 10 && !isReady) {
          setIsReady(true);
        }
      };
      desktopImgs.push(img);
    }
    desktopImagesRef.current = desktopImgs;

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-DPI Canvas Rendering (Adaptive Hardware & Portrait Staging)
  const renderFrame = (frameIndex: number, progressVal: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const isMobile = width < 768;

    const images = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
    const maxFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const safeIndex = Math.min(maxFrames, Math.max(1, frameIndex));
    const img = images[safeIndex - 1];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // High quality bicubic interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Deep obsidian background
    ctx.fillStyle = '#080103';
    ctx.fillRect(0, 0, width, height);

    // Aspect Fit/Cover: On desktop, cover edge-to-edge (1.02x) to eliminate all rectangular borders completely.
    // On mobile, scale to fill portrait height cleanly.
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

    // ── 4-Sided Edge Feather Gradients (Completely seamless transition into page) ──
    const featherW = Math.max(80, width * 0.25);
    const featherH = Math.max(80, height * 0.25);

    // Left Edge Feather
    const leftGrad = ctx.createLinearGradient(0, 0, featherW, 0);
    leftGrad.addColorStop(0, '#080103');
    leftGrad.addColorStop(0.35, 'rgba(8, 1, 3, 0.7)');
    leftGrad.addColorStop(1, 'rgba(8, 1, 3, 0)');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(0, 0, featherW, height);

    // Right Edge Feather
    const rightGrad = ctx.createLinearGradient(width - featherW, 0, width, 0);
    rightGrad.addColorStop(0, 'rgba(8, 1, 3, 0)');
    rightGrad.addColorStop(0.65, 'rgba(8, 1, 3, 0.7)');
    rightGrad.addColorStop(1, '#080103');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(width - featherW, 0, featherW, height);

    // Top Edge Feather
    const topGrad = ctx.createLinearGradient(0, 0, 0, featherH);
    topGrad.addColorStop(0, '#080103');
    topGrad.addColorStop(0.35, 'rgba(8, 1, 3, 0.7)');
    topGrad.addColorStop(1, 'rgba(8, 1, 3, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, featherH);

    // Bottom Edge Feather
    const bottomGrad = ctx.createLinearGradient(0, height - featherH, 0, height);
    bottomGrad.addColorStop(0, 'rgba(8, 1, 3, 0)');
    bottomGrad.addColorStop(0.65, 'rgba(8, 1, 3, 0.7)');
    bottomGrad.addColorStop(1, '#080103');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, height - featherH, width, featherH);

    // ── Full-Canvas Cinematic Radial Vignette ──
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.28,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.68
    );
    gradient.addColorStop(0, 'rgba(8, 1, 3, 0)');
    gradient.addColorStop(0.5, 'rgba(8, 1, 3, 0.2)');
    gradient.addColorStop(0.85, 'rgba(8, 1, 3, 0.85)');
    gradient.addColorStop(1, '#080103');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: isMobile ? '+=140%' : '+=525%',
        pin: true,
        scrub: isMobile ? 0.2 : 0.45,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          const isMobile = window.innerWidth < 768;
          let frameIndex = 1;

          if (isMobile) {
            frameIndex = Math.min(
              MOBILE_FRAMES,
              Math.max(1, Math.floor(p * (MOBILE_FRAMES - 1)) + 1)
            );
          } else {
            if (p <= 0.08) {
              frameIndex = 1;
            } else if (p > 0.08 && p <= 0.76) {
              const forwardProgress = (p - 0.08) / 0.68;
              frameIndex = Math.min(
                DESKTOP_FRAMES,
                Math.max(1, Math.floor(forwardProgress * (DESKTOP_FRAMES - 1)) + 1)
              );
            } else if (p > 0.76 && p <= 0.93) {
              const reverseProgress = (p - 0.76) / 0.17;
              frameIndex = Math.min(
                DESKTOP_FRAMES,
                Math.max(1, Math.floor((1 - reverseProgress) * (DESKTOP_FRAMES - 1)) + 1)
              );
            } else {
              frameIndex = 1;
            }
          }

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            renderFrame(frameIndex, p);
          }
        },
      });
    }, section);

    const initialTimer = setTimeout(() => {
      renderFrame(1, 0);
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(initialTimer);
    };
  }, [isReady]);

  useEffect(() => {
    const onResize = () => {
      setIsMobileDevice(window.innerWidth < 768);
      renderFrame(currentFrameRef.current, scrollProgress);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollProgress]);

  const phase1Opacity = Math.max(0, 1 - scrollProgress * 9.5);
  const phase2Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.20) * 8.5);
  const phase3Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.37) * 8.5);
  const phase4Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.55) * 8.5);
  const phase5Opacity = Math.max(0, 1 - Math.abs(scrollProgress - 0.72) * 8.5);
  const phase6Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.82) * 6.5));

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-screen overflow-hidden bg-[#080103] select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-[2]"
      />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[75vw] h-[90vw] sm:h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full bg-radial from-red-600/12 via-rose-950/6 to-transparent blur-[160px]" />
      </div>

      <div
        className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 8.5),
        }}
      >
        <AuroraHeroBg />
      </div>

      {/* ── Phase 6 Grand Finale Background Gradient: Fades to white at bottom in Light Mode, obsidian in Dark Mode ── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-[#140207]/90 via-[#2a040e]/60 to-white dark:from-[#140207] dark:via-[#090103] dark:to-[#080103]"
        style={{
          opacity: phase6Opacity,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15)_0%,rgba(255,255,255,0.7)_60%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.22)_0%,rgba(13,1,4,0.88)_60%,#080103_100%)]" />
        {/* Soft bottom blend to guarantee 100% white transition in Light mode */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#080103] dark:via-[#080103]/80 dark:to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none flex items-center">
        <div
          className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-200 pointer-events-auto max-w-5xl mx-auto"
          style={{
            opacity: phase1Opacity,
            transform: `translateY(${-scrollProgress * 60}px) scale(${1 - scrollProgress * 0.1})`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md mb-2 sm:mb-6 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.25em] text-rose-300 font-semibold">
              Digital Product Studio
            </span>
          </div>

          <h1 className="font-sans font-black text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.92] sm:leading-[0.9] text-[#fff0f2] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            WE CRAFT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-rose-600">
              TIMELESS
            </span>{' '}
            <span className="font-serif italic font-normal lowercase tracking-tight text-rose-200">
              digital
            </span>{' '}
            <br />
            PRODUCTS.
          </h1>

          <p className="mt-2 sm:mt-6 font-sans text-[11px] xs:text-xs sm:text-lg md:text-xl text-[#f3d5dc] max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
            Architecting next-generation digital ecosystems, intelligent mobile applications, and high-impact brand identities.
          </p>

          <div className="mt-4 sm:mt-8 flex items-center justify-center">
            <a href="#contact" className="pointer-events-auto">
              <RadialGlowButton
                size="md"
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-[0_10px_35px_rgba(225,29,72,0.5)] active:scale-95 transition-transform"
              >
                Initialize Project →
              </RadialGlowButton>
            </a>
          </div>

          <div className="mt-4 sm:mt-10 flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] text-rose-300 uppercase tracking-widest animate-bounce drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-sm sm:text-base">expand_more</span>
            Scroll to explore
          </div>
        </div>

        <div
          className="absolute top-[12%] sm:top-1/2 sm:-translate-y-1/2 left-3 sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-[245px] xs:max-w-[270px] sm:max-w-[390px] lg:max-w-[430px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase2Opacity,
            transform: `translateY(${(0.20 - scrollProgress) * 45}px) scale(${0.96 + Math.min(0.04, phase2Opacity * 0.04)})`,
          }}
        >
          <div className="w-full relative group p-3.5 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/[0.28] dark:border-white/[0.22] shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="absolute top-0 inset-x-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2.5">
              <div className="px-2.5 py-0.5 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/[0.25] flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.9)]" />
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-bold">
                  BLUEPRINT
                </span>
              </div>
              <span className="font-mono text-[7.5px] sm:text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-semibold">
                ACTIVE
              </span>
            </div>
            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
                ARCHITECTED FOR
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-200 text-sm sm:text-4xl">
                scale.
              </span>
            </h2>
            <p className="font-sans text-[10.5px] sm:text-sm text-white/90 font-normal leading-relaxed mt-1 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Foundational blueprints—modular design systems, high-throughput microservices, and end-to-end technical roadmaps.
            </p>
            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[8.5px] sm:text-[11px] font-mono text-white/90">
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Design Systems</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Core Mesh</span>
            </div>
          </div>
        </div>

        <div
          className="absolute top-[30%] sm:top-1/2 sm:-translate-y-1/2 right-3 sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-[245px] xs:max-w-[270px] sm:max-w-[390px] lg:max-w-[430px] flex flex-col items-end text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase3Opacity,
            transform: `translateY(${(0.37 - scrollProgress) * 45}px) scale(${0.96 + Math.min(0.04, phase3Opacity * 0.04)})`,
          }}
        >
          <div className="w-full relative group p-3.5 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/[0.28] dark:border-white/[0.22] shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-end">
            <div className="absolute top-0 inset-x-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2.5">
              <span className="font-mono text-[7.5px] sm:text-[9px] px-2 py-0.5 rounded-full bg-rose-500/25 border border-rose-400/30 text-rose-200 font-semibold">
                120 FPS
              </span>
              <div className="px-2.5 py-0.5 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/[0.25] flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-bold">
                  SPATIAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.9)]" />
              </div>
            </div>
            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
                EXPERIENCES
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-200 text-sm sm:text-4xl">
                beyond.
              </span>
            </h2>
            <p className="font-sans text-[10.5px] sm:text-sm text-white/90 font-normal leading-relaxed mt-1 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              120 FPS sub-pixel GPU spatial interactions, fluid 3D motion, and memorable experiences.
            </p>
            <div className="mt-2 sm:mt-4 flex flex-wrap justify-end gap-1.5 sm:gap-2 text-[8.5px] sm:text-[11px] font-mono text-white/90">
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">GPU Accelerated</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Sub-Pixel</span>
            </div>
          </div>
        </div>

        <div
          className="absolute top-[48%] sm:top-1/2 sm:-translate-y-1/2 left-3 sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-[245px] xs:max-w-[270px] sm:max-w-[390px] lg:max-w-[430px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto"
          style={{
            opacity: phase4Opacity,
            transform: `translateY(${(0.55 - scrollProgress) * 45}px) scale(${0.96 + Math.min(0.04, phase4Opacity * 0.04)})`,
          }}
        >
          <div className="w-full relative group p-3.5 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/[0.28] dark:border-white/[0.22] shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="absolute top-0 inset-x-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2.5">
              <div className="px-2.5 py-0.5 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/[0.25] flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-bold">
                  SUPREMACY
                </span>
              </div>
              <span className="font-mono text-[7.5px] sm:text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-semibold">
                0.4ms EDGE
              </span>
            </div>
            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
                ENGINEERED FOR
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-200 text-sm sm:text-4xl">
                speed.
              </span>
            </h2>
            <p className="font-sans text-[10.5px] sm:text-sm text-white/90 font-normal leading-relaxed mt-1 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Powered by Next.js Turbopack, distributed edge networks, and sub-millisecond execution.
            </p>
            <div className="mt-2 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[8.5px] sm:text-[11px] font-mono text-white/90">
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Turbopack</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">0.4ms Latency</span>
            </div>
          </div>
        </div>

        <div
          className="absolute top-[66%] sm:top-1/2 sm:-translate-y-1/2 right-3 sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-[245px] xs:max-w-[270px] sm:max-w-[390px] lg:max-w-[430px] flex flex-col items-end text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase5Opacity,
            transform: `translateY(${(0.72 - scrollProgress) * 45}px) scale(${0.96 + Math.min(0.04, phase5Opacity * 0.04)})`,
          }}
        >
          <div className="w-full relative group p-3.5 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/[0.28] dark:border-white/[0.22] shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-end">
            <div className="absolute top-0 inset-x-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2.5">
              <span className="font-mono text-[7.5px] sm:text-[9px] px-2 py-0.5 rounded-full bg-rose-500/25 border border-rose-400/30 text-rose-200 font-semibold">
                NEURAL
              </span>
              <div className="px-2.5 py-0.5 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/[0.25] flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-bold">
                  AI CORE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.9)]" />
              </div>
            </div>
            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300">
                INTELLIGENT
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-200 text-sm sm:text-4xl">
                evolution.
              </span>
            </h2>
            <p className="font-sans text-[10.5px] sm:text-sm text-white/90 font-normal leading-relaxed mt-1 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              Custom AI agents, neural pipelines, and real-time automated workflows giving your enterprise an unfair edge.
            </p>

            <div className="mt-2 sm:mt-4 flex flex-wrap justify-end gap-1.5 sm:gap-2 text-[8.5px] sm:text-[11px] font-mono text-white/90">
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">AI Agents</span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Neural Stream</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 6: 84% - 100% (GRAND FINALE - 1 CLEAN HIGH-IMPACT CTA BUTTON ON GRADIENT COVER) ━━━ */}
        <div
          className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300 pointer-events-auto max-w-5xl mx-auto"
          style={{
            opacity: phase6Opacity,
            transform: `translateY(${(0.92 - scrollProgress) * 70}px) scale(${Math.min(1, 0.92 + scrollProgress * 0.08)})`,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-red-500/30 bg-[#160206]/85 font-mono text-[9px] sm:text-xs text-rose-300 uppercase tracking-[0.2em] mb-2.5 sm:mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DEPLOYMENT GATEWAY READY
          </div>

          <h2 className="font-sans font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.94] text-rose-300 drop-shadow-[0_30px_70px_rgba(0,0,0,1)] max-w-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-rose-600 drop-shadow-[0_10px_30px_rgba(225,29,72,0.5)]">
              PARTNER WITH
            </span>
            <br />
            <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-3xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_20px_50px_rgba(225,29,72,0.6)]">
              innovation ark.
            </span>
          </h2>

          <p className="font-sans text-[11px] sm:text-base md:text-lg text-rose-100 font-normal tracking-wide mt-2.5 sm:mt-6 max-w-xl leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] px-1 antialiased">
            Transform your vision into an industry-defining digital powerhouse. Let&apos;s build your next high-performance platform together.
          </p>

          {/* 1 Clean High-Impact CTA Button */}
          <div className="mt-4 sm:mt-8 flex justify-center">
            <a href="#contact">
              <RadialGlowButton size="sm" className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase !min-w-[180px] sm:!min-w-[220px] !h-[42px] sm:!h-[52px] !px-6 sm:!px-8 !bg-gradient-to-r !from-red-600 !to-rose-900 shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-red-500/40 text-rose-100 whitespace-nowrap">
                Start Your Project
                <span className="material-symbols-outlined text-sm sm:text-base ml-1.5">arrow_forward</span>
              </RadialGlowButton>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsScrollytelling;
