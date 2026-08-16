'use client';

import React from 'react';

export interface StaggerTextProps {
  children: React.ReactNode;
  delay?: number;
  divideBy?: 'word' | 'letter';
  className?: string;
}

export function StaggerText({
  children,
  delay = 0,
  divideBy = 'word',
  className = '',
}: StaggerTextProps) {
  if (typeof children !== 'string') {
    if (typeof children === 'number' || typeof children === 'boolean') {
      children = String(children);
    } else {
      return <span className={className}>{children}</span>;
    }
  }

  const text = children as string;
  const parts = divideBy === 'letter' ? text.split('') : text.split(' ');
  const step = divideBy === 'letter' ? 0.03 : 0.08;

  return (
    <span className={`inline-block ${className}`}>
      {parts.map((part, i) => {
        const itemDelay = delay + i * step;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden relative"
            style={{ verticalAlign: 'top' }}
          >
            <span
              className="inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                animation: `vengenceStaggerUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${itemDelay}s both`,
              }}
            >
              {divideBy === 'letter'
                ? part === ' '
                  ? '\u00A0'
                  : part
                : part + '\u00A0'}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default StaggerText;
