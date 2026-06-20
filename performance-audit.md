# 8085.ai - Performance Audit

**Audit Date:** 2026-06-19
**Build Tool:** Vite 6.3.5
**Framework:** React 18.2.0

---

## 1. Bundle Size Assessment

### 1.1 Dependencies Analysis

| Package | Version | Size (est.) | Usage | Assessment |
|---------|---------|-------------|-------|------------|
| `gsap` | ^3.13.0 | ~90kb gzipped | ScrollTrigger, timelines, matchMedia | **Heavy** - Used extensively; consider tree-shaking unused plugins |
| `react` + `react-dom` | ^18.2.0 | ~45kb gzipped | Core framework | Standard |
| `@11labs/react` | ^0.1.4 | ~50kb gzipped | Voice agent SDK | Large for single feature; lazy load recommended |
| `dompurify` | ^3.2.6 | ~15kb gzipped | XSS sanitization | Necessary; could be replaced with smaller regex for simple cases |
| `lucide-react` | ^0.292.0 | ~20kb+ gzipped | Icons | Tree-shakes well; only used icons are bundled |
| `@radix-ui/react-*` | ^1.0.2-2.0.0 | ~30kb gzipped total | Select, Slider, Switch, Slot | Heavy for simple controls; custom implementations could save size |
| `tailwind-merge` + `clsx` | ^2.0.0 | ~5kb gzipped | Class name utilities | Acceptable |
| `class-variance-authority` | ^0.7.0 | ~5kb gzipped | Component variants | Acceptable |
| `tailwindcss` | ^3.3.5 | 0kb (build-time) | CSS framework | Dev dependency |

**Estimated Total JS Bundle:** ~300-400kb gzipped (production estimate)

**Concern:** No `rollup-plugin-visualizer` or bundle analysis tool configured. Actual bundle size unknown without build.

### 1.2 Entry Point Analysis

**File:** `src/main.jsx`

```jsx
import './lib/errorMonitor.js';  // Loaded synchronously on every page
import './styles/globals.css';    // Full Tailwind + custom CSS
```

**Issues:**
- `errorMonitor.js` imported eagerly - if large, blocks initial render
- All Tailwind CSS imported globally - no CSS splitting
- No `React.lazy()` usage anywhere in the codebase

---

## 2. Image Optimization Status

### 2.1 Image Inventory

| Image | Format | Size | Loading | Assessment |
|-------|--------|------|---------|------------|
| `contact-avatar-chloe.png` | PNG | Unknown | lazy | Should convert to WebP/AVIF |
| `founder-profileimage-*.jpg` | JPG | Unknown | lazy | Acceptable; consider WebP |
| `howwestart-illustrations-*.png` | PNG | Unknown | lazy | Should convert to WebP |
| `partners-logo-*.svg` | SVG | Small | lazy | **Optimal** |
| `partners-logo-*.png` | PNG | Unknown | lazy | Should convert to WebP |
| `partners-logo-*.webp` | WebP | Unknown | lazy | **Good** |
| `whoweare-illustrations-*.png` | PNG | Unknown | lazy | Should convert to WebP |

### 2.2 Image Optimization Issues

| # | Issue | Impact | Recommendation |
|---|-------|--------|----------------|
| 1 | No responsive images (`srcset`) | Mobile users download desktop-sized images | Add `srcset` with multiple widths |
| 2 | PNG used for photographic content | 3-5x larger than JPEG/WebP | Convert `chloe.png`, `howwestart` illustrations to WebP |
| 3 | No image CDN or optimization pipeline | Manual optimization required | Consider `@astrojs/image`, `vite-plugin-image-optimizer`, or Cloudinary |
| 4 | Missing `width`/`height` attributes on some images | Cumulative Layout Shift risk | Add explicit dimensions |
| 5 | No AVIF support | Missing 30-50% compression gains vs WebP | Serve AVIF with WebP fallback |
| 6 | `og-image.jpg` and `twitter-card.jpg` missing | Social sharing broken | Create and optimize these assets |

### 2.3 Partner Logo Optimization

**Current:** Mix of SVG, PNG, and WebP formats
**Recommendation:** Standardize all partner logos to SVG (for logos with solid colors) or optimized WebP (for complex logos). The current SVG files (Audi, DHL, Bayer, etc.) are optimal.

---

## 3. Font Loading Strategy

### 3.1 Current Implementation

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Livvic:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.2 Assessment

