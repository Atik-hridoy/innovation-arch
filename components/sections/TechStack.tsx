'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const TECH_ITEMS = [
  { name: 'Flutter', desc: 'Cross-Platform Mobile Engine', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Next.js', desc: 'High-Throughput Web SSR', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Django', desc: 'Enterprise REST Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', desc: 'Sub-10ms Indexed Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Vercel', desc: 'Global Edge CDN Hosting', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'AWS Cloud', desc: 'Cloud Infrastructure & S3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
];

export function TechStack() {
  return (
    <div id="tech" className="relative z-10 bg-slate-50/50 dark:bg-[#0b0f19] py-12 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 overflow-hidden border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1720px] w-full mx-auto">
        <SectionHeader
          eyebrow="BUILT ON ENTERPRISE-GRADE TECHNOLOGY"
          title="PROVEN STACK & INTEGRATIONS"
          description="We build strictly on industry-standard, battle-tested technologies that ensure sub-second performance, long-term maintainability, and zero vendor lock-in."
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
