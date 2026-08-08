'use client';

import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="w-full py-8 md:py-stack-md flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-margin-edge bg-[#050505] border-t border-white/5 relative z-50">
      <Logo layout="vertical" />
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Instagram</a>
        <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">LinkedIn</a>
        <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Vimeo</a>
        <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Twitter</a>
        <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-500" href="#">Facebook</a>
      </div>
      <div className="font-label-caps text-label-caps text-on-surface-variant text-center md:text-right opacity-50 hover:opacity-100 transition-opacity duration-300">
        © 2026 Innovative Ark Studio. All rights reserved.
      </div>
    </footer>
  );
}