| Criterion | Status | Notes |
|-----------|--------|-------|
| Preconnect | Good | Both `fonts.googleapis.com` and `fonts.gstatic.com` preconnected |
| `display=swap` | Good | FOIT avoided |
| Self-hosting | Missing | Google Fonts requires GDPR consent in EU |
| Subsetting | Missing | Loading full Latin character sets |
| Variable Fonts | Missing | Could combine Livvic + Poppins weights into variable fonts |
| `font-display` CSS | Missing | No `font-display: swap` in `@font-face` rules (inherited from Google) |

### 3.3 Recommendations

1. **Self-host fonts** to avoid GDPR issues and third-party requests
2. **Subset fonts** to only characters used (Latin + numerals)
3. **Preload critical font files**:
   ```html
   <link rel="preload" href="/fonts/livvic-600.woff2" as="font" type="font/woff2" crossorigin>
   ```
4. **Consider system font stack** for body text to eliminate font load entirely

---

## 4. Animation Performance Risks

### 4.1 Canvas Animations

| Animation | Risk Level | Issues |
|-----------|------------|--------|
| **Phase Transition Shader** | **High** | 2,500-5,000 particles, FBM noise per frame, glow sprite rendering. On low-end devices, this can drain battery and drop frames. |
| **Circuit Board Animation** | **Medium** | Continuous rAF loop even when not visible. Spatial index rebuilds on resize. Multiple offscreen canvases. |
| **Sound Wave Animation** | **Medium** | GSAP timeline with 20 elements updating scaleY continuously while speaking. |

### 4.2 GSAP Animations

| Animation | Risk Level | Issues |
|-----------|------------|--------|
| **ScrollTrigger (LandingPage)** | **Medium** | Multiple ScrollTrigger instances created; `invalidateOnRefresh: true` causes recalculation on resize. `matchMedia` creates separate contexts. |
| **Hero Pointer Tilt** | **Low** | Direct CSS variable updates on every `pointermove` - efficient but fires frequently. |
| **Header Logo Resize** | **Low** | Native scroll listener updates font-size - causes layout thrashing if not throttled. |
| **Button Ripple (Header)** | **Low** | Dynamic DOM element creation on every hover - memory churn. |

### 4.3 Specific Performance Concerns

1. **Dual Canvas System (Phase Transition)**
   - Main canvas + trail canvas = 2x memory
   - `drawImage(trailCanvas, ...)` copies full canvas every frame
   - `globalCompositeOperation` changes per frame

2. **Circuit Canvas on Resize**
   - Full reinitialization on every resize event
   - No debouncing on resize handler
   - Spatial index rebuilt from scratch

3. **GSAP Context Cleanup**
   - `gsap.context()` used correctly with cleanup
   - However, `ScrollTrigger.getAll().forEach(st => st.kill())` in `Hero.jsx` is overly aggressive and may kill triggers from other components

4. **Intersection Observer Missing for CircuitCanvas**
   - Circuit animation runs continuously via rAF even when scrolled out of view
   - Compare to `HeroShaderCanvas` which properly pauses via IntersectionObserver

### 4.4 Recommendations

1. **Throttle resize handlers** to 200ms
2. **Pause CircuitCanvas** when not visible (add IntersectionObserver)
3. **Reduce particle count** on low-end devices via `navigator.hardwareConcurrency` or `deviceMemory`
4. **Use `will-change: transform`** on animated elements
5. **Kill SoundWaveAnimation timeline** immediately when `isActive` becomes false (currently does exit animation)
6. **Remove dynamic ripple DOM elements** after animation completes in Header

---

## 5. Code Splitting Opportunities

### 5.1 Current State: NO CODE SPLITTING

The entire application is bundled as a single entry point. No `React.lazy()`, `dynamic import()`, or `manualChunks` configuration exists.

### 5.2 Recommended Splits

| Chunk | Components | Current Size | Strategy |
|-------|-----------|--------------|----------|
| **Voice Agent** | `VoiceAgentOverlay`, `SoundWaveAnimation`, `@11labs/react`, `useVoiceAgent.js` | ~80kb | `React.lazy()` + dynamic import |
| **Hero Shader** | `HeroShaderCanvas`, `phaseTransition.js` | ~50kb | Dynamic import on hero visibility |
| **GSAP Plugins** | `ScrollTrigger` | ~30kb | Already tree-shaken, but verify |
| **Privacy Policy** | `PrivacyPolicy.jsx` | ~5kb | `React.lazy()` on hash route |
| **Circuit Canvas** | `CircuitCanvas`, animation engine | ~40kb | Dynamic import (legacy) |
| **shadcn/ui** | Card, Slider, Select, Switch | ~30kb | Already tree-shakes well |

