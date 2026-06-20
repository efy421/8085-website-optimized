# 8085.ai - Feature Inventory

**Audit Date:** 2026-06-19

---

## 1. Voice Agent Features

### 1.1 Core Voice Interaction

| Feature | Implementation | Details |
|---------|---------------|---------|
| AI Voice Assistant | `@11labs/react` `useConversation` | "Ada" - ElevenLabs Conversational AI agent |
| Real-time Speech | WebSocket streaming | Bidirectional audio via ElevenLabs API |
| Auto-retry Connection | `useVoiceAgent.js` | 3 retry attempts with 3-second backoff for transient errors |
| Dialing Sound | `/sounds/dialing-sound.mp3` | Looping audio while connecting |
| Microphone Permission | `navigator.mediaDevices.getUserMedia` | Graceful handling of denied/missing mic |
| Volume Control | `conversation.setVolume()` | 0-1 range clamped |
| Speaking Indicator | `SoundWaveAnimation` + status text | 20-bar GSAP animated wave + emoji status |
| Connection Status | `conversation.status` | Displayed in overlay UI |

### 1.2 Data Collection

| Feature | Client Tool | Validation |
|---------|-------------|------------|
| Name Collection | `collect_name` | `sanitizeName` - letters, spaces, hyphens, apostrophes |
| Email Collection | `collect_email` | `sanitizeEmail` - regex validation, lowercase |
| Company Collection | `collect_company` | `sanitizeCompany` - alphanumeric + common business chars |
| Query Collection | `collect_query` | `sanitizeQuery` - DOMPurify + script stripping |
| Employee Count | `collect_employee_count` | `sanitizeEmployeeCount` - integer 1-1000 |
| Conversation ID | `collect_conversation_id` | Auto-generated fallback if API doesn't provide |

### 1.3 GDPR & Privacy

| Feature | Implementation |
|---------|---------------|
| Explicit Consent | Checkbox-style "I Agree & Continue" before conversation |
| Consent Timestamp | ISO 8601 timestamp recorded |
| Privacy Policy Details | Expandable in-overlay privacy details with data purpose, storage, rights |
| Data Retention Disclosure | Up to 24 months stated |
| Right to Access/Delete | Documented with contact email `privacy@8085.ai` |
| Privacy Policy Page | Dedicated `#privacy-policy` hash route |
| Browser Unload Protection | `beforeunload` handler with `sendBeacon` for data preservation |

### 1.4 Security & Anti-Abuse

| Feature | Implementation |
|---------|---------------|
| reCAPTCHA v3 | Invisible verification before conversation start |
| Rate Limiting | 5 conversations/hour per IP |
| Challenge Mode | Score 0.1-0.5 triggers challenge requirement |
| Deny Mode | Score < 0.1 blocks access |

### 1.5 Webhook & CRM Integration

| Feature | Implementation |
|---------|---------------|
| Auto-submission on Complete | Conversation end triggers webhook automatically |
| Partial Submission | Premature close with email still submits email-only payload |
| Retry Logic | 3 attempts with exponential backoff |
| SendBeacon Fallback | `navigator.sendBeacon` for page unload scenarios |
| Data Completeness Tracking | Progress bar (5 fields) in overlay UI |
| Conversation Metadata | Duration, end reason, state included in payload |

---

## 2. Animation Features

### 2.1 Scroll-Driven Animations

| Feature | Tech | Description |
|---------|------|-------------|
| Section Progress Tracking | GSAP ScrollTrigger | Global scroll progress mapped to CSS custom properties |
| Hero Pinning | GSAP ScrollTrigger | Hero section pinned for ~320px on desktop |
| Section Activation | GSAP ScrollTrigger | `onEnter`/`onEnterBack` sets active section ID |
| Lattice Entrance | GSAP ScrollTrigger | Scale + clipPath reveal on scroll |
| Agent Harness Entrance | GSAP ScrollTrigger | Similar reveal animation |
| Signal Current SVG | GSAP ScrollTrigger + native | Dynamic SVG polyline connecting sections |

