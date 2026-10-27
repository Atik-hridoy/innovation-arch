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

export function SectionHeader({ eyebrow, title, description, align = 'left', className = '', action }: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-10 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${centered ? 'items-center' : ''}`}>
        <div className={`max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
