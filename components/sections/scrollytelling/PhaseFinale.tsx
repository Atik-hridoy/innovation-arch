'use client';

import React, { forwardRef } from 'react';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

export const PhaseFinale = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-300 pointer-events-none max-w-5xl mx-auto will-change-transform"
      style={{ opacity: 0 }}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-emerald-500/30 dark:border-red-500/30 bg-emerald-950/85 dark:bg-[#160206]/85 font-mono text-[9px] sm:text-xs text-emerald-300 dark:text-rose-300 uppercase tracking-[0.2em] mb-2.5 sm:mb-4 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        DEPLOYMENT GATEWAY READY
      </div>

      <h2 className="font-sans font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.94] text-emerald-200 dark:text-rose-300 drop-shadow-[0_30px_70px_rgba(0,0,0,1)] max-w-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600 dark:from-red-500 dark:via-rose-400 dark:to-rose-600 drop-shadow-[0_10px_30px_rgba(52,211,153,0.5)] dark:drop-shadow-[0_10px_30px_rgba(225,29,72,0.5)]">
          PARTNER WITH
        </span>
        <br />
        <span className="font-serif italic font-normal lowercase tracking-normal text-emerald-300 dark:text-rose-300 text-3xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_20px_50px_rgba(40,98,58,0.6)] dark:drop-shadow-[0_20px_50px_rgba(225,29,72,0.6)]">
          innovation ark.
        </span>
      </h2>

      <p className="font-sans text-[11px] sm:text-base md:text-lg text-emerald-100 dark:text-rose-100 font-normal tracking-wide mt-2.5 sm:mt-6 max-w-xl leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] px-1 antialiased">
        Transform your vision into an industry-defining digital powerhouse. Let&apos;s build your next high-performance platform together.
      </p>

      <div className="mt-4 sm:mt-8 flex justify-center">
        <a href="#contact" className="pointer-events-auto">
          <RadialGlowButton size="sm" className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase !min-w-[180px] sm:!min-w-[220px] !h-[42px] sm:!h-[52px] !px-6 sm:!px-8 !bg-gradient-to-r !from-[#0F2027] !to-[#28623A] dark:!from-red-600 dark:!to-rose-900 shadow-[0_0_30px_rgba(52,211,153,0.5)] dark:shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-emerald-500/40 dark:border-red-500/40 text-emerald-100 dark:text-rose-100 whitespace-nowrap">
            Start Your Project
            <span className="material-symbols-outlined text-sm sm:text-base ml-1.5">arrow_forward</span>
          </RadialGlowButton>
        </a>
      </div>
    </div>
  );
});

PhaseFinale.displayName = 'PhaseFinale';
