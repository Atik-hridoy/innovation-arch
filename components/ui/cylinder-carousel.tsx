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
    
    // Rotate the entire cylinder continuously
    gsap.to(cylinderRef.current, {
      rotateY: -360,
      duration: 35, // Smooth slow rotation
      ease: 'none',
      repeat: -1,
    });
  }, []);

  const faceCount = images.length;
  // Increase radius for a larger cylinder depending on the number of items
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const faceWidth = isMobile ? 80 : 120;
  // A larger offset so they are nicely spaced
  const spacingOffset = isMobile ? 20 : 40; 
  const radius = Math.round((faceWidth / 2) / Math.tan(Math.PI / faceCount)) + spacingOffset;

  return (
    <div 
      className={cn(
        "relative w-full flex justify-center items-center overflow-visible py-20 min-h-[400px]", 
        className
      )}
      style={{ perspective: "1500px" }}
    >
      <div
        ref={cylinderRef}
        className="relative flex justify-center items-center"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "rotateX(-5deg)", // Slight tilt to see the depth
        }}
      >
        {images.map((src, index) => {
          const theta = (360 / faceCount) * index;
          return (
            <div
              key={index}
              className="absolute w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex justify-center items-center rounded-2xl p-4 md:p-6 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                backfaceVisibility: "visible", 
              }}
            >
              <img 
                src={src} 
                alt={`Tech Logo ${index}`} 
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CylinderCarousel;
