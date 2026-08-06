# Coding Standards & Conventions

Maintain strict clean code practices across the repository.

## 💻 TypeScript Standards
- TypeScript is mandatory. Avoid using the `any` type completely.
- Define explicit interfaces or types for all function inputs and outputs.
- Keep properties strict (e.g. avoid optional properties `?` unless absolutely needed).

## 🎨 CSS & Styling (Tailwind)
- Use standard design tokens (like `theme.extend.colors.obsidian`) rather than hardcoding hex codes.
- Organize Tailwind class listings logically (layout first, sizing, borders, colors, hover, responsive).
- Avoid creating custom inline CSS styles. Keep styles within Tailwind utility layers or modular CSS files.

## 🛠️ Code Quality Rules
- **Component sizes**: Keep component file lengths below 200 lines. Refactor if files exceed this limit.
- **Dry Rule**: Never duplicate layout templates or coding logic. Extract shared helpers.
- **Imports**: Group imports (React first, Next.js, third-party libraries like GSAP, local components, styles).
