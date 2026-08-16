'use client';

import React, { forwardRef } from 'react';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

export const PhaseHero = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-x-3 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-1/2 -translate-y-1/2 flex flex-col items-center text-center transition-all duration-200 pointer-events-auto max-w-5xl mx-auto will-change-transform"
      style={{ opacity: 1 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-emerald-500/30 dark:border-rose-500/30 bg-emerald-500/10 dark:bg-rose-500/10 backdrop-blur-md mb-2 sm:mb-6 shadow-[0_0_20px_rgba(52,211,153,0.2)] dark:shadow-[0_0_20px_rgba(225,29,72,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-red-500 animate-pulse" />
        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.25em] text-emerald-300 dark:text-rose-300 font-semibold">
          Digital Product Studio
        </span>
      </div>

      <h1 className="font-sans font-black text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.92] sm:leading-[0.9] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
        WE CRAFT <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 dark:from-red-500 dark:via-rose-300 dark:to-rose-600">
          TIMELESS
        </span>{' '}
        <span className="font-serif italic font-normal lowercase tracking-tight text-emerald-200 dark:text-rose-200">
          digital
        </span>{' '}
        <br />
        PRODUCTS.
      </h1>

      <p className="mt-2 sm:mt-6 font-sans text-[11px] xs:text-xs sm:text-lg md:text-xl text-emerald-100/90 dark:text-[#f3d5dc] max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
        Architecting next-generation digital ecosystems, intelligent mobile applications, and high-impact brand identities.
      </p>

      <div className="mt-4 sm:mt-8 flex items-center justify-center">
        <a href="#contact" className="pointer-events-auto">
          <RadialGlowButton
            size="md"
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-[0_10px_35px_rgba(40,98,58,0.5)] dark:shadow-[0_10px_35px_rgba(225,29,72,0.5)] active:scale-95 transition-transform"
          >
            Initialize Project →
          </RadialGlowButton>
        </a>
      </div>

      <div className="mt-4 sm:mt-10 flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] text-emerald-300 dark:text-rose-300 uppercase tracking-widest animate-bounce drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
        <span className="material-symbols-outlined text-sm sm:text-base">expand_more</span>
        Scroll to explore
      </div>
    </div>
  );
});

PhaseHero.displayName = 'PhaseHero';
