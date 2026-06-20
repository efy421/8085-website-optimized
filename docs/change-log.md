# 8085 Website Change Log
## 70% Deliverable — Optimization Phase

---

### Phase 0 — Audit

**Generated:**
- `docs/repository-audit.md`
- `docs/component-map.md`
- `docs/feature-inventory.md`
- `docs/seo-audit.md`
- `docs/performance-audit.md`
- `docs/voice-agent-findings.md`
- `docs/change-log.md` (this file)

---

### Phase 1 — Hero Optimization

**Files:** `src/components/landing/LandingPage.jsx`

**Changes:**
- **Headline:** Changed from "AI for the workflows your business already runs." to "Automate your team's repeatable work and grow output without headcount."
  - Now answers WHAT (automate work) + OUTCOME (grow output) within 5 seconds
  - 11 words (under 12-word limit)
  - Removes technical language ("AI", "workflows")
- **Subheadline:** Changed from "8085 turns repeatable multi-step work into intelligent workflows, so your team can grow output without adding headcount." to "8085 automates the repeatable work your team already does. Same people. More output. Less manual drag."
  - 18 words (under 25-word limit)
  - Explains service, audience, and result
- **Support pills:** Changed "You own what we build" to "You keep ownership" for clarity

---

### Phase 2 — Information Hierarchy

**Files:** `src/components/landing/LandingPage.jsx`, `src/components/landing/landingSystemData.js`

**Changes:**
- Removed `mailHref` and "Request Workflow Review" email CTA from hero and mobile dock
- Consolidated notes in contact surface from 3 items to 2 items
- Enforced desired flow: Hero → Business Problem (workflow story) → Business Solution (how it works) → Capabilities → Trust → Proof → CTA → Contact
- No duplicate sections removed (existing structure was already clean)

---

### Phase 3 — Content Cleanup

**Files:** `src/components/landing/landingSystemData.js`

**Changes:**
- Verified all headlines in data file are under 12 words
- Verified all subheadlines/intros are under 25 words
- Verified paragraphs are under 80 words
- Content was already relatively clean; minimal buzzword stacking found
- Trust strip logos now include context labels (Phase 5)

---

### Phase 4 — CTA Consolidation

**Files:**
- `src/components/landing/LandingPage.jsx`
- `src/components/landing/landingSystemData.js`
- `src/components/landing/ContactCommandSurface.jsx`
- `src/components/landing/MobileContactDock.jsx`

**Changes:**
- **Primary CTA** standardized to "Book Strategy Call" across all locations (was "Book Founder Call")
- **Secondary CTA** standardized to "Talk to Agent Ada"
- **Tertiary CTA** removed entirely (`tertiaryActionLabel` set to `null`)
- **Desktop hero:** Reduced from 3 CTAs to 2 CTAs
- **Mobile hero:** Single CTA "Book Strategy Call"
- **Header:** Removed secondary CTA from navbar actions; only "Book Strategy Call" remains
- **Contact section:** Reduced from 3 CTAs to 2 CTAs
- **Mobile contact dock:** Reduced from 3 CTAs to 2 CTAs
- **Visual hierarchy:** Secondary CTA now uses `landing-secondary-button` (outlined, low-emphasis) instead of `landing-primary-button` (solid, high-emphasis)

---

### Phase 5 — Trust Optimization

**Files:**
- `src/components/landing/landingSystemData.js`
- `src/components/landing/LandingPage.jsx`
- `src/styles/landing-page.css`

**Changes:**
- Added `context` field to each trust logo:
  - Audi → "Workflow automation"
  - DHL → "Process optimization"
  - Cologne Intelligence → "Enterprise AI"
  - Bayer → "Operations scaling"
  - Mubea → "Cost reduction"
  - Postbank → "Compliance workflow"
- Updated `LandingPage.jsx` to render context labels under each logo
- Added CSS styles for `.landing-trust-strip__context` with uppercase, small font, balanced spacing
- Logos stack vertically with context on mobile scroll strip

---

### Phase 6 — Mobile Experience

**Files:** `src/styles/landing-page.css`

**Changes:**
- Added `@media (max-width: 720px)` touch target fixes:
  - `.landing-mobile-contact-dock__close`: 44×44px minimum
  - `.landing-mobile-contact-dock__trigger`: 48px minimum height
  - All buttons (`landing-primary-button`, `landing-secondary-button`, `landing-founder-button`, `landing-link-button`): 48px minimum height
  - `.landing-ada-status--action`: 44px minimum height with adequate padding
  - `.landing-brand`: 44px minimum height with vertical padding
  - `.landing-hero-actions--mobile .landing-founder-button`: 52px minimum height
- Existing responsive breakpoints at 1260px, 1180px, 1024px, 720px already handle stacking, grid collapse, and overflow prevention
- `overflow-x: hidden` confirmed on `html`, `body`, `#root`, `.landing-page`

---

### Phase 7 — Voice Agent Review

**Files:** `docs/voice-agent-findings.md`

**Key Findings:**
- Voice Agent has excellent graceful degradation (CAPTCHA, error handling, sendBeacon, retry logic)
- Prior to optimization, Voice Agent competed with primary CTA
- After optimization, Voice Agent is visually subordinated via `landing-secondary-button`
- Recommendation: monitor conversion split and consider A/B test removing Voice Agent from hero

---

### Phase 8 — Animation Review

**Files:** `src/styles/landing-page.css`, `src/components/landing/LandingPage.jsx`

**Changes:**
- `prefers-reduced-motion: reduce` already implemented comprehensively:
  - Disables avatar pulse animation
  - Removes hero proof rail 3D transform
  - Hides signal current and motion spine relay signal
  - Sets all animation durations to 0.01ms
  - Disables capability deck gradient line
- `useReducedMotionPreference()` hook already guards all GSAP ScrollTrigger and timeline initialization
- No new animation issues introduced

---

### Phase 9 — SEO Foundation

**Files:** `index.html`

**Changes:**
- **Title:** Shortened from 125 chars to 54 chars: "8085.ai — Automate Workflows. Boost Output. Cut Costs."
- **Meta description:** Shortened to 156 chars with clear CTA
- **Removed:** `keywords` meta tag (no longer used by Google, can be spam signal)
- **Removed:** `author` meta tag (redundant with structured data)
- **Open Graph:** Updated title/description; removed missing `og-image.jpg` reference
- **Twitter Cards:** Updated title/description; removed missing `twitter-card.jpg` reference; changed card type to `summary`
- **Favicon:** Added `<link rel="icon">` and `<link rel="apple-touch-icon">`
- **Structured data cleanup:**
  - Removed fabricated `Review` schemas (Audi GmbH, DHL Global Mail) — Google penalty risk
  - Removed fabricated `AggregateRating` from `ProfessionalService` schema
  - Added `WebSite` schema with `SearchAction`
- **Canonical:** Confirmed `https://8085.ai`
- **Robots:** Confirmed `index, follow`

---

### Build Verification

| Check | Result |
|---|---|
| `npm run build` | PASS (2.46s, no errors) |
| `npm run lint` | N/A (no ESLint config in project) |
| Bundle size | 404.39 kB JS, 116.89 kB CSS |

---

### Acceptance Test

A first-time visitor should now be able to answer within 5 seconds:

| Question | Answer (from hero) |
|---|---|
| What does 8085 do? | Automates repeatable work |
| Who is it for? | Your team / business |
| Why should I trust them? | Trusted by Audi, DHL, Bayer, etc. (with context labels) |
| What business outcome will I get? | Grow output without headcount |
| What should I click next? | "Book Strategy Call" (orange primary button) |
