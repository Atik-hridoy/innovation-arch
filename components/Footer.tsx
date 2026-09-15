'use client';

import { useState, useEffect } from 'react';
import { Bebas_Neue, Righteous, Syne } from 'next/font/google';
import { Logo } from '@/components/Logo';
import { CONFIG } from '../lib/config';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const syne = Syne({ weight: '800', subsets: ['latin'] });

interface SiteSettings {
  facebook_url: string;
  whatsapp_number: string;
  phone_number: string;
  email_address: string;
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch(`${CONFIG.API_BASE_URL}/settings/`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error("Failed to load settings:", err));
  }, []);

  const fbUrl = settings?.facebook_url || "https://facebook.com";
  const waUrl = settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/[^0-9+]/g, '')}` : "https://wa.me/";
  const callUrl = settings?.phone_number ? `tel:${settings.phone_number.replace(/[^0-9+]/g, '')}` : "tel:+1234567890";
  const mailUrl = settings?.email_address ? `mailto:${settings.email_address}` : "mailto:hello@innovationark.co";

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#070709] border-t border-slate-200/80 dark:border-slate-800/80 pt-8 sm:pt-10 pb-0 relative z-20 overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 pb-4 md:pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-2">
          <Logo layout="horizontal" />
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm font-normal">
            Building high-performance digital products, mobile apps, and enterprise AI engines with zero agency overhead.
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          <a
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 font-semibold"
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 font-semibold"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 font-semibold"
            href={callUrl}
          >
            Call Direct
          </a>
          <a
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 font-semibold"
            href={mailUrl}
          >
            Email Us
          </a>
        </div>

        {/* Copyright */}
        <div className="text-left md:text-right font-mono text-[10px] text-slate-400 dark:text-slate-500">
          © 2026 InnovationArk Tech Platform.<br />
          All Rights Reserved.
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🚀 3D MONUMENTAL FOOTER TYPOGRAPHY (InnovationArk) */}
      {/* ========================================================= */}
      <div className="w-full overflow-hidden select-none pointer-events-none leading-none pt-4 pb-2 flex justify-center items-center">
        <div className="relative w-full max-w-full px-2 text-center">
          <h1 
            className={`${righteous.className} relative inline-block text-center tracking-normal text-[10vw] sm:text-[11vw] md:text-[11.5vw] leading-none uppercase select-none transition-transform duration-300 hover:scale-[1.01]`}
          >
            {/* Base 3D Solid Extrusion & Depth Shadow Layer */}
            <span 
              aria-hidden="true"
              className="absolute inset-0 block text-amber-700 dark:text-amber-900 pointer-events-none translate-y-[2px]"
              style={{
                textShadow: `
                  1px 1px 0 #d97706,
                  2px 2px 0 #b45309,
                  3px 3px 0 #92400e,
                  4px 4px 0 #78350f,
                  5px 5px 0 #451a03,
                  6px 6px 0 #270e02,
                  7px 7px 0 #180701,
                  8px 12px 20px rgba(0,0,0,0.6),
                  0 0 50px rgba(245,158,11,0.25)
                `
              }}
            >
              InnovationArk
            </span>

            {/* Top Gradient Metallic 3D Face Layer */}
            <span className="relative z-10 block text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 dark:from-yellow-100 dark:via-yellow-300 dark:to-amber-500 filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
              InnovationArk
            </span>
          </h1>
        </div>
      </div>

    </footer>
  );
}

export default Footer;


