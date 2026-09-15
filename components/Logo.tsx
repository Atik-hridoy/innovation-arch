import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  isHero?: boolean;
}

export function Logo({ className = '', showText = true, layout = 'horizontal' }: LogoProps) {
  const isVertical = layout === 'vertical';

  return (
    <a href="/" className={`flex ${isVertical ? 'flex-col items-center text-center gap-4' : 'items-center gap-2.5'} group select-none ${className}`}>
      
      {/* Minimalist SVG Icon */}
      <div className={`relative flex items-center justify-center transition-transform duration-300 ${
        isVertical ? 'w-16 h-16' : 'w-8 h-8'
      }`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pitch Black / Slate 900 Arch Geometry (White in Dark Mode) */}
          <path
            d="M 20 80 L 50 20 L 80 80 L 65 80 L 50 50 L 35 80 Z"
            className="fill-[#0f172a] dark:fill-white transition-colors duration-200"
          />
          {/* Royal Blue Accent Dot */}
          <circle cx="50" cy="36" r="6" fill="#2563eb" />
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${isVertical ? 'items-center' : 'items-start'}`}>
          <span className="font-sans font-extrabold uppercase tracking-tight text-[#0f172a] dark:text-white text-[17px]">
            INNOVATIVE <span className="text-[#2563eb]">ARC</span>
          </span>
          {isVertical && (
            <span className="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase mt-1">
              B2B SOFTWARE AGENCY
            </span>
          )}
        </div>
      )}
    </a>
  );
}
