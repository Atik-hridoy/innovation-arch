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
}

const SLIDES: ServiceSlide[] = [
  {
    title: 'MOBILE APPS',
    subtitle: 'iOS & Android Ecosystems',
    desc: 'Beautiful, native and cross-platform mobile experiences crafted with Flutter and React Native. Fully optimized for fluid performance and user delight.',
    image: '/images/mobile.webp',
    bgType: 'video',
    bgSrc: '/images/i_need_to_generate_a_video_for.mp4',
  },
  {
    title: 'WEB SOLUTIONS',
    subtitle: 'Fast, Modern & Scalable Sites',
    desc: 'High-fidelity, responsive web platforms built with Next.js, React and Tailwind. Engineered for rapid load speeds, SEO optimization, and premium motion design.',
    image: '/images/web.webp',
    bgType: 'video',
    bgSrc: '/images/same_for_websolution_change_th.mp4',
  },
  {
    title: 'AI AUTOMATION',
    subtitle: 'Intelligent Systems & Agents',
    desc: 'Custom autonomous AI agents, LLM integrations, and cognitive workflows that automate complex enterprise operations, scaling efficiency and productivity.',
    image: '/images/intelligence.webp',
    bgType: 'image',
    bgSrc: '/images/intelligence.webp',
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.active-bg-image',
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
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
    <section id="services" className="relative w-full min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden border-t border-white/5 z-10 bg-[#050505]">
      
      {/* Full-Section Background Image/Video with subtle glass blur overlay */}
      <div className="absolute inset-0 z-0">
        {SLIDES[activeIndex].bgType === 'video' ? (
          <video
            key={SLIDES[activeIndex].bgSrc}
            className="active-bg-image w-full h-full object-cover select-none pointer-events-none"
            src={SLIDES[activeIndex].bgSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="active-bg-image w-full h-full object-cover select-none pointer-events-none"
            src={SLIDES[activeIndex].bgSrc}
            alt={SLIDES[activeIndex].title}
          />
        )}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
      </div>

      {/* 1. Left Side: Active Slide Content */}
      <div ref={textContainerRef} className="w-full lg:w-1/2 relative flex flex-col justify-between p-8 md:p-16 overflow-hidden min-h-[500px] lg:min-h-full bg-transparent z-10">
        
        {/* Top Header Tag */}
        <div className="relative z-10 mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            SERVICES // WHAT WE CREATE
          </span>
        </div>

        {/* Text Block Content */}
        <div className="relative z-10 flex flex-col gap-6 max-w-xl my-auto">
          <span className="slide-animate slide-subtitle font-mono text-[10px] uppercase tracking-[0.25em] text-secondary font-semibold">
            {SLIDES[activeIndex].subtitle}
          </span>
          <h2 className="slide-animate slide-title font-sans font-extrabold text-4xl md:text-6xl text-white uppercase tracking-tighter leading-[0.95]">
            {SLIDES[activeIndex].title}
          </h2>
          <p className="slide-animate slide-desc text-sm md:text-base text-on-surface-variant/90 leading-relaxed font-normal">
            {SLIDES[activeIndex].desc}
          </p>
          <div className="slide-animate slide-btn mt-4">
            <a className="btn-glass relative inline-flex items-center justify-center font-body-md text-xs font-bold text-white bg-white/[0.03] backdrop-blur-[20px] border border-white/15 px-8 py-3.5 rounded-full overflow-hidden hover:bg-primary/10 transition-colors group cursor-pointer" href="#">
              EXPLORE SOLUTION
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Bottom Slide controllers */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 mt-8">
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white transition-colors"
              aria-label="Previous Slide"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white transition-colors"
              aria-label="Next Slide"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          
          <div className="font-mono text-xs text-on-surface-variant/40 tracking-wider">
            0{activeIndex + 1} / 0{SLIDES.length}
          </div>
        </div>
      </div>

      {/* 2. Right Side: Preview Cards Grid List */}
      <div className="w-full lg:w-1/2 relative flex items-center p-8 md:p-16 bg-transparent border-t lg:border-t-0 lg:border-l border-white/5 z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:overflow-visible">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.title}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-[280px] rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group flex flex-col justify-end p-5 shadow-2xl ${
                idx === activeIndex
                  ? 'border-primary/50 ring-2 ring-primary/20 scale-[1.03] opacity-100'
                  : 'border-white/5 opacity-40 hover:opacity-80'
              }`}
            >
              {/* Background preview image */}
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-110 transition-transform duration-500"
                  src={slide.image}
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Text label details */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-semibold">
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
