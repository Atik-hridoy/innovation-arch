---
name: innovative-arc-animation
description: GSAP timelines, ScrollTrigger, Lenis, cinematic motion, and transition guidelines for Innovative Arc.
---

# Innovative Arc Animation Guidelines

Use this skill when building transitions, writing GSAP animation code, setting up ScrollTrigger events, or configuring smooth scrolling (Lenis) for the application.

## 🌀 Lenis Smooth Scrolling Setup
To create a high-end cinematic scrolling feel, always initialize Lenis globally in the layout/app level:
- Ensure Lenis is configured with normal/smooth lerp options (`lerp: 0.1` or `duration: 1.2` for balanced response).
- Standard implementation structure (React Hook example):
  ```typescript
  import Lenis from 'lenis'
  import { useEffect } from 'react'

  export function useLenis() {
    useEffect(() => {
      const lenis = new Lenis()
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
      return () => lenis.destroy()
    }, [])
  }
  ```

## ⏳ GSAP Timelines & Staggering
- Never animate layouts abruptly. Use `gsap.timeline()` for sequenced entrances.
- Always use fine-tuned easing: `power3.out`, `power4.out`, or custom Bezier curves for smooth velocity profiles.
- When animating grids or lists, leverage staggers (`stagger: 0.05` or `stagger: 0.1` max) to draw the user's eye step-by-step.
- Implement cleanup: Always kill animations/timelines or use scoped GSAP contexts (`gsap.context()`) inside component unmounts to prevent memory leaks.

## 📜 ScrollTrigger Configuration
- When creating scroll-driven animations, specify clean triggers.
- Use markers only during development; keep them disabled in production.
- Use `scrub: true` or `scrub: 1` (smooth scrubbing) to link scroll position directly with animation progress.
- Keep trigger elements clear (e.g., standard layout sections) and use `start: "top 80%"` to begin animations before the element enters the viewport.
