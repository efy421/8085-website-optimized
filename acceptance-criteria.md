# 8085.ai Website Optimization — Acceptance Criteria

**Project:** 8085.ai Landing Page Optimization (70% Deliverable)  
**Date:** 2026-06-19  
**Status:** Ready for Verification  

---

## How to Use This Document

Each criterion is marked **PASS** or **FAIL**. A feature is considered accepted only when all its criteria are PASS. For criteria requiring manual testing, record the tester, date, and result in the Notes column.

---

## 1. Hero Clarity

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| H1 | A first-time visitor can answer "What does 8085 do?" within 5 seconds | 5-second flash test with 3 unbiased testers | ⬜ PASS / ⬜ FAIL | Expected answer: "Automates repeatable work" |
| H2 | A first-time visitor can answer "Who is it for?" within 5 seconds | 5-second flash test | ⬜ PASS / ⬜ FAIL | Expected answer: "My team / business" |
| H3 | A first-time visitor can answer "What business outcome will I get?" within 5 seconds | 5-second flash test | ⬜ PASS / ⬜ FAIL | Expected answer: "Grow output without headcount" |
| H4 | Headline is ≤ 12 words | Automated word count | ⬜ PASS / ⬜ FAIL | Current: 11 words |
| H5 | Subheadline is ≤ 25 words | Automated word count | ⬜ PASS / ⬜ FAIL | Current: 18 words |
| H6 | No technical jargon ("AI", "workflows") in the headline | Manual copy review | ⬜ PASS / ⬜ FAIL | Confirmed removed |
| H7 | Hero contains exactly one H1 element | DOM inspection (`document.querySelectorAll('h1').length === 1`) | ⬜ PASS / ⬜ FAIL | See SEO section for duplicate legacy H1 guard |

**Acceptance Threshold:** All criteria H1–H7 must be PASS.

---

## 2. CTA Hierarchy

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| C1 | Exactly one primary CTA exists per surface (hero, header, contact, mobile dock) | Visual inspection + DOM query for `.landing-primary-button` / `.landing-founder-button` | ⬜ PASS / ⬜ FAIL | Label: "Book Strategy Call" |
| C2 | Secondary CTA uses `landing-secondary-button` (outlined, low-emphasis) | CSS class audit | ⬜ PASS / ⬜ FAIL | Label: "Talk to Agent Ada" |
| C3 | No tertiary CTA is rendered (`tertiaryActionLabel === null`) | Code review + DOM check | ⬜ PASS / ⬜ FAIL | Email CTA removed |
| C4 | Primary CTA color contrast meets WCAG AA (4.5:1) against background | Automated contrast checker | ⬜ PASS / ⬜ FAIL | `landing-founder-button` background `#c3642b` on white |
| C5 | Mobile hero displays only one CTA | Responsive viewport test (≤ 720 px) | ⬜ PASS / ⬜ FAIL | Single "Book Strategy Call" button |
| C6 | Header contains only the primary CTA | DOM inspection | ⬜ PASS / ⬜ FAIL | Secondary CTA removed from navbar actions |

**Acceptance Threshold:** All criteria C1–C6 must be PASS.

---

## 3. Mobile Experience

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| M1 | No horizontal overflow on viewports 320 px – 1440 px | Browser DevTools responsive check + physical device test | ⬜ PASS / ⬜ FAIL | `overflow-x: hidden` enforced on root |
| M2 | No content clipping at 320 px width | Visual inspection at minimum viewport | ⬜ PASS / ⬜ FAIL | Shell uses `minmax(0, 1fr)` and `clamp()` |
| M3 | All touch targets are ≥ 44×44 px | DevTools element inspector (box model) | ⬜ PASS / ⬜ FAIL | See `landing-page.css` mobile block |
| M4 | Primary buttons are ≥ 48 px height on mobile | CSS computed height check at ≤ 720 px | ⬜ PASS / ⬜ FAIL | `min-height: 48px` enforced |
| M5 | Mobile contact dock trigger is ≥ 48 px height | CSS computed height check | ⬜ PASS / ⬜ FAIL | `min-height: 48px` |
| M6 | No horizontal scroll bar appears on iOS Safari or Android Chrome | Physical device test | ⬜ PASS / ⬜ FAIL | Pending manual verification |
| M7 | Text remains readable without zoom (16 px base minimum) | CSS computed font-size check | ⬜ PASS / ⬜ FAIL | Base font size 1.05 rem (~16.8 px) |

**Acceptance Threshold:** All criteria M1–M7 must be PASS.

---

