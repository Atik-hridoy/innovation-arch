'use client';

import { useState, useEffect, useRef } from 'react';
import { Project } from '../../data/portfolio';
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
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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

  // Staggered Scroll Animation
  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Animate Header Text
      if (headerRef.current) {
        // Split text roughly by words or characters. For simplicity, we'll just animate the whole header block or use a simple stagger if it has child elements.
        // Since we want the 'Vengence UI' feel, let's animate the header from bottom.
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          ease: 'sine.out'
        });
      }

      // 2. Animate Cards with stagger and center-out delay
      const validCards = cardsRef.current.filter(Boolean);
      const middleIndex = Math.floor(validCards.length / 2);

      validCards.forEach((card, index) => {
        const delayFactor = Math.abs(index - middleIndex) * 0.15;
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.5,
          },
          yPercent: 150,
          autoAlpha: 0,
          delay: delayFactor,
          ease: 'sine.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  const currentBgImage = projects[activeCardIdx]?.mockups[0];

  const scrollTicking = useRef(false);

  // RAF-throttled scroll listener to compute which card is closest to horizontal center
  const handleScroll = () => {
    if (!scrollTicking.current) {
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const children = container.children;
          let closestIdx = 0;
          let minDistance = Infinity;
          const containerRect = container.getBoundingClientRect();
          const containerCenter = containerRect.left + containerRect.width / 2;
          
          for (let i = 0; i < children.length; i++) {
            const childRect = children[i].getBoundingClientRect();
            const childCenter = childRect.left + childRect.width / 2;
            const distance = Math.abs(childCenter - containerCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestIdx = i;
            }
          }
          setActiveCardIdx((prev) => (prev !== closestIdx ? closestIdx : prev));
        }
        scrollTicking.current = false;
      });
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
    <section ref={sectionRef} id="work" className="relative py-12 md:py-stack-xl px-4 sm:px-margin-edge z-10 bg-white dark:bg-[#070609] overflow-hidden min-h-[100vh] md:min-h-[120vh] flex flex-col justify-center pb-16 md:pb-32 transition-colors duration-400">
      
      {/* Volumetric dynamic image background matching active card's 1st image */}
      <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out pointer-events-none">
        {currentBgImage && (
          <img 
            key={currentBgImage}
            src={currentBgImage} 
            className="w-full h-full object-cover opacity-[0.04] dark:opacity-25 blur-[60px] scale-105 transition-all duration-1000 ease-in-out"
            alt="dynamic contextual background"
          />
        )}

        {/* Mobile Dedicated Green Gradient Ambient Background */}
        <div className="md:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[110vw] h-[110vw] rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-600/20 to-transparent blur-[70px] mix-blend-screen" />
          <div className="absolute bottom-1/4 -right-1/4 w-[100vw] h-[100vw] rounded-full bg-gradient-to-bl from-green-500/20 via-emerald-700/15 to-transparent blur-[80px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-radial from-emerald-500/20 via-teal-900/10 to-transparent blur-[65px]" />
        </div>

        {/* Clean background on mobile, subtle vignette on larger screens */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-b from-white/90 dark:from-[#070609]/70 via-white/80 dark:via-transparent to-white/95 dark:to-[#070609]/95 transition-colors duration-400" />
      </div>

      {/* Section Header with Nav Buttons */}
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="FEATURED WORK & CASE STUDIES"
          title="PROVEN DIGITAL IMPACT"
          description="A selection of high-performance web platforms, mobile applications, and intelligent digital products."
          action={
            <div className="flex gap-3">
              <button
                onClick={handleScrollLeft}
                className="w-12 h-12 rounded-full border border-black/15 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white hover:text-primary hover:border-primary bg-white dark:bg-[#121118] backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-none hover:shadow-[0_6px_25px_rgba(124,58,237,0.2)]"
                aria-label="Scroll Left"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
              <button
                onClick={handleScrollRight}
                className="w-12 h-12 rounded-full border border-black/15 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white hover:text-primary hover:border-primary bg-white dark:bg-[#121118] backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-none hover:shadow-[0_6px_25px_rgba(124,58,237,0.2)]"
                aria-label="Scroll Right"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          }
        />
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
            <div 
              key={project.id} 
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="shrink-0"
            >
              <ProjectCard 
                project={project} 
                isActive={activeCardIdx === idx}
              />
            </div>
          ))
        )}
      </div>

    </section>
  );
}