### 2.2 Hero Shader

| Feature | Tech | Description |
|---------|------|-------------|
| Phase Transition Shader | 2D Canvas API | 2,500-5,000 particle lattice |
| FBM Noise Turbulence | Custom noise sampler | 3-octave fractal Brownian motion |
| Spring Physics | Verlet integration | Particles attracted to home positions with damping |
| Pointer Interaction | Mouse/touch tracking | Pointer position influences wave center and blend |
| Wave Animation | Sine/cosine + noise | Oscillating wave divider with glow |
| Glow Sprites | Pre-rendered radial gradients | Ordered, chaotic, and wave glow variants |
| Reduced Motion Mode | Config flag | 58% particle density, 30% wave speed, 20% time delta |
| Adaptive FPS | `requestAnimationFrame` throttling | 90fps active, 30fps idle (configurable) |
| Intersection Observer Pause | Native API | Animation pauses when hero not visible |

### 2.3 Circuit Board Animation (Legacy)

| Feature | Tech | Description |
|---------|------|-------------|
| Grid-based Dots | 2D Canvas | Configurable spacing grid |
| Circuit Path Generation | Maze algorithm | Random walk circuits with min/max length |
| Moving Particles | Canvas API | Particles traverse circuit paths |
| Mouse Interaction | Event listeners | Radius-based circuit highlighting |
| Circuit Connections | Spatial indexing | Nearby circuits connect when mouse near |
| Particle Transitions | Path interpolation | Particles can jump between connected circuits |
| Dev Control Panel | shadcn/ui | Real-time parameter adjustment (dev mode only) |

### 2.4 UI Micro-animations

| Feature | Location | Tech |
|---------|----------|------|
| Typing Narration | `LandingMotionSpine` | `setTimeout` character stepping |
| Avatar Glow Pulse | `VoiceAgentOverlay` | GSAP scale/opacity/yoyo |
| Data Item Entrance | `VoiceAgentOverlay` | GSAP staggered fade/slide/back |
| Overlay Entrance | `VoiceAgentOverlay` | GSAP scale/fade/blur |
| Button Ripple | `Header` | Dynamic DOM + GSAP scale |
| Logo Resize | `Header` | Native scroll + CSS font-size |
| Sound Wave Bars | `SoundWaveAnimation` | GSAP random scale + color |
| Hero Text Slide | `Hero` | Native scroll + transform |
| Vertical Morph | `Hero` | GSAP timeline scale/opacity |
| Section Fade-in | `WhoWeAre` | IntersectionObserver + CSS |
| Trust Strip Scroll | `PartnerCompanies` | CSS infinite animation |

---

## 3. Contact / Form Features

### 3.1 Contact Methods

| Method | CTA | Destination |
|--------|-----|-------------|
| Book Founder Call | Button/Link | `https://calendly.com/f-shamim/client-call` (new tab) |
| Talk to Agent Ada | Button | Opens `VoiceAgentOverlay` |
| Request Workflow Review | Link | `mailto:ada@8085.ai?subject=8085%20Workflow%20Review` |
| Email Direct | Link | `mailto:ada@8085.ai` |
| LinkedIn | Icon | `https://linkedin.com/company/8085ai` |

### 3.2 Mobile Contact Experience

| Feature | Implementation |
|---------|---------------|
| Bottom Sheet | `MobileContactDock` - fixed bottom sheet on mobile |
| Accessible Dialog | `role="dialog"`, `aria-modal="true"`, focus trapping |
| Escape to Close | Keyboard handler |
| Focus Restoration | Returns focus to trigger element on close |
| Backdrop Click | Closes sheet on backdrop tap |

### 3.3 Form Handling (Voice Agent)

