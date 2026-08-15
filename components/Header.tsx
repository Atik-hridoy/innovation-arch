'use client';

import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

const navItems = ['Work', 'Services', 'Process', 'About', 'Tech'];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 dark:bg-[#050505]/40 backdrop-blur-xl border-b border-black/5 dark:border-white/5 flex justify-between items-center px-4 sm:px-margin-edge py-3.5 sm:py-5 shadow-none transition-colors duration-400">
        <Logo />
        <div className="hidden md:flex flex-1 justify-center">
          <SpotlightNavbar />
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <a
            className="hidden sm:inline-block"
            href="#contact"
          >
            <RadialGlowButton size="sm" className="font-semibold text-xs tracking-wider !min-w-[110px] !min-h-[38px]">
              Let's Talk
            </RadialGlowButton>
          </a>
          <button
            className="md:hidden text-foreground cursor-pointer p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[45] bg-background/95 dark:bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden animate-[fadeSlideIn_0.25s_ease-out]">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans font-extrabold text-2xl uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item}
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

