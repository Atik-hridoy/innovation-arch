'use client';

import { useState } from 'react';
import type { FeatureItem } from '@/components/services/data';

interface MobileIconsRowProps {
  features: FeatureItem[];
  themeColor: string;
}

export function MobileIconsRow({ features, themeColor }: MobileIconsRowProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="md:hidden flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-2xl border border-white/8 bg-[#08080a]/80 backdrop-blur-xl">
        {features.map((feat, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={feat.title}
              onClick={() => setActiveIdx(isActive ? null : idx)}
              className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(221,183,255,0.3)]'
                  : 'border-white/5 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/15'
              }`}
            >
              <span className="material-symbols-outlined text-xl" style={{ color: isActive ? undefined : themeColor }}>
                {feat.icon}
              </span>
              <span className="font-mono text-[7px] uppercase tracking-widest font-bold opacity-60">
                {feat.spec}
              </span>
            </button>
          );
        })}
      </div>

      {activeIdx !== null && (
        <div className="p-4 rounded-2xl border border-primary/30 bg-[#0a0a0d]/90 backdrop-blur-2xl flex flex-col gap-1.5 animate-[fadeSlideIn_0.25s_ease-out] relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold">
              {features[activeIdx].spec} // FEATURE DETAILS
            </span>
            <button
              onClick={() => setActiveIdx(null)}
              className="text-white/40 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          </div>
          <h4 className="font-sans font-bold text-xs text-white tracking-wide">
            {features[activeIdx].title}
          </h4>
          <p className="font-mono text-[10px] text-white/60 leading-relaxed">
            {features[activeIdx].desc}
          </p>
        </div>
      )}
    </div>
  );
}
