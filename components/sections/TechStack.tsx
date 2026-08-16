'use client';

import { CylinderCarousel } from '@/components/ui/cylinder-carousel';
import { SectionHeader } from '@/components/ui/SectionHeader';

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
    <div id="tech" className="relative z-10 bg-transparent dark:bg-[#070609] py-10 md:py-20 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-12 lg:gap-24">
        {/* Text Section */}
        <div className="flex-1 z-10 w-full text-left will-change-transform">
          <SectionHeader
            eyebrow="ENGINEERING ARCHITECTURE"
            title="MODERN TECH STACK"
            description="Our specialized technology stack empowers us to build high-performance Web Apps, native Mobile Apps, and intelligent AI Agents with state-of-the-art developer experience and modern aesthetics."
            className="!mb-0"
          />
        </div>

        {/* Cylinder Carousel Section */}
        <div className="flex-1 w-full flex justify-center mt-2 lg:mt-0 relative perspective-[1200px]">
          {/* Subtle glow behind the carousel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 dark:bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
          
          <CylinderCarousel 
            images={TECH_LOGOS} 
            className="w-full max-w-full lg:max-w-none transform-gpu" 
          />
        </div>
      </div>
    </div>
  );
}
