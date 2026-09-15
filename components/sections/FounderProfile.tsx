'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function FounderProfile() {
  return (
    <section id="about" className="w-full relative z-10 py-12 md:py-24 bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
      <SectionHeader
        eyebrow="LEADERSHIP & ENGINEERING RIGOR"
        title="MEET THE FOUNDER"
        description="Combining academic computer science excellence with production-level software architecture."
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm transition-colors duration-300">
        
        {/* Left Column: Founder Badge */}
        <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-blue-600/40 p-1 bg-gradient-to-b from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 mb-4 overflow-hidden shadow-sm">
            <img
              src="/images/founder_portrait.jpg"
              alt="Atik Hridoy - Founder & Principal Architect"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-blue-600 dark:bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[11px] text-white font-bold shadow-xs">
              ✓
            </div>
          </div>

          <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
            Atik Hridoy
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold mt-1">
            Founder &amp; Principal Architect
          </span>

          <div className="mt-4 flex flex-col gap-2 w-full pt-4 border-t border-slate-200 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">school</span>
              <span><strong>B.Sc. CSE</strong> — BRAC University</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">workspace_premium</span>
              <span>5+ Years Production Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">code</span>
              <span>Flutter / Next.js / Django Expert</span>
            </div>
          </div>
        </div>

        {/* Right Column: Founder Narrative & Bio */}
        <div className="lg:col-span-8 flex flex-col gap-5 text-slate-900 dark:text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-700 dark:text-blue-300 font-bold">
              Academic Rigor Meets Real Business Execution
            </span>
          </div>

          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight leading-snug">
            &ldquo;With a solid academic foundation in Computer Science &amp; Engineering from BRAC University and years of production-level experience, I bridge the gap between rigorous software architecture and real-world business growth.&rdquo;
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            We don&apos;t just write code; we build digital assets. Working directly with me as your lead architect means zero communication gaps, no bloated agency overhead, and enterprise-grade software delivered on time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase text-blue-600 dark:text-blue-400 font-bold">01 // Academic Foundation</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">BRAC University CSE</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Solid computer science &amp; data structure principles.</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase text-slate-700 dark:text-slate-300 font-bold">02 // Modern Stack</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Flutter / Next / Django</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Cross-platform mobile apps &amp; high-throughput APIs.</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase text-emerald-600 dark:text-emerald-400 font-bold">03 // Client Guarantee</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Zero Agency Overhead</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Direct access to decision-makers &amp; 100% IP transfer.</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex font-sans font-semibold text-xs tracking-wider uppercase bg-[#0f172a] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Schedule Founder Call →
            </a>
          </div>
        </div>
      </div>

      {/* Engineering Culture & Team Collaboration Showcase Frame */}
      <div className="mt-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm overflow-hidden group">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/8] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
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
                ENGINEERING CULTURE &amp; TEAM COLLABORATION
              </span>
              <span className="font-sans font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                Dedicated Engineers Working Directly With You — Zero Agency Layers
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
