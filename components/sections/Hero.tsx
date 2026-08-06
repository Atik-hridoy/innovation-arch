'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

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
      .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .fromTo(actionRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7');
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
    <header className="relative w-full min-h-screen flex items-center justify-center pt-[120px] pb-stack-xl px-margin-edge overflow-hidden z-10">
      
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
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-md font-semibold">
            WE DESIGN. WE DEVELOP. WE AUTOMATE.
          </span>
        </div>
        
        <h1 ref={headlineRef} className="opacity-0 font-sans font-extrabold text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tighter leading-[0.95] max-w-4xl">
          WE BUILD DIGITAL <br />
          PRODUCTS THAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary" style={{ textShadow: '0 0 40px rgba(221, 183, 255, 0.4)' }}>CREATE</span> IMPACT.
        </h1>
        
        <p ref={paraRef} className="opacity-0 text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed font-normal">
          Innovative Arc is a digital product studio building mobile apps, web platforms and AI agents that solve real problems and drive growth.
        </p>
        
        <div ref={actionRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-start gap-6 w-full mt-4 font-sans">
          <a className="relative inline-flex items-center justify-center font-body-md text-body-md font-bold text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(221,183,255,0.2)] bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 hover:scale-105 group cursor-pointer" href="#">
            Start A Project
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
          </a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 relative group py-3" href="#">
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            Watch Showreel
          </a>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-30 select-none">
        <span className="text-[9px] uppercase tracking-widest text-on-surface font-mono">SCROLL TO EXPLORE</span>
        <span className="material-symbols-outlined text-sm animate-bounce">arrow_downward</span>
      </div>
    </header>
  );
}
