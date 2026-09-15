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
    quote: 'InnovationArk delivered our e-commerce platform 2 weeks ahead of schedule. The Next.js frontend is incredibly fast, and working directly with the lead architect meant zero miscommunication.',
    author: 'Samiur Rahman',
    title: 'Founder & CEO',
    company: 'Retail Startup',
    avatar: 'SR',
    rating: 5,
    highlight: '2 Weeks Ahead of Schedule',
  },
  {
    quote: 'Our Flutter mobile app runs natively on both iOS and Android with a single codebase. Atik and his team handled complex location syncing seamlessly without any technical hiccups.',
    author: 'Tanvir Ahmed',
    title: 'Head of Product',
    company: 'P2P Platform',
    avatar: 'TA',
    rating: 5,
    highlight: 'Fluid Cross-Platform Flutter App',
  },
  {
    quote: 'The AI itinerary integration built for our travel app saved our engineering team months of R&D. Sub-100ms API response time and zero mobile crashes since launch.',
    author: 'Elena Rostova',
    title: 'CTO',
    company: 'Travel Tech',
    avatar: 'ER',
    rating: 5,
    highlight: 'Sub-100ms API Response Speed',
  },
];

export function Testimonials() {
  return (
    <div className="w-full relative z-10 py-12 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto">
      <SectionHeader
        eyebrow="CLIENT REVIEWS & TRUST"
        title="WHAT CLIENTS SAY"
        description="Real feedback from founders and product leads who built scalable digital assets with InnovationArk."
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
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
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 px-2.5 py-0.5 rounded-full font-bold">
                {t.highlight}
              </span>
            </div>

            {/* Quote Body */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <div className="w-9 h-9 rounded-full bg-[#0f172a] dark:bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {t.avatar}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.author}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{t.title} • <strong>{t.company}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
