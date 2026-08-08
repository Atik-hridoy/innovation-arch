'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/components/portfolio/data';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const isHovered = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      if (!isHovered.current) {
        setActiveImgIdx((prev) => (prev + 1) % project.mockups.length);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isActive, project.mockups.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovered.current = true;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    setLightPos({ x: localX, y: localY });

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
      {isActive && (
        <span
          className="absolute inset-0 bg-radial pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `radial-gradient(circle at ${lightPos.x}px ${lightPos.y}px, rgba(221, 183, 255, 0.08) 0%, transparent 60%)`,
          }}
        />
      )}

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

        <div className="border-t border-white/10 pt-4 w-full">
          <div className="text-xl md:text-2xl font-extrabold text-white leading-none">
            {project.metrics.value}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/50 mt-1.5 font-mono">
            {project.metrics.label}
          </div>
        </div>

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

      <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 order-1 lg:order-2">
        <div className="w-full aspect-[16/10] rounded-2xl border border-white/10 bg-[#070709] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
          <img
            className="w-full h-full object-cover select-none pointer-events-none transform group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
            src={project.mockups[activeImgIdx]}
            alt={`${project.title} preview`}
          />
          <span className="absolute top-4 left-4 font-mono text-[9px] font-bold bg-[#050505]/75 text-primary border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md select-none">
            PREVIEW 0{activeImgIdx + 1}
          </span>
        </div>

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
