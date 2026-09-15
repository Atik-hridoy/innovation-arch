'use client';

import { useState } from 'react';
import { SLIDES } from '@/components/services/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

export function Services() {
  const [activeModalSlide, setActiveModalSlide] = useState<number | null>(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  return (
    <section
      id="services"
      className="relative w-full py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 z-10 bg-white dark:bg-[#070709] transition-colors duration-300"
    >
      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="SOLUTIONS & CAPABILITIES"
          title="WHAT WE BUILD"
          description="High-performance digital products engineered for growth, sub-second latency, and enterprise scalability."
        />

        {/* 4-Pillar Modern Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 mt-10 sm:mt-16">
          {SLIDES.map((slide, idx) => {
            const icons = ['phone_iphone', 'bolt', 'psychology', 'cloud_done'];
            const badges = ['MOBILE APP SUITE', 'WEB PLATFORMS', 'AI & AUTOMATION', 'CLOUD & SECURITY'];
            const metrics = ['Smooth & Fast', 'Sub-Second Load', '80% Time Saved', '99.99% Online'];

            return (
              <div
                key={slide.title}
                className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#111116]/90 hover:bg-white dark:hover:bg-[#14141a] p-5 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setActiveModalSlide(idx)}
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Metric Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">{icons[idx]}</span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                      {metrics[idx]}
                    </span>
                  </div>

                  {/* Title & Tech Tag */}
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
                    {badges[idx]}
                  </span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-3xl text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
                    {slide.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {slide.desc}
                  </p>

                  {/* Deliverable Highlights */}
                  <div className="mt-5 sm:mt-6 flex flex-col gap-2 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                    {slide.features.slice(0, 3).map((feat) => (
                      <div key={feat.title} className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-700 dark:text-slate-300">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">✓</span>
                        <span>{feat.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-6 sm:mt-8 pt-4 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    View Deliverables →
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Deliverable Details Modal */}
      {activeModalSlide !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setActiveModalSlide(null)}
        >
          <div
            className="bg-white dark:bg-[#111116] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-1">
                  DELIVERABLE SPECIFICATION
                </span>
                <h3 className="font-sans font-extrabold text-xl sm:text-3xl text-slate-900 dark:text-white uppercase tracking-tight">
                  {SLIDES[activeModalSlide].title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalSlide(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-5 sm:py-6 flex flex-col gap-2.5 sm:gap-3 max-h-[60vh] overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-1">
                {SLIDES[activeModalSlide].desc}
              </p>
              
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white pt-2">
                Included Deliverables:
              </span>
              {SLIDES[activeModalSlide].facilities.map((fac, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>{fac}</span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <span className="font-mono text-[10px] sm:text-xs text-slate-500">
                100% IP Ownership & Warranty Included
              </span>
              <button
                onClick={() => {
                  setActiveModalSlide(null);
                  setIsDiscoveryOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3 font-sans font-semibold text-xs tracking-wider uppercase bg-[#0f172a] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl cursor-pointer transition-all"
              >
                Discuss This Solution →
              </button>
            </div>
          </div>
        </div>
      )}


      <DiscoveryModal isOpen={isDiscoveryOpen} onClose={() => setIsDiscoveryOpen(false)} />
    </section>
  );
}

export default Services;
