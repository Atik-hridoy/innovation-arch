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
  const centered = align === 'center';

  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <div className={`flex flex-col gap-3 sm:gap-5 md:flex-row md:items-end md:justify-between ${centered ? 'items-center' : ''}`}>
        <div className={`max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          <p className="mb-2.5 sm:mb-3.5 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
          <h2 className="text-balance text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight sm:leading-[1.04] tracking-[-0.035em] sm:tracking-[-0.04em] text-slate-950 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {action && <div className="mt-4 md:mt-0 shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
