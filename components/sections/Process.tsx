'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/SectionHeader';

function DiscoverIcon() {
  return (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" className="stroke-blue-200" />
      <circle cx="12" cy="12" r="5" className="stroke-blue-400" />
      <circle cx="12" cy="12" r="2" className="fill-blue-600 stroke-none" />
      <line x1="12" y1="12" x2="18" y2="6" className="stroke-blue-600 origin-center animate-[spin_4s_linear_infinite]" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 4 20 Q 12 4 20 20" className="stroke-blue-600" strokeWidth="2" />
      <rect x="2" y="18" width="4" height="4" className="fill-white stroke-blue-600" strokeWidth="1.5" />
      <rect x="18" y="18" width="4" height="4" className="fill-white stroke-blue-600" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="3" className="fill-blue-600 stroke-none" />
    </svg>
  );
}

function DevelopIcon() {
  return (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 8 6 L 3 12 L 8 18" className="stroke-blue-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 6 L 21 12 L 16 18" className="stroke-blue-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" className="stroke-blue-400" strokeWidth="1.5" />
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2S8 7 8 12v3l4 3 4-3v-3c0-5-4-10-4-10z" className="stroke-blue-600" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
      <path d="M8 15l-4 2v-3l4-1" className="stroke-blue-600" />
      <path d="M16 15l4 2v-3l-4-1" className="stroke-blue-600" />
    </svg>
  );
}

function GrowIcon() {
  return (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 3 18 Q 10 16 14 10 T 21 3" className="stroke-blue-600" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="3" r="2" className="fill-blue-600 stroke-none" />
    </svg>
  );
}

const steps = [
  {
    id: '01',
    name: 'DISCOVER',
    title: 'Insight Gathering & Strategy',
    description: 'We dive deep into your product vision, target market, and technical constraints to outline a high-impact roadmap.',
    icon: <DiscoverIcon />,
    desktopPosition: { left: '8%', top: '20%' },
  },
  {
    id: '02',
    name: 'DESIGN',
    title: 'Premium UI/UX Architecture',
    description: 'We wireframe, prototype, and build immersive high-fidelity user experiences that communicate luxury and precision.',
    icon: <DesignIcon />,
    desktopPosition: { left: '29%', top: '65%' },
  },
  {
    id: '03',
    name: 'DEVELOP',
    title: 'High-Performance Engineering',
    description: 'We engineer modular, robust, and lightning-fast software systems optimized for scalability and clean code.',
    icon: <DevelopIcon />,
    desktopPosition: { left: '50%', top: '20%' },
  },
  {
    id: '04',
    name: 'LAUNCH',
    title: 'Seamless Product Deployment',
    description: 'We perform strict quality control, optimize assets, and orchestrate smooth deployments to production servers.',
    icon: <LaunchIcon />,
    desktopPosition: { left: '71%', top: '65%' },
  },
  {
    id: '05',
    name: 'GROW',
    title: 'Optimization & Scaling',
    description: 'We analyze user engagement, scale system capacity, automate processes, and implement modern growth features.',
    icon: <GrowIcon />,
    desktopPosition: { left: '92%', top: '20%' },
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const processPath = containerRef.current?.querySelector('.process-path') as SVGPathElement;
      if (processPath) {
        const len = processPath.getTotalLength() || 1100;
        gsap.set(processPath, { strokeDasharray: len, strokeDashoffset: len });

        const progressDot = containerRef.current?.querySelector('.process-progress-dot');

        gsap.to(processPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressDot && processPath) {
                const currentPoint = processPath.getPointAtLength(len * self.progress);
                if (currentPoint) {
                  gsap.set(progressDot, {
                    x: currentPoint.x,
                    y: currentPoint.y,
                  });
                }
              }
              const stepIndex = Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length)
              );
              setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
            },
          },
        });
      }
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} id="process" className="process-section relative py-12 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 z-10 bg-slate-50/50 dark:bg-slate-950">
      <div className="w-full max-w-[1720px] mx-auto">
        <SectionHeader
          eyebrow="METHODOLOGY & EXECUTION"
          title="HOW WE WORK"
          description="Crafting a precise, iterative path from initial concept to high-impact digital excellence."
        />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex w-full max-w-[1720px] mx-auto relative h-[420px] items-center justify-center overflow-visible mt-12 mb-16 z-20">

        <svg className="absolute w-full h-full overflow-visible z-10" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
          <path
            d="M 50 100 Q 200 20 350 150 Q 500 280 650 150 Q 800 20 950 100"
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="process-path"
            d="M 50 100 Q 200 20 350 150 Q 500 280 650 150 Q 800 20 950 100"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            className="process-progress-dot"
            r="7"
            fill="#2563eb"
          />
        </svg>

        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="absolute flex flex-col items-center z-30 group"
            style={{
              left: step.desktopPosition.left,
              top: step.desktopPosition.top,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setActiveStep(idx)}
            onMouseLeave={() => setActiveStep(null)}
          >
            <div className={`w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer relative z-10 ${
              activeStep === idx
                ? 'bg-blue-50 dark:bg-blue-950 border-2 border-blue-600 dark:border-blue-400 shadow-md scale-110'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 shadow-xs'
            }`}>
              {step.icon}
            </div>

            <div className={`absolute top-full mt-3 w-52 flex flex-col items-center text-center transition-all duration-300 pointer-events-none ${
              activeStep === idx ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'
            }`}>
              <div className="text-[9px] text-blue-700 dark:text-blue-300 uppercase font-mono tracking-widest font-bold bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 mb-1.5">
                {step.id} / {step.name}
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">{step.title}</h4>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-[180px]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE ACCORDION */}
      <div className="mobile-process-container md:hidden relative w-full mt-4 mb-8 z-20 flex flex-col gap-3">
        {steps.map((step, idx) => {
          const isOpen = (activeStep === null ? 0 : activeStep) === idx;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpen
                  ? 'border-blue-500 bg-white dark:bg-slate-900 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border shrink-0 ${
                    isOpen ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase block font-bold">
                      {step.id} // {step.name}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
