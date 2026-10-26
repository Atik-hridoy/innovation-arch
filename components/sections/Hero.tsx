'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

// Temporarily disabled ParticleBulb in favor of innovative-arc-particles
// const ParticleBulb = dynamic(() => import('@/components/sections/ParticleBulb'), {
//   ssr: false,
// });

const InnovativeArcParticles = dynamic(
  () => import('@/components/sections/InnovativeArcParticles'),
  { ssr: false }
);

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
    <section id="home" className="relative w-full min-h-screen md:h-screen md:max-h-[1000px] bg-transparent text-slate-900 dark:text-white overflow-hidden flex flex-col justify-between pt-16 md:pt-24 pb-0 transition-colors duration-300">
      
      {/* Innovative Arc 3D Particles Atmosphere & Multi-Formation Stage across entire Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* <ParticleBulb /> */}
        <InnovativeArcParticles />
      </div>

      {/* Subtle high-tech crisp grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 📱 DEDICATED MOBILE LAYOUT (Compact Left-Aligned Design)   */}
      {/* ========================================================= */}
      <div className="md:hidden relative z-10 w-full px-5 pt-4 pb-6 flex flex-col items-start text-left my-auto">
        
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/90 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-md mb-3 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-700 dark:text-slate-100 font-bold">
            Dedicated Software Partner
          </span>
        </div>

        {/* Compact Mobile Headline */}
        <h1 className="font-sans font-black text-2xl xs:text-3xl uppercase tracking-tight leading-[1.1] text-slate-900 dark:text-white max-w-sm">
          SCALABLE DIGITAL PRODUCTS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 dark:from-white dark:via-slate-200 dark:to-blue-400">
            FOR MODERN ENTERPRISES
          </span>
        </h1>

        {/* Short Mobile Sub-headline */}
        <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 max-w-sm font-normal leading-relaxed">
          Intelligent mobile apps &amp; high-performance web platforms. We act as your dedicated technical partner.
        </p>

        {/* Primary Mobile CTA Button */}
        <div className="mt-4 w-full max-w-xs flex flex-col gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3.5 px-6 font-sans font-bold text-xs uppercase tracking-wider text-white bg-slate-950 dark:bg-white dark:text-slate-950 rounded-xl shadow-md active:scale-95 transition-all text-center"
          >
            Book Free Discovery Call →
          </button>
          
          <a
            href="#work"
            className="font-mono text-[10px] text-slate-600 dark:text-slate-300 uppercase tracking-widest py-1 block text-left"
          >
            View Case Studies ↓
          </a>
        </div>

        {/* Mobile Compact 3-Pill Highlight Row */}
        <div className="grid grid-cols-3 gap-2 mt-5 w-full max-w-xs">
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200/90 dark:border-white/20 rounded-xl p-2.5 flex flex-col items-start justify-center text-left shadow-xs">
            <span className="text-blue-600 dark:text-blue-300 text-sm mb-0.5">⚡</span>
            <span className="font-sans font-bold text-[10px] text-slate-900 dark:text-white leading-tight">Instant Speed</span>
          </div>
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200/90 dark:border-white/20 rounded-xl p-2.5 flex flex-col items-start justify-center text-left shadow-xs">
            <span className="text-emerald-600 dark:text-emerald-300 text-sm mb-0.5">🔒</span>
            <span className="font-sans font-bold text-[10px] text-slate-900 dark:text-white leading-tight">99.99% Online</span>
          </div>
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200/90 dark:border-white/20 rounded-xl p-2.5 flex flex-col items-start justify-center text-left shadow-xs">
            <span className="text-purple-600 dark:text-purple-300 text-sm mb-0.5">⭐</span>
            <span className="font-sans font-bold text-[10px] text-slate-900 dark:text-white leading-tight">Zero Glitches</span>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 💻 DEDICATED DESKTOP LAYOUT (Asymmetric Side-by-Side Hero) */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 my-auto pt-6 lg:pt-8 pb-6 lg:pb-10 items-center justify-between">
        
        {/* Left Column: Text, Badge, CTA & Metrics (Aligned to Left) */}
        <div className="w-full md:w-[52%] lg:w-[50%] xl:w-[48%] flex flex-col items-start text-left z-10">
          
          {/* Minimal Glass Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-md mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-700 dark:text-slate-100 font-bold">
              Your Dedicated Software Partner
            </span>
          </div>

          {/* Left-Aligned Refined Headline */}
          <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-[1.08] text-slate-900 dark:text-white max-w-2xl">
            SCALABLE DIGITAL PRODUCTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 dark:from-white dark:via-slate-200 dark:to-blue-400">
              FOR MODERN ENTERPRISES.
            </span>
          </h1>

          {/* Left-Aligned Sub-headline */}
          <p className="mt-5 font-sans text-base lg:text-lg text-slate-600 dark:text-slate-200 max-w-xl font-normal leading-relaxed">
            From intelligent cross-platform mobile apps to high-performance web platforms. We act as your dedicated technical partner—delivering on time, without agency overhead.
          </p>

          {/* Action Buttons (Left-Aligned) */}
          <div className="mt-8 flex flex-row items-center gap-4 w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 text-sm font-semibold tracking-wider uppercase text-white bg-slate-950 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer text-center font-sans"
            >
              Book a Free Discovery Call →
            </button>
            
            <a
              href="#work"
              className="font-mono text-xs text-slate-800 dark:text-white uppercase tracking-wider py-3.5 px-6 rounded-xl border border-slate-200 dark:border-white/25 bg-white/80 dark:bg-white/10 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/20 shadow-xs transition-all text-center"
            >
              View Case Studies
            </a>
          </div>

          {/* 3 Floating Metric Cards (Left-Aligned Grid) */}
          <div className="grid grid-cols-3 gap-3.5 lg:gap-4 mt-10 w-full max-w-xl text-left">
            
            {/* Card 1: Speed */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-slate-200/80 dark:border-white/20 shadow-xs hover:shadow-md rounded-2xl p-3.5 flex items-center gap-3 hover:bg-white dark:hover:bg-white/15 transition-all duration-300 group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-300 text-base shrink-0 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">Instant Speed</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-300 font-medium">Sub-Second Loads</span>
              </div>
            </div>

            {/* Card 2: Uptime SLA */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-slate-200/80 dark:border-white/20 shadow-xs hover:shadow-md rounded-2xl p-3.5 flex items-center gap-3 hover:bg-white dark:hover:bg-white/15 transition-all duration-300 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300 text-base shrink-0 group-hover:scale-110 transition-transform">
                🔒
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">99.99% Online</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-300 font-medium">Guaranteed SLA</span>
              </div>
            </div>

            {/* Card 3: Experience */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-slate-200/80 dark:border-white/20 shadow-xs hover:shadow-md rounded-2xl p-3.5 flex items-center gap-3 hover:bg-white dark:hover:bg-white/15 transition-all duration-300 group">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-400/30 flex items-center justify-center text-purple-600 dark:text-purple-300 text-base shrink-0 group-hover:scale-110 transition-transform">
                ⭐
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">Zero Glitches</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-300 font-medium">Flawless Polish</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Open visual interaction space showcasing the 3D Idea Particle Bulb */}
        <div className="hidden md:block md:w-[48%] lg:w-[50%] xl:w-[52%] h-[480px] lg:h-[580px] pointer-events-none select-none" aria-hidden="true" />

      </div>

      {/* Tech Stack Faded Infinite Scrolling Band (Right Below Hero Content) */}
      <div className="relative z-10 w-full py-3.5 sm:py-4 border-t border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#070709]/90 backdrop-blur-md overflow-hidden select-none">
        
        {/* Faded Left & Right Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-[#070709] dark:via-[#070709]/80 dark:to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-[#070709] dark:via-[#070709]/80 dark:to-transparent pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-8 sm:gap-14">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity duration-200 shrink-0 cursor-default"
            >
              <img src={item.logo} alt={item.name} className="w-4 h-4 sm:w-6 sm:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
              <span className="font-sans font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 tracking-wide">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Hero;

