import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PROJECTS } from '@/data/portfolio';

export function generateStaticParams() {
  return PROJECTS.map(project => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find(item => item.id === id);
  if (!project) return {};
  return { title: `${project.title} — Innovation Ark`, description: project.description, openGraph: { title: `${project.title} — Innovation Ark`, description: project.description, images: [project.mockups[0]] } };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS.find(item => item.id === id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-[#07090d] dark:text-white">
      <Header />
      <main>
        <header className="site-container pb-14 pt-32 sm:pb-20 sm:pt-40">
          <a href="/#work" className="text-xs font-medium text-slate-500 transition-colors hover:text-blue-600">← Selected work</a>
          <p className="mt-14 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Case study / {project.subtitle}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[.96] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{project.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">{project.description}</p>
        </header>

        <div className="site-container"><div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#e8edf3] dark:bg-[#111722]"><img src={project.mockups[0]} alt={`${project.title} interface overview`} className="h-full w-full object-contain p-5 drop-shadow-[0_35px_55px_rgba(15,23,42,.2)] sm:p-12" /></div></div>

        <section className="section-shell"><div className="site-container grid gap-12 lg:grid-cols-[.45fr_1fr] lg:gap-24"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">Project overview</p><div className="mt-8 flex flex-wrap gap-3">{project.tags.map(tag => <span key={tag} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 dark:border-white/10">{tag}</span>)}</div></div><div className="space-y-12">{[['The challenge', project.problem], ['Our approach', project.solution], ['The outcome', project.impact]].map(([title, text]) => <article key={title} className="border-t border-slate-200 pt-6 dark:border-white/10"><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">{text}</p></article>)}</div></div></section>

        <section className="bg-slate-950 py-20 text-white dark:bg-[#0d1118] sm:py-28"><div className="site-container grid gap-8 md:grid-cols-2 md:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-300">Have a related challenge?</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Let’s discuss the useful next step.</h2></div><div className="md:text-right"><a href="/#book" className="inline-flex rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-slate-950">Book a conversation</a></div></div></section>
      </main>
      <div className="site-container"><Footer /></div>
    </div>
  );
}
