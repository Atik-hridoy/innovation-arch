---
name: innovative-arc-design-system
description: Rules for colors, typography, spacing, glassmorphism, components, and the visual language of Innovative Arc.
---

# Innovative Arc Design System

Use this skill when designing user interfaces, writing CSS, configuring colors, or defining layout spacings for the Innovative Arc premium frontend application.

## 🎨 Visual Identity & Color Palette
Always use a sleek, cohesive, and modern dark-mode-first color scheme:
- **Primary Background**: Obsidian (#0B0F19 to #030712)
- **Secondary Card Background**: Slate Dark (#111827 or #1F2937 with transparency)
- **Accents**: 
  - Neon Cyan (#06B6D4) for primary actions and digital futuristic elements
  - Vibrant Violet/Purple (#8B5CF6) for depth, secondary focus, and gradient overlays
  - Emerald Green (#10B981) for success/positive statuses
- **Text Hierarchy**:
  - High Emphasis: Pure White (#FFFFFF)
  - Medium Emphasis: Cool Gray (#9CA3AF)
  - Low/Disabled: Slate Muted (#4B5563)

## ✨ Glassmorphism & Borders
To achieve the premium, modern aesthetic, apply these rules for glassmorphic elements:
- **Background Blur**: `backdrop-filter: blur(12px) saturate(180%)`
- **Background Color**: Semi-transparent dark (e.g., `rgba(17, 24, 39, 0.7)`)
- **Borders**: Subtle, high-contrast borders `rgba(255, 255, 255, 0.08)` to simulate glass edge reflections.
- **Satin / Glow Effects**: Apply subtle outer or inner shadows with accent colors (`box-shadow: 0 0 15px rgba(6, 182, 212, 0.15)`).

## 📐 Spacing & Grid System
- Follow a strict 8px grid system (4px, 8px, 16px, 24px, 32px, 48px, 64px).
- Containers should have standard paddings of 1.5rem (24px) to 3rem (48px) for clean spacing.
- Use CSS Flexbox and CSS Grid with consistent gaps (`gap: 1.5rem` or `gap-6` in Tailwind) to ensure alignment.

## ✍️ Typography
- **Headings**: Use geometric, clean modern fonts (e.g., `Outfit`, `Cabinet Grotesk`, or `Inter`). Use heavy font weights (`700`, `800`) for high-impact titles.
- **Body Text**: Use highly readable sans-serif (e.g., `Inter` or `Plus Jakarta Sans`) with standard line heights (`line-height: 1.6`).
