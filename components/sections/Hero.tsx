'use client';

import React, { useState } from 'react';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

const TECH_LOGOS = [
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'AWS Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
];

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="relative w-full min-h-screen lg:h-screen lg:max-h-[1000px] bg-[#070709] text-white overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 lg:pt-24 pb-0">
      
      {/* Full-width Background Image (Mid-tone Tech Team Studio with Soft Blur) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/hero_tech_team_bg.jpg"
          alt="Tech Team Studio Workspace"
          className="w-full h-full object-cover object-center scale-105 filter blur-[8px] opacity-70"
        />
        {/* Balanced Mid-tone Overlay (Neither too dark nor too light) */}
        <div className="absolute inset-0 bg-[#070709]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-transparent to-[#070709] pointer-events-none" />
      </div>

      {/* Main Content (Center Aligned) */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center my-auto pt-2 sm:pt-4 lg:pt-6 pb-6 lg:pb-8">
        
        {/* Minimal Glass Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-4 sm:mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-100 font-bold">
            Your Dedicated Software Partner
          </span>
        </div>

        {/* Center-Aligned Refined White Headline */}
        <h1 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-[1.08] text-white max-w-4xl">
          SCALABLE DIGITAL PRODUCTS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400">
            FOR MODERN ENTERPRISES.
          </span>
        </h1>

        {/* Center-Aligned Sub-headline */}
        <p className="mt-3.5 sm:mt-5 font-sans text-xs sm:text-base lg:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed px-2">
          From intelligent cross-platform mobile apps to high-performance web platforms. We act as your dedicated technical partner—delivering on time, without agency overhead.
        </p>

        {/* Action Buttons (Centered) */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-950 bg-white hover:bg-slate-100 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer text-center font-sans"
          >
            Book a Free Discovery Call →
          </button>
          
          <a
            href="#work"
            className="w-full sm:w-auto font-mono text-xs text-white uppercase tracking-wider py-3 sm:py-3.5 px-7 rounded-xl border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-center"
          >
            View Case Studies
          </a>
        </div>

        {/* 3 Glassmorphic Floating Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mt-8 sm:mt-12 w-full max-w-3xl text-left">
          
          {/* Card 1: Speed */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-base sm:text-lg shrink-0 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xs sm:text-base text-white tracking-tight">Instant Speed</span>
              <span className="font-mono text-[9px] sm:text-[11px] text-slate-300 font-medium">Sub-Second Page Loads</span>
            </div>
          </div>

          {/* Card 2: Uptime SLA */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-base sm:text-lg shrink-0 group-hover:scale-110 transition-transform">
              🔒
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xs sm:text-base text-white tracking-tight">99.99% Reliability</span>
              <span className="font-mono text-[9px] sm:text-[11px] text-slate-300 font-medium">Guaranteed 24/7 Uptime</span>
            </div>
          </div>

          {/* Card 3: Experience */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 text-base sm:text-lg shrink-0 group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xs sm:text-base text-white tracking-tight">Zero Glitches</span>
              <span className="font-mono text-[9px] sm:text-[11px] text-slate-300 font-medium">Flawless Across All Devices</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tech Stack Faded Infinite Scrolling Band (Right Below Hero Content) */}
      <div className="relative z-10 w-full py-3.5 sm:py-4 border-t border-white/10 bg-[#070709]/90 backdrop-blur-md overflow-hidden select-none">
        
        {/* Faded Left & Right Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-[#070709] via-[#070709]/80 to-transparent pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-8 sm:gap-14">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200 shrink-0 cursor-default"
            >
              <img src={item.logo} alt={item.name} className="w-4 h-4 sm:w-6 sm:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
              <span className="font-sans font-bold text-xs sm:text-sm text-slate-200 tracking-wide">{item.name}</span>
            </div>
          ))}
        </div>
      </div>



      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Hero;
