# 8085.ai Website - Repository Audit

**Audit Date:** 2026-06-19
**Project:** 8085-website (React + Vite)
**Repository Path:** `C:\Users\Efy\8085-website`

---

## 1. Project Structure Overview

```
8085-website/
├── index.html                          # Single-page entry with extensive SEO meta
├── package.json                        # NPM manifest
├── vite.config.js                      # Vite build configuration
├── tailwind.config.js                  # Tailwind CSS theme
├── postcss.config.js                   # PostCSS pipeline
├── netlify.toml                        # Netlify deployment & security headers
├── security-headers.toml               # Security header reference
├── .env                                # Environment variables (mixed dev/prod)
├── src/
│   ├── main.jsx                        # React root renderer
│   ├── App.jsx                         # Root app component
│   ├── test/setup.js                   # Vitest test setup
│   ├── styles/                         # 15 CSS files (page/section/component scoped)
│   ├── lib/                            # Core logic & utilities
│   │   ├── config.jsx                  # React Context for animation configuration
│   │   ├── useVoiceAgent.js            # ElevenLabs voice agent hook
│   │   ├── webhookService.js           # Webhook submission with retry logic
│   │   ├── elevenLabsProxy.js          # Secure API proxy client
│   │   ├── validation.js               # Server-side input validation
│   │   ├── sanitization.js             # XSS prevention & input sanitization
│   │   ├── logger.js                   # Conditional logging utility
│   │   ├── utils.js                    # General utilities
│   │   ├── animation/                  # Canvas animation engine
│   │   │   ├── renderer.js             # Main animation loop
│   │   │   ├── circuits.js             # Circuit path generation
│   │   │   ├── dots.js                 # Grid dot rendering
│   │   │   ├── things.js               # Particle movement
│   │   │   └── utils.js                # Animation helpers
│   │   └── errors/                     # Centralized error handling
│   │       ├── errorHandler.js         # Error classification & sanitization
│   │       ├── errorTypes.js           # Error type constants
│   │       └── errorMonitor.js         # Runtime error monitoring
│   ├── services/
│   │   └── captchaService.js           # Google reCAPTCHA v3 integration
│   └── components/
│       ├── ErrorBoundary.jsx           # React error boundary
│       ├── Header.jsx                  # Sticky header with dropdown nav
│       ├── VoiceAgentOverlay.jsx       # Full-screen voice agent UI
│       ├── SoundWaveAnimation.jsx      # GSAP sound wave bars
│       ├── CircuitCanvas.jsx           # Main circuit board canvas component
│       ├── ColorSettings.jsx           # Dev-only color config panel
│       ├── PrivacyPolicy.jsx           # Privacy policy page content
│       ├── ui/                         # shadcn/ui primitives (6 components)
│       ├── sections/                   # Legacy page sections (6 sections)
│       └── landing/                    # New landing page architecture (20+ components)
├── netlify/functions/                  # Serverless functions
│   ├── verify-captcha.js               # reCAPTCHA verification + rate limiting
│   ├── elevenlabs-proxy.js             # ElevenLabs API proxy + auth
│   └── secure-webhook-proxy.js         # Webhook forwarding + sanitization
└── public/
    ├── images/                         # 25 image assets (SVG, PNG, WebP, JPG)
    └── sounds/
        └── dialing-sound.mp3           # Voice agent dialing audio
```

---

## 2. Pages Inventory

The application is a **single-page application (SPA)** with hash-based routing for the privacy policy.

| Page | Component | Route | Description |
|------|-----------|-------|-------------|
| Landing Page | `LandingPage.jsx` | `/` (default) | Primary marketing page with 8 scroll-driven sections |
| Privacy Policy | `PrivacyPolicy.jsx` | `#privacy-policy` | GDPR-compliant privacy policy (hash route) |

**Note:** Legacy section components (`Hero`, `WhoWeAre`, `HowWeStart`, `PartnerCompanies`, `MeetTheFounders`, `Contact`) exist in `src/components/sections/` but appear to be **orphaned/unused** in the current `App.jsx` routing, which exclusively renders `LandingPage`.

