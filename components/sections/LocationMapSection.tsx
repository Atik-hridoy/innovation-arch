'use client';

import React, { useState, useEffect } from 'react';
import { CONFIG } from '@/lib/config';

interface SiteSettings {
  facebook_url?: string;
  whatsapp_number?: string;
  phone_number?: string;
  email_address?: string;
}

export function LocationMapSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    fetch(`${CONFIG.API_BASE_URL}/settings/`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Failed to load settings in map:", err));

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const phoneNum = settings?.phone_number || "+880 1744-807689";
  const emailAddr = settings?.email_address || "hello@innovationark.co";
  const callUrl = `tel:${phoneNum.replace(/[^0-9+]/g, '')}`;

  const coords = "25.817626,89.237485";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${coords}`;
  const satelliteEmbedUrl = `https://maps.google.com/maps?q=${coords}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full mt-10 sm:mt-20 mb-8 sm:mb-12 relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] sm:text-xs font-mono font-semibold mb-2.5 sm:mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>📍 Studio Location & HQ</span>
        </div>
        
        <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-slate-900 dark:text-white">
          Visit Our Engineering Studio
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-1 sm:mt-1.5 leading-relaxed">
          Connect live with our studio team or navigate directly to our physical HQ.
        </p>
      </div>

      {/* Responsive Container: Stacks cleanly on mobile, side-by-side on desktop */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0b0e17]/95 text-slate-900 dark:text-white p-3.5 sm:p-7 shadow-xl dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-8 transition-all">
        
        {/* Left Side / Top Mobile Card: Studio Info */}
        <div className="w-full lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6 p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          
          <div className="space-y-4 sm:space-y-5">
            
            {/* Header Emblem */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center font-mono text-xs sm:text-sm shadow-md shadow-amber-500/20 shrink-0">
                  IA
                </div>
                <div>
                  <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wide text-slate-900 dark:text-white block">
                    INNOVATIONARK HQ
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                    🟢 Studio Active
                  </span>
                </div>
              </div>

              {/* Mobile Local Time Badge */}
              <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                {currentTime || '03:18 AM'}
              </div>
            </div>

            {/* Physical Coordinates Box */}
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Physical Coordinates
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                InnovationArk Studio HQ, Bangladesh.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold border border-amber-500/20">
                <span>GPS: 25.817626° N, 89.237485° E</span>
              </div>
            </div>

            {/* Studio Operating Status List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 font-mono text-xs pt-1">
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Studio Schedule:</span>
                <span className="font-bold text-slate-900 dark:text-white text-[11px]">
                  Mon - Sat (09:00 AM - 08:00 PM)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Consultations:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                  Open for Strategy Calls
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Action Grid (2-Cols on Mobile) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 sm:py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-center shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">near_me</span>
              <span>Google Maps</span>
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 sm:py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-[10px] sm:text-[11px] text-center border border-slate-700 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span>Apple Maps</span>
            </a>
          </div>

        </div>

        {/* Right Side / Bottom Mobile Viewport: Satellite Map Container */}
        <div className="w-full lg:col-span-7 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl relative h-[260px] sm:h-[380px] lg:h-full min-h-[260px] bg-slate-950 group">
          
          {/* Satellite Map iframe */}
          <iframe
            title="InnovationArk Studio Satellite Location Map"
            src={satelliteEmbedUrl}
            className="w-full h-full border-0 transition-all duration-300 contrast-[105%] brightness-[0.95]"
            loading="lazy"
            allowFullScreen
          />

          {/* Top Floating Glass Satellite Badge */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none z-10">
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🛰️ SATELLITE HQ MAP</span>
            </div>
          </div>

          {/* Bottom Floating Navigation Button Bar */}
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-700/80 text-amber-400 font-mono text-[10px] sm:text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Open Directions</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LocationMapSection;
