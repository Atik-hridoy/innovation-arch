'use client';

import { useState } from 'react';
import { SLIDES } from '@/components/services/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="section-shell border-t border-slate-200/70 dark:border-white/10">
      <div className="site-container">
        <SectionHeader
          eyebrow="Capabilities"
          title="Focused expertise across the product lifecycle."
          description="We design, build, and maintain digital products that solve a clear business problem—without unnecessary layers or complexity."
        />
        <div className="grid border-t border-slate-200 dark:border-white/10 md:grid-cols-2">
          {SLIDES.map((service, index) => (
            <button key={service.title} type="button" onClick={() => setActive(index)} className="group flex min-h-72 flex-col border-b border-slate-200 p-6 text-left transition-colors hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/[0.03] md:p-9 md:[&:nth-child(odd)]:border-r md:dark:[&:nth-child(odd)]:border-white/10">
              <div className="mb-12 flex items-center justify-between text-xs font-medium text-slate-400">
                <span>0{index + 1}</span><span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
              <div className="mt-auto">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{service.subtitle}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{service.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">{service.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={() => setActive(null)}>
          <div role="dialog" aria-modal="true" aria-label={`${SLIDES[active].title} details`} className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0d1118] sm:p-9" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-6">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Service details</p><h3 className="mt-2 text-3xl font-semibold tracking-tight">{SLIDES[active].title}</h3></div>
              <button type="button" onClick={() => setActive(null)} className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 dark:border-white/10" aria-label="Close"><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{SLIDES[active].desc}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {SLIDES[active].facilities.map((item) => <li key={item} className="border-t border-slate-200 pt-3 text-sm leading-6 text-slate-700 dark:border-white/10 dark:text-slate-300">{item.replace(/guaranteed|100%|99\.99%|bank-grade/gi, '').replace(/\s+/g, ' ').trim()}</li>)}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;
