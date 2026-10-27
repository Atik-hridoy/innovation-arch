'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

const AetherSwarm = dynamic(
  () => import('@/components/aetherswarm/ParticleScene'),
  { ssr: false }
);

const TECH_LOGOS = [
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
];

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains('dark'));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const particleLayer = particleLayerRef.current;
    if (!section || !particleLayer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frameId = 0;
    const update = () => {
      frameId = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.72, 1)));
      particleLayer.style.opacity = String(1 - progress * 0.82);
      particleLayer.style.transform = `translate3d(0, ${progress * -18}px, 0) scale(${1 - progress * 0.055})`;
    };
    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[760px] w-full flex-col overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-[#07090d] dark:text-white md:min-h-screen md:max-h-[1040px]"
    >
      <div ref={particleLayerRef} className="absolute inset-0 z-0 origin-[72%_50%] pointer-events-none select-none will-change-transform" aria-hidden="true">
        <AetherSwarm
          mode={isDark ? 'dark' : 'light'}
          embedded
          autoPlay
          showScrollIndicator={false}
          colorSphere="#075FC7"
          colorWave="#5946C7"
          colorTorus="#D97722"
          turbulenceIntensity={0.72}
          pointSize={44}
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.93)_36%,rgba(255,255,255,0.06)_59%,rgba(255,255,255,0)_74%)] dark:bg-[linear-gradient(90deg,rgba(7,9,13,0.98)_0%,rgba(7,9,13,0.92)_38%,rgba(7,9,13,0.28)_64%,rgba(7,9,13,0)_84%)] md:block"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.76))] dark:bg-[linear-gradient(180deg,rgba(7,9,13,0.55),rgba(7,9,13,0.92))] md:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center px-5 pb-12 pt-28 sm:px-8 md:grid-cols-12 md:px-12 md:pb-10 md:pt-32 lg:px-16">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="mb-7 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-300">
            Product strategy · Design · Engineering
          </p>

          <h1 className="max-w-[760px] text-balance font-sans text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-6xl md:text-6xl lg:text-[4.65rem]">
            Digital products,
            <span className="block text-slate-500 dark:text-slate-400">engineered for growth.</span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Innovation Arc works with ambitious teams to shape ideas, build dependable software and improve products over the long term.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
            >
              Discuss a project
            </button>
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100"
            >
              See our work
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:block lg:col-span-6" aria-hidden="true" />
      </div>

      <div className="relative z-10 w-full overflow-hidden border-t border-slate-200/90 bg-white/75 py-4 backdrop-blur-md dark:border-white/10 dark:bg-[#07090d]/82">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-[#07090d] dark:via-[#07090d]/90 sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-[#07090d] dark:via-[#07090d]/90 sm:w-36" />
        <div className="animate-marquee flex w-max items-center gap-10 sm:gap-14">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex shrink-0 items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100">
              <img src={item.logo} alt="" className="h-5 w-5 object-contain grayscale transition-all hover:grayscale-0 sm:h-6 sm:w-6" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Hero;
