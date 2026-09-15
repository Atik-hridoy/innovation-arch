'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { CONFIG } from '../lib/config';

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
  const mailUrl = settings?.email_address ? `mailto:${settings.email_address}` : "mailto:contact@innovativearc.com";

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#070709] border-t border-slate-200/80 dark:border-slate-800/80 pt-16 pb-0 relative z-20 overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 pb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-3">
          <Logo layout="horizontal" />
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm font-normal">
            Building high-performance digital products, mobile apps, and enterprise AI engines with zero agency overhead.
          </p>
        </div>

        {/* Social & Contact Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
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
      {/* 🚀 GIANT MONUMENTAL FOOTER TYPOGRAPHY (InnovationArk) */}
      {/* ========================================================= */}
      <div className="w-full overflow-hidden select-none pointer-events-none leading-none pt-2">
        <h1 className="w-full text-center font-sans font-black tracking-tighter text-[13.5vw] xs:text-[14.5vw] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#fde047] via-[#facc15] to-[#eab308] dark:from-[#fef08a] dark:via-[#facc15] dark:to-[#ca8a04] translate-y-[12%] drop-shadow-[0_10px_35px_rgba(250,204,21,0.2)]">
          InnovationArk
        </h1>
      </div>

    </footer>
  );
}

export default Footer;

