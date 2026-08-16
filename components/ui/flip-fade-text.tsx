'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';

export interface FlipFadeTextProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  letterDuration?: number;
  staggerDelay?: number;
}

const defaultWords = ['CRAFTING EXCELLENCE', 'SPATIAL ARCHITECTURE', 'HIGH PERFORMANCE'];

export function FlipFadeText({
  words = defaultWords,
  interval = 3200,
  className = '',
  textClassName = '',
  staggerDelay = 0.04,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const currentWord = useMemo(() => words[index] || '', [words, index]);

  const nextWord = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setIsExiting(false);
    }, 450);
  }, [words.length]);

  useEffect(() => {
    const timer = setInterval(nextWord, interval);
    return () => clearInterval(timer);
  }, [nextWord, interval]);

  const letters = useMemo(() => currentWord.split(''), [currentWord]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center [perspective:1000px]">
        <div
          className={`flex flex-wrap justify-center font-serif italic lowercase tracking-wider text-rose-300 ${textClassName}`}
        >
          {letters.map((char, i) => (
            <span
              key={`${currentWord}-${i}`}
              className="inline-block transition-all duration-500"
              style={{
                display: 'inline-block',
                transformStyle: 'preserve-3d',
                transform: isExiting
                  ? 'rotateX(-90deg) translateY(-20px)'
                  : 'rotateX(0deg) translateY(0px)',
                opacity: isExiting ? 0 : 1,
                filter: isExiting ? 'blur(8px)' : 'blur(0px)',
                transitionDelay: `${i * staggerDelay}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlipFadeText;
