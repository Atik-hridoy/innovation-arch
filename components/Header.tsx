'use client';

import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';

const navItems = ['Work', 'Services', 'Process', 'About', 'Tech'];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/40 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 sm:px-margin-edge py-4 sm:py-6 shadow-none">
        <Logo />
        <div className="hidden md:flex flex-1 justify-center">
          <SpotlightNavbar />
        </div>
        <div className="flex items-center gap-4">
          <a
            className="hidden sm:inline-flex glass-panel px-6 py-2.5 rounded-full font-label-caps text-label-caps text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
            href="#contact"
          >
            Let's Talk
          </a>
          <button
            className="md:hidden text-on-surface cursor-pointer"
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
        <div className="fixed inset-0 z-[45] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navItems.map((item) => (
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
    </>
  );
}
