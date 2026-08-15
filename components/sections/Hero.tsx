'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MorphText } from '@/components/ui/morph-text';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';

export function Hero() {
  const headerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  // Video playlist setup - optimized for smooth decode
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = [
    '/images/8523640-hd_1920_1080_25fps.mp4',
    '/images/same_for_websolution_change_th.mp4',
  ];

  useEffect(() => {
    // 1. Text entrance animations with GSAP Context
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-tagline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
        .fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
        .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8');
    }, headerRef);

    // 2. Pause video when offscreen to free up GPU decoder completely
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: '50px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  // Safe video playlist cycling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoIndex]);

  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <header ref={headerRef} className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-[70px] sm:pt-[100px] lg:pt-[120px] pb-12 sm:pb-stack-xl px-4 sm:px-margin-edge overflow-hidden z-10">
      
      {/* Dark Mode Video Playlist Loop */}
      <div className="absolute inset-0 z-0 hidden dark:block opacity-[0.12] pointer-events-none mix-blend-screen overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videos[videoIndex]}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
        />
      </div>

      {/* Light Mode Pure Radiant Ambient Glow (Zero Black Shade) */}
      <div className="absolute inset-0 z-0 dark:hidden pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-violet-500/8 via-indigo-400/4 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-purple-500/6 via-violet-300/4 to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-start text-left gap-8 relative z-10">
        
        {/* Restored visual hierarchy text left-aligned */}
        <div className="hero-tagline inline-flex opacity-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-violet-700 dark:text-primary bg-violet-500/10 dark:bg-primary/10 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-violet-500/20 dark:border-primary/20 backdrop-blur-md font-semibold flex items-center justify-center min-w-[180px] sm:min-w-[200px]">
            <MorphText
              words={["WE DESIGN.", "WE DEVELOP.", "WE AUTOMATE."]}
              fontSize="inherit"
              fontFamily="inherit"
            />
          </span>
        </div>
        
        <h1 ref={headlineRef} className="opacity-0 font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl text-neutral-950 dark:text-white uppercase tracking-tighter leading-[0.95] max-w-4xl">
          WE BUILD DIGITAL <br />
          PRODUCTS THAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 dark:from-primary dark:via-secondary dark:to-primary">CREATE</span> IMPACT.
        </h1>
        
        <p ref={paraRef} className="opacity-0 text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed font-normal">
          Innovative Ark is a digital product studio building mobile apps, web platforms and AI agents that solve real problems and drive growth.
        </p>

        {/* Hero Interactive CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <a href="#work">
            <RadialGlowButton size="md" className="font-semibold text-sm tracking-wider">
              Explore Our Work
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </RadialGlowButton>
          </a>
          <a href="#contact" className="text-xs uppercase font-mono font-semibold tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors px-4 py-3 flex items-center gap-1.5 group">
            Get In Touch
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30 select-none">
        <span className="text-[9px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-mono">SCROLL TO EXPLORE</span>
        <span className="material-symbols-outlined text-sm animate-bounce text-neutral-600 dark:text-neutral-400">arrow_downward</span>
      </div>
    </header>
  );
}