---

## 3. Major Components Inventory

### 3.1 Root & Layout Components

| Component | File | Props | Description |
|-----------|------|-------|-------------|
| `App` | `App.jsx` | None | Root component. Manages `VoiceAgentOverlay` visibility and privacy policy hash routing. Wraps everything in `ConfigProvider` and `ErrorBoundary`. |
| `ErrorBoundary` | `ErrorBoundary.jsx` | `fallback`, `fallbackId` | Class-based error boundary using centralized `errorHandler`. Displays reload UI on crash. |
| `ConfigProvider` | `lib/config.jsx` | `children` | React Context providing animation configuration, color schemes, and localStorage persistence. |

### 3.2 Landing Page Components

| Component | File | Key Props | Description |
|-----------|------|-----------|-------------|
| `LandingPage` | `landing/LandingPage.jsx` | `onStartConversation` | Main landing page. Manages 8 motion sections, GSAP ScrollTrigger, reduced-motion preferences, and mobile viewport detection. |
| `LandingSection` | `landing/LandingPage.jsx` (inline) | `id`, `eyebrow`, `title`, `intro`, `tone`, `signalState` | Reusable section wrapper with ARIA attributes and CSS signal states. |
| `LandingMotionSpine` | `landing/LandingMotionSpine.jsx` | `motionRef`, `sections`, `activeSectionId`, `reducedMotion`, `isHidden` | Fixed sidebar with Ada avatar, typing narration animation, and section progress nodes. |
| `HeroShaderCanvas` | `landing/HeroShaderCanvas.jsx` | `hostRef`, `shaderId`, `options`, `reducedMotion` | WebGL-style 2D canvas particle shader with pointer interaction and palette extraction from CSS variables. |
| `LatticeSystemMap` | `landing/LatticeSystemMap.jsx` | `reducedMotion` | GSAP ScrollTrigger animated diagram of the 8085 Lattice workflow. |
| `LatticeNetworkCanvas` | `landing/LatticeNetworkCanvas.jsx` | `surface` | Static JSX diagram showing workflow lanes (routing, delegate, memory, approval). |
| `AgentHarnessStage` | `landing/AgentHarnessStage.jsx` | `reducedMotion` | Scroll-driven animation container for the Agent Harness workspace diagram. |
| `AgentHarnessWorkspace` | `landing/AgentHarnessWorkspace.jsx` | `surface` | (Not read - inferred) Diagram component for agent harness visualization. |
| `CapabilitySceneDeck` | `landing/CapabilitySceneDeck.jsx` | `reducedMotion` | Renders 5 capability scene cards in alternating layout. |
| `CapabilitySurfaceCard` | `landing/CapabilitySurfaceCard.jsx` | `scene`, `reversed` | Individual workflow example card with artifact visualization and CSS custom properties. |
| `TrustSurface` | `landing/TrustSurface.jsx` | `surface` | Ownership/trust section with bullet lists, badges, and control rails. |
| `DifferentiationSplitSurface` | `landing/DifferentiationSplitSurface.jsx` | `surface` | 3-column comparison (Chat AI vs Automation vs 8085). |
| `ContactCommandSurface` | `landing/ContactCommandSurface.jsx` | `surface`, `headingId`, `founderHref`, `onStartConversation`, `mailHref` | Contact CTA section with Ada console panel and action buttons. |
| `MobileContactDock` | `landing/MobileContactDock.jsx` | `surface`, `isVisible`, `isOpen`, `onOpen`, `onClose`, `founderHref`, `mailHref`, `onStartConversation`, `launcherLabel` | Bottom-sheet mobile contact UI with dialog accessibility. |
| `LandingSignalCurrent` | `landing/LandingSignalCurrent.jsx` | `pageRef`, `sections`, `activeSectionId`, `reducedMotion` | SVG signal line animation connecting sections (desktop only). |
| `ProofField` | `landing/ProofField.jsx` | `surface` | Results/proof section layout component. |

