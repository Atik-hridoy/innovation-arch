'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { DiscoveryModal } from '@/components/ui/DiscoveryModal';
import { useTheme } from '@/components/ThemeProvider';
import { getSiteSettings, SiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/api';

const navItems = [
  { label: 'Services', href: '/#services', desc: 'Capabilities & engineering' },
  { label: 'Process', href: '/#process', desc: 'How we build together' },
  { label: 'Work', href: '/#work', desc: 'Case studies & products' },
  { label: 'About', href: '/about', desc: 'Our team & philosophy' },
  { label: 'Contact', href: '/#contact', desc: 'Start a conversation' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => undefined);
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xs dark:border-white/10 dark:bg-[#07090d]/90'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-18 max-w-[1520px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle - Visible on all screens including mobile */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              aria-label="Toggle color theme"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[19px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Desktop Start conversation button */}
            <button
              onClick={() => setDiscoveryOpen(true)}
              className="hidden rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-98 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100 sm:inline-flex"
            >
              Start a conversation
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition-colors hover:bg-slate-100 active:scale-95 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 md:hidden"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
            >
              <span className="material-symbols-outlined text-[20px]">
                {open ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Redesigned Mobile Navigation Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex min-h-dvh flex-col overflow-y-auto bg-white/98 backdrop-blur-2xl transition-all animate-in fade-in duration-200 dark:bg-[#07090d]/98 md:hidden"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 4.5rem)' }}
        >
          {/* Main Navigation Links */}
          <div className="flex flex-1 flex-col justify-start px-5 py-4 sm:justify-center sm:px-8">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
              Navigation
            </p>
            <nav className="divide-y divide-slate-100 dark:divide-white/5">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4 text-left transition-colors active:opacity-70"
                >
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform">
                    0{index + 1} →
                  </span>
                </a>
              ))}
            </nav>

            {/* Quick Contact & Status Pill */}
            <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Available for selected projects
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Direct founder & architect involvement from day one.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer with Safe Area Support */}
          <div
            className="border-t border-slate-200/80 dark:border-white/10 px-5 sm:px-8 py-5 bg-white dark:bg-[#07090d]"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  setDiscoveryOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 px-5 text-sm font-semibold text-white shadow-md active:scale-98 transition-all dark:bg-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-100"
              >
                <span>Book a Free Discovery Call</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <a
                  href={`mailto:${settings.email_address || 'hello@innovationark.co'}`}
                  className="rounded-lg border border-slate-200 dark:border-white/10 py-2.5 text-slate-700 dark:text-slate-300 font-medium active:bg-slate-100 dark:active:bg-white/5 transition-colors truncate px-2"
                >
                  ✉ Email Us
                </a>
                <a
                  href={`tel:${(settings.phone_number || '+8801744807689').replace(/[^0-9+]/g, '')}`}
                  className="rounded-lg border border-slate-200 dark:border-white/10 py-2.5 text-slate-700 dark:text-slate-300 font-medium active:bg-slate-100 dark:active:bg-white/5 transition-colors truncate px-2"
                >
                  📞 Call Studio
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discovery Call Booking Modal */}
      <DiscoveryModal isOpen={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
    </>
  );
}

export default Header;