### 5.3 Vite Configuration for Code Splitting

```js
// Recommended vite.config.js additions
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-ui': ['@radix-ui/react-select', '@radix-ui/react-slider', '@radix-ui/react-switch'],
          'voice-agent': ['@11labs/react'],
        }
      }
    }
  }
})
```

### 5.4 Dynamic Import Implementation

```jsx
// Example for VoiceAgentOverlay
const VoiceAgentOverlay = React.lazy(() => import('./components/VoiceAgentOverlay'));

// Example for HeroShaderCanvas
const HeroShaderCanvas = React.lazy(() => import('./components/landing/HeroShaderCanvas'));
```

---

## 6. Lazy Loading Status

### 6.1 Currently Lazy Loaded

| Feature | Implementation | Status |
|---------|---------------|--------|
| Images | `loading="lazy"` on all `<img>` tags | **Good** |
| Circuit Renderer | `import('../lib/animation/renderer')` inside `useEffect` | **Good** |

### 6.2 NOT Lazy Loaded (Should Be)

| Feature | Current | Recommendation |
|---------|---------|----------------|
| Voice Agent SDK | Eager import in `useVoiceAgent.js` | Dynamic import when overlay opens |
| Voice Agent Overlay | Eager import in `App.jsx` | `React.lazy()` |
| reCAPTCHA Script | Loaded on CAPTCHA service init | Already lazy-ish, but could preload earlier |
| Privacy Policy | Eager import in `App.jsx` | `React.lazy()` on hash change |
| Partner logos below fold | Already `loading="lazy"` | Good |
| Capability cards | All rendered on mount | IntersectionObserver + conditional render |
| Lattice diagram | Rendered on mount | Could defer until section approaches viewport |

### 6.3 React Lazy Implementation Plan

```jsx
// App.jsx improvements
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const VoiceAgentOverlay = React.lazy(() => import('./components/VoiceAgentOverlay'));

// Inside App
{showPrivacyPolicy && (
  <Suspense fallback={<div>Loading...</div>}>
    <PrivacyPolicy />
  </Suspense>
)}
```

---

## 7. Unused Dependencies

### 7.1 Potentially Unused Packages

| Package | Evidence | Recommendation |
|---------|----------|----------------|
| `playwright` | Installed but no E2E scripts, no tests found | Remove or add E2E tests |
| `@types/react` / `@types/react-dom` | Project uses JSX without TypeScript | Remove unless TS migration planned |
| `@testing-library/jest-dom` | No test files using custom matchers found | Keep if testing active |
| `@types/dompurify` | DOMPurify is used; types are helpful | Keep |

### 7.2 Unused Code

| Code | Location | Status |
|------|----------|--------|
| `elevenLabsProxy.js` | `src/lib/` | Appears unused; `useVoiceAgent.js` uses `@11labs/react` directly |
| Legacy section components | `src/components/sections/` | **Orphaned** - Not imported by App.jsx |
| `Header.jsx` | `src/components/` | **Orphaned** - LandingPage has its own header |
| `CircuitCanvas.jsx` | `src/components/` | **Orphaned** - Not in current App.jsx tree |
| `ColorSettings.jsx` | `src/components/` | Only used by CircuitCanvas (orphaned) |
| `landingSystemData.js` - `latticeNodes` | `src/components/landing/` | Exported but not consumed by any component |

### 7.3 Dead Code Impact

- **Bundle size inflation:** Orphaned components may still be tree-shaken, but not guaranteed depending on import patterns
- **Maintenance burden:** Legacy code requires updates when dependencies change
- **Confusion:** Multiple Contact/Hero implementations exist

---

## 8. Lighthouse Target Gaps

### 8.1 Performance Score Targets vs Predicted

| Metric | Target | Predicted | Gap |
|--------|--------|-----------|-----|
| **Performance** | 90+ | 65-75 | Large gap due to animations and JS |
| **First Contentful Paint (FCP)** | < 1.8s | ~2.0-2.5s | Font loading + JS parse blocks render |
| **Largest Contentful Paint (LCP)** | < 2.5s | ~3.0-4.0s | Hero shader initialization delays LCP |
| **Total Blocking Time (TBT)** | < 200ms | ~300-500ms | GSAP init, canvas setup |
| **Cumulative Layout Shift (CLS)** | < 0.1 | ~0.05-0.15 | Images without dimensions may shift |
| **Speed Index** | < 3.4s | ~4.0-5.0s | Heavy JS payload |

