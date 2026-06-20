# 8085.ai Website Optimization — Risk Register

**Project:** 8085.ai Landing Page Optimization (70% Deliverable)  
**Date:** 2026-06-19  
**Status:** Active Monitoring  

---

## Risk Summary Table

| ID | Risk | Likelihood | Impact | Owner | Status |
|----|------|------------|--------|-------|--------|
| R1 | Voice Agent API unavailability | Medium | High | Engineering | Mitigated |
| R2 | Image performance degradation | Medium | Medium | Engineering | Accepted / Planned |
| R3 | Animation jank on mobile | Medium | Medium | Engineering | Mitigated |
| R4 | SEO insufficient content signals | Low | Medium | Marketing | Mitigated |
| R5 | Accessibility audit gaps | Low | High | Engineering | Monitoring |
| R6 | CTA competition / conversion cannibalization | Low | High | Product | Mitigated |

---

## R1 — Voice Agent API Unavailability

**Description:** The Voice Agent relies on the ElevenLabs API (`api.elevenlabs.io`). If the API experiences downtime, rate limiting, or network issues, users who click "Talk to Agent Ada" will encounter a dead click or error state.

**Likelihood:** Medium — Third-party APIs are inherently unreliable over long time horizons.  
**Impact:** High — A broken CTA damages trust and may cause lead loss if users abandon the site.

### Mitigation

| Layer | Implementation | Status |
|-------|---------------|--------|
| CAPTCHA gate | `captchaService.js` verifies user before API connection | ✅ Active |
| Error overlay | `errorHandler` displays user-friendly message on API failure | ✅ Active |
| Retry logic | Exponential backoff on webhook submission | ✅ Active |
| sendBeacon fallback | `beforeunload` + `sendBeacon` transmits partial data on browser close | ✅ Active |
| Premature close handler | `handlePrematureClose` ends conversation and fires webhook if data exists | ✅ Active |
| Graceful degradation | Overlay shows explicit error; no silent failure | ✅ Active |

### Residual Risk

- Users may still be frustrated by a non-functional button if the API is down for extended periods.
- **Recommended:** Add a lightweight health check ping to ElevenLabs before rendering the "Talk to Agent Ada" button. If unhealthy, hide or disable the button with a tooltip: "Agent Ada is offline. Book a call instead."

---

## R2 — Image Performance Degradation

**Description:** The site uses a mix of PNG, JPG, SVG, and WebP formats. Several photographic images are still in PNG, which is 3–5× larger than WebP/AVIF. There are no responsive images (`srcset`), no image CDN, and missing social sharing images.

**Likelihood:** Medium — Page weight will grow as more content is added.  
**Impact:** Medium — Increases LCP and data usage, especially on mobile.

### Mitigation

| Action | Implementation | Status |
|--------|---------------|--------|
| Lazy loading | `loading="lazy"` on all `<img>` tags | ✅ Active |
| SVG logos | Partner logos (Audi, DHL, Bayer) use optimized SVG | ✅ Active |
| WebP where present | Some partner logos already in WebP | ✅ Active |
| Missing social images | `og-image.jpg` and `twitter-card.jpg` referenced but do not exist | ⚠️ Needs asset creation |
| PNG conversion | `contact-avatar-chloe.png`, `howwestart-illustrations-*.png` still PNG | ⚠️ Needs conversion |
| `srcset` / responsive images | Not implemented | ⚠️ Planned |
| AVIF support | Not implemented | ⚠️ Planned |

### Residual Risk

- Lighthouse Performance may remain below 90 until images are optimized and a CDN or build-time optimizer is adopted.
- **Recommended:** Install `vite-plugin-image-optimizer` and convert all non-SVG images to WebP with fallbacks.

---

## R3 — Animation Jank on Mobile

**Description:** The site uses a heavy Canvas-based shader in the hero, continuous `requestAnimationFrame` loops, and GSAP ScrollTrigger timelines. On low-end mobile devices, this can cause frame drops, battery drain, and scroll jank.

**Likelihood:** Medium — Low-end Android devices and older iPhones are susceptible.  
**Impact:** Medium — Degrades user experience and may increase bounce rate on mobile.

### Mitigation

| Action | Implementation | Status |
|--------|---------------|--------|
| `prefers-reduced-motion` | CSS comprehensively disables animations when user preference is set | ✅ Active |
| Reduced motion hook | `useReducedMotionPreference()` guards GSAP initialization | ✅ Active |
| `will-change` optimization | Used on animated elements where appropriate | ✅ Active |
| IntersectionObserver pause | `HeroShaderCanvas` pauses when not visible | ✅ Active |
| CircuitCanvas pause | Not implemented (component is orphaned) | ⚠️ N/A for current build |
| Adaptive particle density | Not implemented | ⚠️ Planned |
| Throttled resize handlers | Not implemented | ⚠️ Planned |

### Residual Risk

- Users who do not have `prefers-reduced-motion` enabled will still experience heavy animations on low-end hardware.
- **Recommended:** Detect `navigator.hardwareConcurrency` or `deviceMemory` and reduce particle density / disable shader effects on devices with < 4 cores or < 4 GB RAM.

