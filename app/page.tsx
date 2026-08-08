'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { GlobalOverlays } from '@/components/GlobalOverlays';
import { SectionStage } from '@/components/SectionStage';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { TechStack } from '@/components/sections/TechStack';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    gsap.registerPlugin(ScrollTrigger);

    const animateElements = containerRef.current?.querySelectorAll('.scroll-reveal');
    if (animateElements) {
      animateElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-on-primary font-body-md text-body-md text-on-background bg-[#050505] antialiased"
    >
      <div ref={cursorRef} className="cursor-follower hidden md:block" id="cursor" />
      <GlobalOverlays />
      <Header />

      <main className="relative w-full z-10 bg-[#050505]">
        <SectionStage id="home" className="lg:sticky lg:top-0 w-full min-h-[85vh] sm:min-h-screen z-10 bg-[#050505]" enableFade={false}>
          <Hero />
        </SectionStage>

        <SectionStage id="services" className="lg:sticky lg:top-0 w-full lg:min-h-screen z-20 bg-[#050505] shadow-[0_-50px_100px_rgba(5,5,5,1)] relative">
          <Services />
        </SectionStage>

        <SectionStage id="process" className="lg:sticky lg:top-0 w-full lg:min-h-screen z-30 bg-[#050505] shadow-[0_-50px_100px_rgba(5,5,5,1)] relative">
          <Process />
        </SectionStage>

        <SectionStage id="work" className="lg:sticky lg:top-0 w-full lg:min-h-screen z-40 bg-[#050505] shadow-[0_-50px_100px_rgba(5,5,5,1)] relative">
          <Portfolio />
        </SectionStage>

        <SectionStage id="tech" className="lg:sticky lg:top-0 w-full lg:min-h-screen z-[45] bg-[#050505] shadow-[0_-50px_100px_rgba(5,5,5,1)] relative">
          <TechStack />
        </SectionStage>

        <SectionStage id="contact" className="lg:sticky lg:top-0 w-full lg:min-h-screen z-50 bg-[#050505] shadow-[0_-50px_100px_rgba(5,5,5,1)] relative">
          <CTA />
        </SectionStage>
      </main>

      <Footer />
    </div>
  );
}
