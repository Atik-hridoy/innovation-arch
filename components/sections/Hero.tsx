'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';

const AetherSwarm = dynamic(() => import('@/components/aetherswarm/ParticleScene'), { ssr: false });

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
    if (!section || !particleLayer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      className="relative isolate flex w-full flex-col overflow-hidden bg-[#fbfcfe] text-slate-950 transition-colors duration-300 dark:bg-[#05070b] dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.055] blur-[120px] dark:bg-blue-500/[0.08]" />
      </div>

      <div ref={particleLayerRef} className="pointer-events-none absolute inset-0 z-0 origin-[58%_30%] select-none opacity-100 will-change-transform sm:origin-[72%_50%]" aria-hidden="true">
        <AetherSwarm
          mode={isDark ? 'dark' : 'light'}
          embedded
          autoPlay
          showScrollIndicator={false}
          colorSphere="#075FC7"
          colorWave="#5946C7"
          colorTorus="#D97722"
          turbulenceIntensity={0.65}
          pointSize={38}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,#fbfcfe_0%,rgba(251,252,254,.97)_34%,rgba(251,252,254,.32)_56%,rgba(251,252,254,0)_76%),linear-gradient(180deg,transparent_58%,rgba(251,252,254,.92)_100%)] dark:bg-[linear-gradient(90deg,#05070b_0%,rgba(5,7,11,.96)_35%,rgba(5,7,11,.32)_60%,rgba(5,7,11,0)_84%),linear-gradient(180deg,transparent_58%,rgba(5,7,11,.92)_100%)] md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(110deg,rgba(251,252,254,.95)_0%,rgba(251,252,254,.76)_48%,rgba(251,252,254,.08)_100%),linear-gradient(180deg,rgba(251,252,254,.08)_0%,rgba(251,252,254,.35)_58%,#fbfcfe_94%)] dark:bg-[linear-gradient(110deg,rgba(5,7,11,.93)_0%,rgba(5,7,11,.72)_48%,rgba(5,7,11,.06)_100%),linear-gradient(180deg,rgba(5,7,11,.06)_0%,rgba(5,7,11,.36)_58%,#05070b_94%)] md:hidden" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-start px-4 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24 md:grid-cols-12 md:px-12 md:pb-8 md:pt-24 lg:px-16">
        <div className="flex max-w-2xl flex-col items-start text-left md:col-span-7 lg:col-span-6">
          <div className="mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-[11px]">
            <span className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
            Product strategy, design and engineering
          </div>

          <h1 className="max-w-[820px] text-balance font-sans text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#111827] dark:text-[#f5f5f4] xs:text-5xl sm:text-6xl md:text-[4.25rem] lg:text-[4.8rem]">
            Digital products.
            <span className="block text-slate-500 dark:text-slate-400">Built to do real work.</span>
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-[13px] leading-6 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-base sm:leading-7 md:text-[17px] md:leading-7">
            We help ambitious teams turn complex ideas into useful, dependable software&mdash;from the first product decision through launch and continued growth.
          </p>

          <div className="mt-5 grid w-full grid-cols-[1fr_auto] items-stretch gap-2.5 sm:mt-7 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <button type="button" onClick={() => setIsModalOpen(true)} className="group inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,.14)] transition-all hover:bg-blue-700 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-[#f5f5f4] dark:text-[#111827] dark:hover:bg-white">
              Discuss a project
              <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
            <a href="#work" className="group inline-flex min-h-12 items-center justify-center rounded-[10px] border border-slate-300/80 bg-transparent px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-500 hover:bg-white/60 active:scale-98 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/[0.06] sm:px-6">
              See our work
              <span className="material-symbols-outlined ml-1.5 text-base transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
            </a>
          </div>

          <p className="mt-4 text-[11px] leading-5 text-slate-500 dark:text-slate-500 sm:mt-5 sm:text-xs">
            Based in Bangladesh. Working with teams wherever good products are being built.
          </p>
        </div>

        <div className="relative hidden h-full md:col-span-5 md:block lg:col-span-6" aria-hidden="true" />
      </div>

      <div className="relative z-10 w-full overflow-hidden border-t border-slate-200/80 bg-white/60 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#05070b]/70 sm:py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#fbfcfe] via-[#fbfcfe]/90 to-transparent dark:from-[#05070b] dark:via-[#05070b]/90 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#fbfcfe] via-[#fbfcfe]/90 to-transparent dark:from-[#05070b] dark:via-[#05070b]/90 sm:w-28" />
        <div className="animate-marquee flex w-max items-center gap-8 sm:gap-14">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex shrink-0 items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
              <img src={item.logo} alt="" className="h-4 w-4 object-contain grayscale transition-all hover:grayscale-0 sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <DiscoveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Hero;
