'use client';

import React, { useState, useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function FounderProfile() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Founder, 1 = CTO
  
  // Pure touch swipe handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 30;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      // Swiped Left -> show CTO
      setActiveIndex(1);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> show Founder
      setActiveIndex(0);
    }
  };

  // Founder Tech Stack Data with Icons
  const founderTechList = [
    { name: 'Next.js 15', icon: 'terminal' },
    { name: 'React 19', icon: 'hub' },
    { name: 'TypeScript', icon: 'code' },
    { name: 'Tailwind CSS', icon: 'palette' },
    { name: 'GSAP Motion', icon: 'animation' },
    { name: 'Three.js', icon: '3d_rotation' },
    { name: 'Flutter App', icon: 'smartphone' },
    { name: 'System Architecture', icon: 'architecture' },
    { name: 'GraphQL', icon: 'api' },
  ];

  // CTO Tech Stack Data with Icons
  const ctoTechList = [
    { name: 'Django', icon: 'memory' },
    { name: 'FastAPI', icon: 'bolt' },
    { name: 'PyTorch Deep Learning', icon: 'local_fire_department' },
    { name: 'LLM Agents', icon: 'psychology' },
    { name: 'Vector DB Search', icon: 'database' },
    { name: 'LangChain', icon: 'link' },
    { name: 'Python Async', icon: 'terminal' },
    { name: 'PostgreSQL', icon: 'storage' },
    { name: 'Docker Cloud', icon: 'view_in_ar' },
  ];

  // Profile Card Components
  const founderCard = (
    <div key="founder" className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111116] p-6 lg:p-8 shadow-xs flex flex-col justify-between transition-all duration-500 hover:border-blue-500/50">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-600/40 p-1 bg-gradient-to-b from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden shrink-0 shadow-xs">
            <img
              src="/images/founder_portrait.jpg"
              alt="Atik Hridoy - Founder & Principal Architect"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-600 dark:bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/40 w-fit mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-blue-700 dark:text-blue-300 font-bold">FOUNDER</span>
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
              Atik Hridoy
            </h3>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mt-0.5">
              Founder &amp; Principal Architect
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400">school</span>
              B.Sc. CSE — BRAC University
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          &ldquo;Combining academic CSE rigor with 5+ years of software architecture to deliver high-performance digital products, cross-platform apps, and enterprise websites with zero agency overhead.&rdquo;
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase text-blue-600 dark:text-blue-400 font-bold">01 // ACADEMIC</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">BRAC CSE</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Computer science foundation.</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase text-emerald-600 dark:text-emerald-400 font-bold">02 // EXPERIENCE</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">5+ Years</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Full-stack software systems.</span>
          </div>
        </div>
      </div>

      {/* Continuous Moving Tech Marquee Ticker with Icons */}
      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-blue-700 dark:text-blue-400 font-bold">
            CORE TECH &amp; SYSTEM STACK
          </span>
        </div>
        <div className="relative w-full overflow-hidden py-1">
          <div className="animate-marquee flex items-center gap-2.5 whitespace-nowrap">
            {[...founderTechList, ...founderTechList].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/50 shrink-0 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400 shrink-0">
                  {tech.icon}
                </span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ctoCard = (
    <div key="cto" className="w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111116] p-6 lg:p-8 shadow-xs flex flex-col justify-between transition-all duration-500 hover:border-indigo-500/50">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-indigo-600/40 p-1 bg-gradient-to-b from-indigo-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden shrink-0 shadow-xs">
            <img
              src="/images/cto_portrait.jpg"
              alt="Chief Technology Officer & AI Architect"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 w-fit mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-700 dark:text-indigo-300 font-bold">CTO</span>
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
              CTO &amp; AI Lead
            </h3>
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
              Backend &amp; AI Systems Lead
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-indigo-600 dark:text-indigo-400">school</span>
              B.Sc. CSE — Neijiang Normal Univ, Sichuan, China
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          &ldquo;Architecting bulletproof backend infrastructure with Django and FastAPI while implementing custom PyTorch neural networks and LLM agent pipelines to automate complex business workflows.&rdquo;
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase text-indigo-600 dark:text-indigo-400 font-bold">01 // BACKEND API</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">Django &amp; FastAPI</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">High-concurrency systems.</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col gap-0.5">
            <span className="font-mono text-[9px] uppercase text-purple-600 dark:text-purple-400 font-bold">02 // AI &amp; MODELS</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">PyTorch &amp; LLMs</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Neural nets &amp; vector search.</span>
          </div>
        </div>
      </div>

      {/* Continuous Moving Tech Marquee Ticker with Icons */}
      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-700 dark:text-indigo-400 font-bold">
            AI &amp; BACKEND TECH ENGINE
          </span>
        </div>
        <div className="relative w-full overflow-hidden py-1">
          <div className="animate-marquee flex items-center gap-2.5 whitespace-nowrap">
            {[...ctoTechList, ...ctoTechList].map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/50 shrink-0 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm text-indigo-600 dark:text-indigo-400 shrink-0">
                  {tech.icon}
                </span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="w-full relative z-10 py-12 md:py-24 bg-slate-50/80 dark:bg-[#070709] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        
        <SectionHeader
          eyebrow="LEADERSHIP & ENGINEERING RIGOR"
          title="MEET OUR LEADERSHIP"
          description="Combining global computer science research, robust backend engineering, and production AI architecture."
        />

        {/* ========================================================= */}
        {/* 📱 PURE ORGANIC TOUCH SWIPEABLE MOBILE CAROUSEL */}
        {/* ========================================================= */}
        <div className="md:hidden mt-6">
          <div
            className="w-full touch-pan-y relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="w-full shrink-0 px-0.5">
                {founderCard}
              </div>
              <div className="w-full shrink-0 px-0.5">
                {ctoCard}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 💻 SIDE-BY-SIDE DESKTOP DUAL LEADERSHIP GRID */}
        {/* ========================================================= */}
        <div className="hidden md:block mt-8">
          <div className="grid grid-cols-2 gap-8">
            {founderCard}
            {ctoCard}
          </div>

          {/* Engineering Culture Showcase Banner */}
          <div className="mt-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111116] p-4 sm:p-6 shadow-xs overflow-hidden group">
            <div className="relative w-full aspect-[21/7] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src="/images/modern_workspace.jpg"
                alt="Modern Software Engineering Team Collaboration Studio"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    ENGINEERING CULTURE &amp; TECHNICAL LEADERSHIP
                  </span>
                  <span className="font-sans font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Direct CTO &amp; Architect Access — Scalable AI &amp; Enterprise Backends
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FounderProfile;

