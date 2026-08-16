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
      className={`w-full relative mb-8 md:mb-16 z-10 ${className}`}
    >

      {/* Foreground Header Content */}
      <div
        className={`relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none ${
          isCenter ? 'text-center items-center' : 'text-left items-start'
        }`}
      >
        <div className={`flex flex-col gap-3 md:gap-4 max-w-3xl ${isCenter ? 'items-center' : 'items-start'}`}>
          {/* Unified Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 dark:border-primary/20 bg-emerald-500/10 dark:bg-primary/10 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-emerald-300 dark:text-primary uppercase backdrop-blur-md pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-primary animate-pulse" />
            {eyebrow}
          </div>

          {/* Unified Display Title */}
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.95] select-none">
            {title}
          </h2>

          {/* Unified Description Subtitle */}
          {description && (
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/80 dark:text-neutral-300 max-w-2xl leading-relaxed font-normal pt-1 select-none">
              {description}
            </p>
          )}
        </div>

        {/* Right Side Action (Navigation arrows, filter tabs, etc.) */}
        {action && <div className="flex items-center gap-4 flex-shrink-0 relative z-20 pointer-events-auto">{action}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
