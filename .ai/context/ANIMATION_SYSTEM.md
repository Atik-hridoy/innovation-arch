# Animation System Guide

## 🌀 GSAP & ScrollTrigger Configuration
- Use `gsap.timeline()` for page-entry sequence choreography.
- Easing: Use custom eases or smooth velocity shapes (like `power3.out`, `power4.out`). Do not use linear eases for layouts.
- Scrub: Use `scrub: 1` or `scrub: true` to link scrolling smoothly with animation updates.

## ✨ Animation Standard Types
- **Hero Reveal**: Mask Reveal (utilizing SVG paths or `clip-path`) to smoothly expand views on scroll.
- **Card Hovers**: Use magnetic hover micro-animations and scale effects.
- **Path Drawing**: Animate SVG lines (`stroke-dasharray` and `stroke-dashoffset`) on section entry to show logical connection flows.
- **Parallax**: Parallax background images (`speed: 0.5`) to create spatial depth.

## ⚡ Performance Guidelines
- Restrict animations to GPU-accelerated attributes: `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. Do not animate layout values (`width`, `height`, `top`).
- Support reduced motion: Use CSS Media Query `prefers-reduced-motion: reduce` to disable animations for users with motion sensitivity.
