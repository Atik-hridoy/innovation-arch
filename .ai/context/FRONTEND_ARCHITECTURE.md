# Frontend Architecture Guide

## 💻 Tech Stack
- **Framework**: React / Next.js (App Router).
- **Styling**: Tailwind CSS (custom design variables only, no ad-hoc raw colors).
- **Animations**: GSAP, ScrollTrigger, Lenis (smooth scrolling wrapper).

## 📁 Standard Directory Structure
```text
/
├── app/                  # Next.js page layouts and routes
├── components/           # Reusable atomic UI elements
├── hooks/                # Custom React hooks (e.g. useLenis, useGSAP)
├── assets/               # Local SVGs, logos, and images
├── lib/                  # Third-party wrappers and utility functions
├── tests/                # Playwright visual regression and component tests
```

## 🏷️ Naming & State Conventions
- **Files**: Use kebab-case for directories/assets, and PascalCase for React component files (`Button.tsx`).
- **State Management**: React state hooks (`useState`, `useContext`) for component interaction. Keep state localized where possible.
- **Routing**: Folder-based Next.js routing with loading fallback screens.
- **Assets**: Always use next-generation WebP/AVIF formats. SVG icons must be inline/clean code for easy CSS styling.
