'use client';

import { useState, useEffect, useRef } from 'react';
import { PROJECTS, Project } from '../../data/portfolio';
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
        const res = await fetch(`${CONFIG.API_BASE_URL}/projects/`);
        if (!res.ok) throw new Error('Failed to load projects');
        
        const data = await res.json();
        if (data && data.length > 0) {
          const mappedProjects: Project[] = data.map((apiProj: any) => {
            const mockups = [
              apiProj.mockup_1, 
              apiProj.mockup_2, 
              apiProj.mockup_3, 
              apiProj.mockup_4
            ].filter(Boolean);
            
            if (mockups.length === 0) mockups.push(CONFIG.FALLBACK_IMAGE);

            return {
              id: apiProj.id.toString(),
              title: apiProj.title || 'Untitled Project',
              subtitle: apiProj.subtitle || 'Category',
              description: apiProj.description || '',
              problem: apiProj.problem || '',
              solution: apiProj.solution || '',
              impact: apiProj.impact || '',
              tags: apiProj.tags || [],
              mockups: mockups,
              metrics: {
                value: apiProj.metric_value || '-',
                label: apiProj.metric_label || 'Metric'
              }
            };
          });
          setProjects(mappedProjects);
        } else {
          setProjects(PROJECTS);
        }
      } catch (err) {
        console.warn("Using fallback local projects array:", err);
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
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      rowsRef.current.filter(Boolean).forEach((row) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  return (
    <section ref={sectionRef} id="work" className="section-shell relative z-10 border-t border-slate-200/70 bg-[#f6f7f9] transition-colors dark:border-white/10 dark:bg-[#090d13]">

      {/* Section Header */}
      <div ref={headerRef} className="site-container mb-16 sm:mb-20 lg:mb-24">
        <SectionHeader
          eyebrow="Selected work"
          title="Products shaped around real operational needs."
          description="A closer look at platforms, applications, and digital systems we have helped bring to life."
        />
      </div>

      {/* Vertical Zig-Zag Projects Container */}
      <div className="site-container relative z-10 flex flex-col gap-20 sm:gap-28 lg:gap-36">
        {isLoading ? (
          <div className="w-full flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-white/50">
              <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
              <p className="text-sm">Loading selected work...</p>
            </div>
          </div>
        ) : (
          projects.map((project, idx) => (
            <div 
              key={project.id} 
              ref={(el) => { rowsRef.current[idx] = el; }}
              className="w-full"
            >
              <ProjectCard 
                project={project} 
                index={idx}
              />
            </div>
          ))
        )}
      </div>

    </section>
  );
}

export default Portfolio;
