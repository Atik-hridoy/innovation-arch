'use client';

import React from 'react';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
  enableTrail?: boolean;
  trailImages?: string[];
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  action,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`w-full relative mb-8 md:mb-14 z-10 ${className}`}
    >
      <div
        className={`relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none ${
          isCenter ? 'text-center items-center' : 'text-left items-start'
        }`}
      >
        <div className={`flex flex-col gap-2.5 md:gap-3 max-w-3xl ${isCenter ? 'items-center' : 'items-start'}`}>
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-blue-700 dark:text-blue-300 uppercase pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            {eyebrow}
          </div>

          {/* Display Title */}
          <h2 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white uppercase tracking-tight leading-[0.98] select-none">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal select-none">
              {description}
            </p>
          )}
        </div>

        {action && <div className="flex items-center gap-4 flex-shrink-0 relative z-20 pointer-events-auto">{action}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
