'use client';

import React from 'react';

export function StatsSection() {
  const stats = [
    {
      value: '2X',
      title: 'Faster Time-to-Market',
      description: 'Single-codebase Flutter mobile apps & Next.js SSR platforms engineered for rapid deployment without technical debt.',
      badge: 'FLUTTER & NEXT.JS',
    },
    {
      value: '99.9%',
      title: 'Guaranteed System Uptime',
      description: 'High-availability infrastructure hosted on Vercel & CloudPanel/AWS with automated backup & monitoring.',
      badge: 'VERCEL / AWS CLOUD',
    },
    {
      value: 'Zero',
      title: 'Communication Gap',
      description: 'Direct access to the lead architect & founder. No account manager delays, miscommunications, or bloated agency overhead.',
      badge: 'DIRECT FOUNDER ACCESS',
    },
  ];

  return (
    <div className="w-full relative z-20 py-12 md:py-16 bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        
        {/* Section Label */}
        <div className="flex flex-col items-center text-center mb-10">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold mb-2">
            THE NUMBERS SPEAK
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            Engineered for Measurable Business Growth
          </h2>
        </div>

        {/* 3 Large Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full inline-block mb-4">
                  {stat.badge}
                </span>
                <div className="font-sans font-black text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-none mb-3">
                  {stat.value}
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                  {stat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
