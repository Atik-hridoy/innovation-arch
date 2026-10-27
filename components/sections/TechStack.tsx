'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const TECH_ITEMS = [
  { name: 'Flutter', desc: 'Mobile applications', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Next.js', desc: 'Web applications', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Django', desc: 'Backend systems', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', desc: 'Relational data', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Vercel', desc: 'Web deployment', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'AWS Cloud', desc: 'Cloud infrastructure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
];

export function TechStack() {
  return (
    <div id="tech" className="relative z-10 overflow-hidden border-t border-slate-200/60 bg-[#faf6ef] px-4 py-12 transition-colors duration-300 dark:border-white/10 dark:bg-[#12100d] sm:px-8 md:px-12 md:py-20 lg:px-16 2xl:px-20">
      <div className="max-w-[1720px] w-full mx-auto">
        <SectionHeader
          eyebrow="Technology"
          title="Modern tools, selected for the product."
          description="We choose familiar, maintainable technology around the needs of each project—not around a fixed stack."
        />

        {/* 6 Clean Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {TECH_ITEMS.map((item) => (
            <div
              key={item.name}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
            >
              <div className="w-10 h-10 mb-3 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <img src={item.logo} alt={item.name} className="w-8 h-8 object-contain" />
              </div>
              <span className="font-sans font-bold text-xs text-slate-900 dark:text-white">{item.name}</span>
              <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