### 3.3 Voice Agent Components

| Component | File | Props | Description |
|-----------|------|-------|-------------|
| `VoiceAgentOverlay` | `VoiceAgentOverlay.jsx` | `isVisible`, `onClose` | Full-screen modal overlay. Manages GDPR consent, CAPTCHA verification, conversation lifecycle, webhook submission, and GSAP entrance/exit animations. |
| `SoundWaveAnimation` | `SoundWaveAnimation.jsx` | `isActive`, `className` | 20-bar sound wave visualization using GSAP timelines with dynamic intensity. |

### 3.4 Legacy Section Components (Potentially Unused)

| Component | File | Description |
|-----------|------|-------------|
| `Header` | `Header.jsx` | Sticky header with hamburger dropdown, animated logo resize on scroll, and "Let's Talk" ripple button. |
| `Hero` | `sections/Hero.jsx` | Hero with circuit canvas background, vertical market cycling, and scroll-driven text animations. |
| `WhoWeAre` | `sections/WhoWeAre.jsx` | IntersectionObserver fade-in cards for expertise, solutions, and 80-85 principle. |
| `HowWeStart` | `sections/HowWeStart.jsx` | 4-step workflow grid with colored cards. |
| `PartnerCompanies` | `sections/PartnerCompanies.jsx` | Infinite-scroll partner logo strip. |
| `MeetTheFounders` | `sections/MeetTheFounders.jsx` | Founder profiles with quotes and LinkedIn links. |
| `Contact` | `sections/Contact.jsx` | Ada avatar, conversation CTA, email link, social strip. |
| `CircuitCanvas` | `CircuitCanvas.jsx` | Interactive circuit board canvas with dev-only control panel. |

### 3.5 UI Primitives (shadcn/ui)

| Component | File | Source |
|-----------|------|--------|
| `Button` | `ui/button.jsx` | shadcn/ui |
| `Card` / `CardContent` | `ui/card.jsx` | shadcn/ui |
| `Slider` | `ui/slider.jsx` | shadcn/ui (Radix) |
| `Select` / `SelectContent` / `SelectItem` / `SelectTrigger` / `SelectValue` | `ui/select.jsx` | shadcn/ui (Radix) |
| `Switch` | `ui/switch.jsx` | shadcn/ui (Radix) |
| `Label` | `ui/label.jsx` | shadcn/ui (Radix) |

---

## 4. Animation Systems Inventory

### 4.1 GSAP Animation Systems

| System | Location | Library | Description |
|--------|----------|---------|-------------|
| **Hero Entrance Timeline** | `LandingPage.jsx` | GSAP + ScrollTrigger | Staggered fade/slide for eyebrow, title, intro, pills, and actions. Respects `prefers-reduced-motion`. |
| **Hero Pointer Tilt** | `LandingPage.jsx` | CSS vars via JS | `--hero-pointer-x/y` and `--hero-tilt-x/y` updated on `pointermove`. Disabled for reduced motion. |
| **Section ScrollTrigger** | `LandingPage.jsx` | GSAP ScrollTrigger | `matchMedia('(min-width: 1100px)')` pinned hero, section progress tracking, and active section state. Uses custom scroller (`#root`). |
| **Lattice Entrance** | `LatticeSystemMap.jsx` | GSAP ScrollTrigger | `scale`, `clipPath`, and `translate` entrance animation on desktop. |
| **Agent Harness Entrance** | `AgentHarnessStage.jsx` | GSAP ScrollTrigger | Similar entrance animation for harness workspace. |
| **Avatar Glow Pulse** | `VoiceAgentOverlay.jsx` | GSAP | Scale/opacity pulse on `.avatar-glow` when `isSpeaking` is true. |
| **Status Text Animation** | `VoiceAgentOverlay.jsx` | GSAP | Fade/slide on status text changes. |
| **Data Collection Animation** | `VoiceAgentOverlay.jsx` | GSAP | Scale/shadow pulse on info container when new data arrives; staggered entrance for new data items. |
| **Overlay Entrance/Exit** | `VoiceAgentOverlay.jsx` | GSAP | Scale/fade entrance with backdrop blur; scale/fade exit. |
| **Header Logo Resize** | `Header.jsx` | Native scroll listener | Responsive font-size interpolation (12rem -> 5rem desktop, 10rem -> 4rem tablet, 4rem -> 3rem mobile) based on scroll position. |
| **Button Ripple** | `Header.jsx` | GSAP | Dynamic DOM ripple elements with scale animation on hover/press. |
| **Hero Scroll Transform** | `Hero.jsx` | Native scroll + GSAP | Manual scroll listener translating heading and scaling subheading font-size/weight. |
| **Vertical Morph** | `Hero.jsx` | GSAP Timeline | Scale/opacity morph between vertical market text every 4 seconds. |
| **Sound Wave Bars** | `SoundWaveAnimation.jsx` | GSAP Timeline | 20-bar random scale animation with color variation and intensity modulation. |

