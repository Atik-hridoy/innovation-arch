import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PROJECTS, Project } from '@/data/portfolio';
import { getProject, getProjects, ApiProject } from '@/lib/api';
import { CONFIG } from '@/lib/config';

export const dynamicParams = true;

async function resolveProject(id: string): Promise<Project | null> {
  // 1. Try to fetch from Backend API
  try {
    const apiProj: ApiProject = await getProject(id);
    if (apiProj && apiProj.id) {
      return {
        id: apiProj.id.toString(),
        title: apiProj.title || 'Untitled Project',
        subtitle: apiProj.subtitle || 'Category',
        description: apiProj.description || '',
        problem: apiProj.problem || 'Details coming soon.',
        solution: apiProj.solution || 'Details coming soon.',
        impact: apiProj.impact || 'Details coming soon.',
        tags: apiProj.tags || [],
        mockups: apiProj.mockups && apiProj.mockups.length > 0 ? apiProj.mockups : [CONFIG.FALLBACK_IMAGE],
        metrics: {
          value: apiProj.metric_value || '-',
          label: apiProj.metric_label || 'Metric',
        },
      };
    }
  } catch (err) {
    // Fall back to local mock data
  }

  // 2. Fall back to static mock projects
  const staticFound =
    PROJECTS.find((item) => item.id === id) ||
    PROJECTS.find((item) => item.id === id.padStart(2, '0')) ||
    PROJECTS.find((item) => item.id.replace(/^0+/, '') === id);

  return staticFound || null;
}

export async function generateStaticParams() {
  try {
    const apiProjects = await getProjects();
    const ids = new Set<string>();
    PROJECTS.forEach((p) => ids.add(p.id));
    apiProjects.forEach((p) => ids.add(p.id.toString()));
    return Array.from(ids).map((id) => ({ id }));
  } catch {
    return PROJECTS.map((project) => ({ id: project.id }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await resolveProject(id);
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
  const project = await resolveProject(id);
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

              {project.metrics && project.metrics.value && (
                <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {project.metrics.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {project.metrics.label}
                  </p>
                </div>
              )}
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

              {/* Additional Project Mockups Gallery if available */}
              {project.mockups.length > 1 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Interface Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.mockups.slice(1).map((mockupUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-xl border border-slate-200/80 dark:border-white/10 overflow-hidden bg-slate-100 dark:bg-slate-900"
                      >
                        <img
                          src={mockupUrl}
                          alt={`${project.title} detail ${idx + 2}`}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