| Feature | Implementation |
|---------|---------------|
| Real-time Validation | Per-field sanitization on client tool call |
| Server-side Validation | `validation.js` - length, format, range checks |
| XSS Prevention | DOMPurify with `ALLOWED_TAGS: []` |
| Progressive Disclosure | Data appears as collected with animations |
| Completeness Indicator | 5-segment progress bar |
| Error Recovery | Try Again button on submission failure |

---

## 4. Trust / Proof Features

### 4.1 Social Proof

| Feature | Implementation |
|---------|---------------|
| Partner Logo Strip | 10 logos: Audi, DHL, Bayer, ABB, Postbank, Mubea, Cologne Intelligence, Pixum, Deutsche Post, ifb group |
| Infinite Scroll | CSS-duplicated strip for seamless loop |
| Trusted By Label | "Trusted by teams from" text |
| Client Reviews (Structured Data) | Audi GmbH and DHL Global Mail reviews in JSON-LD |
| Aggregate Rating | 4.9/5 from 127 reviews (schema.org) |

### 4.2 Results/Proof Section

| Feature | Content |
|---------|---------|
| 80% Less Manual Time | Quantified efficiency claim |
| Same Team, More Output | Headcount-neutral growth |
| 5x Efficiency Over Time | Compounding specialization benefit |
| Disclaimer | "Results depend on the workflow" |

### 4.3 Ownership & Trust

| Feature | Content |
|---------|---------|
| Built Around Your Process | Workflow customization promise |
| Your Team Stays in Control | Human oversight guarantee |
| Expand at Your Pace | Gradual adoption approach |
| Badges | "Your workflow", "Your logic", "Your data", "Your approvals" |
| Control Rails | Business logic, approvals, scoped access, expansion pace |

### 4.4 Founders

| Feature | Content |
|---------|---------|
| 3 Founder Profiles | Farhan (CTO), Sameer (COO), Essam (CMO) |
| Photos | Circular portrait images with colored borders |
| Quotes | Vision statements per founder |
| LinkedIn Links | Direct profile links with icons |
| Origin Story | "Three brothers solving problems in Lahore, Pakistan" |

---

## 5. SEO Features

### 5.1 Meta Tags

| Tag | Content |
|-----|---------|
| Title | "8085.ai - Business Process Automation \| 80% Performance Boost, 85% Cost Reduction \| Software Agencies, Fortune 500, Amazon PPC" |
| Description | Multi-vertical description with 80-85 principle |
| Keywords | 10 targeted keywords |
| Author | "8085.ai - Farhan Shamim, Sameer Shamim, Essam Shamim" |
| Robots | `index, follow` |
| Canonical | `https://8085.ai` |
| Theme Color | `#8B5CF6` |

### 5.2 Open Graph / Twitter Cards

| Platform | Coverage |
|----------|----------|
| Facebook/LinkedIn | `og:type`, `og:title`, `og:description`, `og:url`, `og:site_name`, `og:image` (1200x630), `og:locale` |
| Twitter/X | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, `twitter:creator` |

### 5.3 Structured Data (JSON-LD)

| Schema Type | Purpose |
|-------------|---------|
| `Organization` | Company info, founders, contact, sameAs |
| `ProfessionalService` | Service catalog with offers and aggregate rating |
| `LocalBusiness` | Address, geo, hours, payment, currencies |
| `Service` (x3) | Individual service pages: AI Consulting, Process Optimization, Digital Transformation |
| `Review` (x2) | Audi and DHL testimonials |

### 5.4 Technical SEO

