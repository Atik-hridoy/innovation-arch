'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';
import { AuroraHeroBg } from '@/components/ui/aurora-hero';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) => {
  const pad = String(index).padStart(3, '0');
  return `/ezgif-39322c0c1b972c68-jpg/ezgif-frame-${pad}.jpg`;
};

export function AboutUsScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);

  // 1. High-Speed Progressive Preloading
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        if (loaded >= 10 && !isReady) {
          setIsReady(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-DPI Canvas Rendering
  const renderFrame = (frameIndex: number, progressVal: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

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

    // Aspect Contain Fit (Responsive Scale & Vertical Split for Mobile vs Desktop)
    const isMobile = width < 768;
    const scaleFactor = isMobile ? 0.78 : 0.82;
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.min(hRatio, vRatio) * scaleFactor;

    const renderW = img.naturalWidth * ratio;
    const renderH = img.naturalHeight * ratio;
    const renderX = (width - renderW) / 2;
    // On mobile portrait, position laptop in upper 40% so text cards in bottom 50% never collide
    const renderY = isMobile ? height * 0.14 : (height - renderH) / 2;

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
      isMobile ? renderY + renderH / 2 : height / 2,
      Math.min(renderW, renderH) * 0.32,
      width / 2,
      isMobile ? renderY + renderH / 2 : height / 2,
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

  // 3. GSAP ScrollTrigger Sequence Timeline (Extended Duration + Reverse Close on Finale)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=750%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          let frameIndex = 1;

          // Phase A: 0% - 8% (Hook View - Closed Rest Frame 1)
          if (p <= 0.08) {
            frameIndex = 1;
          }
          // Phase B: 8% - 76% (Forward Playback - Laptop opens 1 -> 240)
          else if (p > 0.08 && p <= 0.76) {
            const forwardProgress = (p - 0.08) / 0.68;
            frameIndex = Math.min(
              TOTAL_FRAMES,
              Math.max(1, Math.floor(forwardProgress * (TOTAL_FRAMES - 1)) + 1)
            );
          }
          // Phase C: 76% - 93% (Reverse Playback - Laptop smoothly CLOSES 240 -> 1)
          else if (p > 0.76 && p <= 0.93) {
            const reverseProgress = (p - 0.76) / 0.17;
            frameIndex = Math.min(
              TOTAL_FRAMES,
              Math.max(1, Math.floor((1 - reverseProgress) * (TOTAL_FRAMES - 1)) + 1)
            );
          }
          // Phase D: 93% - 100% (Grand Finale - Laptop remains closed at Frame 1)
          else {
            frameIndex = 1;
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
      className="relative w-full h-screen bg-[#080103] text-white overflow-hidden select-none"
    >
      {/* ── Sticky Fullscreen Hardware Sequence Canvas ── */}
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

      {/* ── Seamless Floating Editorial Typography (RESPONSIVE FULL VIEWPORT) ── */}
      <div className="relative z-10 w-full h-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pointer-events-none flex items-center">

        {/* ━━━ PHASE 1: 0% - 12% (INNOVATION ARK FLAGSHIP HOOK - FULLY RESPONSIVE) ━━━ */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-200 pointer-events-auto [perspective:1000px] max-w-5xl mx-auto"
          style={{
            opacity: phase1Opacity,
            transform: `translateY(${-scrollProgress * 150}px) scale(${Math.max(0.85, 1 - scrollProgress * 0.6)})`,
          }}
        >
          {/* Majestic Hero Headline */}
          <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.92] text-rose-300 drop-shadow-[0_25px_60px_rgba(0,0,0,1)] max-w-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-rose-600 drop-shadow-[0_10px_30px_rgba(225,29,72,0.5)]">
              INNOVATION ARK
            </span>
            <br />
            <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-4xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_15px_40px_rgba(225,29,72,0.6)]">
              digital excellence.
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-base md:text-lg text-rose-100 font-normal tracking-wide mt-4 sm:mt-6 max-w-2xl leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] px-2 antialiased">
            We architect world-class web platforms, bespoke software ecosystems, and high-performance digital products that scale businesses globally.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="#contact" className="w-full sm:w-auto">
              <RadialGlowButton size="lg" className="w-full sm:w-auto font-sans font-bold text-xs tracking-wider uppercase !min-w-0 sm:!min-w-[190px] !min-h-[44px] sm:!min-h-[48px] !bg-gradient-to-r !from-red-600 !to-rose-900 shadow-[0_0_25px_rgba(225,29,72,0.5)] border border-red-500/40 text-rose-100">
                Start Your Project
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </RadialGlowButton>
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto text-center justify-center px-6 py-2.5 sm:py-3 font-sans text-xs uppercase tracking-wider text-rose-200 hover:text-rose-100 transition-colors flex items-center gap-2 group border border-red-500/30 hover:border-red-400/60 bg-[#160206]/85 backdrop-blur-md rounded-full shadow-md"
            >
              Explore Portfolio
              <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform text-rose-400">
                east
              </span>
            </a>
          </div>

          {/* Elegant Scroll Cue */}
          <div className="mt-8 sm:mt-12 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-rose-300 uppercase tracking-widest animate-bounce drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-base">expand_more</span>
            Scroll to experience Innovation Ark&apos;s craft
          </div>
        </div>

        {/* ━━━ PHASE 2: 12% - 28% (INNOVATION ARK BLUEPRINT - SPLIT-SCREEN MOBILE HUD) ━━━ */}
        <div
          className="absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 left-4 right-4 sm:right-auto sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-none sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase2Opacity,
            transform: `translateY(${(0.20 - scrollProgress) * 70}px)`,
          }}
        >
          <div className="w-full relative group p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.10] via-[#0c0104]/80 to-[#060102]/92 backdrop-blur-3xl backdrop-saturate-[200%] border border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(225,29,72,0.12)] overflow-hidden">
            {/* macOS Specular Top Edge Light */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-rose-300 font-bold mb-1.5 sm:mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              // 01. INNOVATION ARK BLUEPRINT
            </span>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-[0.95] text-rose-300 drop-shadow-[0_15px_35px_rgba(0,0,0,1)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                ARCHITECTED FOR
              </span>
              <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-2xl sm:text-4xl lg:text-5xl">
                exponential scale.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#fff5f6] font-medium leading-relaxed mt-3 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] antialiased">
              Innovation Ark crafts foundational blueprints—modular design systems, high-throughput microservices, and end-to-end technical roadmaps tailored to your industry.
            </p>

            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Design Systems</span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">High-Throughput Core</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 3: 28% - 46% (INNOVATION ARK SPATIAL CRAFT - SPLIT-SCREEN MOBILE HUD) ━━━ */}
        <div
          className="absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 left-4 right-4 sm:left-auto sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-none sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start sm:items-end text-left sm:text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase3Opacity,
            transform: `translateY(${(0.37 - scrollProgress) * 70}px)`,
          }}
        >
          <div className="w-full relative group p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.10] via-[#0c0104]/80 to-[#060102]/92 backdrop-blur-3xl backdrop-saturate-[200%] border border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(225,29,72,0.12)] overflow-hidden flex flex-col items-start sm:items-end">
            {/* macOS Specular Top Edge Light */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-rose-300 font-bold mb-1.5 sm:mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              // 02. INNOVATION ARK SPATIAL CRAFT
            </span>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-[0.95] text-rose-300 drop-shadow-[0_15px_35px_rgba(0,0,0,1)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                EXPERIENCES BEYOND
              </span>
              <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-2xl sm:text-4xl lg:text-5xl">
                the screen.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#fff5f6] font-medium leading-relaxed mt-3 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] antialiased">
              We break traditional digital boundaries. Innovation Ark delivers 120 FPS sub-pixel GPU spatial interactions, fluid 3D motion, and memorable experiences that captivate users.
            </p>

            <div className="mt-4 sm:mt-5 flex flex-wrap justify-start sm:justify-end gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">120 FPS Motion</span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Awwwards-Tier</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 4: 46% - 64% (INNOVATION ARK PERFORMANCE CORE - SPLIT-SCREEN MOBILE HUD) ━━━ */}
        <div
          className="absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 left-4 right-4 sm:right-auto sm:left-6 md:left-10 lg:left-12 xl:left-16 max-w-none sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start text-left transition-all duration-200 pointer-events-auto"
          style={{
            opacity: phase4Opacity,
            transform: `translateY(${(0.55 - scrollProgress) * 70}px)`,
          }}
        >
          <div className="w-full relative group p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.10] via-[#0c0104]/80 to-[#060102]/92 backdrop-blur-3xl backdrop-saturate-[200%] border border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(225,29,72,0.12)] overflow-hidden">
            {/* macOS Specular Top Edge Light */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-rose-300 font-bold mb-1.5 sm:mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              // 03. FULL-STACK SUPREMACY
            </span>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-[0.95] text-rose-300 drop-shadow-[0_15px_35px_rgba(0,0,0,1)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                ENGINEERED FOR
              </span>
              <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-2xl sm:text-4xl lg:text-5xl">
                supremacy.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#fff5f6] font-medium leading-relaxed mt-3 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] antialiased">
              Powered by Next.js Turbopack, distributed edge networks, and sub-millisecond execution. Innovation Ark guarantees zero-bottleneck performance and top-tier SEO dominance.
            </p>

            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Turbopack Core</span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Sub-1ms Execution</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 5: 64% - 80% (INNOVATION ARK AI & AUTOMATION - SPLIT-SCREEN MOBILE HUD) ━━━ */}
        <div
          className="absolute bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 left-4 right-4 sm:left-auto sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-none sm:max-w-[380px] lg:max-w-[420px] flex flex-col items-start sm:items-end text-left sm:text-right transition-all duration-200 ml-auto pointer-events-auto [perspective:1000px]"
          style={{
            opacity: phase5Opacity,
            transform: `translateY(${(0.72 - scrollProgress) * 70}px)`,
          }}
        >
          <div className="w-full relative group p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.10] via-[#0c0104]/80 to-[#060102]/92 backdrop-blur-3xl backdrop-saturate-[200%] border border-white/[0.18] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(225,29,72,0.12)] overflow-hidden flex flex-col items-start sm:items-end">
            {/* macOS Specular Top Edge Light */}
            <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-rose-300 font-bold mb-1.5 sm:mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              // 04. AI & AUTOMATION
            </span>

            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-[0.95] text-rose-300 drop-shadow-[0_15px_35px_rgba(0,0,0,1)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-rose-500">
                INTELLIGENT
              </span>
              <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-2xl sm:text-4xl lg:text-5xl">
                evolution.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#fff5f6] font-medium leading-relaxed mt-3 sm:mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)] antialiased">
              We integrate custom AI agents, neural pipelines, and real-time automated workflows directly into your web platforms, giving your enterprise an unfair competitive edge.
            </p>

            <div className="mt-4 sm:mt-5 flex flex-wrap justify-start sm:justify-end gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-rose-200">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Agentic Pipelines</span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.15] bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">Real-Time Vectors</span>
            </div>
          </div>
        </div>

        {/* ━━━ PHASE 6: 84% - 100% (PARTNER WITH INNOVATION ARK - GRAND FINALE RESPONSIVE) ━━━ */}
        <div
          className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300 pointer-events-auto max-w-5xl mx-auto"
          style={{
            opacity: phase6Opacity,
            transform: `translateY(${(0.92 - scrollProgress) * 70}px) scale(${Math.min(1, 0.92 + scrollProgress * 0.08)})`,
          }}
        >
          <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.92] text-rose-300 drop-shadow-[0_30px_70px_rgba(0,0,0,1)] max-w-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-rose-600">
              PARTNER WITH
            </span>
            <br />
            <span className="font-serif italic font-normal lowercase tracking-normal text-rose-300 text-4xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_20px_50px_rgba(225,29,72,0.6)]">
              innovation ark.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-base md:text-lg text-rose-100 font-normal tracking-wide mt-4 sm:mt-6 max-w-xl leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] px-2 antialiased">
            Transform your vision into an industry-defining digital powerhouse. Let&apos;s build your next high-performance platform together.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="#contact" className="w-full sm:w-auto">
              <RadialGlowButton size="lg" className="w-full sm:w-auto font-sans font-bold text-xs tracking-wider uppercase !min-w-0 sm:!min-w-[200px] !min-h-[46px] sm:!min-h-[50px] !bg-gradient-to-r !from-red-600 !to-rose-900 shadow-[0_0_30px_rgba(225,29,72,0.5)] border border-red-500/40 text-rose-100">
                Start Your Project
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </RadialGlowButton>
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto text-center justify-center px-7 py-3 sm:py-3.5 font-sans text-xs uppercase tracking-wider text-rose-200 hover:text-rose-100 transition-colors flex items-center gap-2 group border border-red-500/30 hover:border-red-400/60 bg-[#160206]/85 backdrop-blur-md rounded-full shadow-md"
            >
              View Selected Work
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
