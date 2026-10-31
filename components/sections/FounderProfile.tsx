'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';

const leaders = [
  {
    name: 'Atik Hridoy',
    role: 'Founder & Principal Architect',
    education: 'B.Sc. CSE — BRAC University',
    image: '/images/founder_portrait.jpg',
    summary: 'Leads product direction, frontend architecture, and the translation of complex business goals into dependable digital experiences.',
    focus: ['Product architecture', 'Web and mobile systems', 'Experience design'],
  },
  {
    name: 'Technology leadership',
    role: 'Backend & AI Systems',
    education: 'B.Sc. CSE — Neijiang Normal University',
    image: '/images/cto_portrait.jpg',
    summary: 'Leads backend engineering, data pipelines, and applied AI systems with an emphasis on maintainability, speed, and business outcomes.',
    focus: ['Distributed backend', 'Applied AI & automation', 'Cloud infrastructure'],
  },
];

export function FounderProfile() {
  return (
    <section id="about" className="section-shell border-t border-slate-200/70 bg-[#eef4f3] transition-colors dark:border-white/10 dark:bg-[#09110f]">
      <div className="site-container">
        <SectionHeader
          eyebrow="Leadership"
          title="Senior people stay close to the work."
          description="The people shaping the architectural approach remain directly involved throughout design, engineering, and product delivery."
        />

        {/* Leadership Cards: 1-col on mobile/tablet, 2-col on desktop */}
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-xs dark:border-white/10 dark:bg-[#0d1614] lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <article
              key={leader.name}
              className={`group flex flex-col sm:grid sm:grid-cols-[200px_1fr] ${
                index === 0 ? 'border-b border-slate-200 dark:border-white/10 lg:border-b-0 lg:border-r' : ''
              }`}
            >
              {/* Leader Photo */}
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Leader Details */}
              <div className="flex flex-col p-5 sm:p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    0{index + 1} / Leadership
                  </span>
                </div>

                <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
                  {leader.name}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  {leader.role}
                </p>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-600 dark:text-slate-300">
                  {leader.summary}
                </p>

                {/* Focus areas */}
                <ul className="mt-5 space-y-1.5 border-t border-slate-200/90 pt-4 dark:border-white/10">
                  {leader.focus.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="h-1 w-1 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-5 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  {leader.education}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Workspace Banner - Responsive aspect ratio for mobile */}
        <figure className="group relative mt-6 aspect-[16/10] sm:aspect-[16/6] min-h-[220px] overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 dark:border-white/10">
          <img
            src="/images/modern_workspace.jpg"
            alt="Innovation Ark engineering workspace"
            className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
          <figcaption className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10 text-white">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-300">
              Working together
            </p>
            <p className="mt-2 text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight max-w-xl">
              Direct access, fewer hand-offs, clearer product decisions.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default FounderProfile;
