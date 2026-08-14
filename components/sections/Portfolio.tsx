'use client';

import { useState, useEffect, useRef } from 'react';
import { Project } from '../../data/portfolio';
import { CONFIG } from '../../lib/config';
import { ProjectCard } from './ProjectCard';

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/projects/`);
        if (!res.ok) throw new Error('Failed to load projects');
        
        const data = await res.json();
        if (data && data.length > 0) {
          const mappedProjects: Project[] = data.map((apiProj: any) => {
            // Collect all non-null mockups
            const mockups = [
              apiProj.mockup_1, 
              apiProj.mockup_2, 
              apiProj.mockup_3, 
              apiProj.mockup_4
            ].filter(Boolean);
            
            // Fallback image if none uploaded
            if (mockups.length === 0) mockups.push(CONFIG.FALLBACK_IMAGE);

            return {
              id: apiProj.id.toString(),
              title: apiProj.title || 'Untitled Project',
              subtitle: apiProj.subtitle || 'Category',
              description: apiProj.description || 'No description provided.',
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
          setProjects([]);
        }
      } catch (err) {
        console.error("Failed to fetch projects from backend:", err);
        setError("Unable to load projects at this time.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  const currentBgImage = projects[activeCardIdx]?.mockups[0];

  // Scroll listener to compute which card is closest to horizontal center
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const children = container.children;
      let closestIdx = 0;
      let minDistance = Infinity;
      const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
      
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      }
      setActiveCardIdx(closestIdx);
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="relative py-12 md:py-stack-xl px-4 sm:px-margin-edge z-10 bg-[#070609] overflow-hidden">
      
      {/* Volumetric dynamic image background matching active card's 1st image */}
      <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out pointer-events-none">
        {currentBgImage && (
          <img 
            key={currentBgImage}
            src={currentBgImage} 
            className="w-full h-full object-cover opacity-25 blur-[60px] scale-105 transition-all duration-1000 ease-in-out"
            alt="dynamic contextual background"
          />
        )}
        {/* Soft atmospheric gradient overlay (replaces multiply to let image stand out) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070609]/70 via-transparent to-[#070609]/95" />
      </div>

      {/* Section Header with Nav Buttons */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-16 relative z-10">
        <div className="flex flex-col gap-3 md:gap-6">
          <span className="font-label-caps text-label-caps text-primary/70 block">FEATURED WORK</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-on-surface leading-[0.95] tracking-tighter font-bold">
            Real projects. Real impact.
          </h2>
        </div>

        {/* Next/Prev Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleScrollLeft}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 bg-[#0d0d11]/80 backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Scroll Left"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <button
            onClick={handleScrollRight}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-on-surface hover:text-primary hover:border-primary/50 bg-[#0d0d11]/80 backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Scroll Right"
          >
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scroll-smooth relative z-10"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {isLoading ? (
          <div className="w-full flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4 text-white/50">
              <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
              <p className="font-mono text-sm tracking-widest">LOADING PROJECTS...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full flex items-center justify-center min-h-[400px]">
            <div className="border border-red-500/20 bg-red-500/5 rounded-3xl p-10 flex flex-col items-center gap-4 text-center max-w-md backdrop-blur-md">
              <span className="material-symbols-outlined text-red-400 text-5xl">warning</span>
              <h3 className="text-xl font-bold text-white">Oops! Connection Failed</h3>
              <p className="text-sm text-white/50">{error}</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="w-full flex items-center justify-center min-h-[400px]">
            <div className="border border-white/5 bg-white/[0.02] rounded-3xl p-10 flex flex-col items-center gap-4 text-center max-w-md backdrop-blur-md">
              <span className="material-symbols-outlined text-white/20 text-5xl">folder_off</span>
              <h3 className="text-xl font-bold text-white">No Projects Found</h3>
              <p className="text-sm text-white/50">There are currently no case studies available to display. Please add some from the admin dashboard.</p>
            </div>
          </div>
        ) : (
          projects.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isActive={activeCardIdx === idx}
            />
          ))
        )}
      </div>

      {/* Metrics Grid Footer Row */}
      <div className="scroll-reveal w-full max-w-7xl mx-auto rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-4 sm:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 mt-8 md:mt-16 items-center relative z-20">
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">10+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Projects Delivered</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">5+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Happy Clients</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">2+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Years of Experience</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">100%</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Client Satisfaction</div>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-2 border-l border-white/10 pl-6 h-full justify-center">
          <span className="font-mono text-[9px] text-on-surface-variant/80 tracking-wide">Trusted by brands and startups worldwide.</span>
        </div>
      </div>
    </section>
  );
}
