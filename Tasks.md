# 8085 Redesign Delivery Tasks

This file now tracks the **approved 2026 homepage redesign**.

As of **2026-04-19**, this plan supersedes the old circuit-animation, SEO, and prior homepage task backlog. The redesign is a fresh delivery track, so the old backlog is intentionally compressed into a short archive summary instead of being carried forward task-by-task.

## Source of Truth

- **Spec:** `docs/superpowers/specs/2026-04-19-8085-agent-harness-redesign-design.md`
- **Creative Direction:** Signal Lattice
- **Public System Name:** The 8085 Lattice
- **Voice Agent:** Ada

## Delivery Rules

1. Work one sprint at a time.
2. After each sprint, stop and present progress for review.
3. Do not begin the next sprint until the user explicitly approves the current sprint.
4. Update this file after each sprint review with:
   - status
   - completed work
   - open issues
   - next-step recommendation
5. The redesign uses **Agent Harness** language as the default public framing.

## Legacy Task Archive Summary

The previous `Tasks.md` contained a large mixed backlog for the older version of the website. That backlog is now aggressively summarized below.

### Reusable work already present
- React/Vite website foundation exists
- existing website deployment setup exists
- partner logo assets already exist in `public/images/`
- voice-agent infrastructure already exists
- ElevenLabs integration already exists
- webhook, captcha, consent, and security hardening already exist
- some GSAP usage already exists

### Work intentionally superseded by redesign
- old hero strategy
- old homepage section architecture
- long founder-focused homepage structure
- old visual design system
- old circuit-animation-first narrative
- old SEO/content expansion backlog tied to the prior positioning

### Practical implication
We are **reusing infrastructure and assets**, but **not** the old homepage direction.

## Sprint Tracking Board

| Sprint | Name | Status | Review Gate | Notes |
|---|---|---|---|---|
| S0 | Spec + task reset | Complete | Approved | Spec written and task plan reset for redesign |
| S1 | Narrative + design foundation | Complete | Approved | Messaging, copy skeleton, tokens, layout foundation implemented and approved |
| S2 | Hero + lattice core | Complete | Approved | Hero, 80/85 forms, shader-backed hero layer, Ada entry approved |
| S3 | Harness explainer + capability scenes | In Progress | Required before S4 | Lattice map, harness explainer, 4 scenes |
| S4 | Differentiation + trust layers | Not Started | Required before S5 | Comparison, security, ownership, proof |
| S5 | Motion integration + Ada experience | Not Started | Required before S6 | ScrollTrigger handoffs, section transitions, CTA integration |
| S6 | Hardening + polish | Not Started | Required before completion | Responsive, accessibility, reduced motion, performance, final polish |

## Current Status

- **Current Sprint:** S3
- **Overall Status:** Sprint S2 approved and committed. Sprint S3 is now active.
- **Next Required Action:** Define and implement the S3 harness explainer and capability-scene direction.

---

# Sprint Details

## S1 — Narrative + Design Foundation
- **Status:** Complete
- **Goal:** Establish the redesign foundation before any ambitious UI work begins.
- **Review Gate:** Mandatory user review before S2

### Deliverables
- homepage messaging architecture implemented
- section-by-section copy skeleton implemented
- design token system established for:
  - color
  - typography
  - spacing
  - motion
- root homepage layout structure prepared for the redesign
- public naming aligned in UI copy:
  - 8085
  - The 8085 Lattice
  - Ada

### Tasks
- [x] audit current homepage files and identify what will be reused vs replaced
- [x] rewrite homepage copy structure to match approved spec
- [x] establish new design tokens/CSS variables
- [x] prepare top-level page composition for the new section order
- [x] rename public-facing voice references from Chloe to Ada where needed for homepage flow
- [x] verify that no internal codenames appear in public-facing homepage copy

### Acceptance Criteria
- a reviewer can read the homepage structure and see the new narrative clearly
- old homepage story is no longer driving the page architecture
- naming and copy align with the approved spec
- implementation is ready for hero build-out without rework

