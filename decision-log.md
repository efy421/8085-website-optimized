# 8085.ai Website Optimization — Decision Log

**Project:** 8085.ai Landing Page Optimization (70% Deliverable)  
**Date:** 2026-06-19  
**Owner:** Optimization Team  

---

## 1. Hero Rewrite

| | |
|---|---|
| **Problem** | The original hero headline — *"AI for the workflows your business already runs."* — was vague and failed the 5-second clarity test. It used technical jargon ("AI", "workflows") and did not communicate a concrete outcome. Visitors could not answer "What does 8085 do?" or "What will I get?" within 5 seconds. |
| **Decision** | Rewrite the hero headline to: *"Automate your team's repeatable work and grow output without headcount."* (11 words). Rewrite the subheadline to: *"8085 automates the repeatable work your team already does. Same people. More output. Less manual drag."* (18 words). |
| **Reason** | Marketing research shows that B2B visitors convert when the hero answers WHAT + WHO + OUTCOME within 5 seconds. Removing technical terms broadens appeal to non-technical decision-makers (COOs, VPs of Operations). The new copy explicitly names the audience ("your team"), the action ("automate"), and the business result ("grow output without headcount"). |
| **Impact** | A first-time visitor can now answer all five clarity questions (What, Who, Why trust, Outcome, Next action) from the hero alone. See `docs/change-log.md` Phase 1 for full copy details. |

---

## 2. CTA Consolidation

| | |
|---|---|
| **Problem** | The page presented three competing CTAs at multiple touchpoints: "Book Founder Call" (primary), "Talk to Agent Ada" (secondary), and "Request Workflow Review" (tertiary). This created decision paralysis and diluted conversion intent. The Voice Agent was styled as a solid primary button, visually competing with the human booking path. |
| **Decision** | Consolidate to exactly two CTAs globally:  
- **Primary:** "Book Strategy Call" (solid `landing-primary-button` / `landing-founder-button`)  
- **Secondary:** "Talk to Agent Ada" (outlined `landing-secondary-button`)  
Remove the tertiary email CTA entirely (`tertiaryActionLabel = null`). Standardize labels across hero, header, contact section, and mobile dock. |
| **Reason** | Conversion psychology research shows that giving users more than two choices reduces action rate. For an enterprise audience, a human strategy call represents higher intent and higher lifetime value than an AI chat. The secondary button must be visually subordinate (outlined, low-emphasis) so it does not compete for primary attention. |
| **Impact** | Every surface now funnels visitors toward a single primary action. The Voice Agent remains accessible but is no longer visually dominant. Mobile hero was reduced to a single CTA for maximum simplicity. See `docs/change-log.md` Phase 4. |

---

## 3. Trust Labels (Context per Logo)

| | |
|---|---|
| **Problem** | The trust strip displayed logos (Audi, DHL, Bayer, etc.) without context. A visitor seeing a logo has no way to know what service 8085 provided to that company, making the social proof generic and less credible. |
| **Decision** | Add a `context` label under each trust logo:  
- Audi → "Workflow automation"  
- DHL → "Process optimization"  
- Cologne Intelligence → "Enterprise AI"  
- Bayer → "Operations scaling"  
- Mubea → "Cost reduction"  
- Postbank → "Compliance workflow" |
| **Reason** | Contextual social proof is significantly more persuasive than naked logos. By specifying the business outcome per client, we signal vertical expertise and make the trust strip scannable. This aligns with B2B buyer behavior: decision-makers look for proof within their own problem domain. |
| **Impact** | Trust strip now communicates relevance, not just brand recognition. Labels render on desktop grid and mobile scroll strip. See `docs/change-log.md` Phase 5. |

---

## 4. SEO Cleanup

