'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className={`w-9 h-9 rounded-full border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 flex items-center justify-center ${className}`}
      >
        <span className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative flex items-center gap-2 p-2 rounded-full border transition-all duration-300 cursor-pointer ${
        isDark
          ? 'border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-primary/40 text-white shadow-[0_0_15px_rgba(221,183,255,0.08)]'
          : 'border-black/10 bg-black/[0.04] hover:bg-black/[0.08] hover:border-indigo-500/40 text-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.04)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <svg
          className={`w-4 h-4 transition-all duration-500 transform absolute ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`w-4 h-4 transition-all duration-500 transform absolute ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-primary'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>

      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-widest font-semibold pr-1">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
