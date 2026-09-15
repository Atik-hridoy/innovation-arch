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
    <a href="/" className={`flex ${isVertical ? 'flex-col items-center text-center gap-4' : 'items-center gap-3'} group select-none ${className}`}>
      
      {/* Official 3D Ribbon iA Emblem Logo Mark (High-Visibility Dark Mode Filters) */}
      <div className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 rounded-xl p-0.5 dark:bg-blue-500/10 dark:border dark:border-blue-500/20 ${
        isVertical ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-8 h-8 sm:w-10 sm:h-10'
      }`}>
        <img
          src="/images/logo_mark.png"
          alt="Innovation Ark Logo Mark"
          className="w-full h-full object-contain transition-all duration-300 filter drop-shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:brightness-125 dark:contrast-125 dark:drop-shadow-[0_0_14px_rgba(59,130,246,0.8)]"
        />
      </div>

      {showText && (
        <div className={`${isVertical ? 'flex flex-col items-center' : 'hidden sm:flex flex-col items-start'}`}>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-sans font-black uppercase tracking-tight text-slate-900 dark:text-white text-lg sm:text-xl">
              INNOVATION
            </span>
            <span className="font-sans font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 dark:from-blue-400 dark:via-cyan-300 dark:to-sky-200 text-lg sm:text-xl">
              ARK
            </span>
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] text-slate-500 dark:text-slate-300 uppercase font-bold mt-1">
            TECH PLATFORM
          </span>
        </div>
      )}
    </a>
  );
}

export default Logo;