### 8.2 Accessibility Score

| Metric | Target | Predicted | Notes |
|--------|--------|-----------|-------|
| **Accessibility** | 100 | 90-95 | Excellent ARIA usage, but check color contrast on some accent colors |
| Color Contrast | AAA | AA | `--color-signal: #16736a` on `--color-bg: #f3efe6` passes; some lighter tones may fail |

### 8.3 Best Practices Score

| Metric | Target | Predicted | Notes |
|--------|--------|-----------|-------|
| **Best Practices** | 100 | 95 | HTTPS, CSP present; browser errors from console.log statements may flag |

### 8.4 SEO Score

| Metric | Target | Predicted | Notes |
|--------|--------|-----------|-------|
| **SEO** | 100 | 85-90 | Missing meta description length optimization, no sitemap, title too long |

---

## 9. Network & Resource Loading

### 9.1 Third-Party Requests

| Resource | URL | Blocking | Assessment |
|----------|-----|----------|------------|
| Google Fonts CSS | `fonts.googleapis.com` | **Render-blocking** | Preconnect helps but still blocks |
| Google Fonts Files | `fonts.gstatic.com` | Render-blocking | 4-6 font files requested |
| reCAPTCHA API | `google.com/recaptcha/api.js` | **Not loaded until needed** | Good - loaded by CaptchaService |
| ElevenLabs API | `api.elevenlabs.io` | Not loaded until conversation | Good |
| Webhook Proxy | `/.netlify/functions/secure-webhook-proxy` | On conversation end | Good |

### 9.2 Resource Hints Missing

```html
<!-- Missing optimizations -->
<link rel="dns-prefetch" href="https://api.elevenlabs.io">
<link rel="preconnect" href="https://api.elevenlabs.io">
<link rel="prefetch" href="/.netlify/functions/elevenlabs-proxy">
```

---

## 10. Specific Recommendations

### Immediate (This Week)

1. **Add `vite-bundle-visualizer`** to analyze actual bundle composition
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

2. **Configure manual chunks** in `vite.config.js` for vendor separation

3. **Convert PNG images to WebP** with `vite-plugin-image-optimizer`:
   ```bash
   npm install -D vite-plugin-image-optimizer
   ```

4. **Add image dimensions** to all `<img>` tags to prevent CLS

5. **Remove or archive orphaned components** (legacy sections, Header, CircuitCanvas if unused)

### Short-term (This Month)

6. **Implement `React.lazy()`** for:
   - `VoiceAgentOverlay`
   - `PrivacyPolicy`
   - `HeroShaderCanvas` (if below-fold on some breakpoints)

7. **Self-host Google Fonts** with subsetting

8. **Add IntersectionObserver pause** to CircuitCanvas (if kept)

9. **Throttle resize handlers** to 200ms with `requestAnimationFrame` queue

10. **Add service worker** for asset caching (Vite PWA plugin)

### Medium-term (Next Quarter)

11. **Implement adaptive particle density** based on device capabilities:
   ```js
   const density = navigator.hardwareConcurrency > 4 
     ? config.particleDensity 
     : config.particleDensity * 0.5;
   ```

12. **Create separate landing pages** per vertical to reduce per-page JS

13. **Add Critical CSS extraction** for above-fold content

14. **Implement resource hints** (`prefetch`, `preconnect`) for anticipated navigation

15. **Add Playwright E2E tests** or remove the dependency

---

## 11. Performance Scorecard

| Category | Current | Target | Priority |
|----------|---------|--------|----------|
| Bundle Size | Unknown / Likely 300-400kb | < 200kb initial | High |
| Image Optimization | Partial | All modern formats | High |
| Font Loading | Good | Self-hosted + subset | Medium |
| Animation Performance | Risky | Device-adaptive | High |
| Code Splitting | None | Route-based + vendor | High |
| Lazy Loading | Partial | Comprehensive | Medium |
| Unused Code | Present | Removed | Medium |
| Lighthouse Performance | ~65-75 | 90+ | High |
| Lighthouse Accessibility | ~90-95 | 100 | Medium |
| Lighthouse SEO | ~85-90 | 100 | Medium |

---

## 12. Build Output Analysis Commands

Run these to get actual performance metrics:

```bash
# Analyze bundle size
npm install -D rollup-plugin-visualizer
# Add to vite.config.js, then:
npm run build
# Open stats.html

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Webpack Bundle Analyzer alternative
npx vite-bundle-visualizer

# Check for unused exports
npx unimported
```
