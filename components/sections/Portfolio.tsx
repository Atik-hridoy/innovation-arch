'use client';

import { useState, useEffect, useRef } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mockups: string[];
  metrics: { value: string; label: string };
}

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Wanderly',
    subtitle: 'LUXURY TRAVEL DISCOVERY',
    description: 'A complete travel discovery ecosystem with high-performance booking engines, real-time trip scheduling, and localized recommendations.',
    tags: ['Flutter', 'Firebase', 'Maps API', 'Payment Gateways'],
    mockups: [
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp'
    ],
    metrics: { value: '150K+', label: 'Monthly Active Users' },
  },
  {
    id: '02',
    title: 'Apex Analytics',
    subtitle: 'REAL-TIME DATA DECISION ENGINE',
    description: 'A high-fidelity financial dashboard and modeling framework capable of rendering volumetric risk analysis with ultra-low latency.',
    tags: ['Next.js', 'WebGL', 'Tailwind CSS', 'WebSockets'],
    mockups: [
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp'
    ],
    metrics: { value: '99.9%', label: 'Prediction Accuracy' },
  },
  {
    id: '03',
    title: 'Zenith AI',
    subtitle: 'COGNITIVE NEURAL OPERATION HUB',
    description: 'Custom cognitive agent orchestrator executing complex enterprise operations, scaling efficiency, and automating workflows.',
    tags: ['Python', 'LLM Agents', 'FastAPI', 'Kubernetes'],
    mockups: [
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp',
      '/images/wanderly_left.webp',
      '/images/wanderly_center.webp'
    ],
    metrics: { value: '4.8x', label: 'Efficiency Increase' },
  },
];

// Reusable Project Card component
interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

function ProjectCard({ project, isActive }: ProjectCardProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const isHovered = useRef(false);

  // Auto-looping slideshow ONLY if this card is currently selected/active
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      if (!isHovered.current) {
        setActiveImgIdx((prev) => (prev + 1) % project.mockups.length);
      }
    }, 3000); // cycle every 3 seconds

    return () => clearInterval(timer);
  }, [isActive, project.mockups.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovered.current = true;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    setLightPos({ x: localX, y: localY });
    
    // Compute 3D tilt angles
    const x = localX / rect.width;
    const y = localY / rect.height;
    
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    
    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={`w-[85vw] md:w-[75vw] max-w-[1100px] shrink-0 snap-center rounded-3xl border p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group ${
        isActive ? 'border-primary/20 bg-[#0b0a0d]/70' : 'border-white/5 bg-[#0b0a0d]/40 opacity-70'
      }`}
      style={{
        transform: isActive
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.002)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      }}
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volumetric spotlight glow on mouse move */}
      {isActive && (
        <span 
          className="absolute inset-0 bg-radial pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
          style={{
            backgroundImage: `radial-gradient(circle at ${lightPos.x}px ${lightPos.y}px, rgba(221, 183, 255, 0.08) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Left Column: Details */}
      <div className="lg:col-span-5 flex flex-col items-start gap-6 relative z-10 order-2 lg:order-1">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 font-semibold mb-2 block">
            {project.subtitle}
          </span>
          <h3 className="font-sans font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-none mb-3">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="border-t border-white/10 pt-4 w-full">
          <div className="text-xl md:text-2xl font-extrabold text-white leading-none">
            {project.metrics.value}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/50 mt-1.5 font-mono">
            {project.metrics.label}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-label-caps text-[8px] font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Case Study Arrow Link */}
        <div className="pt-2">
          <a
            className="font-body-md text-[10px] font-bold text-primary hover:text-white transition-colors flex items-center gap-2 tracking-widest"
            href="#"
          >
            VIEW CASE STUDY
            <span className="material-symbols-outlined text-[13px] group-hover:translate-x-1.5 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Right Column: Multi-Image Gallery Showcase */}
      <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 order-1 lg:order-2">
        {/* Main Large Preview Frame */}
        <div className="w-full aspect-[16/10] rounded-2xl border border-white/10 bg-[#070709] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {/* Ambient glow in image frame */}
          <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <img
            className="w-full h-full object-cover select-none pointer-events-none transform group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
            src={project.mockups[activeImgIdx]}
            alt={`${project.title} preview`}
          />
          
          {/* Top-Left Image Index Badge */}
          <span className="absolute top-4 left-4 font-mono text-[9px] font-bold bg-[#050505]/75 text-primary border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md select-none">
            PREVIEW 0{activeImgIdx + 1}
          </span>
        </div>

        {/* Thumbnails Gallery Row */}
        <div className="flex gap-3 justify-start items-center">
          {project.mockups.map((mockup, tIdx) => {
            const isSelected = activeImgIdx === tIdx;
            return (
              <button
                key={tIdx}
                onClick={() => {
                  isHovered.current = true;
                  setActiveImgIdx(tIdx);
                }}
                className={`w-16 md:w-20 aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-primary shadow-[0_0_15px_rgba(221,183,255,0.4)] scale-105 opacity-100'
                    : 'border-white/10 opacity-40 hover:opacity-80'
                }`}
              >
                <img
                  className="w-full h-full object-cover select-none pointer-events-none"
                  src={mockup}
                  alt="thumbnail"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const currentBgImage = PROJECTS[activeCardIdx]?.mockups[0];

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
        {PROJECTS.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isActive={activeCardIdx === idx}
          />
        ))}
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
