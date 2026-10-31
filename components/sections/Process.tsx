'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  {
    number: '01',
    title: 'Understand',
    tagline: 'Alignment & Discovery',
    description: 'We align on the business goal, user needs, technical constraints, and what success should look like before writing a line of code.',
  },
  {
    number: '02',
    title: 'Define',
    tagline: 'Architecture & Scope',
    description: 'We turn the brief into a clear product scope, choose the right technology architecture, and establish a milestone-based delivery plan.',
  },
  {
    number: '03',
    title: 'Design',
    tagline: 'Prototypes & User Experience',
    description: 'We craft the user journeys, design systems, and responsive interfaces—testing key product decisions before engineering begins.',
  },
  {
    number: '04',
    title: 'Build',
    tagline: 'Iterative Engineering',
    description: 'We develop in focused weekly sprints, providing staging previews so your team can test the live product as it takes form.',
  },
  {
    number: '05',
    title: 'Launch and improve',
    tagline: 'Release & Evolution',
    description: 'We prepare the production release, set up analytics and monitoring, and stay close to optimize and prioritize the next useful features.',
  },
];

export function Process() {
  return (
    <section id="process" className="section-shell bg-[#f7f2e9] text-slate-950 transition-colors dark:bg-[#12100d] dark:text-white">
      <div className="site-container">
        <SectionHeader
          eyebrow="How we work"
          title="A clear process, with decisions made in the open."
          description="Short feedback loops keep work focused and give your team complete visibility from the initial conversation through launch."
        />

        {/* Mobile Vertical Connected Timeline, Desktop Refined Rows */}
        <div className="relative mt-8 sm:mt-12 sm:border-t sm:border-slate-300/80 sm:dark:border-white/15">
          {/* Mobile connecting vertical line */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-col sm:gap-0 sm:overflow-visible sm:px-0 sm:pb-0">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="relative flex min-h-[240px] min-w-[78vw] snap-center flex-col rounded-2xl border border-slate-300/80 bg-white/55 p-5 shadow-sm dark:border-white/15 dark:bg-white/[0.03] sm:min-h-0 sm:min-w-0 sm:grid sm:grid-cols-[5rem_14rem_1fr] sm:items-start sm:gap-6 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-8 sm:shadow-none sm:dark:bg-transparent"
              >
                {/* Mobile Glowing Step Indicator Circle */}
                <div className="mb-auto flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-mono text-[10px] font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.35)] sm:hidden">
                  {step.number}
                </div>

                {/* Desktop Step Number */}
                <span className="hidden sm:inline font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {step.number}
                </span>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:hidden">
                    {step.tagline}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 sm:mt-0 max-w-2xl text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