## 4. SEO Foundation

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| S1 | Single H1 on active render tree | `document.querySelectorAll('h1').length === 1` | ⬜ PASS / ⬜ FAIL | Legacy `Contact.jsx` H1 is orphaned but not rendered |
| S2 | Title tag is 50–60 characters | Character count | ⬜ PASS / ⬜ FAIL | Current: 54 characters |
| S3 | Meta description is 150–160 characters | Character count | ⬜ PASS / ⬜ FAIL | Current: 156 characters |
| S4 | No `<meta name="keywords">` tag present | DOM / source inspection | ⬜ PASS / ⬜ FAIL | Removed in Phase 9 |
| S5 | Canonical URL is absolute and uses HTTPS | Source inspection | ⬜ PASS / ⬜ FAIL | `https://8085.ai` |
| S6 | Robots meta is `index, follow` | Source inspection | ⬜ PASS / ⬜ FAIL | Confirmed |
| S7 | Structured data contains no fabricated `Review` or `AggregateRating` | JSON-LD source audit | ⬜ PASS / ⬜ FAIL | Removed in Phase 9 |
| S8 | `WebSite` schema with `SearchAction` is present | JSON-LD source audit | ⬜ PASS / ⬜ FAIL | Added in Phase 9 |
| S9 | Open Graph and Twitter Card tags are present and valid | Facebook Sharing Debugger + Twitter Card Validator | ⬜ PASS / ⬜ FAIL | Pending manual verification |
| S10 | Favicon and apple-touch-icon links are present | Source inspection | ⬜ PASS / ⬜ FAIL | Added in Phase 9 |

**Acceptance Threshold:** All criteria S1–S10 must be PASS.

---

## 5. Accessibility

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| A1 | All interactive elements are keyboard reachable | Tab-through test | ⬜ PASS / ⬜ FAIL | Skip link, nav, buttons, CTAs |
| A2 | Focus states are visible on all buttons and links | Keyboard tab-through + visual inspection | ⬜ PASS / ⬜ FAIL | `outline: 2px solid rgba(22, 115, 106, 0.42)` |
| A3 | Skip link is present and functional | Keyboard test (Tab on page load) | ⬜ PASS / ⬜ FAIL | `.landing-skip-link` |
| A4 | `prefers-reduced-motion: reduce` disables animations | OS-level reduced motion on + visual check | ⬜ PASS / ⬜ FAIL | Already implemented comprehensively |
| A5 | No auto-playing audio or video | Page load audit | ⬜ PASS / ⬜ FAIL | Voice Agent requires explicit user activation |
| A6 | ARIA labels or screen-reader text on decorative elements | Screen reader audit (NVDA / VoiceOver) | ⬜ PASS / ⬜ FAIL | Motion spine has `__sr-label` |
| A7 | Color contrast ≥ 4.5:1 for body text | Automated contrast checker | ⬜ PASS / ⬜ FAIL | `--color-ink-soft` on bg verified |
| A8 | Color contrast ≥ 3:1 for large text / UI components | Automated contrast checker | ⬜ PASS / ⬜ FAIL | Hero H1 and buttons |
| A9 | Images have descriptive `alt` text | DOM inspection of `<img>` tags | ⬜ PASS / ⬜ FAIL | Pending manual verification |
| A10 | Form inputs have associated labels | DOM inspection | ⬜ PASS / ⬜ FAIL | Calendly is external; Voice Agent overlay audited |

**Acceptance Threshold:** All criteria A1–A10 must be PASS.

---

## 6. Performance & Build

| ID | Criterion | Test Method | Result | Notes |
|----|-----------|-------------|--------|-------|
| P1 | `npm run build` completes with zero errors | CLI execution | ⬜ PASS / ⬜ FAIL | Verified: 2.46 s, no errors |
| P2 | `npm run dev` starts without critical warnings | CLI execution | ⬜ PASS / ⬜ FAIL | Vite 6.3.5 |
| P3 | No new runtime JavaScript errors in console | Browser console audit | ⬜ PASS / ⬜ FAIL | Pending manual verification |
| P4 | Bundle size does not increase relative to baseline | Build output comparison | ⬜ PASS / ⬜ FAIL | Baseline: 404.39 kB JS, 116.89 kB CSS |
| P5 | No new dependencies were added | `package.json` diff | ⬜ PASS / ⬜ FAIL | Zero new packages |
| P6 | Unused/orphaned components do not break build | Build + smoke test | ⬜ PASS / ⬜ FAIL | Legacy components are tree-shaken or not imported |
| P7 | Lighthouse Performance score ≥ 90 | Lighthouse audit (deployed URL) | ⬜ PASS / ⬜ FAIL | Pending deployment |
| P8 | Lighthouse Accessibility score ≥ 95 | Lighthouse audit (deployed URL) | ⬜ PASS / ⬜ FAIL | Pending deployment |
| P9 | Lighthouse Best Practices score ≥ 95 | Lighthouse audit (deployed URL) | ⬜ PASS / ⬜ FAIL | Pending deployment |
| P10 | Lighthouse SEO score ≥ 95 | Lighthouse audit (deployed URL) | ⬜ PASS / ⬜ FAIL | Pending deployment |

**Acceptance Threshold:** All criteria P1–P6 must be PASS. P7–P10 are deployment-gated targets.

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Product Owner | | | |
| Engineering Lead | | | |

