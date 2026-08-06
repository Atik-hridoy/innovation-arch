# Accessibility Standards (WCAG 2.1 AA)

We build interfaces accessible to all visitors.

## ⌨️ Keyboard Navigation
- All interactive links, buttons, and form inputs must be focusable using the `Tab` key.
- Custom dropdowns and modal components must support activation using `Enter` or `Space`.
- Focus outlines must be highly visible (e.g. `focus:ring-2 focus:ring-cyan-500`).

## 🧱 ARIA & Screen Reader Support
- Decorative SVGs and icons must use `aria-hidden="true"`.
- Buttons lacking text (like icon-only anchors) must have a descriptive `aria-label`.
- Use correct input descriptors (like `aria-invalid`, `aria-describedby` for validations).

## 🎨 Color & Contrast
- Maintain a minimum WCAG AA contrast ratio of 4.5:1 for body text and 3:1 for large headers.
- Glow effects should never decrease readability of overlaying text characters.
