# 8085.ai - Component Hierarchy & Data Flow

**Audit Date:** 2026-06-19

---

## 1. Component Tree

```
index.html
└── #root
    └── ReactDOM.createRoot
        └── <React.StrictMode>
            └── App
                ├── ConfigProvider (Context)
                │   └── ErrorBoundary
                │       └── <div className="app-root">
                │           └── [Conditional Rendering]
                │               ├── Route: #privacy-policy
                │               │   └── PrivacyPolicy
                │               └── Default Route
                │                   └── LandingPage
                │                       ├── LandingHeader (inline JSX)
                │                       ├── LandingMotionSpine
                │                       ├── LandingSignalCurrent
                │                       ├── HeroShaderCanvas
                │                       ├── WorkflowStorySurface (inline)
                │                       ├── HeroHarnessFlow (inline)
                │                       ├── AgentHarnessStage
                │                       │   └── AgentHarnessWorkspace
                │                       ├── TrustSurface
                │                       ├── DifferentiationSplitSurface
                │                       │   └── DifferentiationPanel (inline)
                │                       ├── CapabilitySceneDeck
                │                       │   └── CapabilitySurfaceCard (x5)
                │                       ├── LatticeSystemMap
                │                       │   └── LatticeNetworkCanvas
                │                       ├── ResultsSurface (inline)
                │                       ├── ContactCommandSurface
                │                       └── MobileContactDock
                └── VoiceAgentOverlay
                    └── SoundWaveAnimation

[Legacy/Orphaned Tree - not rendered by App.jsx]
Header
Hero
├── CircuitCanvas
│   ├── ColorSettings
│   └── [shadcn/ui controls]
WhoWeAre
HowWeStart
PartnerCompanies
MeetTheFounders
Contact
```

---

## 2. Props Interfaces

### 2.1 App Layer

#### `App`
```typescript
// No external props
interface AppState {
  isVoiceAgentVisible: boolean;
  showPrivacyPolicy: boolean;
}
```

#### `LandingPage`
```typescript
interface LandingPageProps {
  onStartConversation: () => void;  // Opens VoiceAgentOverlay
}
```

#### `VoiceAgentOverlay`
```typescript
interface VoiceAgentOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}
```

### 2.2 Landing Page Components

#### `LandingSection` (inline)
```typescript
interface LandingSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'default' | 'muted' | 'contrast';
  signalState?: 'upcoming' | 'active' | 'past';
  children: React.ReactNode;
}
```

#### `LandingMotionSpine`
```typescript
interface LandingMotionSpineProps {
  motionRef: React.RefObject<HTMLElement>;
  sections: MotionSection[];
  activeSectionId: string;
  reducedMotion?: boolean;
  isHidden?: boolean;
}

interface MotionSection {
  id: string;
  label: string;
  relay: string;
  narration?: string | string[];
  accent: string;
  glow: string;
}
```

#### `HeroShaderCanvas`
```typescript
interface HeroShaderCanvasProps {
  className?: string;
  hostRef: React.RefObject<HTMLElement>;
  shaderId: string;
  options?: {
    particleDensity?: number;
    waveSpeed?: number;
    maxPixelRatio?: number;
    idleFps?: number;
    // ... more
  };
  reducedMotion?: boolean;
}
```

#### `LatticeSystemMap`
```typescript
interface LatticeSystemMapProps {
  reducedMotion?: boolean;
}
```

#### `LatticeNetworkCanvas`
```typescript
interface LatticeNetworkCanvasProps {
  surface: LatticeSurface;
}

interface LatticeSurface {
  ariaLabel: string;
  intake: string;
  intakeTitle: string;
  intakeNote: string;
  workflowTitle: string;
  reviewTitle: string;
  chips: string[];
  lanes: Lane[];
  result: { label: string; title: string; note: string };
}
```

#### `AgentHarnessStage`
```typescript
interface AgentHarnessStageProps {
  reducedMotion?: boolean;
}
```

#### `CapabilitySceneDeck`
```typescript
interface CapabilitySceneDeckProps {
  reducedMotion?: boolean;
}
```

