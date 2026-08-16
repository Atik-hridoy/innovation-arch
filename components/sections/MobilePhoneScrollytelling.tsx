'use client';

import React from 'react';

interface MobilePhoneScrollytellingProps {
  scrollProgress: number;
}

export function MobilePhoneScrollytelling({ scrollProgress }: MobilePhoneScrollytellingProps) {
  // Translate app screen vertically as user scrolls through the 6 phases (0 to 500% offset)
  const appScrollY = Math.min(1, Math.max(0, scrollProgress)) * 500;

  return (
    <div className="md:hidden relative w-full flex justify-center items-center pointer-events-none pt-2">
      {/* ── 3D Titanium Smartphone Mockup Frame ── */}
      <div className="relative w-[215px] xs:w-[235px] h-[330px] xs:h-[355px] rounded-[36px] p-2 bg-gradient-to-b from-[#40121d] via-[#1f060d] to-[#0c0104] border-[2px] border-rose-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(225,29,72,0.25)]">
        {/* Specular Edge Sheen */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-rose-300/60 to-transparent" />
        
        {/* Ambient Side Antenna / Button Accents */}
        <div className="absolute -left-[3.5px] top-16 w-[2px] h-6 bg-rose-500/50 rounded-l" />
        <div className="absolute -left-[3.5px] top-24 w-[2px] h-10 bg-rose-500/50 rounded-l" />
        <div className="absolute -right-[3.5px] top-20 w-[2px] h-12 bg-rose-500/50 rounded-r" />

        {/* ── Inner Smartphone OLED Display Screen ── */}
        <div className="relative w-full h-full rounded-[28px] bg-[#080103] overflow-hidden border border-white/[0.08] flex flex-col select-none">
          
          {/* Status Bar & Dynamic Island */}
          <div className="relative z-30 w-full pt-1.5 px-3 flex items-center justify-between text-[9px] font-mono text-rose-300/80 bg-gradient-to-b from-[#080103] to-transparent">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="w-14 h-3 bg-black rounded-full border border-white/10 flex items-center justify-end px-1.5 gap-1 shadow-inner">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[10px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[10px]">battery_full</span>
            </div>
          </div>

          {/* ── Dynamic Scrolling Innovation Ark Mobile App UI ── */}
          <div
            className="w-full flex-1 transition-transform duration-100 ease-out"
            style={{
              transform: `translateY(-${Math.min(380, appScrollY * 0.76)}px)`,
            }}
          >
            {/* ━━━ APP SCREEN 1: HOOK / BRAND SPLASH ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-between relative">
              <div className="w-full">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-4 h-4 rounded-md bg-gradient-to-br from-red-500 to-rose-950 flex items-center justify-center text-[7px] font-bold font-mono">IA</div>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-rose-400 font-bold uppercase">Innovation Ark OS</span>
                </div>
                <div className="text-xs font-black text-white uppercase tracking-tight leading-tight">
                  Next-Gen<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 font-serif italic lowercase text-sm">spatial apps.</span>
                </div>
              </div>

              {/* Ambient App Hero Card */}
              <div className="my-auto p-2.5 rounded-xl bg-gradient-to-b from-white/[0.08] to-black/60 border border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] font-mono text-rose-300">Live Telemetry</span>
                  <span className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">ONLINE</span>
                </div>
                <div className="h-12 w-full rounded-lg bg-gradient-to-r from-red-600/30 via-rose-900/20 to-black/80 flex items-center justify-center border border-red-500/20">
                  <span className="text-[9px] font-mono text-rose-200">120 FPS Native Engine</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[7px] font-mono text-rose-400/80 uppercase tracking-widest animate-pulse">
                  ↓ Scroll App to Explore
                </span>
              </div>
            </div>

            {/* ━━━ APP SCREEN 2: BLUEPRINT ARCHITECTURE ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-start gap-2 border-t border-white/[0.06] bg-[#0a0104]">
              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider">// 01. BLUEPRINT CORE</span>
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                <div className="text-[9px] font-bold text-white mb-1">Microservices Topology</div>
                <div className="flex gap-1.5 text-[7px] font-mono text-rose-300">
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30">Edge Mesh</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30">Design Token API</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                <div className="text-[9px] font-bold text-white mb-1">Scale Multiplier</div>
                <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                  <div className="w-[88%] h-full bg-gradient-to-r from-red-500 to-rose-400" />
                </div>
              </div>
            </div>

            {/* ━━━ APP SCREEN 3: SPATIAL 120 FPS CRAFT ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-start gap-2 border-t border-white/[0.06] bg-[#0a0104]">
              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider">// 02. SPATIAL CRAFT</span>
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-950/40 via-black to-black border border-rose-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] font-mono text-rose-200">GPU Acceleration</span>
                  <span className="text-[9px] font-black text-rose-400">120 FPS</span>
                </div>
                <div className="text-[8px] text-neutral-300">Sub-pixel precision rendering with zero frame jitter.</div>
              </div>
            </div>

            {/* ━━━ APP SCREEN 4: FULL-STACK SUPREMACY ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-start gap-2 border-t border-white/[0.06] bg-[#0a0104]">
              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider">// 03. TURBOPACK ENGINE</span>
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                <div className="flex justify-between text-[8px] font-mono text-neutral-300 mb-1">
                  <span>Global Latency</span>
                  <span className="text-emerald-400 font-bold">0.4ms</span>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-neutral-300">
                  <span>SEO Performance</span>
                  <span className="text-rose-400 font-bold">100/100</span>
                </div>
              </div>
            </div>

            {/* ━━━ APP SCREEN 5: AI AGENTIC PIPELINES ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-start gap-2 border-t border-white/[0.06] bg-[#0a0104]">
              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider">// 04. AI AUTOMATION</span>
              <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/30">
                <div className="text-[8px] font-mono text-rose-300 mb-1">Neural Stream Active...</div>
                <div className="text-[7px] text-neutral-400 leading-tight font-mono">Autonomous vector generation & real-time enterprise AI bots.</div>
              </div>
            </div>

            {/* ━━━ APP SCREEN 6: FINALE PARTNER LAUNCHPAD ━━━ */}
            <div className="h-[290px] w-full p-3.5 flex flex-col justify-center items-center text-center gap-2 border-t border-white/[0.06] bg-gradient-to-b from-[#0e0205] to-black">
              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider">Innovation Ark</span>
              <div className="text-xs font-black text-white uppercase tracking-tight">Your Vision Magnified.</div>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-800 text-[8px] font-bold text-white shadow-md">
                Launch Project →
              </div>
            </div>

          </div>

          {/* Home Indicator Bar */}
          <div className="absolute bottom-1 inset-x-0 flex justify-center z-30 pointer-events-none">
            <div className="w-16 h-0.5 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* Screen Glare Overlay */}
        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
      </div>
    </div>
  );
}

export default MobilePhoneScrollytelling;
