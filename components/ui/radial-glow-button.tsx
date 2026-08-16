'use client';

import React from 'react';

export interface RadialGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'emerald' | 'amber' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export function RadialGlowButton({
  children = 'Get Started',
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: RadialGlowButtonProps) {
  const sizeClasses = {
    sm: 'min-w-[120px] min-h-[42px] px-4 py-2 text-xs',
    md: 'min-w-[150px] min-h-[48px] px-6 py-3 text-sm',
    lg: 'min-w-[180px] min-h-[54px] px-8 py-4 text-base font-semibold',
  }[size];

  return (
    <div className="relative inline-block group/rgb">
      <style>{`
        @property --rg-pos-x { syntax: '<percentage>'; initial-value: 50%; inherits: false; }
        @property --rg-pos-y { syntax: '<percentage>'; initial-value: 130%; inherits: false; }
        @property --rg-spread-x { syntax: '<percentage>'; initial-value: 130%; inherits: false; }
        @property --rg-spread-y { syntax: '<percentage>'; initial-value: 170%; inherits: false; }
        @property --rg-color-1 { syntax: '<color>'; initial-value: #021a11; inherits: false; }
        @property --rg-color-2 { syntax: '<color>'; initial-value: #063c26; inherits: false; }
        @property --rg-color-3 { syntax: '<color>'; initial-value: #0e653d; inherits: false; }
        @property --rg-color-4 { syntax: '<color>'; initial-value: #34d399; inherits: false; }
        @property --rg-color-5 { syntax: '<color>'; initial-value: hsl(156 90% 4%); inherits: false; }
        @property --rg-border-angle { syntax: '<angle>'; initial-value: 180deg; inherits: true; }
        @property --rg-border-color-1 { syntax: '<color>'; initial-value: hsla(156, 75%, 85%, 0.6); inherits: true; }
        @property --rg-border-color-2 { syntax: '<color>'; initial-value: hsla(156, 50%, 85%, 0.15); inherits: true; }
        @property --rg-stop-1 { syntax: '<percentage>'; initial-value: 30%; inherits: false; }
        @property --rg-stop-2 { syntax: '<percentage>'; initial-value: 55%; inherits: false; }
        @property --rg-stop-3 { syntax: '<percentage>'; initial-value: 75%; inherits: false; }
        @property --rg-stop-4 { syntax: '<percentage>'; initial-value: 92%; inherits: false; }
        @property --rg-stop-5 { syntax: '<percentage>'; initial-value: 100%; inherits: false; }

        .rg-button {
          --transition: 0.25s;
          --spark: 1.8s;
          --speed: 1.2s;
          --cut: 1px;
          --bg: radial-gradient(
            var(--rg-spread-x) var(--rg-spread-y) at var(--rg-pos-x) var(--rg-pos-y),
            rgba(40, 98, 58, 0.8) var(--rg-stop-1),
            rgba(22, 54, 41, 0.75) var(--rg-stop-2),
            rgba(15, 32, 39, 0.7) var(--rg-stop-3),
            rgba(52, 211, 153, 0.45) var(--rg-stop-4),
            rgba(15, 32, 39, 0.6) var(--rg-stop-5)
          );
          
          position: relative;
          border: none;
          border-radius: 9999px;
          font-family: inherit;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.98);
          background: var(--bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: pointer;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 10px 30px -10px rgba(52, 211, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transition: 
            transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s ease,
            --rg-pos-x .75s, --rg-pos-y .75s,
            --rg-spread-x .75s, --rg-spread-y .75s,
            --rg-color-1 .75s, --rg-color-2 .75s, --rg-color-3 .75s, --rg-color-4 .75s, --rg-color-5 .75s,
            --rg-border-angle .75s, --rg-border-color-1 .75s, --rg-border-color-2 .75s,
            --rg-stop-1 .75s, --rg-stop-2 .75s, --rg-stop-3 .75s, --rg-stop-4 .75s, --rg-stop-5 .75s;
        }

        .dark .rg-button {
          --bg: radial-gradient(
            var(--rg-spread-x) var(--rg-spread-y) at var(--rg-pos-x) var(--rg-pos-y),
            var(--rg-color-1) var(--rg-stop-1),
            var(--rg-color-2) var(--rg-stop-2),
            var(--rg-color-3) var(--rg-stop-3),
            var(--rg-color-4) var(--rg-stop-4),
            var(--rg-color-5) var(--rg-stop-5)
          );
          box-shadow: 0 10px 30px -10px rgba(52, 211, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .rg-button::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background-image: linear-gradient(var(--rg-border-angle), rgba(52, 211, 153, 0.7), rgba(255, 255, 255, 0.2));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }

        .rg-button:hover {
          --rg-pos-x: 0%;
          --rg-pos-y: 120%;
          --rg-spread-x: 115%;
          --rg-spread-y: 115%;
          --rg-color-1: #032014;
          --rg-color-2: #34d399;
          --rg-color-3: #10b981;
          --rg-color-4: #059669;
          --rg-stop-1: 0%;
          --rg-stop-2: 12%;
          --rg-stop-3: 38%;
          --rg-stop-4: 75%;
          --rg-stop-5: 150%;
          --rg-border-angle: 190deg;
          --rg-border-color-1: hsla(156, 85%, 90%, 0.8);
          --rg-border-color-2: hsla(156, 60%, 90%, 0.4);
          --button-line-opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -8px rgba(52, 211, 153, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .rg-button:active {
          transform: translateY(0px) scale(0.98);
        }

        .rg-label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
        }

        .rg-bg {
          position: absolute;
          inset: var(--cut);
          background: var(--bg);
          border-radius: inherit;
          transition: background var(--transition), opacity var(--transition);
        }

        .rg-shine {
          position: absolute;
          inset: 0;
          container-type: size;
          border-radius: inherit;
          mix-blend-mode: soft-light;
          opacity: var(--button-line-opacity, 0);
          transition: opacity 0.3s;
          overflow: visible;
        }

        .rg-shine span {
          position: absolute;
          inset: 0;
          height: 100cqh;
          aspect-ratio: 1;
          animation: rg-slide var(--speed) ease-in-out infinite alternate;
          overflow: visible;
        }

        .rg-shine span::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from calc(270deg - (90deg * 0.5)),
            transparent 0,
            #fff 90deg,
            transparent 90deg
          );
          animation: rg-spin calc(var(--speed) * 2) infinite linear;
        }

        @keyframes rg-spin {
          0% { rotate: 0deg; }
          15%, 35% { rotate: 90deg; }
          65%, 85% { rotate: 270deg; }
          100% { rotate: 360deg; }
        }

        @keyframes rg-slide {
          to { transform: translate(calc(100cqw - 100%), 0); }
        }
      `}</style>
      
      <button
        className={`rg-button ${sizeClasses} ${className}`}
        type={props.type || 'button'}
        {...props}
      >
        <span className="rg-shine">
          <span></span>
        </span>
        <span className="rg-bg"></span>
        <span className="rg-label">{children}</span>
      </button>
    </div>
  );
}

export default RadialGlowButton;
