'use client';

import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clarity before code',
    description: 'We define the problem, priorities and constraints before committing to a technical direction.',
  },
  {
    number: '02',
    title: 'Senior people stay close',
    description: 'The people making decisions remain involved from early discovery through delivery.',
  },
  {
    number: '03',
    title: 'Built for continuity',
    description: 'Clear systems, maintainable code and practical documentation support the product after launch.',
  },
];

export function StatsSection() {
  return (
    <section className="relative z-20 -mt-px overflow-hidden bg-slate-950 text-white dark:bg-[#0b0d12]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-b border-white/12 pb-12 md:grid-cols-12 md:items-end md:pb-16"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300 md:col-span-3">
            How we work
          </p>
          <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl md:col-span-9 md:text-5xl lg:text-[3.5rem]">
            Good software starts with sound decisions—and stays useful long after launch.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-white/10 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10"
            >
              <span className="font-mono text-[10px] text-white/35">{principle.number}</span>
              <h3 className="mt-8 text-lg font-semibold tracking-[-0.015em] text-white">{principle.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
