import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export function Logo({ className = '', showText = true, layout = 'horizontal' }: LogoProps) {
  const isVertical = layout === 'vertical';

  return (
    <div className={`flex ${isVertical ? 'flex-col items-center text-center gap-6' : 'items-center gap-3'} group select-none ${className}`}>
      
      {/* 3D Volumetric SVG Logo Icon Container */}
      <div 
        className={`relative flex items-center justify-center transition-transform duration-500 ease-out ${
          isVertical 
            ? 'w-36 h-36 md:w-44 md:h-44 animate-float-3d' 
            : 'w-11 h-11 transform group-hover:scale-105'
        }`}
        style={{
          perspective: '400px',
        }}
      >
        {/* Hover/Ambient Radial Glow behind logo */}
        <div className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-700 pointer-events-none ${
          isVertical ? 'opacity-70 scale-110' : 'opacity-0 group-hover:opacity-100'
        }`} />

        <svg
          viewBox="0 0 200 200"
          className={`w-full h-full relative z-10 ${
            !isVertical ? 'transform group-hover:rotate-x-12 group-hover:rotate-y-12 transition-transform duration-700 ease-out' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Shadow Filter */}
            <filter id="shadow-3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
            </filter>

            {/* Volumetric Gradients */}
            <linearGradient id="gradient-i" x1="40" y1="40" x2="64" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#002d62" />
              <stop offset="50%" stopColor="#004b8d" />
              <stop offset="100%" stopColor="#001835" />
            </linearGradient>

            <linearGradient id="gradient-a" x1="72" y1="40" x2="164" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#efeff3" />
              <stop offset="30%" stopColor="#b5b5be" />
              <stop offset="70%" stopColor="#7a7a85" />
              <stop offset="100%" stopColor="#45454d" />
            </linearGradient>

            <linearGradient id="gradient-wave" x1="90" y1="145" x2="180" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#001f4d" />
              <stop offset="50%" stopColor="#0056b3" />
              <stop offset="100%" stopColor="#00bfff" />
            </linearGradient>
          </defs>

          {/* Group containing actual letters */}
          <g>
            {/* Letter 'I' */}
            <rect
              x="36"
              y="40"
              width="25"
              height="100"
              rx="2"
              fill="url(#gradient-i)"
              filter="url(#shadow-3d)"
            />

            {/* Letter 'A' */}
            <path
              d="M 72 140 L 110 40 L 126 40 L 164 140 L 138 140 L 130 115 L 106 115 L 98 140 Z M 118 58 L 109 100 L 127 100 Z"
              fill="url(#gradient-a)"
              filter="url(#shadow-3d)"
              fillRule="evenodd"
            />

            {/* Dynamic Circuit Waves */}
            <path
              d="M 94 135 C 100 110, 125 90, 160 70 C 168 64, 175 52, 182 42"
              stroke="url(#gradient-wave)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#shadow-3d)"
            />
            <path
              d="M 112 140 C 120 122, 138 112, 168 92"
              stroke="url(#gradient-wave)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#shadow-3d)"
            />

            {/* Wave node circles */}
            <circle cx="94" cy="135" r="4" fill="#00bfff" />
            <circle cx="112" cy="140" r="3.5" fill="#0056b3" />

            {/* Floating digital pixels */}
            <rect x="164" y="44" width="7" height="7" rx="1" fill="#00bfff" filter="url(#shadow-3d)" />
            <rect x="174" y="36" width="9" height="9" rx="1.5" fill="#0056b3" filter="url(#shadow-3d)" />
            <rect x="176" y="50" width="6" height="6" rx="1" fill="#002d62" filter="url(#shadow-3d)" />
            <rect x="166" y="60" width="8" height="8" rx="1" fill="#efeff3" filter="url(#shadow-3d)" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${isVertical ? 'items-center' : 'items-start'}`}>
          <span className={`font-sans font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 group-hover:to-primary transition-all duration-500 ${
            isVertical 
              ? 'text-[24px] md:text-[28px] tracking-[0.1em]' 
              : 'text-[17px] tracking-wider animate-typewriter'
          }`}>
            INNOVATION <span className="text-[#00bfff]">ARK</span>
          </span>
          {isVertical && (
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.22em] text-on-surface-variant/50 uppercase mt-2">
              END-TO-END TECH | WEB & AI BUILDER
            </span>
          )}
        </div>
      )}
    </div>
  );
}
