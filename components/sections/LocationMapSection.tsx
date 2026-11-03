'use client';

import { useEffect, useState } from 'react';
import { getSiteSettings, SiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/api';

export function LocationMapSection() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => undefined);

    const update = () =>
      setLocalTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const phone = settings.phone_number || '+880 1744-807689';
  const email = settings.email_address || 'hello@innovationark.co';
  const address = settings.office_address || 'Rangpur & Dhaka, Bangladesh';
  const defaultCoordinates = '25.817626,89.237485';
  const mapSrc = settings.map_url && settings.map_url.trim() !== ''
    ? settings.map_url
    : `https://maps.google.com/maps?q=${defaultCoordinates}&t=m&z=14&ie=UTF8&iwloc=&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="mt-12 sm:mt-20 border-t border-slate-200 pt-10 sm:pt-16 dark:border-white/10">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8 grid gap-4 md:grid-cols-2 md:items-end">
        <div>
          <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Studio & Headquarters
          </p>
          <h3 className="mt-2 text-2xl xs:text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white">
            Based in Bangladesh.<br />Delivering globally.
          </h3>
        </div>
        <p className="max-w-lg text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Meet remotely via Google Meet or arrange a visit to our engineering studio. For new project inquiries, email is the fastest way to get started.
        </p>
      </div>

      {/* Studio Info & Map */}
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0d1118] lg:grid-cols-[.8fr_1.2fr]">
        
        {/* Info Column */}
        <div className="flex flex-col p-5 sm:p-7 md:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Innovation Ark Studio
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {localTime || '12:00 PM'} local
            </span>
          </div>

          <address className="mt-5 not-italic">
            <p className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">
              {address}
            </p>
            <p className="mt-1 text-xs font-mono text-slate-500">
              25.8176° N, 89.2375° E
            </p>
          </address>

          {/* Quick Contact Touch Pills */}
          <div className="mt-5 space-y-2 text-xs sm:text-sm">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-base text-blue-500">mail</span>
              <span className="truncate">{email}</span>
            </a>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-base text-emerald-500">call</span>
              <span>{phone}</span>
            </a>
          </div>

          <div className="mt-6 pt-2 lg:mt-auto">
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>Get directions on Google Maps</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="relative h-60 sm:h-72 lg:h-auto min-h-[240px] overflow-hidden bg-slate-200 dark:bg-slate-900">
          <iframe
            title="Innovation Ark studio location"
            src={mapSrc}
            className="absolute inset-0 h-full w-full border-0 grayscale-[.25] contrast-[1.05]"
            loading="lazy"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
        </div>
      </div>
    </section>
  );
}

export default LocationMapSection;
