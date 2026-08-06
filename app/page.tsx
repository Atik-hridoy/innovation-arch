'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
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

    // 2. Custom Cursor Follower
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

    // 3. GSAP Register
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in reveals on scroll
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

    // Process path drawing animation on scroll
    const processPath = document.querySelector('.process-path') as SVGPathElement;
    if (processPath) {
      const len = processPath.getTotalLength();
      gsap.set(processPath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(processPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#process',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    }

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-on-primary font-body-md text-body-md text-on-background bg-[#050505] antialiased">

      {/* Custom Cursor Follower */}
      <div ref={cursorRef} className="cursor-follower hidden md:block" id="cursor"></div>

      {/* Global Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] rounded-full bg-radial from-primary/5 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-radial from-[#842bd2]/5 via-transparent to-transparent blur-3xl"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/40 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-margin-edge py-6 shadow-none">
        <div className="font-display-lg text-headline-md tracking-tighter text-on-surface select-none">
          Innovative Ark
        </div>
        <div className="hidden md:flex gap-gutter items-center">
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#work">Work</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#services">Services</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#process">Process</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#about">About</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#tech">Tech</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#insights">Insights</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="glass-panel px-6 py-2.5 rounded-full font-label-caps text-label-caps text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors" href="#contact">
            Let's Talk
          </a>
          <button className="md:hidden text-on-surface" aria-label="Open Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Hero Section Component */}
      <Hero />

      {/* Services Section Component */}
      <Services />

      {/* Process Section Component */}
      <Process />

      {/* Featured Work Portfolio Component */}
      <Portfolio />

      {/* CTA Portal Stage Component */}
      <CTA />

      {/* Footer */}
      <footer className="w-full py-stack-md flex flex-col md:flex-row justify-between items-center px-margin-edge bg-[#050505] border-t border-white/5 shadow-none relative z-40">
        <div className="font-display-lg-mobile text-[24px] text-on-surface mb-6 md:mb-0 select-none">
          Innovative Ark
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Instagram</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">LinkedIn</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Vimeo</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Twitter</a>
        </div>
        <div className="font-label-caps text-label-caps text-on-surface-variant text-center md:text-right opacity-50 hover:opacity-100 transition-opacity duration-300">
          © 2026 Innovative Ark Studio. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
