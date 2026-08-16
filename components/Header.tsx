'use client';

import { useState, useEffect, useRef } from 'react';
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

const sectionIds = ['home', 'services', 'process', 'work', 'tech', 'contact'];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const isPastHeroRef = useRef(false);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const checkActiveSection = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (progressBarRef.current) {
        const totalScroll = docHeight - vh;
        const progress = totalScroll > 0 ? Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)) : 0;
        progressBarRef.current.style.width = `${progress}%`;
      }

      // Header backdrop activates past 50px
      const newPastHero = scrollY > 50;
      if (newPastHero !== isPastHeroRef.current) {
        isPastHeroRef.current = newPastHero;
        setIsPastHero(newPastHero);
      }

      // Bottom of the page activates Contact
      if (scrollY + vh >= docHeight - 80) {
        if (activeIdxRef.current !== sectionIds.length - 1) {
          activeIdxRef.current = sectionIds.length - 1;
          setActiveSectionIndex(sectionIds.length - 1);
        }
        return;
      }

      // Target focal point is 40% of viewport height
      const focalPoint = vh * 0.4;
      let activeIdx = 0;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint && rect.bottom > 0) {
            activeIdx = i;
            break;
          }
        }
      }

      if (activeIdx !== activeIdxRef.current) {
        activeIdxRef.current = activeIdx;
        setActiveSectionIndex(activeIdx);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkActiveSection();
      });
    };

    checkActiveSection();
    const intervalId = setInterval(checkActiveSection, 150);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-3.5 sm:py-4 transition-all duration-500 ${
          isPastHero
            ? 'bg-emerald-950/85 dark:bg-[#070104]/85 backdrop-blur-2xl border-b border-emerald-500/20 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
            : 'bg-transparent backdrop-blur-none border-b border-transparent'
        }`}
      >
        {/* Real-time Smooth Scroll Indicator Bar (Mobile Only) */}
        <div className="md:hidden absolute bottom-0 inset-x-0 h-[2px] bg-transparent overflow-hidden pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 dark:from-emerald-500 dark:via-teal-400 dark:to-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all duration-75 ease-out"
            style={{ width: '0%' }}
          />
        </div>

        <Logo isHero={!isPastHero} />

        {/* Center Navbar: Always visible & interactive with animated active state */}
        <div className="hidden md:flex flex-1 justify-center transition-all duration-500 ease-out opacity-100 translate-y-0 pointer-events-auto">
          <SpotlightNavbar items={navItems} activeIndex={activeSectionIndex} />
        </div>

        {/* Right CTA Actions: Always visible */}
        <div className="flex items-center gap-3 sm:gap-4 transition-all duration-500 ease-out opacity-100 translate-y-0 pointer-events-auto">
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
          className="md:hidden text-foreground cursor-pointer p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 opacity-100 pointer-events-auto"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-emerald-950/95 dark:bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden animate-[fadeSlideIn_0.25s_ease-out]">
          {navItems.map((item, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans font-extrabold text-2xl uppercase tracking-wider transition-colors duration-300 ${
                  isActive
                    ? 'text-emerald-400 dark:text-primary drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4"
          >
            <RadialGlowButton size="md" className="font-semibold text-sm tracking-wider">
              Let&apos;s Talk
            </RadialGlowButton>
          </a>
        </div>
      )}
    </>
  );
}

export default Header;
