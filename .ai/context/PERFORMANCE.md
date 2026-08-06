# Performance & Optimization Budget

Ensure the site loads instantly and operates smoothly under all conditions.

## 🎯 Target Performance Metrics
- **Lighthouse Performance Score**: > 95
- **Largest Contentful Paint (LCP)**: < 1.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.05
- **First Input Delay (FID)**: < 100ms

## 🖼️ Media & Image Optimization
- All images must use next-generation WebP or AVIF formats.
- Add `loading="lazy"` to secondary/footer assets.
- Hero/critical images must use `priority` or preloading.
- SVGs must be optimized (cleaned, minified) and embedded directly where interaction is needed.

## ⚡ Loading & Script Execution
- Next.js script loading: Deferred execution (`strategy="lazyOnload"` or `async`).
- Fonts: Preconnect to font domains, specify standard sizes to avoid layout shifts, and use `font-display: swap`.
