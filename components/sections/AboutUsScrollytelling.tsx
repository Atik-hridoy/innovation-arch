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

    // Aspect Fit: Scale portrait image to fill the mobile screen height gracefully (No empty vertical void)
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = isMobile
      ? (height / img.naturalHeight) * 0.96
      : Math.min(hRatio, vRatio) * 0.82;

    const renderW = img.naturalWidth * ratio;
    const renderH = img.naturalHeight * ratio;
    const renderX = (width - renderW) / 2;
    const renderY = (height - renderH) / 2;

    // Smooth entry transition: canvas opacity builds gracefully as scrolling begins
    const canvasOpacity = Math.min(1, Math.max(0.15, progressVal * 6));
    ctx.globalAlpha = canvasOpacity;

    ctx.drawImage(img, renderX, renderY, renderW, renderH);

    // ── 4-Sided Edge Feather Gradients (Completely eliminates rectangular border cuts) ──
    const featherW = renderW * 0.18;
    const featherH = renderH * 0.22;

    // Left Edge Feather
    const leftGrad = ctx.createLinearGradient(renderX - 2, 0, renderX + featherW, 0);
    leftGrad.addColorStop(0, '#080103');
    leftGrad.addColorStop(0.5, 'rgba(8, 1, 3, 0.7)');
    leftGrad.addColorStop(1, 'rgba(8, 1, 3, 0)');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(renderX - 4, renderY - 4, featherW + 4, renderH + 8);

    // Right Edge Feather
    const rightGrad = ctx.createLinearGradient(renderX + renderW - featherW, 0, renderX + renderW + 2, 0);
    rightGrad.addColorStop(0, 'rgba(8, 1, 3, 0)');
    rightGrad.addColorStop(0.5, 'rgba(8, 1, 3, 0.7)');
    rightGrad.addColorStop(1, '#080103');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(renderX + renderW - featherW, renderY - 4, featherW + 6, renderH + 8);

    // Top Edge Feather
    const topGrad = ctx.createLinearGradient(0, renderY - 2, 0, renderY + featherH);
    topGrad.addColorStop(0, '#080103');
    topGrad.addColorStop(0.5, 'rgba(8, 1, 3, 0.7)');
    topGrad.addColorStop(1, 'rgba(8, 1, 3, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(renderX - 4, renderY - 4, renderW + 8, featherH + 4);

    // Bottom Edge Feather
    const bottomGrad = ctx.createLinearGradient(0, renderY + renderH - featherH, 0, renderY + renderH + 2);
    bottomGrad.addColorStop(0, 'rgba(8, 1, 3, 0)');
    bottomGrad.addColorStop(0.5, 'rgba(8, 1, 3, 0.7)');
    bottomGrad.addColorStop(1, '#080103');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(renderX - 4, renderY + renderH - featherH, renderW + 8, featherH + 6);

    // ── Full-Canvas Liquid-Silk Radial Vignette ──
    ctx.globalAlpha = 1;
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(renderW, renderH) * 0.32,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.65
    );
    gradient.addColorStop(0, 'rgba(8, 1, 3, 0)');
    gradient.addColorStop(0.5, 'rgba(8, 1, 3, 0.2)');
    gradient.addColorStop(0.82, 'rgba(8, 1, 3, 0.92)');
    gradient.addColorStop(1, '#080103');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  // 3. GSAP ScrollTrigger Sequence Timeline (Compact & Snappy)
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
            // Mobile: Pure continuous forward progression 1 -> 300 across all scroll phases (No reverse playback)
            frameIndex = Math.min(
              MOBILE_FRAMES,
              Math.max(1, Math.floor(p * (MOBILE_FRAMES - 1)) + 1)
            );
          } else {
            // Desktop: Forward 1 -> 240, then smooth close 240 -> 1 on grand finale
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

  // Window resize handler
  useEffect(() => {
    const onResize = () => {
      setIsMobileDevice(window.innerWidth < 768);
      renderFrame(currentFrameRef.current, scrollProgress);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollProgress]);

  // 6 Expanded Scrollytelling Phases Calculations
  const phase1Opacity = Math.max(0, 1 - scrollProgress * 8.5);

  const phase2Opacity =
    scrollProgress >= 0.12 && scrollProgress <= 0.28
      ? Math.sin(((scrollProgress - 0.12) / 0.16) * Math.PI)
      : 0;

  const phase3Opacity =
    scrollProgress >= 0.28 && scrollProgress <= 0.46
      ? Math.sin(((scrollProgress - 0.28) / 0.18) * Math.PI)
      : 0;

  const phase4Opacity =
    scrollProgress >= 0.46 && scrollProgress <= 0.64
      ? Math.sin(((scrollProgress - 0.46) / 0.18) * Math.PI)
      : 0;

  const phase5Opacity =
    scrollProgress >= 0.64 && scrollProgress <= 0.80
      ? Math.sin(((scrollProgress - 0.64) / 0.16) * Math.PI)
      : 0;

  const phase6Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.84) / 0.14));

  return (
    <div
      id="about"
      ref={sectionRef}
      className="relative w-full h-[100svh] sm:h-screen bg-[#080103] text-white overflow-hidden select-none"
    >
      {/* ── Sticky Fullscreen Hardware Sequence Canvas (Desktop: 240 Laptop Frames | Mobile: 300 Portrait Frames) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-75"
        style={{
          filter: 'contrast(1.1) brightness(1.03) saturate(1.15)',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />

      {/* ── 8K Cinematic Micro-Grain Texture ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Liquid Crimson Ambient Glow ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[75vw] h-[90vw] sm:h-[75vw] max-w-[1000px] max-h-[1000px] rounded-full bg-radial from-red-600/12 via-rose-950/6 to-transparent blur-[160px]" />
      </div>

      {/* ── Vengeance UI Aurora Hero Hook Background (Smooth Scroll Fade) ── */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 8.5),
        }}
      >
        <AuroraHeroBg />
      </div>

      {/* ── Seamless Floating Editorial Typography & Chat Bubble Ecosystem (RESPONSIVE FULL VIEWPORT) ── */}
      <div className="relative z-10 w-full h-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none flex items-center">

        {/* ━━━ PHASE 1: 0% - 12% (INNOVATION ARK FLAGSHIP HOOK - PROPORTIONAL MOBILE FONTS & 1-LINE BUTTONS) ━━━ */}
        <div
          className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-200 pointer-events-auto [perspective:1000px] max-w-5xl mx-auto"
          style={{
            opacity: phase1Opacity,
            transform: `translateY(${-scrollProgress * 150}px) scale(${Math.max(0.85, 1 - scrollProgress * 0.6)})`,
          }}
        >
          {/* Software Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-red-500/30 bg-[#160206]/85 font-mono text-[9px] sm:text-xs text-rose-300 uppercase tracking-[0.2em] mb-2.5 sm:mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            DIGITAL PRODUCT STUDIO
          </div>

          {/* Majestic Hero Headline (Proportional Mobile Sizing) */}
          <h1 className="font-sans font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.94] text-rose-300 drop-shadow-[0_25px_60px_rgba(0,0,0,1)] max-w-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-rose-600 drop-shadow-[0_10px_30px_rgba(225,29,72,0.5)]">
              INNOVATION ARK
            </span>
            <br />
            <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-3xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_15px_40px_rgba(225,29,72,0.6)]">
              digital excellence.
            </span>
          </h1>

          <p className="font-sans text-[11px] sm:text-base md:text-lg text-rose-100 font-normal tracking-wide mt-2.5 sm:mt-6 max-w-2xl leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] px-1 antialiased">
            We architect world-class web platforms, bespoke software ecosystems, and high-performance digital products that scale businesses globally.
          </p>

          {/* Single-Row 1-Line Buttons for Phone View */}
          <div className="mt-4 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
            <a href="#contact" className="flex-1 sm:flex-none">
              <RadialGlowButton size="sm" className="w-full sm:w-auto font-sans font-bold text-[10px] sm:text-xs tracking-wider uppercase !min-w-0 sm:!min-w-[190px] !h-[38px] sm:!h-[48px] !px-3 sm:!px-6 !bg-gradient-to-r !from-red-600 !to-rose-900 shadow-[0_0_20px_rgba(225,29,72,0.5)] border border-red-500/40 text-rose-100 whitespace-nowrap">
                Initialize Project
                <span className="material-symbols-outlined text-sm sm:text-base ml-1">arrow_forward</span>
              </RadialGlowButton>
            </a>
            <a
              href="#work"
              className="flex-1 sm:flex-none text-center justify-center px-3 sm:px-6 h-[38px] sm:h-[48px] font-sans text-[10px] sm:text-xs uppercase tracking-wider text-rose-200 hover:text-rose-100 transition-colors flex items-center gap-1 group border border-red-500/30 hover:border-red-400/60 bg-[#160206]/85 backdrop-blur-md rounded-full shadow-md whitespace-nowrap"
            >
              Roster
              <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform text-rose-400">
                east
              </span>
            </a>
          </div>

          {/* Scroll Cue */}
          <div className="mt-4 sm:mt-12 flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] text-rose-300 uppercase tracking-widest animate-bounce drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-sm sm:text-base">expand_more</span>
            Scroll to explore
          </div>
        </div>

        {/* ━━━ PHASE 2: 12% - 28% (BLUEPRINT - CHAT BUBBLE APPEARS TOP-LEFT OF PHONE) ━━━ */}
        <div
          className="absolute top-[14%] sm:top-1/2 sm:-translate-y-1/2 left-3 sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-[240px] xs:max-w-[260px] sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase2Opacity,
            transform: `translateY(${(0.20 - scrollProgress) * 50}px) scale(${0.96 + Math.min(0.04, phase2Opacity * 0.04)})`,
          }}
        >
          {/* Chat-Box Bubble Frame */}
          <div className="w-full relative group p-3 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl rounded-bl-sm sm:rounded-bl-3xl bg-gradient-to-b from-white/[0.12] via-[#150308]/92 to-[#0a0104]/96 backdrop-blur-2xl border border-rose-500/30 sm:border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(225,29,72,0.2)] overflow-hidden">
            {/* macOS / iOS Specular Light */}
            <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            {/* Chat Bubble Sender Chip */}
            <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(225,29,72,1)]" />
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.2em] text-rose-300 font-bold">
                  IA // BLUEPRINT
                </span>
              </div>
              <span className="font-mono text-[7.5px] sm:text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                ACTIVE
              </span>
            </div>

            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-rose-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                ARCHITECTED FOR
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-sm sm:text-4xl">
                scale.
              </span>
            </h2>

            <p className="font-sans text-[10px] sm:text-sm text-[#fff5f6] font-normal leading-relaxed mt-1 sm:mt-4 antialiased">
              Foundational blueprints—modular design systems, high-throughput microservices, and end-to-end technical roadmaps.
            </p>

            <div className="mt-2 sm:mt-5 flex flex-wrap gap-1 sm:gap-2 text-[8px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">Design Systems</span>
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">Core Mesh</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 3: 28% - 46% (SPATIAL CRAFT - CHAT BUBBLE APPEARS MID-RIGHT OF PHONE) ━━━ */}
        <div
          className="absolute top-[32%] sm:top-1/2 sm:-translate-y-1/2 right-3 sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-[240px] xs:max-w-[260px] sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-end text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase3Opacity,
            transform: `translateY(${(0.37 - scrollProgress) * 50}px) scale(${0.96 + Math.min(0.04, phase3Opacity * 0.04)})`,
          }}
        >
          {/* Chat-Box Bubble Frame */}
          <div className="w-full relative group p-3 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl rounded-br-sm sm:rounded-br-3xl bg-gradient-to-b from-white/[0.12] via-[#20050d]/92 to-[#0d0105]/96 backdrop-blur-2xl border border-rose-400/40 sm:border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(225,29,72,0.2)] overflow-hidden flex flex-col items-end">
            <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
              <span className="font-mono text-[7.5px] sm:text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                120 FPS
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.2em] text-rose-300 font-bold">
                  IA // SPATIAL
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,1)]" />
              </div>
            </div>

            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-rose-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                EXPERIENCES
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-sm sm:text-4xl">
                beyond.
              </span>
            </h2>

            <p className="font-sans text-[10px] sm:text-sm text-[#fff5f6] font-normal leading-relaxed mt-1 sm:mt-4 antialiased">
              120 FPS sub-pixel GPU spatial interactions, fluid 3D motion, and memorable experiences.
            </p>

            <div className="mt-2 sm:mt-5 flex flex-wrap justify-end gap-1 sm:gap-2 text-[8px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">GPU Accelerated</span>
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">Sub-Pixel</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 4: 46% - 64% (FULL-STACK SUPREMACY - CHAT BUBBLE APPEARS MID-LEFT OF PHONE) ━━━ */}
        <div
          className="absolute top-[50%] sm:top-1/2 sm:-translate-y-1/2 left-3 sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-[240px] xs:max-w-[260px] sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto"
          style={{
            opacity: phase4Opacity,
            transform: `translateY(${(0.55 - scrollProgress) * 50}px) scale(${0.96 + Math.min(0.04, phase4Opacity * 0.04)})`,
          }}
        >
          {/* Chat-Box Bubble Frame */}
          <div className="w-full relative group p-3 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl rounded-tl-sm sm:rounded-tl-3xl bg-gradient-to-b from-white/[0.12] via-[#150308]/92 to-[#0a0104]/96 backdrop-blur-2xl border border-emerald-500/30 sm:border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(16,185,129,0.15)] overflow-hidden">
            <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.2em] text-rose-300 font-bold">
                  IA // SUPREMACY
                </span>
              </div>
              <span className="font-mono text-[7.5px] sm:text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                0.4ms EDGE
              </span>
            </div>

            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-rose-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                ENGINEERED FOR
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-sm sm:text-4xl">
                speed.
              </span>
            </h2>

            <p className="font-sans text-[10px] sm:text-sm text-[#fff5f6] font-normal leading-relaxed mt-1 sm:mt-4 antialiased">
              Powered by Next.js Turbopack, distributed edge networks, and sub-millisecond execution.
            </p>

            <div className="mt-2 sm:mt-5 flex flex-wrap gap-1 sm:gap-2 text-[8px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">Turbopack</span>
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">0.4ms Latency</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 5: 64% - 80% (AI & AUTOMATION - CHAT BUBBLE APPEARS LOWER-RIGHT OF PHONE) ━━━ */}
        <div
          className="absolute top-[65%] sm:top-1/2 sm:-translate-y-1/2 right-3 sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-[240px] xs:max-w-[260px] sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-end text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase5Opacity,
            transform: `translateY(${(0.72 - scrollProgress) * 50}px) scale(${0.96 + Math.min(0.04, phase5Opacity * 0.04)})`,
          }}
        >
          {/* Chat-Box Bubble Frame */}
          <div className="w-full relative group p-3 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl rounded-tr-sm sm:rounded-tr-3xl bg-gradient-to-b from-white/[0.12] via-[#20050d]/92 to-[#0d0105]/96 backdrop-blur-2xl border border-rose-400/40 sm:border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(225,29,72,0.2)] overflow-hidden flex flex-col items-end">
            <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
              <span className="font-mono text-[7.5px] sm:text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                NEURAL
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.2em] text-rose-300 font-bold">
                  IA // AI CORE
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,1)]" />
              </div>
            </div>

            <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-rose-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                INTELLIGENT
              </span>{' '}
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-sm sm:text-4xl">
                evolution.
              </span>
            </h2>

            <p className="font-sans text-[10px] sm:text-sm text-[#fff5f6] font-normal leading-relaxed mt-1 sm:mt-4 antialiased">
              Custom AI agents, neural pipelines, and real-time automated workflows giving your enterprise an unfair edge.
            </p>

            <div className="mt-2 sm:mt-5 flex flex-wrap justify-end gap-1 sm:gap-2 text-[8px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">AI Agents</span>
              <span className="px-2 py-0.5 rounded-full border border-white/[0.15] bg-white/[0.05]">Neural Stream</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 6: 84% - 100% (GRAND FINALE - PROPORTIONAL MOBILE FONTS & 1-LINE BUTTONS) ━━━ */}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-rose-600">
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

          {/* Single-Row 1-Line Buttons for Phone View */}
          <div className="mt-4 sm:mt-8 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
            <a href="#contact" className="flex-1 sm:flex-none">
              <RadialGlowButton size="sm" className="w-full sm:w-auto font-sans font-bold text-[10px] sm:text-xs tracking-wider uppercase !min-w-0 sm:!min-w-[200px] !h-[38px] sm:!h-[50px] !px-3 sm:!px-6 !bg-gradient-to-r !from-red-600 !to-rose-900 shadow-[0_0_25px_rgba(225,29,72,0.5)] border border-red-500/40 text-rose-100 whitespace-nowrap">
                Deploy System →
                <span className="material-symbols-outlined text-sm sm:text-base ml-1">arrow_forward</span>
              </RadialGlowButton>
            </a>
            <a
              href="#work"
              className="flex-1 sm:flex-none text-center justify-center px-3 sm:px-7 h-[38px] sm:h-[50px] font-sans text-[10px] sm:text-xs uppercase tracking-wider text-rose-200 hover:text-rose-100 transition-colors flex items-center gap-1 group border border-red-500/30 hover:border-red-400/60 bg-[#160206]/85 backdrop-blur-md rounded-full shadow-md whitespace-nowrap"
            >
              Systems
              <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform text-rose-400">
                east
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUsScrollytelling;
