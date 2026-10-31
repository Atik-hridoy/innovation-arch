'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const TECH_ITEMS = [
  { name: 'Flutter', desc: 'iOS & Android Suite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Next.js', desc: 'Fullstack Web & React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Django', desc: 'Secure APIs & Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', desc: 'Relational Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'AWS Cloud', desc: 'Scalable Infrastructure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Firebase', desc: 'Realtime & Auth Sync', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
];

export function TechStack() {
  return (
    <section id="tech" className="relative z-10 overflow-hidden border-t border-slate-200/60 bg-[#faf6ef] px-4 py-12 transition-colors duration-300 dark:border-white/10 dark:bg-[#12100d] sm:px-8 md:px-12 md:py-20 lg:px-16">
      <div className="max-w-[1520px] w-full mx-auto">
        <SectionHeader
          eyebrow="Technology"
          title="Modern tools, selected for the product."
          description="We choose dependable, maintainable technology around the needs of each product—not around a rigid agency stack."
        />

        {/* Responsive Tech Cards Grid: 2-col on mobile, 3-col on sm, 6-col on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mt-6 sm:mt-8">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/50 active:scale-98 transition-all duration-200 group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 mb-2.5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <img src={item.logo} alt={item.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
              </div>
              <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {item.name}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
