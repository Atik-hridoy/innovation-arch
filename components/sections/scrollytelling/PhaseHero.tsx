'use client';

import React, { forwardRef, useState } from 'react';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

export const PhaseHero = forwardRef<HTMLDivElement>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-200 pointer-events-auto max-w-5xl mx-auto will-change-transform z-20"
        style={{ opacity: 1 }}
      >
        {/* Minimal pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 mb-4 sm:mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-800 dark:text-slate-200 font-semibold">
            B2B Software Agency &amp; Product Studio
          </span>
        </div>

        {/* Deep Charcoal Headline */}
        <h1 className="font-sans font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-[#0f172a] dark:text-white">
          WE BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 dark:from-white dark:via-slate-200 dark:to-blue-400">
            SCALABLE SOFTWARE
          </span>{' '}
          <br />
          <span className="font-serif italic font-normal lowercase tracking-normal text-slate-600 dark:text-slate-300">
            to grow your
          </span>{' '}
          BUSINESS.
        </h1>

        {/* Sub-headline */}
        <p className="mt-4 sm:mt-6 font-sans text-xs xs:text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed">
          From intelligent mobile apps to high-performance web platforms, we act as your dedicated technical partner to scale your business risk-free.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#0f172a] hover:bg-black rounded-xl shadow-md shadow-slate-900/10 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Book a Free Discovery Call →
          </button>
          
          <a
            href="#work"
            className="font-mono text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 uppercase tracking-wider py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 transition-all"
          >
            Explore Case Studies
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 sm:mt-10 flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest animate-bounce">
          <span className="material-symbols-outlined text-sm">expand_more</span>
          Scroll to explore capabilities
        </div>
      </div>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
});

PhaseHero.displayName = 'PhaseHero';
