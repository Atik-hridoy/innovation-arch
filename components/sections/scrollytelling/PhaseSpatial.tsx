'use client';

import React, { forwardRef } from 'react';

export const PhaseSpatial = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-[30%] sm:top-1/2 sm:-translate-y-1/2 right-3 sm:right-6 md:right-10 lg:right-12 xl:right-16 max-w-[245px] xs:max-w-[270px] sm:max-w-[390px] lg:max-w-[430px] flex flex-col items-end text-right transition-all duration-200 ml-auto pointer-events-none [perspective:1000px] will-change-transform"
      style={{ opacity: 0 }}
    >
      <div className="w-full relative group p-3.5 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] bg-white/[0.14] dark:bg-white/[0.09] backdrop-blur-3xl border border-white/[0.28] dark:border-white/[0.22] shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col items-end">
        <div className="absolute top-0 inset-x-5 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />
        
        <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2.5">
          <span className="font-mono text-[7.5px] sm:text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/25 dark:bg-rose-500/25 border border-emerald-400/30 dark:border-rose-400/30 text-emerald-200 dark:text-rose-200 font-semibold">
            120 FPS
          </span>
          <div className="px-2.5 py-0.5 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/[0.25] flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <span className="font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.16em] text-white font-bold">
              SPATIAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-rose-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] dark:shadow-[0_0_6px_rgba(251,113,133,0.9)]" />
          </div>
        </div>

        <h2 className="font-sans font-black text-xs sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-300 dark:via-rose-100 dark:to-rose-300">
            EXPERIENCES
          </span>{' '}
          <span className="font-serif italic font-normal lowercase tracking-normal text-emerald-200 dark:text-rose-200 text-sm sm:text-4xl">
            beyond.
          </span>
        </h2>

        <p className="font-sans text-[10.5px] sm:text-sm text-white/90 font-normal leading-relaxed mt-1 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
          120 FPS sub-pixel GPU spatial interactions, fluid 3D motion, and memorable experiences.
        </p>

        <div className="mt-2 sm:mt-4 flex flex-wrap justify-end gap-1.5 sm:gap-2 text-[8.5px] sm:text-[11px] font-mono text-white/90">
          <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">GPU Accelerated</span>
          <span className="px-2.5 py-0.5 rounded-full border border-white/[0.2] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">Sub-Pixel</span>
        </div>
      </div>
    </div>
  );
});

PhaseSpatial.displayName = 'PhaseSpatial';
