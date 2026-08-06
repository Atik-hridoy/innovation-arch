---
name: innovative-arc-qa
description: QA checklist for responsiveness, accessibility (a11y), performance, and visual regression.
---

# Innovative Arc Quality Assurance (QA) Checklist

Use this skill when auditing features, reviewing code, optimizing page speed, checking visual regressions, or running automated tests.

## 📱 Responsiveness Checklist
- **Breakpoints**: Verify layouts look flawless across standard screen sizes:
  - Mobile: `320px` to `640px`
  - Tablet: `768px` to `1024px`
  - Desktop: `1024px` to `1440px`+
- **Flexibility**: Text must never overflow containers, images must scale responsively, and horizontal scrolling should never occur unless intended (e.g. horizontal sliders).

## 🧪 Accessibility (a11y) Audit
- **Semantic HTML**: Use proper `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, and `<nav>` tags.
- **ARIA & Roles**: Custom interactive elements (menus, dropdowns, modal windows) must have correct `aria-*` tags and roles.
- **Keyboard Navigation**: Ensure all interactive elements can be focused using the Tab key, and activated using Enter/Spacebar. Focused items must have clear outline styles.
- **Color Contrast**: Verify all text elements meet WCAG AA contrast standards (minimum ratio of 4.5:1).

## ⚡ Performance & Lighthouse Optimization
- **Image Optimization**: Always use next-generation image formats (WebP/AVIF) with appropriate `width`, `height`, and lazy loading.
- **Font Strategy**: Preconnect to font domains, load critical web fonts efficiently, and use `font-display: swap` to prevent layout shifts.
- **Bundle Size**: Avoid importing entire libraries if only specific methods are needed. Use tree-shakable packages.