### Review Checklist
- [x] messaging matches the approved spec
- [x] section order matches the approved spec
- [x] naming is correct
- [x] ready to proceed to S2

---

## S2 — Hero + Lattice Core
- **Status:** Complete
- **Goal:** Build the new first impression and establish the visual system.
- **Review Gate:** Mandatory user review before S3

### Deliverables
- redesigned hero section
- structural 80/85 visual forms
- interactive hero background system with swappable shader support
- integrated Ada CTA entry point on the page
- reduced-motion-safe hero fallback

### Tasks
- [x] replace the old hero structure and copy
- [x] build the new hero composition and layout
- [x] create the interactive hero background system
- [x] make the hero background swappable for future shader variants
- [x] integrate structural 80/85 forms without making them feel like simple stats
- [x] build Ada CTA entry point as a branded system node
- [x] implement hero entrance choreography
- [x] add reduced-motion fallback behavior

### Acceptance Criteria
- the page opening feels clearly different from the current site
- the category signal is understandable quickly
- Ada feels integrated, not bolted on
- hero performance remains acceptable on mid-range devices

### Review Checklist
- [x] hero is visually approved
- [x] lattice direction is approved
- [x] Ada entry is approved
- [x] ready to proceed to S3

---

## S3 — Harness Explainer + Capability Scenes
- **Status:** In Progress
- **Goal:** Explain the Agent Harness clearly and prove capability with applied scenes.
- **Review Gate:** Mandatory user review before S4

### Deliverables
- Agent Harness explainer section
- The 8085 Lattice system map
- 4 workflow capability scenes
- initial scene transition groundwork

### Tasks
- [ ] create the plain-language Agent Harness explanation section
- [ ] build The 8085 Lattice node map with:
  - tools
  - context
  - memory
  - self-improving skills
  - guardrails
  - human approval
- [ ] build Amazon-centric research scene
- [ ] build brand enrichment scene
- [ ] build LinkedIn outreach/commenting scene
- [ ] build logistics messaging with human approval scene
- [ ] ensure all examples remain public-safe and codename-free

### Acceptance Criteria
- visitors can understand what the harness is without extra explanation
- capability scenes feel specific, not generic
- sections are visually distinct without breaking overall cohesion

### Review Checklist
- [ ] harness explanation is clear
- [ ] scene set is approved
- [ ] proof language is approved
- [ ] ready to proceed to S4

---

## S4 — Differentiation + Trust Layers
- **Status:** Not Started
- **Goal:** Separate 8085 from traditional automation vendors and add decision-support proof.
- **Review Gate:** Mandatory user review before S5

### Deliverables
- traditional automation vs Agent Harness comparison section
- security/integration/ownership section
- credibility/proof section with partner logos

### Tasks
- [ ] build comparison section with rigid vs adaptive framing
- [ ] integrate the real-project learning insight in public-safe form
- [ ] build security/integration/ownership section
- [ ] include the phrase "Client owns the Agent Harness"
- [ ] redesign proof section using existing partner assets
- [ ] compress team credibility into a concise senior-expertise statement
- [ ] keep long founder bios off the homepage

### Acceptance Criteria
- the site clearly sells a higher class of system than traditional automation
- trust and proof feel premium, not corporate boilerplate
- enterprise concerns are answered clearly

### Review Checklist
- [ ] differentiation is strong enough
- [ ] proof feels credible
- [ ] ownership/security messaging is approved
- [ ] ready to proceed to S5

---

## S5 — Motion Integration + Ada Experience
- **Status:** Not Started
- **Goal:** Turn the page into one connected experience instead of stacked sections.
- **Review Gate:** Mandatory user review before S6

### Deliverables
- GSAP ScrollTrigger handoffs between key sections
- pinned sequences where justified
- cross-section signal routing continuity
- refined Ada visual integration
- final CTA integration

