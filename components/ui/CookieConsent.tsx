'use client';

import React, { useState, useEffect } from 'react';
import { RadialGlowButton } from './radial-glow-button';

const COOKIE_STORAGE_KEY = 'ia_cookie_consent_v1';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Subtle 1.2s delay after page load for a smooth, non-intrusive entrance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback in case of private mode restriction
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:right-6 sm:max-w-[440px] z-[999] animate-[fadeSlideUp_0.45s_cubic-bezier(0.16,1,0.3,1)] select-none">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/30 dark:border-white/15 bg-emerald-950/90 dark:bg-[#08080c]/90 backdrop-blur-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(52,211,153,0.15)]">
        
        {/* Subtle Ambient Top Border Highlight */}
        <div className="absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent pointer-events-none rounded-full" />
        
        <div className="flex items-start gap-3 sm:gap-3.5">
          {/* Glowing Cookie/Security Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.25)] text-emerald-400">
            <span className="material-symbols-outlined text-lg sm:text-xl">
              cookie
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-sans font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                Cookie Preferences
              </h4>
              <button
                onClick={handleDecline}
                className="text-white/40 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <p className="text-[11px] sm:text-xs text-emerald-100/75 dark:text-gray-300 leading-relaxed">
              We use telemetry and functional cookies to elevate your digital experience, optimize rendering performance, and secure our ecosystems.
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2.5 mt-3.5 sm:mt-4">
              <RadialGlowButton
                size="sm"
                onClick={handleAccept}
                className="!min-w-[100px] !min-h-[34px] !py-1.5 !px-4 !text-[11px] font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(52,211,153,0.35)]"
              >
                Accept All
              </RadialGlowButton>

              <button
                onClick={handleDecline}
                className="px-3.5 py-1.5 rounded-full border border-emerald-500/20 dark:border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
