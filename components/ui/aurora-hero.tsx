'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface AuroraHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function AuroraHeroBg({ className, ...props }: AuroraHeroProps) {
  return (
    <div
      className={cn('aurora-hero-wrapper absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0', className)}
      {...props}
    >
      <style>{`
        .aurora-hero-wrapper {
          --stripe-color: #080103;
          --bg-filter: blur(28px) opacity(65%) saturate(220%);
          background: transparent;
        }
        @keyframes smoothAuroraBg {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        .aurora-hero-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          --stripes: repeating-linear-gradient(
            115deg, 
            rgba(8,1,3,0.9) 0%, 
            rgba(8,1,3,0.9) 8%, 
            transparent 12%, 
            transparent 15%, 
            rgba(8,1,3,0.9) 20%
          );
          --rainbow: repeating-linear-gradient(
            115deg, 
            #e11d48 10%, 
            #be123c 16%, 
            #fb7185 22%, 
            #f43f5e 28%, 
            #fda4af 34%,
            #e11d48 40%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: var(--bg-filter);
          mask-image: radial-gradient(ellipse at 50% 40%, black 50%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 40%, black 50%, transparent 80%);
        }
        .aurora-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: smoothAuroraBg 45s linear infinite;
          mix-blend-mode: color-dodge;
          opacity: 0.6;
        }
      `}</style>

      <div className="aurora-hero-bg" />
    </div>
  );
}

export default AuroraHeroBg;
