'use client';

import { useState, useEffect, useRef } from 'react';
import { PROJECTS, Project } from '../../data/portfolio';
import { getProjects } from '@/lib/api';
import { CONFIG } from '../../lib/config';
import { ProjectCard } from './ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          const published = data.filter((p) => p.is_published !== false);
          const mappedProjects: Project[] = (published.length > 0 ? published : data).map((apiProj) => ({
            id: apiProj.id.toString(),
            title: apiProj.title || 'Untitled Project',
            subtitle: apiProj.subtitle || 'Category',
            description: apiProj.description || '',
            problem: apiProj.problem || '',
            solution: apiProj.solution || '',
            impact: apiProj.impact || '',
            tags: apiProj.tags || [],
            mockups: apiProj.mockups && apiProj.mockups.length > 0 ? apiProj.mockups : [CONFIG.FALLBACK_IMAGE],
            metrics: {
              value: apiProj.metric_value || '-',
              label: apiProj.metric_label || 'Metric',
            },
          }));
          setProjects(mappedProjects);
        } else {
          setProjects(PROJECTS);
        }
      } catch (err) {
        console.warn('Using fallback local projects array:', err);
        setProjects(PROJECTS);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Staggered Scroll Animation for Header and Zig-Zag Rows
  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      }

      rowsRef.current.filter(Boolean).forEach((row) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  return (
    <section ref={sectionRef} id="work" className="section-shell relative z-10 border-t border-slate-200/70 bg-[#f6f7f9] transition-colors dark:border-white/10 dark:bg-[#090d13]">

      {/* Section Header */}
      <div ref={headerRef} className="site-container mb-10 sm:mb-16 lg:mb-24">
        <SectionHeader
          eyebrow="Selected work"
          title="Products shaped around real operational needs."
          description="A closer look at platforms, applications, and digital systems we have helped bring to life."
        />
      </div>

      {/* Vertical Projects Container with Mobile-Tuned Spacing */}
      <div className="site-container relative z-10">
        {isLoading ? (
          <div className="w-full flex items-center justify-center min-h-[260px]">
            <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined text-3xl animate-spin">refresh</span>
              <p className="text-xs sm:text-sm">Loading selected work...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
              {projects.map((project) => (
                <article key={project.id} className="min-w-[86vw] snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0d131d]">
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-200 dark:bg-slate-900">
                    <img src={project.mockups[0]} alt={`${project.title} interface`} className="h-full w-full object-contain p-4" />
                    <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">{project.subtitle}</span>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[.18em] text-blue-600 dark:text-blue-400">Case study / 0{project.id}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-.035em] text-slate-950 dark:text-white">{project.title}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600 dark:text-slate-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-600 dark:bg-white/[.06] dark:text-slate-300">{tag}</span>)}
                    </div>
                    <a href={`/work/${project.id}`} className="mt-5 flex min-h-11 w-full items-center justify-between rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
                      View case study <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden flex-col gap-24 md:flex lg:gap-32">
              {projects.map((project, idx) => (
                <div key={project.id} ref={(el) => { rowsRef.current[idx] = el; }} className="w-full">
                  <ProjectCard project={project} index={idx} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </section>
  );
}

export default Portfolio;
