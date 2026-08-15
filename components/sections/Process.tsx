import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Custom Animated SVGs for each process step to replace generic material symbols
function DiscoverIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Radar rings */}
      <circle cx="12" cy="12" r="9" className="stroke-primary/20" />
      <circle cx="12" cy="12" r="5" className="stroke-primary/40" />
      <circle cx="12" cy="12" r="2" className="fill-primary stroke-none" />
      {/* Radar sweep line */}
      <line x1="12" y1="12" x2="18" y2="6" className="stroke-primary origin-center animate-[spin_4s_linear_infinite]" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Bezier handle lines */}
      <path d="M 4 20 L 12 4 L 20 20" className="stroke-white/10" strokeDasharray="2 2" />
      {/* Vector curve */}
      <path d="M 4 20 Q 12 4 20 20" className="stroke-primary" strokeWidth="2" />
      {/* Anchor nodes */}
      <rect x="2" y="18" width="4" height="4" className="fill-background stroke-primary" strokeWidth="1.5" />
      <rect x="18" y="18" width="4" height="4" className="fill-background stroke-primary" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="3" className="fill-primary stroke-none" />
    </svg>
  );
}

function DevelopIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Code bracket structures */}
      <path d="M 8 6 L 3 12 L 8 18" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 6 L 21 12 L 16 18" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" className="stroke-primary/60" strokeWidth="1.5" />
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Rocket body */}
      <path d="M12 2S8 7 8 12v3l4 3 4-3v-3c0-5-4-10-4-10z" className="stroke-primary" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
      {/* Fins */}
      <path d="M8 15l-4 2v-3l4-1" className="stroke-primary" />
      <path d="M16 15l4 2v-3l-4-1" className="stroke-primary" />
      {/* Fire thrust */}
      <path d="M12 18v4" className="stroke-[#adc6ff] animate-bounce" strokeWidth="2" />
      <path d="M10 19v2" className="stroke-[#842bd2] animate-pulse" />
      <path d="M14 19v2" className="stroke-[#842bd2] animate-pulse" />
    </svg>
  );
}

function GrowIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Upward trend grid lines */}
      <path d="M 3 21 L 21 21" className="stroke-white/10" />
      <path d="M 3 21 L 3 3" className="stroke-white/10" />
      {/* Glowing upward curving trend */}
      <path d="M 3 18 Q 10 16 14 10 T 21 3" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
      {/* Pulsing end node */}
      <circle cx="21" cy="3" r="3" className="fill-primary animate-ping" />
      <circle cx="21" cy="3" r="2" className="fill-primary stroke-none" />
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
        const len = processPath.getTotalLength();
        gsap.set(processPath, { strokeDasharray: len, strokeDashoffset: len });

        const progressDot = containerRef.current?.querySelector('.process-progress-dot');

        // Precompute path sample points once to avoid expensive getPointAtLength calls on scroll
        const SAMPLES = 120;
        const samplePoints: { x: number; y: number }[] = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const pt = processPath.getPointAtLength((len * i) / SAMPLES);
          samplePoints.push({ x: pt.x, y: pt.y });
        }

        gsap.to(processPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
            onUpdate: (self) => {
              if (progressDot) {
                const idx = Math.min(SAMPLES, Math.max(0, Math.round(self.progress * SAMPLES)));
                const currentPoint = samplePoints[idx];
                if (currentPoint) {
                  gsap.set(progressDot, {
                    x: currentPoint.x,
                    y: currentPoint.y,
                  });
                }
              }
            }
          },
        });

        // Mobile ScrollTrigger: only trigger animation when section reaches upper center / top portion of screen
        const progressLine = containerRef.current?.querySelector('.mobile-progress-line') as HTMLElement;
        ScrollTrigger.create({
          trigger: '.mobile-process-container',
          start: 'top 30%',
          end: 'bottom 30%',
          scrub: 0.3,
          onUpdate: (self) => {
            if (progressLine) {
              progressLine.style.height = `${self.progress * 100}%`;
            }
            const stepIndex = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActiveStep(stepIndex);
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="process" className="process-section relative py-12 md:py-stack-xl px-4 sm:px-margin-edge z-10 overflow-hidden">
      {/* Mobile-Visible Dynamic Color Motion Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden animate-color-motion">
        {/* Dynamic Color Motion Node 1 (Violet / Purple) */}
        <div className="animate-aurora absolute top-[-10%] left-[-15%] w-[100vw] sm:w-[75vw] h-[100vw] sm:h-[75vw] rounded-full bg-gradient-to-tr from-primary/35 via-[#842bd2]/25 to-transparent blur-[70px] sm:blur-[140px] opacity-85" />
        
        {/* Dynamic Color Motion Node 2 (Deep Indigo / Cyan Glow) */}
        <div className="animate-aurora absolute bottom-[-10%] right-[-15%] w-[90vw] sm:w-[65vw] h-[90vw] sm:h-[65vw] rounded-full bg-gradient-to-bl from-secondary/30 via-primary/20 to-transparent blur-[80px] sm:blur-[150px] opacity-80" style={{ animationDirection: 'reverse', animationDuration: '22s' }} />

        {/* Center Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[55vw] h-[70vw] sm:h-[55vw] rounded-full bg-radial from-primary/20 via-transparent to-transparent blur-[60px] sm:blur-[110px]" />

        {/* Soft Dark Vignette Overlay - Only in Dark Mode */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-75" />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="METHODOLOGY & EXECUTION"
          title="HOW WE WORK"
          description="Crafting a precise, iterative path from initial concept to high-impact digital excellence."
        />
      </div>

      {/* ================= DESKTOP LAYOUT (md and up) ================= */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto relative h-[450px] items-center justify-center overflow-visible mt-12 mb-16 z-20">

        {/* Wave Path Container */}
        <svg className="absolute w-full h-full overflow-visible z-10" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
          {/* Base Background Path */}
          <path
            d="M 50 100 Q 200 20 350 150 Q 500 280 650 150 Q 800 20 950 100"
            stroke="currentColor"
            className="text-black/10 dark:text-white/5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Animated Scroll-Linked Path */}
          <path
            className="process-path"
            d="M 50 100 Q 200 20 350 150 Q 500 280 650 150 Q 800 20 950 100"
            stroke="url(#process-wave-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 10px rgba(183,109,255,0.4))' }}
          />
          {/* Custom Glowing Dot that follows path */}
          <circle
            className="process-progress-dot"
            r="8"
            fill="#ddb7ff"
            style={{ filter: 'drop-shadow(0 0 8px #ddb7ff)' }}
          />
          <defs>
            <linearGradient id="process-wave-grad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#842bd2"></stop>
              <stop offset="50%" stopColor="#ddb7ff"></stop>
              <stop offset="100%" stopColor="#adc6ff"></stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Staggered process steps absolute points on desktop */}
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
            {/* Glow effect behind active node */}
            <div className={`absolute -inset-4 rounded-full bg-primary/10 blur-md transition-opacity duration-500 pointer-events-none ${activeStep === idx ? 'opacity-100 scale-125' : 'opacity-0'}`} />

            {/* Circular step node with custom SVG */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer relative z-10 ${activeStep === idx
                ? 'bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(221,183,255,0.4)] scale-115'
                : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-primary/40'
              }`}>
              {step.icon}
            </div>

            {/* Premium Mini-card below/above step node */}
            <div className={`absolute top-full mt-4 w-52 flex flex-col items-center text-center transition-all duration-500 pointer-events-none ${activeStep === idx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-1 scale-95'
              }`}>
              <div className="text-[10px] text-primary uppercase font-mono tracking-widest font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-2">
                {step.id} / {step.name}
              </div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white tracking-wide">{step.title}</h4>
              <p className="text-[10px] text-on-surface-variant/80 mt-1 leading-relaxed max-w-[180px]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE LAYOUT (sm and below) - Modern Editorial Accordion ================= */}
      <div className="mobile-process-container md:hidden relative w-full mt-4 mb-8 z-20 flex flex-col gap-3">
        {steps.map((step, idx) => {
          const isOpen = (activeStep === null ? 0 : activeStep) === idx;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                isOpen
                  ? 'border-primary/40 bg-black/[0.03] dark:bg-white/[0.03] shadow-[0_10px_30px_rgba(221,183,255,0.08)]'
                  : 'border-black/8 dark:border-white/8 bg-white/70 dark:bg-[#09090c]/70 hover:border-black/15 dark:hover:border-white/15'
              }`}
            >
              {/* Accordion Bar Header */}
              <div className="flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                    isOpen
                      ? 'bg-primary/15 border-primary/40 text-primary shadow-[0_0_15px_rgba(221,183,255,0.2)]'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/40'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-[8px] font-mono tracking-[0.2em] text-primary uppercase block font-semibold">
                      {step.id} // {step.name}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/50 transition-transform duration-500 shrink-0 ${
                  isOpen ? 'rotate-180 text-primary border-primary/30 bg-primary/10' : ''
                }`}>
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>

              {/* Accordion Expanded Content */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/5 flex flex-col gap-3 animate-[fadeSlideIn_0.3s_ease-out]">
                  <p className="text-[11px] text-on-surface-variant/90 leading-relaxed font-normal">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[9px] font-mono text-primary/80 uppercase tracking-widest font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span>Phase 0{idx + 1} Deliverable Executing</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
