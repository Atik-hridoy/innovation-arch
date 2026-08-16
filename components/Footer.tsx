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
  const mailUrl = settings?.email_address ? `mailto:${settings.email_address}` : "mailto:contact@innovativeark.com";

  return (
    <div className="w-full max-w-[1720px] mx-auto pt-16 pb-8 md:pb-12 flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 border-t-0 md:border-t border-emerald-500/20 dark:border-white/15 relative z-20 overflow-hidden transition-colors duration-400">
      <div className="relative z-10">
        <Logo layout="vertical" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 relative z-10">
        <a
          className="font-label-caps text-label-caps text-emerald-100/90 dark:text-white/85 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group font-semibold"
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-emerald-100/90 dark:text-white/90 group-hover:text-emerald-400 dark:group-hover:text-emerald-400" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </a>
        <a
          className="font-label-caps text-label-caps text-emerald-100/90 dark:text-white/85 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group font-semibold"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-emerald-100/90 dark:text-white/90 group-hover:text-emerald-400 dark:group-hover:text-emerald-400" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          WhatsApp
        </a>
        <a
          className="font-label-caps text-label-caps text-emerald-100/90 dark:text-white/85 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group font-semibold"
          href={callUrl}
        >
          <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-emerald-100/90 dark:text-white/90 group-hover:text-emerald-400 dark:group-hover:text-emerald-400" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          Call
        </a>
        <a
          className="font-label-caps text-label-caps text-emerald-100/90 dark:text-white/85 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group font-semibold"
          href={mailUrl}
        >
          <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform text-emerald-100/90 dark:text-white/90 group-hover:text-emerald-400 dark:group-hover:text-emerald-400" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          Email
        </a>
      </div>
      <div className="font-label-caps text-label-caps text-emerald-300/60 dark:text-white/60 text-center md:text-right opacity-75 hover:opacity-100 transition-opacity duration-300 relative z-10 font-mono text-[10px]">
        © 2026 Innovation Ark. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
