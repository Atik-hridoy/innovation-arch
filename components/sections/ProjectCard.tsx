import { Project } from '@/data/portfolio';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 !== 0;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{project.id} / {project.subtitle}</p>
        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl">{project.title}</h3>
        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>
        <dl className="mt-8 border-t border-slate-200 dark:border-white/10">{[['Challenge', project.problem], ['Approach', project.solution], ['Outcome', project.impact]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid gap-2 border-b border-slate-200 py-4 sm:grid-cols-[90px_1fr] dark:border-white/10"><dt className="text-xs font-semibold text-slate-950 dark:text-white">{label}</dt><dd className="text-xs leading-6 text-slate-500 dark:text-slate-400">{value}</dd></div>)}</dl>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">{project.tags.map(tag => <span key={tag} className="text-xs text-slate-500 dark:text-slate-400">{tag}</span>)}</div>
        <div className="mt-8 flex flex-wrap items-center gap-6"><a href={`/work/${project.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">Read case study <span className="transition-transform group-hover:translate-x-1">→</span></a><a href="#book" className="text-sm text-slate-500 transition-colors hover:text-blue-600">Discuss a related project</a></div>
      </div>
      <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}><div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#e9edf2] dark:bg-[#111722]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,.16),transparent_42%)]" /><img src={project.mockups[0]} alt={`${project.title} product interface`} className="relative h-full w-full object-contain p-5 drop-shadow-[0_30px_45px_rgba(15,23,42,.2)] transition duration-700 ease-out group-hover:scale-[1.025] sm:p-10" /></div></div>
    </article>
  );
}

export default ProjectCard;
