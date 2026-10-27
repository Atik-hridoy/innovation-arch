'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';
import { useTheme } from '@/components/ThemeProvider';

const navItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? 'border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#07090d]/88' : 'border-transparent bg-transparent'}`}>
        <div className="mx-auto flex h-18 max-w-[1520px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="hidden h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 md:flex" aria-label="Toggle color theme">
              <span className="material-symbols-outlined text-[19px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button onClick={() => setDiscoveryOpen(true)} className="hidden rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100 sm:inline-flex">
              Start a conversation
            </button>
            <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center md:hidden" aria-label="Toggle navigation" aria-expanded={open}>
              <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-8 pt-28 dark:bg-[#07090d] md:hidden">
          <nav className="flex flex-col border-t border-slate-200 dark:border-white/10">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-slate-200 py-5 text-2xl font-medium tracking-tight dark:border-white/10">{item.label}</a>)}
          </nav>
          <div className="mt-auto flex gap-3">
            <button onClick={toggleTheme} className="h-12 w-12 rounded-md border border-slate-200 dark:border-white/10" aria-label="Toggle color theme"><span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span></button>
            <button onClick={() => { setOpen(false); setDiscoveryOpen(true); }} className="flex-1 rounded-md bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Start a conversation</button>
          </div>
        </div>
      )}
      <DiscoveryModal isOpen={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
    </>
  );
}

export default Header;