---

## R4 — SEO Insufficient Content Signals

**Description:** As a single-page application with no blog or dedicated service pages, the site has limited content depth for search engines. Keyword targeting is diluted across three verticals (Software Agencies, Fortune 500, Amazon PPC) on one page.

**Likelihood:** Low — Current technical SEO foundation is solid.  
**Impact:** Medium — Long-term ranking growth will be constrained without content expansion.

### Mitigation

| Action | Implementation | Status |
|--------|---------------|--------|
| Title optimization | Shortened to 54 characters, front-loaded brand + value prop | ✅ Active |
| Meta description | 156 characters with soft CTA | ✅ Active |
| Structured data cleanup | Removed fabricated reviews; added `WebSite` schema | ✅ Active |
| Single H1 strategy | Confirmed one H1 on active render tree | ✅ Active |
| Canonical URL | Absolute HTTPS canonical present | ✅ Active |
| Heading hierarchy | H2s follow logical section order | ✅ Active |
| Vertical landing pages | Not created | ⚠️ Planned |
| Blog / content hub | Not created | ⚠️ Planned |
| XML sitemap | Not present | ⚠️ Planned |
| `robots.txt` | Not present | ⚠️ Planned |

### Residual Risk

- Competing for high-intent keywords like "business process automation" with a single page is difficult against established multi-page competitors.
- **Recommended:** Create `/software-agencies`, `/fortune-500`, and `/amazon-ppc` landing pages with targeted titles and content. Launch a blog with interlinking strategy.

---

## R5 — Accessibility Audit Gaps

**Description:** While the codebase includes strong accessibility foundations (skip link, focus states, reduced motion, ARIA labels), a formal audit with screen readers and automated tools (axe, WAVE) has not been completed. Some image `alt` texts may be generic, and color contrast on certain accent combinations has not been fully verified.

**Likelihood:** Low — Patterns are correct; edge cases are the concern.  
**Impact:** High — An accessibility lawsuit or audit failure would be costly and damaging.

### Mitigation

| Action | Implementation | Status |
|--------|---------------|--------|
| Skip link | Present and keyboard-reachable | ✅ Active |
| Focus states | Visible on all interactive elements | ✅ Active |
| Keyboard navigation | All CTAs and nav links are focusable | ✅ Active |
| ARIA labels | Motion spine and decorative elements have SR text | ✅ Active |
| Reduced motion | Comprehensive CSS and JS guards | ✅ Active |
| Automated audit | Not run (axe, WAVE, Lighthouse) | ⚠️ Pending |
| Screen reader test | Not run (NVDA, VoiceOver, JAWS) | ⚠️ Pending |
| Color contrast audit | Partial; some accent tones unchecked | ⚠️ Pending |

### Residual Risk

- Undetected contrast failures on custom color combinations (e.g., `--color-signal` tints) could fail WCAG AA.
- **Recommended:** Run axe DevTools and WAVE on every section. Test with VoiceOver (macOS/iOS) and NVDA (Windows). Verify all images have meaningful `alt` text.

---

## R6 — CTA Competition / Conversion Cannibalization

**Description:** Prior to optimization, three CTAs competed for attention. While the optimization reduced this to two, the Voice Agent still exists in the hero. It is possible that some high-intent users choose the AI chat over the strategy call, resulting in lower-value leads.

**Likelihood:** Low — Visual hierarchy is now clear.  
**Impact:** High — Enterprise strategy calls typically convert at higher value than AI chat leads.

### Mitigation

| Action | Implementation | Status |
|--------|---------------|--------|
| Single primary CTA | "Book Strategy Call" is the only solid button | ✅ Active |
| Secondary demotion | "Talk to Agent Ada" uses outlined button style | ✅ Active |
| Tertiary removal | Email CTA removed entirely | ✅ Active |
| Mobile simplification | Mobile hero shows only one CTA | ✅ Active |
| Conversion tracking | Not implemented | ⚠️ Needs analytics |

### Residual Risk

- Without analytics, we cannot measure whether the Voice Agent is cannibalizing strategy call bookings.
- **Recommended:** Add analytics events to track:
  - "Book Strategy Call" click rate
  - "Talk to Agent Ada" open rate
  - Conversation completion rate
  - Lead quality score by source (call vs. agent)
- Consider an A/B test removing the Voice Agent from the hero entirely, keeping it only in the contact section.

---

## Risk Monitoring Plan

| Frequency | Action | Owner |
|-----------|--------|-------|
| Weekly | Review Voice Agent API uptime and error logs | Engineering |
| Weekly | Check build size and dependency drift | Engineering |
| Bi-weekly | Run Lighthouse on staging / preview URL | QA |
| Monthly | Review analytics for CTA conversion split | Product |
| Quarterly | Full accessibility audit (axe + screen reader) | QA |
| Quarterly | SEO ranking check for target keywords | Marketing |

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Engineering Lead | | | |
| Product Owner | | | |
| QA Lead | | | |

