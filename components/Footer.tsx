'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { CONFIG } from '@/lib/config';

interface SiteSettings {
  facebook_url?: string;
  whatsapp_number?: string;
  phone_number?: string;
  email_address?: string;
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch(`${CONFIG.API_BASE_URL}/settings/`)
      .then((response) => response.json())
      .then(setSettings)
      .catch(() => undefined);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    settings?.email_address && { label: 'Email', href: `mailto:${settings.email_address}` },
    settings?.phone_number && { label: 'Call', href: `tel:${settings.phone_number.replace(/[^0-9+]/g, '')}` },
    settings?.whatsapp_number && { label: 'WhatsApp', href: `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}` },
    settings?.facebook_url && { label: 'Facebook', href: settings.facebook_url },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-slate-200 py-8 sm:py-12 dark:border-white/10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start">
          <Logo />
          <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Strategy, design, and engineering for dependable digital products that drive long-term business growth.
          </p>
        </div>

        {/* Links Grid on Mobile */}
        <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-xs sm:text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white py-1"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Sub-bar with Back to Top */}
      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-200 pt-5 text-[11px] text-slate-400 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-1">
          <span>© {new Date().getFullYear()} Innovation Ark. All rights reserved.</span>
          <span className="hidden sm:inline">·</span>
          <span>Dhaka & Rangpur, Bangladesh · Working Globally</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors active:scale-95"
        >
          <span>Back to top</span>
          <span className="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