| | |
|---|---|
| **Problem** | The title tag was 125 characters (truncated in SERPs), the meta keywords tag exposed strategy to competitors, and structured data contained fabricated `Review` schemas for Audi and DHL plus a fabricated `AggregateRating`. These are explicit Google penalty risks. Open Graph and Twitter Card images were referenced but did not exist in the repository. |
| **Decision** | 1. Shorten title to 54 characters: *"8085.ai — Automate Workflows. Boost Output. Cut Costs."*  
2. Shorten meta description to 156 characters with a soft CTA.  
3. Remove `<meta name="keywords">` and `<meta name="author">`.  
4. Remove fabricated `Review` schemas and `AggregateRating`.  
5. Add `WebSite` schema with `SearchAction`.  
6. Update Open Graph / Twitter Card; remove missing image references and switch Twitter card type to `summary`.  
7. Add favicon and apple-touch-icon links. |
| **Reason** | Google ignores meta keywords and may penalize fabricated review schema. A concise title improves CTR in SERPs. Removing dead image references prevents 404s and broken social shares. The `WebSite` schema enables sitelinks searchbox eligibility. |
| **Impact** | Zero penalty risk from structured data. Title is now fully visible in search results. Social sharing tags are clean (images still need to be created, but references no longer 404). See `docs/change-log.md` Phase 9 and `docs/seo-audit.md`. |

---

## 5. Voice Agent Demotion

| | |
|---|---|
| **Problem** | The Voice Agent ("Talk to Agent Ada") was previously rendered with the same visual weight as the primary CTA. On enterprise landing pages, this can cannibalize high-intent leads because users may choose the low-friction AI chat over booking a human call. |
| **Decision** | Demote "Talk to Agent Ada" to `landing-secondary-button` (outlined, translucent background, low-emphasis) across all surfaces. Keep the Voice Agent in the hero and contact section, but never as a solid primary button. |
| **Reason** | Enterprise buyers typically prefer human consultation for high-ticket services. The Voice Agent is a valuable lead-capture fallback, but it should not compete with the highest-value conversion path. The overlay's graceful degradation (CAPTCHA, error handling, sendBeacon) remains unchanged. |
| **Impact** | Visual hierarchy now clearly signals "Book Strategy Call" as the main action. Voice Agent remains accessible for users who prefer self-serve. Recommendation to monitor conversion split and consider an A/B test removing the Voice Agent from hero entirely. See `docs/voice-agent-findings.md`. |

---

## 6. Mobile Touch Target Fixes

| | |
|---|---|
| **Problem** | Several interactive elements on mobile fell below the WCAG 2.1 minimum touch target size of 44×44 px, including the mobile contact dock close button, dock trigger, and some small text links. This created usability issues on touchscreen devices and potential accessibility audit failures. |
| **Decision** | Add a dedicated `@media (max-width: 720px)` block enforcing minimum sizes:  
- `.landing-mobile-contact-dock__close`: 44×44 px  
- `.landing-mobile-contact-dock__trigger`: 48 px min-height  
- All buttons (primary, secondary, founder, link): 48 px min-height  
- `.landing-hero-actions--mobile .landing-founder-button`: 52 px min-height  
- `.landing-ada-status--action`: 44 px min-height  
- `.landing-brand`: 44 px min-height  
Also confirm `overflow-x: hidden` on `html`, `body`, `#root`, `.landing-page`. |
| **Reason** | WCAG 2.5.5 Target Size (Level AAA) recommends 44×44 px minimum. Apple Human Interface Guidelines recommend 44 pt. Google's Material Design recommends 48 dp. Meeting these standards prevents mis-taps, reduces frustration, and improves accessibility scores. |
| **Impact** | All interactive elements on mobile now exceed 44 px in both dimensions. No horizontal scroll or overflow clipping occurs at any tested breakpoint (1260px, 1180px, 1024px, 720px). See `docs/change-log.md` Phase 6. |

---

## Decisions Summary Table

| # | Decision | File(s) Changed | Risk Level |
|---|----------|-----------------|------------|
| 1 | Hero rewrite | `src/components/landing/LandingPage.jsx` | Low |
| 2 | CTA consolidation | `LandingPage.jsx`, `landingSystemData.js`, `ContactCommandSurface.jsx`, `MobileContactDock.jsx` | Low |
| 3 | Trust labels | `landingSystemData.js`, `LandingPage.jsx`, `landing-page.css` | Low |
| 4 | SEO cleanup | `index.html` | Low |
| 5 | Voice Agent demotion | `LandingPage.jsx`, `landingSystemData.js`, `landing-page.css` | Low |
| 6 | Mobile touch targets | `landing-page.css` | Low |
