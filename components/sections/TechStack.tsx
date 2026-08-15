'use client';

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
  return (
    <div id="tech" className="relative z-10 bg-background dark:bg-[#070609] py-10 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-12 lg:gap-24">
        {/* Text Section */}
        <div className="flex-1 space-y-6 md:space-y-8 z-10 w-full text-left will-change-transform">
          <div>
            <p className="text-sm md:text-base tracking-widest text-primary font-mono mb-2 uppercase font-semibold">
              ENGINEERING ARCHITECTURE
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 dark:text-white leading-tight">
              Innovative <br />
              <span className="font-semibold">Arc</span>
            </h2>
          </div>
          
          <div className="space-y-4 md:space-y-6 text-neutral-600 dark:text-[#8c8a93] text-lg max-w-lg leading-relaxed">
            <p>
              We are a premium product studio specializing in smooth animations, interactive interfaces, and modern design.
            </p>
            <p>
              Our specialized technology stack empowers us to build high-performance Web Apps, native Mobile Apps, and intelligent AI Agents. We prioritize developer experience and modern aesthetics across all platforms.
            </p>
          </div>
        </div>

        {/* Cylinder Carousel Section */}
        <div className="flex-1 w-full flex justify-center mt-2 lg:mt-0 relative perspective-[1200px]">
          {/* Subtle glow behind the carousel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
          
          <CylinderCarousel 
            images={TECH_LOGOS} 
            className="w-full max-w-full lg:max-w-none transform-gpu" 
          />
        </div>
      </div>
    </div>
  );
}