#### `CapabilitySurfaceCard`
```typescript
interface CapabilitySurfaceCardProps {
  scene: CapabilityScene;
  reversed?: boolean;
}

interface CapabilityScene {
  id: string;
  index: string;
  title: string;
  description: string;
  proof: string;
  control: string;
  badges: string[];
  modelNote: string;
  accent: string;
  glow: string;
  surface: string;
  surfaceStrong: string;
  surfaceAlt: string;
  heroArtifact: {
    eyebrow: string;
    title: string;
    body: string;
    meta: string[];
  };
  supportingFragments: { label: string; detail: string }[];
}
```

#### `TrustSurface`
```typescript
interface TrustSurfaceProps {
  surface: TrustSurfaceData;
}

interface TrustSurfaceData {
  ariaLabel: string;
  lead: {
    eyebrow: string;
    title: string;
    bullets: { title: string; body: string }[];
    badges: string[];
  };
  stackTitle: string;
  stackBody: string;
  rails: { id: string; label: string; body: string; tone: string }[];
  ownership: { label: string; title: string; body: string };
}
```

#### `DifferentiationSplitSurface`
```typescript
interface DifferentiationSplitSurfaceProps {
  surface: DifferentiationSurfaceData;
}

interface DifferentiationSurfaceData {
  ariaLabel: string;
  panels: DifferentiationPanel[];
  summary: { eyebrow: string; title: string; body: string };
}
```

#### `ContactCommandSurface`
```typescript
interface ContactCommandSurfaceProps {
  surface: ContactSurfaceData;
  headingId: string;
  founderHref: string;
  onStartConversation: () => void;
  mailHref: string;
}
```

#### `MobileContactDock`
```typescript
interface MobileContactDockProps {
  surface: ContactSurfaceData;
  isVisible: boolean;
  isOpen: boolean;
  onOpen: (event?) => void;
  onClose: ({ restoreFocus?: boolean }) => void;
  founderHref: string;
  mailHref: string;
  onStartConversation: () => void;
  launcherLabel: string;
}
```

#### `LandingSignalCurrent`
```typescript
interface LandingSignalCurrentProps {
  pageRef: React.RefObject<HTMLElement>;
  sections: MotionSection[];
  activeSectionId: string;
  reducedMotion?: boolean;
}
```

### 2.3 Voice Agent Components

#### `SoundWaveAnimation`
```typescript
interface SoundWaveAnimationProps {
  isActive: boolean;
  className?: string;
}
```

### 2.4 Legacy Components

#### `Contact` (sections/)
```typescript
interface ContactProps {
  onStartConversation: () => void;
}
```

#### `CircuitCanvas`
```typescript
// No props - uses ConfigContext internally
```

---

## 3. State Management Flows

### 3.1 Global State: ConfigContext

**Provider:** `src/lib/config.jsx`
**Consumers:** `CircuitCanvas`, `ColorSettings`

```
ConfigProvider
├── config: AnimationConfig
├── updateConfig(newValues): void
├── resetConfig(): void
├── colorSchemes: Record<string, ColorScheme>
├── savedSchemes: Record<string, ColorScheme>
├── saveCustomScheme(name): boolean
├── loadCustomScheme(name): boolean
└── COLORS: Record<string, string>
```

**Persistence:** Custom color schemes saved to `localStorage` under key `customColorSchemes`.

### 3.2 App-Level State

**File:** `App.jsx`

| State | Type | Source | Consumers |
|-------|------|--------|-----------|
| `isVoiceAgentVisible` | `boolean` | `useState` | `VoiceAgentOverlay` |
| `showPrivacyPolicy` | `boolean` | `hashchange` event | Conditional render root |

**Flow:**
```
User clicks "Talk to Agent Ada"
  -> App.setIsVoiceAgentVisible(true)
    -> VoiceAgentOverlay receives isVisible=true
      -> GSAP entrance animation plays
        -> User interacts with voice agent
      -> User closes or conversation ends
    -> App.setIsVoiceAgentVisible(false)
```

