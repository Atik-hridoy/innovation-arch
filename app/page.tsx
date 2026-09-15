'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { GlobalOverlays } from '@/components/GlobalOverlays';
import { SectionStage } from '@/components/SectionStage';
import { Hero } from '@/components/sections/Hero';
import { StatsSection } from '@/components/sections/StatsSection';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { FounderProfile } from '@/components/sections/FounderProfile';
import { Testimonials } from '@/components/sections/Testimonials';
import { TechStack } from '@/components/sections/TechStack';
import { CTA } from '@/components/sections/CTA';
import { CookieConsent } from '@/components/ui/CookieConsent';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let cursorRafId: number | null = null;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const cursor = cursorRef.current;
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        cursorX = mouseX;
        cursorY = mouseY;
        hasMoved = true;
      }
    };

    if (isFinePointer && cursor) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const updateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        cursorRafId = requestAnimationFrame(updateCursor);
      };

      cursorRafId = requestAnimationFrame(updateCursor);
    }

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      if (isFinePointer) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      if (cursorRafId !== null) {
        cancelAnimationFrame(cursorRafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#0f172a] selection:text-white font-body-md text-body-md text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0b0f19] antialiased transition-colors duration-300"
    >
      <div ref={cursorRef} className="cursor-follower hidden md:block" id="cursor" />
      <GlobalOverlays />
      <CookieConsent />
      <Header />

      <main className="relative w-full z-10 bg-transparent transition-colors duration-300">
        <Hero />

        <StatsSection />

        <SectionStage className="w-full bg-transparent">
          <Services />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <Process />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <Portfolio />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <FounderProfile />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <Testimonials />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <TechStack />
        </SectionStage>

        <SectionStage className="w-full bg-transparent">
          <CTA />
        </SectionStage>
      </main>
    </div>
  );
}