### Tasks
- [ ] implement persistent lattice continuity across sections
- [ ] create GSAP ScrollTrigger transitions between major scenes
- [ ] add pinned moments only where they materially improve the experience
- [ ] make section exits and entries feel seamless rather than stacked
- [ ] refine Ada behavior and CTA continuity across the page
- [ ] ensure reduced-motion fallbacks exist for motion-heavy areas

### Acceptance Criteria
- sections feel integrated rather than independently stacked
- motion helps tell the story
- interaction remains smooth and readable

### Review Checklist
- [ ] section handoffs are approved
- [ ] motion level is approved
- [ ] Ada integration is approved
- [ ] ready to proceed to S6

---

## S6 — Hardening + Polish
- **Status:** Not Started
- **Goal:** Make the redesign robust, performant, responsive, and ship-ready.
- **Review Gate:** Mandatory user review before completion

### Deliverables
- responsive refinement across major breakpoints
- accessibility pass
- reduced-motion pass
- performance optimization pass
- final visual and interaction polish

### Tasks
- [ ] adapt layout and typography across viewport sizes
- [ ] verify keyboard/focus/contrast quality
- [ ] finalize reduced-motion behavior
- [ ] optimize heavy visual layers and scroll-trigger behavior
- [ ] remove visual inconsistencies and rough edges
- [ ] run final build/lint verification

### Acceptance Criteria
- page remains premium on desktop and mobile
- motion remains optional and accessible
- performance is acceptable
- final surface feels cohesive and production-ready

### Review Checklist
- [ ] responsive behavior is approved
- [ ] accessibility/performance state is approved
- [ ] final polish is approved
- [ ] redesign is ready for sign-off

---

# Progress Log

## 2026-04-19 — Sprint S2 approved and committed
- user reviewed the current hero work, approved it, and explicitly asked to move on to Sprint S3
- restored the missing project `.gitignore` into this worktree and committed it so local paths like `.pi`, `extensions`, `justfile`, `node_modules`, and `dist` stop polluting status
- rebuilt the hero into the approved S2 direction with a stronger composition, 80/85 structural forms, and a swappable shader-backed hero background
- integrated Ada into the hero as a branded system node instead of a generic CTA button treatment
- updated the hero headline to “Build the Harness. Put the Agent on Shift.”
- added GSAP-based hero entrance choreography and a reduced-motion-safe fallback path
- upgraded The 8085 Lattice section with a connected system-view panel to establish the lattice core before S3
- verification: `npm exec -- eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`, `npm run build`
- open issues: none blocking S3; do a final browser-side visual pass while building the next sprint
- next-step recommendation: begin S3 with the Agent Harness explainer structure and the four workflow capability scenes

## 2026-04-19 — Sprint S1 approved and committed
- user reviewed the local build and approved Sprint S1 to be committed before continuing
- S1 task checklist and review checklist marked complete
- repository prepared to pause before Sprint S2

## 2026-04-19 — Sprint S1 ready for review
- audited the current homepage entry flow and replaced the old homepage composition with a new sprint-1 landing page skeleton
- implemented the approved section order: hero, Agent Harness, The 8085 Lattice, capability scenes, differentiation, security/ownership, proof, final CTA
- added redesign design tokens in `src/styles/globals.css`
- added the new landing page foundation in `src/components/landing/LandingPage.jsx`
- added sprint-1 layout styling in `src/styles/landing-page.css`
- updated active public-facing voice UI text from Chloe to Ada in the homepage flow and voice overlay
- verified build success with `npm run build`
- verified lint success with `npm exec -- eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0`

## 2026-04-19
- approved redesign direction captured in spec
- spec written to `docs/superpowers/specs/2026-04-19-8085-agent-harness-redesign-design.md`
- `Tasks.md` reset to a sprint-based redesign plan
- legacy backlog compressed into archive summary
- review gate added after every sprint per user request
