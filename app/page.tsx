'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { GlobalOverlays } from '@/components/GlobalOverlays';
import { SectionStage } from '@/components/SectionStage';
import { AboutUsScrollytelling } from '@/components/sections/AboutUsScrollytelling';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { TechStack } from '@/components/sections/TechStack';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis Smooth Scrolling hooked to GSAP Ticker
    const lenis = new Lenis({
      duration: 1.25,
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

    // 2. Hardware-accelerated Smooth Cursor Follower (Desktop only)
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

    // 3. Smooth Section Entrance Reveals & Scroll Choreography
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;

      // B. Services (#services) - Dual Split & Converge Assembly
      const svcSection = containerRef.current?.querySelector('#services');
      if (svcSection) {
        const leftCard = svcSection.querySelector('.lg\\:col-span-7');
        const rightCard = svcSection.querySelector('.lg\\:col-span-5');
        const bottomRow = svcSection.querySelector('.col-span-1.lg\\:col-span-12');

        if (leftCard && isDesktop) {
          gsap.fromTo(
            leftCard,
            { x: -110, opacity: 0.3, rotateY: 6 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: svcSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (rightCard && isDesktop) {
          gsap.fromTo(
            rightCard,
            { x: 110, opacity: 0.3, rotateY: -6 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: svcSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (bottomRow) {
          gsap.fromTo(
            bottomRow,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: svcSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // C. Process (#process) - Headline Left-to-Right Surge
      const processSection = containerRef.current?.querySelector('#process');
      if (processSection) {
        const processHeader = processSection.querySelector('h2');
        if (processHeader) {
          gsap.fromTo(
            processHeader,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: processSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // D. Work (#work) - Right-to-Left Magnetic Card Glide
      const workSection = containerRef.current?.querySelector('#work');
      if (workSection) {
        const workCards = workSection.querySelectorAll('.snap-center');
        const workHeader = workSection.querySelector('h2');

        if (workHeader) {
          gsap.fromTo(
            workHeader,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: workSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (workCards && workCards.length > 0 && isDesktop) {
          gsap.fromTo(
            workCards,
            { x: 140, opacity: 0.4, rotateZ: 2 },
            {
              x: 0,
              opacity: 1,
              rotateZ: 0,
              stagger: 0.12,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: workSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // E. Tech Stack (#tech) - Left Content / Right 3D Cylinder Assembly
      const techSection = containerRef.current?.querySelector('#tech');
      if (techSection) {
        const leftText = techSection.querySelector('.flex-1.space-y-6');
        const rightCylinder = techSection.querySelector('.perspective-\\[1200px\\]');

        if (leftText && isDesktop) {
          gsap.fromTo(
            leftText,
            { x: -120, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: techSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (rightCylinder && isDesktop) {
          gsap.fromTo(
            rightCylinder,
            { x: 120, scale: 0.8, opacity: 0 },
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: techSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // F. Contact (#contact) - Dual Split & Converge
      const contactSection = containerRef.current?.querySelector('#contact');
      if (contactSection) {
        const leftFaq = contactSection.querySelector('.lg\\:col-span-5');
        const rightForm = contactSection.querySelector('.lg\\:col-span-7');

        if (leftFaq && isDesktop) {
          gsap.fromTo(
            leftFaq,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contactSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (rightForm && isDesktop) {
          gsap.fromTo(
            rightForm,
            { x: 100, opacity: 0, rotateY: -8 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contactSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
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
      className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-white font-body-md text-body-md text-foreground bg-background antialiased transition-colors duration-400"
    >
      <div ref={cursorRef} className="cursor-follower hidden md:block" id="cursor" />
      <GlobalOverlays />
      <Header />

      <main className="relative w-full z-10 bg-transparent transition-colors duration-400">
        <SectionStage id="home" className="w-full bg-transparent dark:bg-[#080103]">
          <AboutUsScrollytelling />
        </SectionStage>

        <SectionStage id="services" className="w-full bg-transparent dark:bg-[#080103]">
          <Services />
        </SectionStage>

        <SectionStage id="process" className="w-full bg-transparent dark:bg-[#080103]">
          <Process />
        </SectionStage>

        <SectionStage id="work" className="w-full bg-transparent dark:bg-[#080103]">
          <Portfolio />
        </SectionStage>

        <SectionStage id="tech" className="w-full bg-transparent dark:bg-[#080103]">
          <TechStack />
        </SectionStage>

        <SectionStage id="contact" className="w-full bg-transparent dark:bg-[#080103]">
          <CTA />
        </SectionStage>
      </main>
    </div>
  );
}
