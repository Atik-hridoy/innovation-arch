'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'InnovationArk delivered our e-commerce platform 2 weeks ahead of schedule. The web frontend is incredibly fast, and working directly with the lead architect meant zero miscommunication.',
    author: 'Samiur Rahman',
    title: 'Founder & CEO',
    company: 'Retail Startup',
    avatar: 'SR',
    rating: 5,
    highlight: '2 Weeks Ahead of Schedule',
  },
  {
    quote: 'Our mobile app runs natively on both iOS and Android from a single codebase. Atik and his team handled complex real-time data syncing seamlessly without any technical hiccups.',
    author: 'Tanvir Ahmed',
    title: 'Head of Product',
    company: 'P2P Platform',
    avatar: 'TA',
    rating: 5,
    highlight: 'Fluid Mobile App',
  },
  {
    quote: 'The AI integration built for our travel app saved our engineering team months of development. Instant search response times and zero crashes since launch.',
    author: 'Elena Rostova',
    title: 'CTO',
    company: 'Travel Tech',
    avatar: 'ER',
    rating: 5,
    highlight: 'Instant Response Speed',
  },
  {
    quote: 'Outstanding software quality and daily communication. They revamped our SaaS portal and boosted our user conversion rate by 45% within the first 30 days.',
    author: 'Marcus Vance',
    title: 'VP of Operations',
    company: 'Enterprise SaaS',
    avatar: 'MV',
    rating: 5,
    highlight: '+45% Conversion Boost',
  },
  {
    quote: 'Extremely reliable team. Their automated cloud backup and database tuning ensure our platform stays online 24/7 during high traffic spikes.',
    author: 'Kazi Mahfuz',
    title: 'Managing Director',
    company: 'Fintech Solutions',
    avatar: 'KM',
    rating: 5,
    highlight: '100% Uptime Reliability',
  },
];

export function Testimonials() {
  return (
    <section className="w-full relative z-10 py-16 md:py-24 overflow-hidden bg-white dark:bg-[#070709] transition-colors duration-300">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 mb-10 sm:mb-12">
        <SectionHeader
          eyebrow="CLIENT REVIEWS & TRUST"
          title="WHAT CLIENTS SAY"
          description="Real feedback from founders and product leads who built scalable digital assets with InnovationArk."
        />
      </div>

      {/* Faded Marquee Scroll Track for Reviews */}
      <div className="relative w-full overflow-hidden select-none py-2">
        
        {/* Faded Left & Right Gradient Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 z-20 bg-gradient-to-r from-white dark:from-[#070709] via-white/80 dark:via-[#070709]/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 z-20 bg-gradient-to-l from-white dark:from-[#070709] via-white/80 dark:via-[#070709]/80 to-transparent pointer-events-none" />

        {/* Marquee Track (Double array for seamless looping) */}
        <div className="animate-marquee flex gap-6 items-stretch w-max hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={`${t.author}-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] shrink-0 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-[#111116] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
            >
              {/* Top Stars & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm sm:text-base fill-current">
                      star
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 px-2.5 py-0.5 rounded-full font-bold">
                  {t.highlight}
                </span>
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 mt-auto">
                <div className="w-9 h-9 rounded-full bg-[#0f172a] dark:bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                  {t.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.author}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t.title} • <strong>{t.company}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
