import { SectionHeader } from '@/components/ui/SectionHeader';

const leaders = [
  { name: 'Atik Hridoy', role: 'Founder & Principal Architect', education: 'B.Sc. CSE — BRAC University', image: '/images/founder_portrait.jpg', summary: 'Leads product direction, frontend architecture, and the translation of business goals into clear digital experiences.', focus: ['Product architecture', 'Web and mobile', 'Experience design'] },
  { name: 'Technology leadership', role: 'Backend & AI Systems', education: 'B.Sc. CSE — Neijiang Normal University', image: '/images/cto_portrait.jpg', summary: 'Leads backend engineering, data systems, and applied AI work with an emphasis on maintainability and practical outcomes.', focus: ['Backend systems', 'Applied AI', 'Cloud infrastructure'] },
];

export function FounderProfile() {
  return (
    <section id="about" className="section-shell border-t border-slate-200/70 bg-[#eef4f3] transition-colors dark:border-white/10 dark:bg-[#09110f]">
      <div className="site-container">
        <SectionHeader eyebrow="Leadership" title="Senior people stay close to the work." description="The people shaping the approach remain involved through design, engineering, and delivery." />
        <div className="grid overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <article key={leader.name} className={`group grid sm:grid-cols-[190px_1fr] ${index === 0 ? 'border-b border-slate-200 dark:border-white/10 lg:border-b-0 lg:border-r' : ''}`}>
              <div className="relative min-h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 sm:min-h-full"><img src={leader.image} alt={leader.name} className="absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" /></div>
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">0{index + 1} / Leadership</p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{leader.name}</h3><p className="mt-1 text-sm text-slate-500">{leader.role}</p>
                <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">{leader.summary}</p>
                <ul className="mt-7 space-y-2 border-t border-slate-200 pt-5 dark:border-white/10">{leader.focus.map(item => <li key={item} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300"><span className="h-px w-4 bg-blue-500" />{item}</li>)}</ul>
                <p className="mt-auto pt-7 text-[11px] text-slate-400">{leader.education}</p>
              </div>
            </article>
          ))}
        </div>
        <figure className="group relative mt-6 aspect-[16/6] min-h-64 overflow-hidden rounded-xl bg-slate-900"><img src="/images/modern_workspace.jpg" alt="Innovation Ark engineering workspace" className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/25 to-transparent" /><figcaption className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-end p-6 text-white sm:p-10"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">Working together</p><p className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">Direct access, fewer hand-offs, clearer decisions.</p></figcaption></figure>
      </div>
    </section>
  );
}

export default FounderProfile;
