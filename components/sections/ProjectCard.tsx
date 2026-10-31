import { Project } from '@/data/portfolio';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 !== 0;

  return (
    <article className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-16">
      
      {/* Product Mockup Visual - On mobile, always rendered on top for instant visual impact */}
      <div className={`w-full lg:col-span-7 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="group relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-[#e9edf2] dark:bg-[#111722] shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,.18),transparent_50%)]" />
          
          {/* Category Floating Badge */}
          <div className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/10">
            {project.subtitle}
          </div>

          <img
            src={project.mockups[0]}
            alt={`${project.title} product interface`}
            className="relative h-full w-full object-contain p-4 sm:p-8 md:p-10 drop-shadow-[0_20px_35px_rgba(15,23,42,.18)] transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Project Details Content */}
      <div className={`w-full lg:col-span-5 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
        <p className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Case Study · 0{project.id}
        </p>

        <h3 className="mt-2 sm:mt-3 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em] sm:tracking-[-0.045em] text-slate-950 dark:text-white leading-tight">
          {project.title}
        </h3>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        {/* Challenge, Approach, Outcome Breakdown */}
        <dl className="mt-5 sm:mt-7 space-y-2.5 sm:space-y-0 sm:divide-y sm:divide-slate-200 sm:border-y sm:border-slate-200 dark:sm:divide-white/10 dark:sm:border-white/10">
          {[
            ['Challenge', project.problem],
            ['Approach', project.solution],
            ['Outcome', project.impact],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl sm:rounded-none bg-slate-50/70 dark:bg-white/[0.02] sm:bg-transparent p-3 sm:p-0 sm:py-3.5 sm:grid sm:grid-cols-[85px_1fr] sm:gap-2"
              >
                <dt className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 sm:text-slate-950 sm:dark:text-white">
                  {label}
                </dt>
                <dd className="mt-1 sm:mt-0 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {value}
                </dd>
              </div>
            ))}
        </dl>

        {/* Tech Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200/90 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-5">
          <a
            href={`/work/${project.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 dark:bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-white dark:text-slate-950 shadow-sm active:scale-98 transition-all hover:bg-blue-600 dark:hover:bg-blue-100"
          >
            <span>Read full case study</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a
            href="#book"
            className="text-center text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
          >
            Discuss a similar project →
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
