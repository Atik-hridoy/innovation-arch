'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface CylinderCarouselProps {
  images: string[];
  className?: string;
}

export function CylinderCarousel({ images, className }: CylinderCarouselProps) {
  const cylinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cylinderRef.current) return;
    
    // Rotate the entire cylinder continuously with hardware acceleration
    gsap.to(cylinderRef.current, {
      rotateY: -360,
      duration: 35, 
      ease: 'none',
      repeat: -1,
      force3D: true, // Force GPU acceleration
    });
  }, []);

  const faceCount = images.length;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const faceWidth = isMobile ? 80 : 120;
  const spacingOffset = isMobile ? 20 : 40; 
  const radius = Math.round((faceWidth / 2) / Math.tan(Math.PI / faceCount)) + spacingOffset;

  return (
    <div 
      className={cn(
        "relative w-full flex justify-center items-center overflow-visible py-10 md:py-20 min-h-[250px] md:min-h-[400px]", 
        className
      )}
      style={{ perspective: "1500px" }}
    >
      <div
        ref={cylinderRef}
        className="relative flex justify-center items-center will-change-transform"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "rotateX(-5deg)", 
        }}
      >
        {images.map((src, index) => {
          const theta = (360 / faceCount) * index;
          return (
            <div
              key={index}
              className="absolute w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex justify-center items-center rounded-2xl p-4 md:p-6 transition-all duration-300 bg-white/80 dark:bg-[rgba(20,20,25,0.8)] border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-sm"
              style={{
                transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                backfaceVisibility: "visible", 
              }}
            >
              <img 
                src={src} 
                alt={`Tech Logo ${index}`} 
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CylinderCarousel;
