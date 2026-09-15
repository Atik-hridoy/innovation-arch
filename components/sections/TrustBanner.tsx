'use client';

import React from 'react';

export function TrustBanner() {
  const trustBadges = [
    {
      icon: 'verified_user',
      title: '100% IP Ownership',
      desc: 'Full source code & asset transfer upon completion.',
    },
    {
      icon: 'payments',
      title: 'Milestone Escrow',
      desc: 'Pay safely per milestone, zero risk upfront.',
    },
    {
      icon: 'published_with_changes',
      title: '30-Day Code Warranty',
      desc: 'Free post-launch bug fixing & optimization guarantee.',
    },
    {
      icon: 'speed',
      title: 'Sub-Second Speeds',
      desc: 'Architected for sub-second page loads & 99.9% uptime.',
    },
  ];

  return (
    <div className="w-full relative z-20 py-8 px-4 sm:px-8 md:px-12 max-w-[1720px] mx-auto">
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-sm">
        
        {/* Header line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-900 dark:text-white font-bold">
              Trusted Technical Partnership
            </span>
          </div>
          <span className="text-xs font-sans text-slate-500 dark:text-slate-400">
            Delivering Risk-Free B2B Software Solutions Worldwide
          </span>
        </div>

        {/* 4 Trust Guarantee Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-lg">{badge.icon}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight">{badge.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
