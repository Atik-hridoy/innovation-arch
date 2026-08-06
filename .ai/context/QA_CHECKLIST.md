# Quality Assurance (QA) Checklist

Verify every layout task against this checklist before completion.

## 📱 Checkpoints

- **[ ] Pixel Perfect**:
  - The design matches reference visual guides exactly.
  - Correct spacing, font scaling, and colors are applied.

- **[ ] Mobile Responsiveness**:
  - Layouts scale cleanly across all breakpoints (360px up to 1920px).
  - No text overlaps, structural breakage, or unwanted horizontal scrolling.

- **[ ] Accessibility**:
  - Keyboard navigation is fully supported (`Tab`, `Enter`).
  - Active elements show clear focus indicators.
  - Image assets have appropriate `alt` descriptions.

- **[ ] Smooth Motion & Performance**:
  - Animations render smoothly without layout shifts (CLS).
  - GSAP animations clean up properly on unmount.

- **[ ] Clean Logs**:
  - Zero warning indicators, compiler errors, or console exceptions.
