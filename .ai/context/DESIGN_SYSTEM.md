# Design System Specification

## 🎨 Color Tokens (Obsidian Concept)
- `--bg-obsidian`: `#030712` (Main dark layout background)
- `--bg-card`: `rgba(17, 24, 39, 0.7)` (Semi-transparent cards)
- `--glow-cyan`: `#06B6D4` (Futuristic neon cyan accent)
- `--glow-purple`: `#8B5CF6` (Creative neon violet/purple accent)
- `--text-primary`: `#FFFFFF`
- `--text-secondary`: `#9CA3AF`
- `--border-glass`: `rgba(255, 255, 255, 0.08)` (Thin reflective edge)

## 📐 Typography & Spacing Scale
- **Grid Layout**: 12-column desktop grid with standard margin (e.g. 48px).
- **Scale**:
  - H1: `4.5rem` / `72px` (Extra-bold)
  - H2: `3rem` / `48px` (Bold)
  - H3: `2rem` / `32px` (Medium)
  - Body: `1rem` / `16px` (Line height: `1.6`)
- **Spacing Units**: Strictly follow a `4px / 8px` spacing scale: `8px`, `16px`, `24px`, `32px`, `48px`, `64px`.

## 🧊 Glassmorphism & Borders
- Apply `backdrop-filter: blur(12px) saturate(180%)`.
- Set background to `var(--bg-card)`.
- Borders must be extremely thin (`1px` width with `var(--border-glass)` color).
- Borders should use slight roundings: `8px` (`rounded-lg`) or `16px` (`rounded-2xl`).
