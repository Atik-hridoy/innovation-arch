'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CTA() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current || !buttonRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=0.45'
      )
      .to(buttonRef.current, {
        scale: 1.02,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });
  }, []);

  return (
    <section className="relative w-full min-h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col justify-center items-center overflow-hidden border-t border-white/5 z-10">
      
      {/* ━━━ User Specified Background Image (/images/g.jpg) ━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
        <picture className="w-full h-full">
          <source media="(max-width: 640px)" srcSet="/images/mobile.webp" />
          <img
            src="/images/g.jpg"
            alt="Let's Build Together Background"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-75 blur-sm"
          />
        </picture>
        {/* Dark Obsidian Blend Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-margin-edge w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-6">
          <h2 ref={headingRef} className="opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-on-surface font-bold tracking-tighter leading-tight drop-shadow-2xl">
            Ready to build the next <br className="hidden sm:block" />great <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">digital product?</span>
          </h2>
          <p ref={paragraphRef} className="opacity-0 font-body-lg text-body-lg text-on-surface-variant opacity-80">
            Let's turn your idea into a product people love.
          </p>
        </div>

        <div className="pt-4">
          <a
            ref={buttonRef}
            className="btn-glass relative inline-flex items-center justify-center font-body-md text-body-md font-bold text-on-surface bg-white/[0.03] backdrop-blur-[20px] border border-white/15 px-6 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:shadow-[0_0_30px_rgba(221,183,255,0.4)] transition-all duration-300 group cursor-pointer text-sm sm:text-base"
            href="#"
          >
            LET'S BUILD TOGETHER
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
