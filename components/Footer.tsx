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
    <div className="w-full max-w-[1720px] mx-auto pt-16 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 border-t border-slate-200/80 dark:border-slate-800 relative z-20 overflow-hidden transition-colors duration-300">
      <div className="relative z-10">
        <Logo layout="horizontal" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 relative z-10">
        <a
          className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 font-semibold"
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 font-semibold"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 font-semibold"
          href={callUrl}
        >
          Call
        </a>
        <a
          className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 font-semibold"
          href={mailUrl}
        >
          Email
        </a>
      </div>
      <div className="text-center md:text-right font-mono text-[10px] text-slate-400 relative z-10">
        © 2026 Innovative Arc. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
