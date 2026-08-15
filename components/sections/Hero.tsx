'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MorphText } from '@/components/ui/morph-text';

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  // Video playlist setup
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = [
    '/images/8523640-hd_1920_1080_25fps.mp4',
    '/images/5081430-uhd_4096_2160_25fps.mp4'
  ];

  useEffect(() => {
    // 1. Text entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-tagline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
      .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8');
  }, []);

  // Guarantee player triggers loading on index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log('Video play was interrupted or blocked:', err);
      });
    }
  }, [videoIndex]);

  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <header className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-[70px] sm:pt-[100px] lg:pt-[120px] pb-12 sm:pb-stack-xl px-4 sm:px-margin-edge overflow-hidden z-10">
      
      {/* Background Coding Video Playlist Loop */}
      <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none mix-blend-screen overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videos[videoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-start text-left gap-8 relative z-10">
        
        {/* Restored visual hierarchy text left-aligned */}
        <div className="hero-tagline inline-flex opacity-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-primary/20 backdrop-blur-md font-semibold flex items-center justify-center min-w-[180px] sm:min-w-[200px]">
            <MorphText
              words={["WE DESIGN.", "WE DEVELOP.", "WE AUTOMATE."]}
              fontSize="inherit"
              fontFamily="inherit"
            />
          </span>
        </div>
        
        <h1 ref={headlineRef} className="opacity-0 font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-[0.95] max-w-4xl">
          WE BUILD DIGITAL <br />
          PRODUCTS THAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary" style={{ textShadow: '0 0 40px rgba(255, 255, 255, 0.4)' }}>CREATE</span> IMPACT.
        </h1>
        
        <p ref={paraRef} className="opacity-0 text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed font-normal">
          Innovative Ark is a digital product studio building mobile apps, web platforms and AI agents that solve real problems and drive growth.
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30 select-none">
        <span className="text-[9px] uppercase tracking-widest text-on-surface font-mono">SCROLL TO EXPLORE</span>
        <span className="material-symbols-outlined text-sm animate-bounce">arrow_downward</span>
      </div>
    </header>
  );
}
