'use client';

import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Clarity before code',
    description: 'We define the problem, priorities and constraints before committing to a technical direction.',
    image: '/images/hero_abstract_bg.jpg',
  },
  {
    number: '02',
    title: 'Senior people stay close',
    description: 'The people making decisions remain involved from early discovery through delivery.',
    image: '/images/modern_workspace.jpg',
  },
  {
    number: '03',
    title: 'Built for continuity',
    description: 'Clear systems, maintainable code and practical documentation support the product after launch.',
    image: '/images/cube-world.png',
  },
];

export function StatsSection() {
  return (
    <section className="relative z-20 -mt-px overflow-hidden bg-[#eaf1f7] text-slate-950 transition-colors dark:bg-[#0b0d12] dark:text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-b border-slate-300/80 pb-12 dark:border-white/12 md:grid-cols-12 md:items-end md:pb-16"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300 md:col-span-3">
            How we work
          </p>
          <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl md:col-span-9 md:text-5xl lg:text-[3.5rem]">
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
              className="group relative isolate min-h-72 overflow-hidden border-b border-slate-300/70 px-5 py-8 last:border-b-0 dark:border-white/10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10"
            >
              <img src={principle.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.20] grayscale-[0.55] saturate-75 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-[0.38] group-hover:grayscale-0 group-hover:saturate-100" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eaf1f7]/45 via-[#eaf1f7]/78 to-[#eaf1f7]/95 dark:from-[#0b0d12]/42 dark:via-[#0b0d12]/72 dark:to-[#0b0d12]/95" />
              <span className="font-mono text-[10px] text-slate-400 dark:text-white/35">{principle.number}</span>
              <h3 className="mt-8 text-lg font-semibold tracking-[-0.015em] text-slate-950 dark:text-white">{principle.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
