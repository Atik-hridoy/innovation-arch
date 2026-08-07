'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Logo } from '@/components/Logo';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Portfolio } from '@/components/sections/Portfolio';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/40 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 sm:px-margin-edge py-4 sm:py-6 shadow-none">
        <Logo />
        <div className="hidden md:flex gap-gutter items-center">
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#work">Work</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#services">Services</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#process">Process</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#about">About</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#tech">Tech</a>
          <a className="font-body-md text-[14px] uppercase tracking-widest text-on-surface-variant/70 hover:text-on-surface hover:backdrop-brightness-125 transition-all duration-300" href="#insights">Insights</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="hidden sm:inline-flex glass-panel px-6 py-2.5 rounded-full font-label-caps text-label-caps text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors" href="#contact">
            Let's Talk
          </a>
          <button
            className="md:hidden text-on-surface cursor-pointer"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          {['Work', 'Services', 'Process', 'About', 'Tech', 'Insights'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-extrabold text-2xl uppercase tracking-wider text-white/70 hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm uppercase tracking-widest font-bold"
          >
            Let's Talk
          </a>
        </div>
      )}

      {/* Main Stacking Container */}
      <main className="relative w-full z-10">
        {/* Hero Section Component */}
        <div className="lg:sticky lg:top-0 w-full min-h-screen z-10 bg-[#050505]">
          <Hero />
        </div>

        {/* Services Section Component */}
        <div className="lg:sticky lg:top-0 w-full lg:min-h-screen z-20 bg-[#050505] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t border-white/5">
          <Services />
        </div>

        {/* Process Section Component */}
        <div className="lg:sticky lg:top-0 w-full lg:min-h-screen z-30 bg-[#050505] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t border-white/5">
          <Process />
        </div>

        {/* Featured Work Portfolio Component */}
        <div className="lg:sticky lg:top-0 w-full lg:min-h-screen z-40 bg-[#050505] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t border-white/5">
          <Portfolio />
        </div>

        {/* CTA Portal Stage Component */}
        <div className="lg:sticky lg:top-0 w-full lg:min-h-screen z-50 bg-[#050505] shadow-[0_-30px_60px_rgba(0,0,0,0.9)] border-t border-white/5">
          <CTA />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 md:py-stack-md flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-margin-edge bg-[#050505] border-t border-white/5 shadow-none relative z-50">
        <Logo layout="vertical" />
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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
