'use client';

import { useEffect, useState } from 'react';
import { CONFIG } from '@/lib/config';

interface SiteSettings { phone_number?: string; email_address?: string; }

export function LocationMapSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    fetch(`${CONFIG.API_BASE_URL}/settings/`).then(response => response.json()).then(setSettings).catch(() => undefined);
    const update = () => setLocalTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' }));
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const phone = settings?.phone_number || '+880 1744-807689';
  const email = settings?.email_address || 'hello@innovationark.co';
  const coordinates = '25.817626,89.237485';
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;

  return (
    <section className="mt-16 border-t border-slate-200 pt-12 dark:border-white/10 sm:mt-24 sm:pt-16">
      <div className="mb-8 grid gap-5 md:grid-cols-2 md:items-end">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Studio and contact</p><h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">Based in Bangladesh.<br />Working without borders.</h3></div>
        <p className="max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">Meet remotely or arrange a visit. For project enquiries, email is usually the best place to begin.</p>
      </div>
      <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0d1118] lg:grid-cols-[.72fr_1.28fr]">
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10"><span className="text-xs font-medium text-slate-500">Innovation Ark studio</span><span className="text-xs text-slate-400">{localTime} local</span></div>
          <address className="mt-7 not-italic"><p className="text-lg font-medium text-slate-950 dark:text-white">Bangladesh</p><p className="mt-2 text-sm text-slate-500">25.817626° N, 89.237485° E</p></address>
          <div className="mt-8 space-y-3 text-sm"><a href={`mailto:${email}`} className="block text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300">{email}</a><a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="block text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300">{phone}</a></div>
          <a href={directions} target="_blank" rel="noreferrer" className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white lg:mt-auto">Get directions <span className="transition-transform group-hover:translate-x-1">→</span></a>
        </div>
        <div className="relative min-h-80 overflow-hidden bg-slate-200 dark:bg-slate-900 lg:min-h-[430px]"><iframe title="Innovation Ark studio location" src={`https://maps.google.com/maps?q=${coordinates}&t=m&z=14&ie=UTF8&iwloc=&output=embed`} className="absolute inset-0 h-full w-full border-0 grayscale-[.25] contrast-[1.05]" loading="lazy" allowFullScreen /><div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" /></div>
      </div>
    </section>
  );
}

export default LocationMapSection;
