'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

const navItems = [
  { label: 'Overview', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Tech', href: '#tech' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero scrollytelling section pins for 750% viewport height
      const heroThreshold = window.innerHeight * 7.2;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-margin-edge py-3.5 sm:py-5 shadow-none transition-all duration-500 ${
          isPastHero
            ? 'bg-background/80 dark:bg-[#050505]/40 backdrop-blur-xl border-b border-black/5 dark:border-white/5'
            : 'bg-transparent backdrop-blur-none border-b border-transparent'
        }`}
      >
        <Logo isHero={!isPastHero} />

        {/* Center Navbar: Hidden on Hero, smoothly transitions in after passing hero */}
        <div
          className={`hidden md:flex flex-1 justify-center transition-all duration-500 ease-out ${
            isPastHero
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <SpotlightNavbar />
        </div>

        {/* Right CTA Actions: Hidden on Hero, transitions in after passing hero */}
        <div
          className={`flex items-center gap-3 sm:gap-4 transition-all duration-500 ease-out ${
            isPastHero
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <ThemeToggle />
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

          <div className="flex items-center gap-4 mt-4">
            <ThemeToggle showLabel />
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2"
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