### 3.3 Landing Page State

**File:** `LandingPage.jsx`

| State | Type | Source | Consumers |
|-------|------|--------|-----------|
| `activeSectionId` | `string` | ScrollTrigger callbacks | `LandingMotionSpine`, `LandingSignalCurrent`, nav `aria-current` |
| `isMobileContactDockOpen` | `boolean` | User interaction | `MobileContactDock` |
| `prefersReducedMotion` | `boolean` | `matchMedia('(prefers-reduced-motion: reduce)')` | All animation components |
| `isMobileViewport` | `boolean` | `matchMedia('(max-width: 720px)')` | Header actions, hero actions, mobile dock |

**Flow:**
```
User scrolls
  -> ScrollTrigger.onUpdate calculates progress
    -> CSS custom properties updated (--landing-motion-progress)
    -> ScrollTrigger.onEnter/onEnterBack sets activeSectionId
      -> LandingMotionSpine re-renders with new section
        -> Typing animation plays for narration
      -> LandingSignalCurrent updates SVG active states
      -> Nav links update aria-current
```

### 3.4 Voice Agent State

**File:** `src/lib/useVoiceAgent.js`

| State | Type | Description |
|-------|------|-------------|
| `isInitialized` | `boolean` | WebSocket connection active |
| `collectedData` | `object` | `{ name, email, query, company, employeeCount, conversationId }` |
| `conversationId` | `string \| null` | ElevenLabs conversation ID |
| `error` | `string \| null` | User-facing error message |
| `conversationState` | `object` | `{ isActive, startTime, endTime, endReason, hasEnded }` |
| `status` | `string` | From `@11labs/react` useConversation |
| `isSpeaking` | `boolean` | From `@11labs/react` useConversation |

**Client Tools Flow:**
```
ElevenLabs agent calls client tool (e.g., collect_name)
  -> useVoiceAgent clientTools handler
    -> sanitizeName(value)
      -> setCollectedData(prev => ({ ...prev, name: sanitized }))
        -> VoiceAgentOverlay detects new data via useEffect
          -> GSAP animation on info container
          -> Progress bar updates
```

### 3.5 VoiceAgentOverlay Internal State

**File:** `VoiceAgentOverlay.jsx`

| State | Type | Description |
|-------|------|-------------|
| `consentState` | `object` | `{ hasConsented, showConsentForm, consentTimestamp }` |
| `showPrivacyDetails` | `boolean` | Expand/collapse privacy policy details |
| `webhookState` | `object` | `{ isSubmitting, hasSubmitted, submissionSuccess, submissionMessage, showResult }` |
| `captchaState` | `object` | `{ isVerifying, isVerified, verificationFailed, requiresChallenge, error }` |
| `lastDataUpdate` | `object \| null` | Previous collectedData for change detection |

**Conversation Lifecycle Flow:**
```
1. User opens overlay
   -> GDPR consent form displayed
2. User clicks "I Agree & Continue"
   -> reCAPTCHA verification executes
     -> If allowed: startConversation(agentId)
       -> Dialing sound plays
       -> Microphone permission requested
       -> WebSocket connection established
3. During conversation
   -> Agent collects data via client tools
   -> SoundWaveAnimation shows when isSpeaking
   -> Collected data displayed with animations
4. Conversation ends
   -> handleWebhookSubmission called
     -> Data validated and sanitized
     -> Sent via secure-webhook-proxy
     -> Success/error animation shown
     -> Auto-close after 4 seconds
5. Premature close
   -> handlePrematureClose
     -> If email collected: submit partial data
     -> Otherwise: close without submission
```

---

## 4. Component Usage Matrix

