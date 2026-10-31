'use client';

import { useState, useEffect } from 'react';
import { SLIDES } from '@/components/services/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const SERVICE_BACKGROUNDS = [
  '/images/mobile_dashboard.jpg',
  '/images/web.webp',
  '/images/Data Science.jpg',
  '/images/cube-world.png',
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  // Lock body scroll when service modal is open
  useEffect(() => {
    if (active !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActive(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [active]);

  return (
    <section id="services" className="section-shell border-t border-slate-200/70 bg-[#f2f7fb] transition-colors dark:border-white/10 dark:bg-[#0a1019]">
      <div className="site-container">
        <SectionHeader
          eyebrow="Capabilities"
          title="Focused expertise across the product lifecycle."
          description="We design, build, and maintain digital products that solve clear business problems—without unnecessary layers or complexity."
        />

        {/* Services Grid: 1-col on mobile, 2-col on md+ */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-1 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-2 md:border-t md:border-slate-200 md:dark:border-white/10">
          {SLIDES.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => setActive(index)}
              className="group relative isolate flex min-h-[340px] min-w-[84vw] snap-center flex-col overflow-hidden rounded-2xl border border-slate-200 p-5 text-left shadow-sm transition-colors hover:bg-slate-50/50 dark:border-white/10 dark:hover:bg-white/[0.02] sm:min-h-80 sm:min-w-0 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:p-8 sm:shadow-none md:p-9 md:[&:nth-child(odd)]:border-r md:dark:[&:nth-child(odd)]:border-white/10"
            >
              <img
                src={SERVICE_BACKGROUNDS[index]}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18] grayscale-[0.65] saturate-75 transition duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-[0.35] group-hover:grayscale-0 group-hover:saturate-100 dark:opacity-[0.22] dark:group-hover:opacity-[0.40]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/92 to-white/30 dark:from-[#0a1019] dark:via-[#0a1019]/92 dark:to-[#0a1019]/35" />
              <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white/70 to-transparent dark:from-[#0a1019]/70" />

              {/* Card Header */}
              <div className="mb-6 sm:mb-10 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="font-mono text-blue-600 dark:text-blue-400">0{index + 1}</span>
                <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Details
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </div>

              {/* Content */}
              <div className="mt-auto max-w-full sm:max-w-[92%]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  {service.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                  {service.title.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </h3>
                <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.desc}
                </p>

                {/* Touch hint for mobile */}
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 sm:hidden">
                  <span>View capabilities</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile-Friendly Bottom Sheet / Modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-950/75 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${SLIDES[active].title} details`}
            className="w-full max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl dark:border-white/10 dark:bg-[#0d1118] text-slate-950 dark:text-white"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 -mt-5 -mx-5 sm:-mt-8 sm:-mx-8 mb-4 px-5 sm:px-8 py-4 bg-white/95 dark:bg-[#0d1118]/95 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  Service details
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">
                  {SLIDES[active].title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-950 dark:hover:text-white active:scale-95 transition-all"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {SLIDES[active].desc}
            </p>

            {/* Key features chips */}
            {SLIDES[active].features && SLIDES[active].features.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-2">
                {SLIDES[active].features.map((feat) => (
                  <div
                    key={feat.title}
                    className="flex items-center gap-2 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-2.5"
                  >
                    <span className="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400">
                      {feat.icon}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {feat.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Facilities list */}
            <div className="mt-6 border-t border-slate-200 pt-4 dark:border-white/10">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Deliverables & Scope
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {SLIDES[active].facilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-slate-700 dark:text-slate-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span>{item.replace(/guaranteed|100%|99\.99%|bank-grade/gi, '').replace(/\s+/g, ' ').trim()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom action inside modal */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href="#book"
                onClick={() => setActive(null)}
                className="w-full text-center rounded-xl bg-slate-950 py-3 text-xs font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950 hover:bg-blue-600 transition-colors"
              >
                Discuss {SLIDES[active].title} with us →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;
