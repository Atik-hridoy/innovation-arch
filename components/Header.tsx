'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

const navItems = [
  { label: 'Overview', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate real-time smooth scroll percentage across page
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Detect 2nd section (#services) dynamically on all screen sizes
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        setIsPastHero(rect.top <= window.innerHeight * 0.75);
      } else {
        const isMobile = window.innerWidth < 768;
        const threshold = window.innerHeight * (isMobile ? 1.1 : 4.5);
        setIsPastHero(window.scrollY > threshold);
      }

      // Track active section for spotlight navbar highlight shifting (Overview -> Services -> Process -> Work -> Tech -> Contact)
      const sectionIds = ['home', 'services', 'process', 'work', 'tech', 'contact'];
      const scrollThreshold = window.scrollY + window.innerHeight * 0.4;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollThreshold >= top) {
            setActiveSectionIndex(i);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-margin-edge py-3.5 sm:py-4 transition-all duration-500 ${
          isPastHero
            ? 'bg-white/85 dark:bg-[#070104]/85 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
            : 'bg-transparent backdrop-blur-none border-b border-transparent'
        }`}
      >
        {/* Real-time Smooth Scroll Indicator Bar (Mobile Only - Hidden on Web) */}
        <div className="md:hidden absolute bottom-0 inset-x-0 h-[2px] bg-transparent overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-emerald-400 shadow-[0_0_10px_rgba(225,29,72,0.8)] transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <Logo isHero={!isPastHero} />

        {/* Center Navbar: Active highlight pill shifts automatically with scroll */}
        <div
          className={`hidden md:flex flex-1 justify-center transition-all duration-500 ease-out ${
            isPastHero
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <SpotlightNavbar items={navItems} activeIndex={activeSectionIndex} />
        </div>

        {/* Right CTA Actions: Hidden on Hero, transitions in after passing hero */}
        <div
          className={`flex items-center gap-3 sm:gap-4 transition-all duration-500 ease-out ${
            isPastHero
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <a
            className="hidden sm:inline-block"
            href="#contact"
          >
            <RadialGlowButton size="sm" className="font-semibold text-xs tracking-wider !min-w-[110px] !min-h-[38px]">
              Let&apos;s Talk
            </RadialGlowButton>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          className={`md:hidden text-foreground cursor-pointer p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 ${
            isPastHero ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-background/95 dark:bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden animate-[fadeSlideIn_0.25s_ease-out]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-extrabold text-2xl uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4"
          >
            <RadialGlowButton size="md" className="font-semibold text-sm tracking-wider">
              Let's Talk
            </RadialGlowButton>
          </a>
        </div>
      )}
    </>
  );
}

