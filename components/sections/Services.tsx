'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MobileIconsRow } from '@/components/services/MobileIconsRow';
import { ServiceTerminal } from '@/components/services/ServiceTerminal';
import { SLIDES } from '@/components/services/data';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

/* ─── Component ─── */

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleFacilities, setVisibleFacilities] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const active = SLIDES[activeIndex];
  const marqueeText = `${active.title} • ${active.subtitle} • `;
  const snippets = active.codeSnippets;
  const themeColor = active.themeColor;

  /* Reset expanded and typing on tab change */
  useEffect(() => {
    setExpanded(false);
    setVisibleLines(0);
    setVisibleFacilities(0);
  }, [activeIndex]);

  /* Typewriter: reveal code lines one by one */
  useEffect(() => {
    if (expanded) return;
    if (visibleLines >= snippets.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 120);
    return () => clearTimeout(timer);
  }, [visibleLines, expanded, snippets.length]);

  /* Reveal facilities one by one */
  useEffect(() => {
    if (!expanded) { setVisibleFacilities(0); return; }
    if (visibleFacilities >= active.facilities.length) return;
    const timer = setTimeout(() => {
      setVisibleFacilities((prev) => prev + 1);
    }, 150);
    return () => clearTimeout(timer);
  }, [expanded, visibleFacilities, active.facilities.length]);

  /* Animate content swap on tab change */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.svc-hero-desc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.08, ease: 'power3.out' });
      gsap.fromTo('.svc-feat-card', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.12, ease: 'power2.out' });
      gsap.fromTo('.svc-code-line', { opacity: 0, x: -10 }, { opacity: 0.35, x: 0, duration: 0.35, stagger: 0.025, delay: 0.15, ease: 'power2.out' });
      gsap.fromTo('.marquee-back-text', { opacity: 0 }, { opacity: 0.35, duration: 0.8, ease: 'power2.out' });
      gsap.fromTo('.code-line-item', { opacity: 0, x: -15 }, { opacity: 0.25, x: 0, duration: 0.6, stagger: 0.03, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full lg:min-h-screen flex items-center justify-center overflow-hidden z-10 bg-background dark:bg-[#080810] transition-colors duration-400"
    >
      {/* ━━━ Background Motion Layer (Boosted Prominence) ━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* ━━━ MOBILE ONLY: 4-Line Alternating Kinetic Text Curtain (Optimized for 60fps) ━━━ */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-around py-8 overflow-hidden pointer-events-none opacity-30 dark:opacity-35 z-0">
          {[
            { dir: 'reverse', text: 'AI SYSTEMS • NEURAL ENGINE • COMPILATION • ', stroke: 'rgba(124, 58, 237, 0.35)' },
            { dir: 'normal', text: 'BRAND ARCHITECTURE • CREATIVE DIRECTION • ', stroke: 'rgba(132, 43, 210, 0.35)' },
            { dir: 'reverse', text: 'DIGITAL PRODUCTS • IMMERSIVE WEB • ', stroke: 'rgba(99, 102, 241, 0.35)' },
            { dir: 'normal', text: 'STRATEGY • ARCHITECTURE • ENGINEERING • ', stroke: 'rgba(124, 58, 237, 0.3)' },
          ].map((line, idx) => (
            <div key={idx} className="w-full overflow-hidden whitespace-nowrap leading-none">
              <div className={`${line.dir === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee'} inline-flex whitespace-nowrap`}>
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="font-sans font-black text-[12vw] tracking-[0.15em] text-transparent uppercase px-2"
                    style={{ WebkitTextStroke: `1.5px ${line.stroke}` }}
                  >
                    {line.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ━━━ DESKTOP ONLY: Dual Text Marquees ━━━ */}
        <div className="hidden md:block">
          {/* Top Marquee (Left → Right) */}
          <div className="absolute top-[18%] left-0 w-full overflow-hidden whitespace-nowrap z-0">
            <div className="animate-marquee-reverse inline-flex whitespace-nowrap opacity-40 dark:opacity-60">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-sans font-black text-[12vw] lg:text-[10vw] tracking-[0.2em] text-transparent uppercase marquee-back-text px-4"
                  style={{ WebkitTextStroke: '2px rgba(124, 58, 237, 0.35)' }}
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Marquee (Right → Left) */}
          <div className="absolute bottom-[18%] left-0 w-full overflow-hidden whitespace-nowrap z-0">
            <div className="animate-marquee inline-flex whitespace-nowrap opacity-40 dark:opacity-60">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-sans font-black text-[12vw] lg:text-[10vw] tracking-[0.2em] text-transparent uppercase marquee-back-text px-4"
                  style={{ WebkitTextStroke: '2px rgba(132, 43, 210, 0.35)' }}
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Code Stream */}
        <div className="absolute top-[32%] left-[6%] max-w-[40vw] hidden md:flex flex-col gap-1 font-mono text-[9px] text-primary">
          {snippets.map((line, i) => (
            <div key={i} className="code-line-item opacity-25 whitespace-nowrap">{line}</div>
          ))}
        </div>

        {/* Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-[0.08] dark:opacity-[0.12] transition-all duration-1000"
          style={{ backgroundImage: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* ━━━ Foreground Content ━━━ */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-20 lg:py-28">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between items-center text-center md:text-left gap-4 md:gap-6 mb-8 md:mb-16">
          <div className="flex flex-col gap-3 items-center md:items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">
              // WHAT WE BUILD
            </span>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
              Our Services
            </h2>
          </div>

          {/* ── Tab Pills (Centered on Mobile) ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl md:rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.02] backdrop-blur-sm w-full md:w-auto">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.title}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl md:rounded-full font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-bold transition-all duration-400 cursor-pointer ${
                  idx === activeIndex
                    ? 'text-neutral-900 dark:text-white bg-black/10 dark:bg-white/10 border border-black/15 dark:border-white/15 shadow-md'
                    : 'text-neutral-500 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white/70 border border-transparent'
                }`}
              >
                {slide.title}
                {idx === activeIndex && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full" style={{ backgroundColor: slide.themeColor }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ▎ Main Feature Card (Large, spans 7 cols) */}
          <div className="lg:col-span-7 relative rounded-[20px] sm:rounded-[28px] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0a0a0c]/40 backdrop-blur-md overflow-hidden min-h-[280px] sm:min-h-[380px] flex flex-col justify-between p-5 sm:p-7 md:p-9 group shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-400">
            {/* Card bg image */}
            <div className="absolute inset-0 z-0 opacity-15 dark:opacity-25 mix-blend-luminosity">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-[#0a0a0c] via-background/60 dark:via-[#0a0a0c]/60 to-transparent" />
            </div>

            {/* Top badge row */}
            <div className="relative z-10 flex items-center gap-3">
              <span className={`font-mono text-[9px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border font-bold ${active.pillColor}`}>
                {active.subtitle}
              </span>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ backgroundColor: themeColor + '66' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColor }} />
              </span>
            </div>

            {/* Title + Desc */}
            <div className="relative z-10 mt-auto flex flex-col gap-3">
              <h3 className="svc-hero-title font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-neutral-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                {active.title}
              </h3>
              <p className="svc-hero-desc text-xs sm:text-sm md:text-base text-neutral-600 dark:text-white/60 leading-relaxed max-w-lg">
                {active.desc}
              </p>
              <div className="flex items-center gap-6 mt-1">
                <RadialGlowButton
                  onClick={() => setExpanded(true)}
                  size="sm"
                  className="font-semibold text-xs tracking-wider !min-w-[140px] !min-h-[40px]"
                >
                  Explore Service
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </RadialGlowButton>
                <span className="font-mono text-[9px] text-neutral-400 dark:text-white/25 uppercase tracking-wider hidden md:inline">0{activeIndex + 1} / 0{SLIDES.length}</span>
              </div>
            </div>
          </div>

          {/* ▎ Right Column: Code Console + Nav (spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Code Terminal / Facilities Card */}
            <div className="relative rounded-[24px] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#08080a]/50 backdrop-blur-md p-5 sm:p-6 flex-1 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-colors duration-400">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-auto font-mono text-[8px] text-neutral-500 dark:text-white/30 uppercase tracking-wider">
                  {expanded ? `${active.title.toLowerCase()} // deliverables` : `${active.title.toLowerCase()}.tsx`}
                </span>
              </div>

              {/* Content: Code or Facilities */}
              {!expanded ? (
                <div className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed">
                  {snippets.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="svc-code-line flex gap-3" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                      <span className="text-neutral-400 dark:text-white/15 select-none w-5 text-right shrink-0">{i + 1}</span>
                      <span className="text-neutral-700 dark:text-white/50 whitespace-pre">{line}</span>
                    </div>
                  ))}
                  {visibleLines < snippets.length && (
                    <div className="flex gap-3">
                      <span className="text-neutral-400 dark:text-white/15 select-none w-5 text-right shrink-0">{visibleLines + 1}</span>
                      <span className="inline-block w-[7px] h-[14px] bg-primary/70 animate-pulse" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/25 font-bold mb-1">
                    {active.title} // WHAT YOU GET
                  </span>
                  {active.facilities.slice(0, visibleFacilities).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.015] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 group/fac"
                      style={{ animation: 'fadeSlideIn 0.35s ease-out' }}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[9px] font-bold border"
                        style={{
                          color: themeColor,
                          borderColor: themeColor + '25',
                          backgroundColor: themeColor + '08',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[12px] text-neutral-700 dark:text-white/55 leading-relaxed pt-0.5 group-hover/fac:text-neutral-900 dark:group-hover/fac:text-white/80 transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
                className="flex-1 h-14 rounded-2xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/15 flex items-center justify-center text-neutral-600 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Previous Service"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p + 1) % SLIDES.length)}
                className="flex-1 h-14 rounded-2xl border border-black/8 dark:border-white/8 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/15 flex items-center justify-center text-neutral-600 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Next Service"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* ▎ Bottom Row: Feature Spec Cards (Desktop: 4 Cards; Mobile: 1 Row of Pure Icons) */}
          <div className="col-span-1 lg:col-span-12 mt-2">
            {/* MOBILE ONLY: Single Row of 4 Pure Icons */}
            <MobileIconsRow features={active.features} themeColor={themeColor} />

            {/* DESKTOP ONLY: 4 Spec Cards Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
              {active.features.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-[20px] border border-black/6 dark:border-white/6 bg-white/70 dark:bg-[#08080a]/50 backdrop-blur-md p-5 flex flex-col gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:border-black/12 dark:hover:border-white/12 transition-all duration-300 relative overflow-hidden group shadow-sm dark:shadow-none"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${themeColor}30, transparent)` }} />
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-lg" style={{ color: themeColor }}>{feat.icon}</span>
                    <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-400 dark:text-white/20 font-bold">{feat.spec}</span>
                  </div>
                  <span className="font-sans font-bold text-[13px] text-neutral-900 dark:text-white tracking-tight leading-tight">{feat.title}</span>
                  <span className="font-mono text-[10px] text-neutral-600 dark:text-white/40 leading-snug">{feat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
