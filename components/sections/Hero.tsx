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
    <section id="home" className="relative w-full min-h-screen md:h-screen md:max-h-[1000px] bg-[#070709] text-white overflow-hidden flex flex-col justify-between pt-16 md:pt-24 pb-0">
      
      {/* Full-width Background Image (Mid-tone Tech Team Studio with Soft Blur) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/hero_tech_team_bg.jpg"
          alt="Tech Team Studio Workspace"
          className="w-full h-full object-cover object-center scale-105 filter blur-[8px] opacity-70"
        />
        {/* Balanced Mid-tone Overlay */}
        <div className="absolute inset-0 bg-[#070709]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-transparent to-[#070709] pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 📱 DEDICATED MOBILE LAYOUT (Compact, Tight Spacing & Perfectly Balanced) */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 w-full px-4 pt-4 pb-6 flex flex-col items-center text-center my-auto">
        
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-3 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-100 font-bold">
            Dedicated Software Partner
          </span>
        </div>

        {/* Compact Mobile Headline */}
        <h1 className="font-sans font-black text-2xl xs:text-3xl uppercase tracking-tight leading-[1.1] text-white max-w-xs mx-auto">
          SCALABLE DIGITAL PRODUCTS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400">
            FOR MODERN ENTERPRISES
          </span>
        </h1>

        {/* Short Mobile Sub-headline */}
        <p className="mt-2.5 text-xs text-slate-300 max-w-xs mx-auto font-normal leading-relaxed">
          Intelligent mobile apps &amp; high-performance web platforms. We act as your dedicated technical partner.
        </p>

        {/* Primary Mobile CTA Button */}
        <div className="mt-4 w-full max-w-xs flex flex-col gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 px-6 font-sans font-bold text-xs uppercase tracking-wider text-slate-950 bg-white rounded-xl shadow-lg active:scale-95 transition-all text-center"
          >
            Book Free Discovery Call →
          </button>
          
          <a
            href="#work"
            className="font-mono text-[10px] text-slate-300 uppercase tracking-widest py-1 block text-center"
          >
            View Case Studies ↓
          </a>
        </div>

        {/* Mobile Compact 3-Pill Highlight Row */}
        <div className="grid grid-cols-3 gap-2 mt-5 w-full max-w-xs mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-blue-300 text-sm mb-0.5">⚡</span>
            <span className="font-sans font-bold text-[10px] text-white leading-tight">Instant Speed</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-emerald-300 text-sm mb-0.5">🔒</span>
            <span className="font-sans font-bold text-[10px] text-white leading-tight">99.99% Online</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-purple-300 text-sm mb-0.5">⭐</span>
            <span className="font-sans font-bold text-[10px] text-white leading-tight">Zero Glitches</span>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 💻 DEDICATED DESKTOP LAYOUT (Full Glassmorphic Architecture) */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative z-10 w-full max-w-[1320px] mx-auto px-6 md:px-8 flex-col items-center text-center my-auto pt-4 lg:pt-6 pb-6 lg:pb-8">
        
        {/* Minimal Glass Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-100 font-bold">
            Your Dedicated Software Partner
          </span>
        </div>

        {/* Center-Aligned Refined White Headline */}
        <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-[1.08] text-white max-w-4xl">
          SCALABLE DIGITAL PRODUCTS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-400">
            FOR MODERN ENTERPRISES.
          </span>
        </h1>

        {/* Center-Aligned Sub-headline */}
        <p className="mt-5 font-sans text-base lg:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          From intelligent cross-platform mobile apps to high-performance web platforms. We act as your dedicated technical partner—delivering on time, without agency overhead.
        </p>

        {/* Action Buttons (Centered) */}
        <div className="mt-8 flex flex-row items-center justify-center gap-4 w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-9 py-3.5 text-sm font-semibold tracking-wider uppercase text-slate-950 bg-white hover:bg-slate-100 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 cursor-pointer text-center font-sans"
          >
            Book a Free Discovery Call →
          </button>
          
          <a
            href="#work"
            className="font-mono text-xs text-white uppercase tracking-wider py-3.5 px-7 rounded-xl border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-center"
          >
            View Case Studies
          </a>
        </div>

        {/* 3 Glassmorphic Floating Metric Cards */}
        <div className="grid grid-cols-3 gap-5 mt-12 w-full max-w-3xl text-left">
          
          {/* Card 1: Speed */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-lg shrink-0 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-base text-white tracking-tight">Instant Speed</span>
              <span className="font-mono text-[11px] text-slate-300 font-medium">Sub-Second Page Loads</span>
            </div>
          </div>

          {/* Card 2: Uptime SLA */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-lg shrink-0 group-hover:scale-110 transition-transform">
              🔒
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-base text-white tracking-tight">99.99% Reliability</span>
              <span className="font-mono text-[11px] text-slate-300 font-medium">Guaranteed 24/7 Uptime</span>
            </div>
          </div>

          {/* Card 3: Experience */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-4 flex items-center gap-3 hover:bg-white/15 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 text-lg shrink-0 group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-base text-white tracking-tight">Zero Glitches</span>
              <span className="font-mono text-[11px] text-slate-300 font-medium">Flawless Across Devices</span>
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
