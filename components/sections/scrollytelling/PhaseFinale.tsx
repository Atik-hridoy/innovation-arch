'use client';

import React, { forwardRef, useState } from 'react';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

export const PhaseFinale = forwardRef<HTMLDivElement>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        ref={ref}
        className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300 pointer-events-none max-w-5xl mx-auto will-change-transform z-20"
        style={{ opacity: 0 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[9px] sm:text-xs text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          RISK-FREE TECHNICAL PARTNERSHIP
        </div>

        <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.94] text-slate-900 dark:text-white max-w-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600 dark:from-white dark:via-slate-200 dark:to-blue-400">
            PARTNER WITH
          </span>
          <br />
          <span className="font-serif italic font-normal lowercase tracking-normal text-slate-700 dark:text-slate-300 text-3xl sm:text-6xl md:text-8xl lg:text-9xl">
            innovative arc.
          </span>
        </h2>

        <p className="font-sans text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal tracking-wide mt-3 sm:mt-6 max-w-xl leading-relaxed px-1">
          Transform your product vision into a high-converting digital platform. Let&apos;s build your next scalable business solution together.
        </p>

        <div className="mt-6 sm:mt-8 flex justify-center pointer-events-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase bg-[#0f172a] hover:bg-black text-white px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
          >
            Book a Free Discovery Call →
          </button>
        </div>
      </div>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
});

PhaseFinale.displayName = 'PhaseFinale';