| Feature | Implementation |
|---------|---------------|
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>` |
| ARIA Labels | Extensive `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live` |
| Skip Link | "Skip to content" link for keyboard users |
| Canonical URL | `<link rel="canonical" href="https://8085.ai">` |
| Preconnect | `fonts.googleapis.com`, `fonts.gstatic.com` |
| Language | `lang="en"` |

### 5.5 Content SEO

| Feature | Implementation |
|---------|---------------|
| Multi-vertical Targeting | Software agencies, Fortune 500, Amazon/PPC agencies |
| Keyword-rich Headings | H1-H2 structure with target terms |
| 80-85 Principle Branding | Repeated core value proposition |
| Location Signals | Lahore, Pakistan in structured data |

---

## 6. Mobile Features

### 6.1 Responsive Design

| Feature | Breakpoint | Implementation |
|---------|------------|----------------|
| Mobile Viewport Detection | 720px | `useMediaQuery('(max-width: 720px)')` |
| Desktop Viewport Detection | 1100px | GSAP `matchMedia('(min-width: 1100px)')` |
| Large Desktop | 1025px | GSAP `matchMedia('(min-width: 1025px)')` for diagrams |
| Hero Actions | 720px | Mobile shows single CTA vs desktop 3 CTAs |
| Header Actions | 720px | Hidden on mobile |
| Motion Spine | All | Hidden on hero; shown on other sections |

### 6.2 Mobile-Specific Components

| Feature | Component | Description |
|---------|-----------|-------------|
| Mobile Contact Dock | `MobileContactDock` | Fixed bottom trigger + bottom sheet |
| Touch Interaction | `HeroShaderCanvas` | `pointermove`/`pointerleave` events |
| Reduced Motion | `prefers-reduced-motion` | Respected globally |
| Font Scaling | `Header` | 4rem -> 3rem on mobile |

### 6.3 Performance for Mobile

| Feature | Implementation |
|---------|---------------|
| Lazy Loading Images | `loading="lazy"` on all images |
| Shader FPS Throttling | 30fps idle, 60fps active |
| Particle Density Scaling | Density * sqrt(area / 1920x1080) |
| Max Pixel Ratio | 1.0 (configurable) |
| Scroll Optimization | `passive: true` on scroll listeners |
| No Scrollbar | `::-webkit-scrollbar { display: none }` |

---

## 7. Accessibility Features

### 7.1 Keyboard Navigation

| Feature | Implementation |
|---------|---------------|
| Skip Link | `<a href="#landing-main">Skip to content</a>` |
| Escape to Close | `VoiceAgentOverlay`, `MobileContactDock` |
| Focus Trapping | `MobileContactDock` focuses close button on open |
| Focus Restoration | Returns to trigger on mobile dock close |
| Button Elements | All interactive elements use `<button>` or `<a>` |

### 7.2 Screen Reader Support

| Feature | Implementation |
|---------|---------------|
| ARIA Live Region | `aria-live="polite"` for narration updates |
| ARIA Current | `aria-current="location"` on active nav links |
| ARIA Current Step | `aria-current="step"` on active motion spine node |
| ARIA Modal | `aria-modal="true"` on overlays |
| ARIA Labels | All sections, lists, and interactive elements labeled |
| ARIA Hidden | Decorative elements hidden from AT |

### 7.3 Motion Preferences

| Feature | Implementation |
|---------|---------------|
| Reduced Motion Query | `matchMedia('(prefers-reduced-motion: reduce)')` |
| CSS Reduced Motion | `scroll-behavior: auto` in media query |
| Shader Reduced Motion | 58% density, 30% speed, 20% time delta |
| GSAP Disabled | All GSAP effects bypassed when reduced motion preferred |
| Signal Current Hidden | SVG signal lines not rendered |
| Typing Instant | Narration appears instantly instead of typing |

---

## 8. Developer Experience Features

| Feature | Implementation |
|---------|---------------|
| Dev Control Panel | `CircuitCanvas` shows controls only in `development` mode |
| Color Scheme Switcher | 5 preset themes + custom color editor |
| Animation Parameters | Real-time adjustment of dot spacing, circuit size, particle speed |
| Mouse Interaction Toggles | Radius, connection visualization, particle transitions |
| Debug Mode | Visualizes particle transitions with red dashed lines |
| Test Suite | Vitest with jsdom environment |
| ESLint | React + Hooks + Refresh plugins |