### 4.2 Canvas/WebGL Animation Systems

| System | Component | Technology | Description |
|--------|-----------|------------|-------------|
| **Phase Transition Shader** | `HeroShaderCanvas` | 2D Canvas API | 2,500-5,000 particle lattice with FBM noise, spring physics, wave transition, pointer interaction, glow sprites, and vignette. Configurable density, wave speed, FPS. |
| **Circuit Board Animation** | `CircuitCanvas` | 2D Canvas API | Grid-based circuit generation with dots, moving particles, mouse interaction radius, circuit connections, and particle transitions. Uses spatial indexing for performance. Dev-only control panel. |
| **Lattice Network** | `LatticeNetworkCanvas` | Static JSX | Semantic diagram of workflow lanes using CSS layout (no canvas). |

### 4.3 CSS Animation Systems

| System | Location | Description |
|--------|----------|-------------|
| **Trust Strip** | `landing-page.css` (inferred) | Infinite horizontal scroll of partner logos. |
| **IntersectionObserver Fades** | `WhoWeAre.jsx` | `fadeIn` class added on intersection. |
| **Signal Current SVG** | `LandingSignalCurrent.jsx` | CSS-variable-driven SVG polyline states (past/active/upcoming). |
| **Motion Spine Typing** | `LandingMotionSpine.jsx` | `setTimeout`-based character typing with configurable step delay. |
| **Mobile Contact Dock** | `MobileContactDock.jsx` | CSS transitions for sheet open/close. |

---

## 5. Integration Inventory

### 5.1 ElevenLabs Voice Agent

| Aspect | Details |
|--------|---------|
| **Library** | `@11labs/react` (v0.1.4) |
| **Hook** | `useVoiceAgent.js` |
| **Agent ID** | `agent_01jvd0y127fg8t4r5` (hardcoded in `VoiceAgentOverlay.jsx`) |
| **Client Tools** | 6 tools: `collect_name`, `collect_email`, `collect_query`, `collect_company`, `collect_employee_count`, `collect_conversation_id` |
| **Features** | Auto-retry (3x), dialing sound (`/sounds/dialing-sound.mp3`), microphone permission handling, conversation duration tracking, volume control |
| **Proxy** | `elevenLabsProxy.js` -> `/.netlify/functions/elevenlabs-proxy` |
| **Security** | API key stored server-side; client uses scoped WebSocket key (`VITE_ELEVENLABS_WEBSOCKET_KEY`) |

### 5.2 reCAPTCHA v3

| Aspect | Details |
|--------|---------|
| **Service** | `captchaService.js` (singleton) |
| **Version** | Google reCAPTCHA v3 (invisible) |
| **Site Key** | `VITE_RECAPTCHA_SITE_KEY` |
| **Verification** | `/.netlify/functions/verify-captcha` |
| **Rate Limiting** | 5 conversations/hour per IP (in-memory Map) |
| **Action** | `voice_agent_start` |
| **Threshold** | Score >= 0.5 = allowed; 0.1-0.5 = challenge required |

