'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '../../data/portfolio';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

export interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Pre-calculated 3D rotations for the mockup card stack
  const rotations = useMemo(() => [3, -2.5, 4.5, -3.5], []);

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % project.mockups.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + project.mockups.length) % project.mockups.length);
  };

  return (
    <div
      className={`w-[88vw] md:w-[78vw] max-w-[1120px] shrink-0 snap-center rounded-3xl border p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md ${
        isActive
          ? 'border-emerald-500/30 dark:border-primary/20 bg-emerald-950/60 dark:bg-[#0b0a0d]/70'
          : 'border-emerald-500/15 dark:border-white/5 bg-emerald-950/30 dark:bg-[#0b0a0d]/40 opacity-70'
      }`}
    >
      {/* Left Column: Details */}
      <div className="lg:col-span-5 flex flex-col items-start gap-5 relative z-10 order-2 lg:order-1">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-300 dark:text-primary font-semibold mb-2 block">
            {project.subtitle}
          </span>
          <h3 className="font-sans font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-none mb-3">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-emerald-100/80 dark:text-on-surface-variant leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="border-t border-emerald-500/20 dark:border-white/10 pt-3 w-full">
          <div className="text-xl md:text-2xl font-extrabold text-white leading-none">
            {project.metrics.value}
          </div>
          <div className="text-[9px] uppercase tracking-wider text-emerald-300/60 dark:text-on-surface-variant/50 mt-1 font-mono">
            {project.metrics.label}
          </div>
        </div>

        {/* Tags & Action Button */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-between pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-label-caps text-[8px] font-semibold text-emerald-300 dark:text-primary px-2.5 py-1 rounded-full bg-emerald-500/15 dark:bg-primary/10 border border-emerald-500/30 dark:border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <a href="#contact">
            <RadialGlowButton size="sm" className="font-semibold text-xs tracking-wider !min-w-[130px] !min-h-[38px]">
              View Project
              <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
            </RadialGlowButton>
          </a>
        </div>
      </div>

      {/* Right Column: 3D Image-Shifting Card Stack */}
      <div className="lg:col-span-7 flex flex-col gap-4 relative z-10 order-1 lg:order-2">
        {/* 3D Perspective Card Stack Area */}
        <div
          className="w-full aspect-[16/10] relative rounded-2xl cursor-pointer select-none"
          style={{ perspective: '1400px' }}
          onClick={handleNextImage}
        >
          {project.mockups.map((mockup, idx) => {
            const isTop = idx === activeImgIdx;
            const offset = (idx - activeImgIdx + project.mockups.length) % project.mockups.length;

            let translateX = offset * 18;
            let translateY = Math.abs(offset) * 8;
            let translateZ = -100 * offset;
            let scale = 1 - offset * 0.045;
            let rotateZ = isTop ? 0 : rotations[idx % rotations.length];
            let opacity = isTop ? 1 : Math.max(0.3, 0.7 - offset * 0.2);
            let zIndex = project.mockups.length - offset;

            if (isTop) {
              translateX = 0;
              translateY = 0;
              translateZ = 0;
              scale = 1;
              rotateZ = 0;
              opacity = 1;
              zIndex = 40;
            }

            return (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-neutral-900 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  className="w-full h-full object-cover select-none pointer-events-none"
                  src={mockup}
                  alt={`${project.title} mockup ${idx + 1}`}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Top-Left Image Index Badge on Active Card */}
                {isTop && (
                  <span className="absolute top-4 left-4 font-mono text-[9px] font-bold bg-emerald-950/80 dark:bg-[#050505]/80 text-emerald-300 dark:text-primary border border-emerald-500/30 dark:border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    SLIDE 0{activeImgIdx + 1} / 0{project.mockups.length}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Gallery Controls & Thumbnails Row */}
        <div className="flex items-center justify-between gap-4 mt-2">
          {/* Thumbnails Row */}
          <div className="flex gap-2.5 items-center">
            {project.mockups.map((mockup, tIdx) => {
              const isSelected = activeImgIdx === tIdx;
              return (
                <button
                  key={tIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIdx(tIdx);
                  }}
                  className={`w-14 sm:w-18 aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)] scale-105 opacity-100 ring-2 ring-emerald-400/40'
                      : 'border-emerald-500/20 dark:border-white/10 opacity-40 hover:opacity-80'
                  }`}
                  aria-label={`View slide ${tIdx + 1}`}
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

          {/* Next / Previous Stack Shifter Controls */}
          {project.mockups.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevImage}
                className="w-9 h-9 rounded-full border border-emerald-500/20 dark:border-white/10 bg-emerald-950/70 dark:bg-white/5 hover:bg-emerald-900/60 dark:hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Previous mockup"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
              <button
                onClick={handleNextImage}
                className="w-9 h-9 rounded-full border border-emerald-500/20 dark:border-white/10 bg-emerald-950/70 dark:bg-white/5 hover:bg-emerald-900/60 dark:hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Next mockup"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
