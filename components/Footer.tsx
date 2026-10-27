'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { CONFIG } from '@/lib/config';

interface SiteSettings { facebook_url: string; whatsapp_number: string; phone_number: string; email_address: string; }

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch(`${CONFIG.API_BASE_URL}/settings/`).then((response) => response.json()).then(setSettings).catch(() => undefined);
  }, []);

  const links = [
    settings?.email_address && { label: 'Email', href: `mailto:${settings.email_address}` },
    settings?.phone_number && { label: 'Call', href: `tel:${settings.phone_number.replace(/[^0-9+]/g, '')}` },
    settings?.whatsapp_number && { label: 'WhatsApp', href: `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}` },
    settings?.facebook_url && { label: 'Facebook', href: settings.facebook_url },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-white/10 sm:py-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">Strategy, design, and engineering for useful digital products.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href="/about" className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white">About</a>
          <a href="/privacy" className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white">Privacy</a>
          <a href="/terms" className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white">Terms</a>
          {links.map((link) => <a key={link.label} href={link.href} className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-white" target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>{link.label}</a>)}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-white/10 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Innovation Ark.</span><span>Dhaka, Bangladesh · Working globally</span>
      </div>
    </footer>
  );
}

export default Footer;
