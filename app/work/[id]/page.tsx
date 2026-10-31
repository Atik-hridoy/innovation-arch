import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PROJECTS } from '@/data/portfolio';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study — Innovation Ark`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Innovation Ark`,
      description: project.description,
      images: [project.mockups[0]],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-[#07090d] dark:text-white overflow-x-hidden">
      <Header />
      <main>
        {/* Case Study Header */}
        <header className="site-container pb-10 pt-28 sm:pb-16 sm:pt-36">
          <a
            href="/#work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to selected work</span>
          </a>

          <div className="mt-8">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Case Study / {project.subtitle}
            </span>
            <h1 className="mt-3 max-w-4xl text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] sm:leading-[0.98] tracking-[-0.04em] sm:tracking-[-0.05em] text-slate-950 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
          </div>
        </header>

        {/* Featured Mockup Visual */}
        <div className="site-container">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/10 bg-[#e8edf3] dark:bg-[#111722] shadow-sm">
            <img
              src={project.mockups[0]}
              alt={`${project.title} interface overview`}
              className="h-full w-full object-contain p-4 sm:p-10 drop-shadow-[0_20px_40px_rgba(15,23,42,.18)]"
            />
          </div>
        </div>

        {/* Deep Dive Breakdown */}
        <section className="section-shell">
          <div className="site-container grid gap-8 sm:gap-12 lg:grid-cols-[.4fr_1fr] lg:gap-20">
            <div>
              <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Project Overview
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50/70 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 sm:space-y-10">
              {[
                ['The challenge', project.problem],
                ['Our approach', project.solution],
                ['The outcome', project.impact],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 sm:p-7 dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <h2 className="text-lg sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {title}
                  </h2>
                  <p className="mt-2.5 max-w-3xl text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-600 dark:text-slate-400">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Next Step Banner */}
        <section className="bg-slate-950 py-14 sm:py-20 text-white dark:bg-[#0d1118]">
          <div className="site-container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-400">
                Have a related challenge?
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
                Let’s discuss the next useful step.
              </h2>
            </div>
            <div>
              <a
                href="/#book"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-md active:scale-98 transition-all hover:bg-blue-50"
              >
                Book a consultation →
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="site-container">
        <Footer />
      </div>
    </div>
  );
}
