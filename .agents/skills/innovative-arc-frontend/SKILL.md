---
name: innovative-arc-frontend
description: Folder structure, React/Next.js/TypeScript coding standards, and reusable component conventions.
---

# Innovative Arc Frontend Architecture & Conventions

Use this skill when initializing the project layout, structuring components, defining folders, writing hooks, or setting up TypeScript typings.

## 📁 Standard Folder Structure
For clean division of concerns, maintain the following directory layout:
```text
src/
├── components/       # Reusable components
│   ├── ui/           # Low-level primitives (Buttons, Cards, Modals)
│   ├── layout/       # App layout wrappers (Navbar, Sidebar, Footer)
│   └── shared/       # Mid-level common widgets
├── hooks/            # Global/Reusable React hooks
├── styles/           # CSS files, global tokens, animation keyframes
├── utils/            # Pure helper functions, formatting, constants
└── types/            # TypeScript models, namespaces, interfaces
```

## 🏗️ Reusable Component Conventions
- Every UI element should be fully componentized and isolated. Avoid inline styles or local ad-hoc styling variables.
- Component API: Always define a strict interface for props (e.g. `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`).
- Export Strategy: Use named exports for high-level components and clear entrypoint files (`index.ts` in folders) to prevent import spaghetti.

## 💻 TypeScript & React Coding Standards
- Strictly enforce TypeScript types. Avoid using `any` completely.
- Keep components focused and single-purpose. If a component exceeds 200 lines of code, evaluate breaking it down into smaller sub-components.
- Use Next.js Server Components by default for better performance and select `'use client'` only when interactive features (such as state, hooks, event handlers) are needed.
