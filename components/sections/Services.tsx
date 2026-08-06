'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ServiceSlide {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  bgType: 'image' | 'video';
  bgSrc: string;
  themeColor: string;
  pillColor: string;
}

const SLIDES: ServiceSlide[] = [
  {
    title: 'MOBILE APPS',
    subtitle: 'iOS & Android Ecosystems',
    desc: 'Beautiful, native and cross-platform mobile experiences crafted with Flutter and React Native. Fully optimized for fluid performance and user delight.',
    image: '/images/mobile.webp',
    bgType: 'video',
    bgSrc: '/images/WhatsApp Video 2026-08-07 at 2.24.50 AM.mp4',
    themeColor: '#a855f7',
    pillColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  },
  {
    title: 'WEB SOLUTIONS',
    subtitle: 'Fast, Modern & Scalable Sites',
    desc: 'High-fidelity, responsive web platforms built with Next.js, React and Tailwind. Engineered for rapid load speeds, SEO optimization, and premium motion design.',
    image: '/images/web.webp',
    bgType: 'video',
    bgSrc: '/images/same_for_websolution_change_th.mp4',
    themeColor: '#06b6d4',
    pillColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  },
  {
    title: 'AI AUTOMATION',
    subtitle: 'Intelligent Systems & Agents',
    desc: 'Custom autonomous AI agents, LLM integrations, and cognitive workflows that automate complex enterprise operations, scaling efficiency and productivity.',
    image: '/images/intelligence.webp',
    bgType: 'image',
    bgSrc: '/images/intelligence.webp',
    themeColor: '#ec4899',
    pillColor: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Transition animations when active index changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.slide-animate',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.active-bg-image',
        { scale: 1.05, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }, textContainerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="services" className="relative w-full min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden border-t border-white/5 z-10 bg-[#050505] py-16 lg:py-0">
      
      {/* Dynamic Background Image/Video Cover - Feathered Seamless Layout */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)', maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 75%)' }}>
        {SLIDES[activeIndex].bgType === 'video' ? (
          <video
            key={SLIDES[activeIndex].bgSrc}
            className="active-bg-image w-full h-full object-cover"
            src={SLIDES[activeIndex].bgSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="active-bg-image w-full h-full object-cover"
            src={SLIDES[activeIndex].bgSrc}
            alt={SLIDES[activeIndex].title}
          />
        )}
        {/* Soft Glass Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60 backdrop-blur-[6px]"></div>
        {/* Colorful Radial Atmospheric Glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-radial blur-3xl opacity-20 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `radial-gradient(circle, ${SLIDES[activeIndex].themeColor} 0%, transparent 70%)`
          }}
        ></div>
      </div>

      {/* 1. Left Side: Active Slide Content (Floating Glass Panel) */}
      <div ref={textContainerRef} className="w-full lg:w-1/2 relative flex flex-col justify-between p-6 md:p-12 lg:p-16 z-10 bg-transparent min-h-[550px] lg:min-h-full">
        
        {/* Top Header Tag */}
        <div className="relative z-10 mb-6 lg:mb-0">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 backdrop-blur-md font-semibold shadow-sm">
            SERVICES // WHAT WE CREATE
          </span>
        </div>

        {/* Floating Glass Box for active slide details */}
        <div className="relative z-10 flex flex-col gap-6 max-w-xl my-auto p-8 md:p-10 rounded-[32px] border border-white/10 bg-black/45 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3">
            <span className={`slide-animate font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${SLIDES[activeIndex].pillColor} font-bold`}>
              {SLIDES[activeIndex].subtitle}
            </span>
          </div>
          
          <h2 className="slide-animate font-sans font-extrabold text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.95] drop-shadow-md">
            {SLIDES[activeIndex].title}
          </h2>
          
          <p className="slide-animate text-xs md:text-sm text-on-surface-variant/95 leading-relaxed font-normal">
            {SLIDES[activeIndex].desc}
          </p>
          
          <div className="slide-animate mt-2">
            <a 
              className="relative inline-flex items-center justify-center font-body-md text-xs font-bold text-white px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-md group cursor-pointer"
              href="#"
            >
              EXPLORE SOLUTION
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Bottom Slide controllers */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 mt-6 lg:mt-0">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white transition-all duration-300 active:scale-95"
              aria-label="Previous Slide"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white transition-all duration-300 active:scale-95"
              aria-label="Next Slide"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          
          <div className="font-mono text-xs text-on-surface-variant/40 tracking-wider font-semibold">
            0{activeIndex + 1} / 0{SLIDES.length}
          </div>
        </div>
      </div>

      {/* 2. Right Side: Selector Cards list (Glass panels with hovering glow) */}
      <div className="w-full lg:w-1/2 relative flex items-center p-6 md:p-12 lg:p-16 z-10 bg-transparent border-t lg:border-t-0 lg:border-l border-white/5">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:overflow-visible">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.title}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-[280px] rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer group flex flex-col justify-end p-5 ${
                idx === activeIndex
                  ? 'border-white/20 scale-[1.03] opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
                  : 'border-white/5 opacity-40 hover:opacity-80'
              }`}
              style={{
                boxShadow: idx === activeIndex ? `0 0 35px ${slide.themeColor}15` : 'none'
              }}
            >
              {/* Background preview image */}
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  src={slide.image}
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
              </div>

              {/* Text label details */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold">
                  0{idx + 1} // SERVICE
                </span>
                <h3 className="font-sans font-extrabold text-sm text-white uppercase tracking-tight leading-tight">
                  {slide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
