'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CylinderCarousel } from '@/components/ui/cylinder-carousel';

const TECH_LOGOS = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
];

export function TechStack() {
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgTextRef.current) return;
    
    // Infinite marquee animation using GSAP with hardware acceleration
    gsap.to(bgTextRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
      force3D: true, // Force GPU acceleration
    });
  }, []);

  return (
    <div id="tech" className="relative z-10 bg-[#070609] py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0 opacity-[0.03] select-none">
        <div 
          ref={bgTextRef}
          className="whitespace-nowrap font-sans font-black text-[25vw] md:text-[20vw] leading-none tracking-tighter will-change-transform">
          ENGINEERING ARCHITECTURE
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
        {/* Text Section */}
        <div className="flex-1 space-y-8 z-10 w-full text-left will-change-transform">
          <div>
            <p className="text-sm md:text-base tracking-widest text-[#5c5b5f] font-mono mb-2 uppercase">
              ENGINEERING ARCHITECTURE
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
              Innovative <br />
              <span className="font-semibold">Arc</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-[#8c8a93] text-lg max-w-lg">
            <p>
              We are a premium product studio specializing in smooth animations, interactive interfaces, and modern design.
            </p>
            <p>
              Our specialized technology stack empowers us to build high-performance Web Apps, native Mobile Apps, and intelligent AI Agents. We prioritize developer experience and modern aesthetics across all platforms.
            </p>
          </div>
        </div>

        {/* Cylinder Carousel Section */}
        <div className="flex-1 w-full flex justify-center mt-12 lg:mt-0 relative perspective-[1200px]">
          {/* Subtle glow behind the carousel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
          
          <CylinderCarousel 
            images={TECH_LOGOS} 
            className="w-full max-w-full lg:max-w-none transform-gpu" 
          />
        </div>
      </div>
    </div>
  );
}
