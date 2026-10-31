'use client';

import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clarity before code',
    description: 'We define the problem, priorities, and constraints before committing to a technical direction.',
    image: '/images/hero_abstract_bg.jpg',
    tag: 'Strategy First',
  },
  {
    number: '02',
    title: 'Senior people stay close',
    description: 'The people making architectural decisions remain involved from early discovery through delivery.',
    image: '/images/modern_workspace.jpg',
    tag: 'No Middlemen',
  },
  {
    number: '03',
    title: 'Built for continuity',
    description: 'Clear systems, maintainable code, and practical documentation support the product long after launch.',
    image: '/images/cube-world.png',
    tag: 'Long-term Value',
  },
];

export function StatsSection() {
  return (
    <section className="relative z-20 -mt-px overflow-hidden bg-[#f0f4f8] text-slate-950 transition-colors dark:bg-[#0b0d12] dark:text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:gap-6 border-b border-slate-300/80 pb-8 sm:pb-12 dark:border-white/12 md:grid-cols-12 md:items-end md:pb-16"
        >
          <div className="md:col-span-3">
            <span className="inline-block font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              How we work
            </span>
          </div>
          <h2 className="max-w-4xl text-balance text-2xl xs:text-3xl sm:text-4xl md:col-span-9 md:text-5xl lg:text-[3.25rem] font-semibold leading-snug sm:leading-tight tracking-[-0.03em] sm:tracking-[-0.035em] text-slate-950 dark:text-white">
            Good software starts with sound decisions—and stays useful long after launch.
          </h2>
        </motion.div>

        {/* 3 Principles Cards - Mobile Stacked Cards with Clean Borders, Desktop 3-Col */}
        <div className="mt-6 sm:mt-0 grid grid-cols-1 gap-4 sm:gap-0 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative isolate min-h-60 sm:min-h-72 overflow-hidden rounded-2xl sm:rounded-none border border-slate-200/90 dark:border-white/10 sm:border-0 sm:border-b sm:border-slate-300/70 p-6 sm:px-8 sm:py-8 sm:last:border-b-0 md:border-b-0 md:border-r md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10 bg-white/70 dark:bg-white/[0.02] sm:bg-transparent"
            >
              <img
                src={principle.image}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.16] grayscale-[0.6] saturate-75 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-[0.32] group-hover:grayscale-0 group-hover:saturate-100"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f0f4f8]/50 via-[#f0f4f8]/85 to-[#f0f4f8]/98 dark:from-[#0b0d12]/50 dark:via-[#0b0d12]/80 dark:to-[#0b0d12]/98" />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                  {principle.number}
                </span>
                <span className="rounded-full bg-slate-200/70 dark:bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                  {principle.tag}
                </span>
              </div>

              <h3 className="mt-5 sm:mt-8 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">
                {principle.title}
              </h3>
              <p className="mt-2.5 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {principle.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