| Component | Used By | Used In | Notes |
|-----------|---------|---------|-------|
| `App` | `main.jsx` | Root | |
| `ConfigProvider` | `App` | Root wrapper | |
| `ErrorBoundary` | `App` | Root wrapper | `fallbackId="main-app"` |
| `LandingPage` | `App` | Default route | |
| `VoiceAgentOverlay` | `App` | Root level (portal-like) | Controlled by App state |
| `PrivacyPolicy` | `App` | `#privacy-policy` route | |
| `LandingMotionSpine` | `LandingPage` | Fixed aside | Hidden on hero section |
| `LandingSignalCurrent` | `LandingPage` | Background SVG | Desktop only, hidden for reduced motion |
| `HeroShaderCanvas` | `LandingPage` | Hero backdrop | `shaderId='phase-transition'` |
| `WorkflowStorySurface` | `LandingPage` | `workflow-story` section | Inline component |
| `HeroHarnessFlow` | `LandingPage` | `agent-harness` section | Inline component |
| `AgentHarnessStage` | `LandingPage` | `agent-harness` section | |
| `TrustSurface` | `LandingPage` | `security` section | |
| `DifferentiationSplitSurface` | `LandingPage` | `differentiation` section | |
| `CapabilitySceneDeck` | `LandingPage` | `capabilities` section | |
| `LatticeSystemMap` | `LandingPage` | `capabilities` section | |
| `ResultsSurface` | `LandingPage` | `proof` section | Inline component |
| `ContactCommandSurface` | `LandingPage` | `contact` section | |
| `MobileContactDock` | `LandingPage` | Fixed bottom | Only renders when `isMobileViewport` |
| `CapabilitySurfaceCard` | `CapabilitySceneDeck` | `capabilities` section | 5 instances |
| `LatticeNetworkCanvas` | `LatticeSystemMap` | `capabilities` section | |
| `DifferentiationPanel` | `DifferentiationSplitSurface` | `differentiation` section | 3 instances |
| `AgentHarnessWorkspace` | `AgentHarnessStage` | `agent-harness` section | |
| `SoundWaveAnimation` | `VoiceAgentOverlay` | Agent avatar area | |
| `Header` | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `Hero` (sections) | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `WhoWeAre` | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `HowWeStart` | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `PartnerCompanies` | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `MeetTheFounders` | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `Contact` (sections) | **None** (orphaned?) | Legacy | Not in current App.jsx |
| `CircuitCanvas` | **None** (orphaned?) | Legacy | Not in current App.jsx |

---

## 5. Custom Hooks

### 5.1 `useConfig`
**File:** `src/lib/config.jsx`
**Usage:** `CircuitCanvas`, `ColorSettings`
**Returns:** Full config context object

### 5.2 `useVoiceAgent`
**File:** `src/lib/useVoiceAgent.js`
**Usage:** `VoiceAgentOverlay`
**Returns:** Voice agent state and controls

### 5.3 `useMediaQuery` (inline)
**File:** `LandingPage.jsx`
**Usage:** `LandingPage` internally
**Returns:** `boolean` for query match

### 5.4 `useReducedMotionPreference` (inline)
**File:** `LandingPage.jsx`
**Usage:** `LandingPage` internally
**Returns:** `boolean` for `prefers-reduced-motion: reduce`

---

## 6. Context Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      ConfigProvider                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  config     │  │ colorSchemes │  │  savedSchemes    │   │
│  │  updateConfig│  │  COLORS      │  │  save/load       │   │
│  └──────┬──────┘  └──────────────┘  └──────────────────┘   │
└─────────┼───────────────────────────────────────────────────┘
          │ useContext
          ▼
┌─────────────────┐
│  CircuitCanvas  │
│  ColorSettings  │
└─────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         App                                 │
│  ┌─────────────────────┐    ┌──────────────────────────┐   │
│  │ isVoiceAgentVisible │    │    showPrivacyPolicy     │   │
│  └──────────┬──────────┘    └──────────────────────────┘   │
└─────────────┼───────────────────────────────────────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
┌─────────────────┐  ┌──────────────┐
│VoiceAgentOverlay│  │ LandingPage  │
└─────────────────┘  └──────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌─────────────────┐  ┌──────────────┐
│LandingMotionSpine│ │LandingSignalCurrent│ │MobileContactDock│
└───────────────┘  └─────────────────┘  └──────────────┘
```