### 5.3 Webhook Integration

| Aspect | Details |
|--------|---------|
| **Service** | `webhookService.js` |
| **Proxy** | `/.netlify/functions/secure-webhook-proxy` |
| **Target** | n8n workflow (`WEBHOOK_URL` env var) |
| **Auth** | Bearer token (`VITE_PROXY_AUTH_TOKEN`) + Basic Auth (webhook username/password) |
| **Features** | Retry logic (3 attempts), 10s timeout, email-only mode for premature endings, `navigator.sendBeacon` for page unload, data completeness metrics |
| **Payload** | `clientData` + `metadata` + `quality` objects |

### 5.4 Analytics / Monitoring

| Aspect | Details |
|--------|---------|
| **Error Monitoring** | `errorMonitor.js` (imported in `main.jsx`) |
| **Error Handler** | Centralized classification, sanitization, tracking, and user-friendly messages |
| **Logging** | Conditional dev-only logging (`logger.js`) |
| **No External Analytics** | No Google Analytics, Plausible, Mixpanel, or similar detected |

---

## 6. Build System Audit

### 6.1 Vite Configuration

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: './src/test/setup.js',
  },
})
```

**Observations:**
- No build optimization settings (chunking, minification left to defaults)
- No `build.rollupOptions.output.manualChunks` for code splitting
- No asset optimization configuration
- Vitest integrated for testing

### 6.2 Dependencies

**Production (15 deps):**
- `@11labs/react` ^0.1.4 - Voice agent SDK
- `@radix-ui/react-*` ^1.0.2-2.0.0 - Headless UI primitives (4 packages)
- `@types/dompurify` ^3.2.0 - DOMPurify types
- `class-variance-authority` ^0.7.0 - Component variant utility
- `clsx` ^2.0.0 - Conditional class names
- `dompurify` ^3.2.6 - XSS sanitization
- `gsap` ^3.13.0 - Animation library (paid license may be required for commercial use)
- `lucide-react` ^0.292.0 - Icon library
- `react` ^18.2.0 / `react-dom` ^18.2.0
- `tailwind-merge` ^2.0.0 - Tailwind class deduplication

**Development (17 deps):**
- `@testing-library/jest-dom` ^6.6.3 / `@testing-library/react` ^16.3.0
- `@types/react` / `@types/react-dom`
- `@vitejs/plugin-react` ^4.2.0
- `autoprefixer` ^10.4.16 / `postcss` ^8.4.31 / `tailwindcss` ^3.3.5
- `eslint` ^8.53.0 + react plugins
- `jsdom` ^26.1.0 / `vitest` ^2.1.3
- `playwright` ^1.52.0 (E2E testing framework - no tests found)

### 6.3 NPM Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

**Observations:**
- No pre-commit hooks or CI configuration detected
- No TypeScript compiler check script
- No build analysis script (`vite-bundle-visualizer` not present)
- Playwright installed but no E2E test scripts configured

---

## 7. Security Audit

### 7.1 Environment Variables

| Variable | Location | Risk Level | Notes |
|----------|----------|------------|-------|
| `VITE_VOICE_AGENT_ID` | `.env` | Low | Agent ID is not sensitive |
| `VITE_ELEVENLABS_WEBSOCKET_KEY` | `.env` | **Medium** | Scoped WebSocket key committed to repo |
| `VITE_PROXY_AUTH_TOKEN` | `.env` | **High** | `dev-token-replace-in-production` placeholder - if deployed with this value, proxy is unprotected |
| `VITE_RECAPTCHA_SITE_KEY` | `.env` | Low | Site key is public by design |
| `ELEVENLABS_API_KEY` | Netlify env | Low | Properly server-side |
| `RECAPTCHA_SECRET_KEY` | Netlify env | Low | Properly server-side |
| `PROXY_AUTH_TOKEN` | Netlify env | Low | Properly server-side |
| `WEBHOOK_URL` / `WEBHOOK_USERNAME` / `WEBHOOK_PASSWORD` | Netlify env | Low | Properly server-side |

**Critical Finding:** `.env` file is **committed to the repository** and contains `VITE_ELEVENLABS_WEBSOCKET_KEY`. While this is a scoped key, it should be rotated and moved to Netlify environment variables. The `VITE_PROXY_AUTH_TOKEN` uses a dev placeholder that could be accidentally deployed.

### 7.2 Security Headers (Netlify)

Configured in `netlify.toml` with excellent coverage:

| Header | Value | Status |
|--------|-------|--------|
| HSTS | `max-age=31536000; includeSubDomains; preload` | Good |
| X-XSS-Protection | `1; mode=block` | Good (legacy browsers) |
| X-Content-Type-Options | `nosniff` | Good |
| X-Frame-Options | `DENY` | Good |
| CSP | Extensive policy covering scripts, styles, fonts, images, connect, frame | Good but needs review for `unsafe-inline`/`unsafe-eval` |
| Referrer-Policy | `strict-origin-when-cross-origin` | Good |
| Permissions-Policy | Restrictive camera/mic/geolocation | Good |
| Expect-CT | `max-age=86400, enforce` | Good |
| COOP | `same-origin` | Good |
| COEP | `require-corp` | **Potential Issue** - May block cross-origin images/fonts if CORP headers not present on external resources |
| CORP | `same-origin` | Good |

**CSP Concerns:**
- `script-src` includes `'unsafe-inline'` and `'unsafe-eval'` - necessary for some libraries but widens attack surface
- `style-src` includes `'unsafe-inline'` - required for GSAP and inline styles
- `connect-src` allows `wss://*.elevenlabs.io` - correct for voice agent

