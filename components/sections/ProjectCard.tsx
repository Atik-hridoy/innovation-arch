'use client';

import React from 'react';
import { Project } from '../../data/portfolio';

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
      {/* Text Breakdown Column */}
      <div
        className={`lg:col-span-5 flex flex-col items-start gap-4 sm:gap-5 ${
          isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
        }`}
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold mb-2 block">
            CASE STUDY // {project.subtitle}
          </span>
          <h3 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* 3-Pillar Breakdown */}
        <div className="w-full flex flex-col gap-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 sm:p-5">
          {/* Problem */}
          {project.problem && (
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100/90 dark:border-rose-900/50">
              <span className="font-mono text-[10px] uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                The Problem
              </span>
              <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100/90 dark:border-blue-900/50">
              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                The Solution
              </span>
              <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100/90 dark:border-emerald-900/50">
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                Business Impact
              </span>
              <p className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}
        </div>

        {/* Tags & Action Button */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-between pt-1">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-semibold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-sans font-semibold text-xs tracking-wider uppercase bg-[#0f172a] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-5 py-3 rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Discuss Similar Goal
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Massive Slate Rounded Box Column (Image Mockup inside) */}
      <div
        className={`lg:col-span-7 ${
          isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
        }`}
      >
        <div className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden flex items-center justify-center group shadow-xs hover:shadow-md transition-all duration-300 min-h-[320px] sm:min-h-[420px] lg:min-h-[480px]">
          
          {/* Subtle Ambient Radial Glow inside box */}
          <div className="absolute inset-0 bg-radial from-blue-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Metric Pill Badge on Top Right */}
          {project.metrics?.value && (
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 font-mono text-[11px] sm:text-xs font-bold bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.metrics.label}: <strong className="text-blue-600 dark:text-blue-400 font-mono">{project.metrics.value}</strong></span>
            </div>
          )}

          {/* Floating Phone/App Mockup with drop-shadow-2xl */}
          <div className="relative z-10 w-full max-w-[560px] aspect-[16/10] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <img
              src={project.mockups[0]}
              alt={`${project.title} mockup`}
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.75)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;

