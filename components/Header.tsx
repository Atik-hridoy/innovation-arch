'use client';

import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/Logo';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';
import { useTheme } from '@/components/ThemeProvider';

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
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

      const newPastHero = scrollY > 20;
      if (newPastHero !== isPastHeroRef.current) {
        isPastHeroRef.current = newPastHero;
        setIsPastHero(newPastHero);
      }

      if (scrollY + vh >= docHeight - 80) {
        if (activeIdxRef.current !== sectionIds.length - 1) {
          activeIdxRef.current = sectionIds.length - 1;
          setActiveSectionIndex(sectionIds.length - 1);
        }
        return;
      }

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
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-3.5 sm:py-4 transition-all duration-300 ${
          isPastHero
            ? 'bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm'
            : 'bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/80'
        }`}
      >
        {/* Scroll Progress Bar (Mobile Only) */}
        <div className="md:hidden absolute bottom-0 inset-x-0 h-[2px] bg-slate-100 dark:bg-slate-800 overflow-hidden pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-blue-600 transition-all duration-75 ease-out"
            style={{ width: '0%' }}
          />
        </div>

        <Logo isHero={!isPastHero} />

        {/* Center Navbar */}
        <div className="hidden md:flex flex-1 justify-center transition-all duration-500 ease-out opacity-100 translate-y-0 pointer-events-auto">
          <SpotlightNavbar items={navItems} activeIndex={activeSectionIndex} />
        </div>

        {/* Right Actions: Theme Switcher & Book Call CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 transition-all duration-500 ease-out opacity-100 translate-y-0 pointer-events-auto">
          
          {/* Theme Toggle Button (Desktop Only) */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle Dark/Light Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-lg">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Book Call Button */}
          <button
            onClick={() => setIsDiscoveryOpen(true)}
            className="hidden sm:inline-flex items-center justify-center font-sans font-semibold text-xs tracking-wider uppercase bg-[#0f172a] hover:bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-4 sm:px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            Book Free Call
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden text-slate-900 dark:text-white cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Floating Mode Switcher (Fixed at Bottom Right on Mobile) */}
      <button
        onClick={toggleTheme}
        className="md:hidden fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-[#111116]/90 text-slate-800 dark:text-slate-100 backdrop-blur-md shadow-xl flex items-center justify-center active:scale-90 transition-all cursor-pointer"
        aria-label="Toggle Dark/Light Mode"
      >
        <span className="material-symbols-outlined text-xl">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-white/98 dark:bg-[#0b0f19]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden animate-[fadeIn_0.2s_ease-out]">
          {navItems.map((item, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans font-bold text-2xl uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-800 dark:text-slate-200 hover:text-blue-600'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="flex flex-col items-center gap-4 mt-6">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold"
              title="Toggle Theme"
            >
              <span className="material-symbols-outlined text-lg">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDiscoveryOpen(true);
              }}
              className="font-sans font-semibold text-sm tracking-wider uppercase bg-[#0f172a] dark:bg-blue-600 text-white px-7 py-3 rounded-xl shadow-md"
            >
              Book Free Call
            </button>
          </div>
        </div>
      )}


      <DiscoveryModal isOpen={isDiscoveryOpen} onClose={() => setIsDiscoveryOpen(false)} />
    </>
  );
}

export default Header;