### 7.3 Input Sanitization

| Layer | Implementation | Status |
|-------|---------------|--------|
| Client-side sanitization | `sanitization.js` using DOMPurify | Good |
| Server-side validation | `validation.js` with length/format checks | Good |
| Webhook payload sanitization | `secure-webhook-proxy.js` substring limits | Good |
| Error message sanitization | `errorHandler.js` strips API keys/tokens | Good |

### 7.4 Rate Limiting

| Endpoint | Limit | Storage |
|----------|-------|---------|
| CAPTCHA verification | 5 requests/hour per IP | In-memory Map |
| ElevenLabs proxy | 100 requests/minute per IP | In-memory Map |
| Webhook proxy | 10 requests/minute per IP | In-memory Map |

**Concern:** All rate limiting uses in-memory Maps. On Netlify's serverless infrastructure, functions may run on different instances, making rate limits ineffective under distributed attack.

### 7.5 Authentication

- **ElevenLabs Proxy:** Bearer token auth with `crypto.timingSafeEqual` (constant-time comparison) - Good
- **Webhook Proxy:** Bearer token + Basic Auth - Good
- **Client-to-Proxy:** Bearer token via `VITE_PROXY_AUTH_TOKEN` - **Weak if using default dev token**

---

## 8. Findings Summary

### Strengths
1. Comprehensive accessibility implementation (ARIA labels, live regions, skip links, reduced motion support)
2. Strong security header configuration
3. Centralized error handling with PII sanitization
4. Multi-layered input validation (client + server)
5. GDPR consent flow in voice agent
6. `prefers-reduced-motion` respected across all animation systems
7. Semantic HTML structure throughout landing page

### Weaknesses
1. `.env` file committed with sensitive keys
2. Legacy section components appear orphaned (unused in current routing)
3. No code splitting configured in Vite
4. No external analytics integration
5. Rate limiting is instance-local (ineffective on serverless)
6. GSAP commercial license may be required (not verified)
7. No service worker or offline capability
8. Playwright installed but unused
9. `COEP: require-corp` may cause issues with Google Fonts/images without proper CORP headers
