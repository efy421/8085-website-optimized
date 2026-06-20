export const latticeNodes = [
  {
    title: 'Tools',
    description:
      'Give the system the same tools your team already uses, like browser sessions, web apps, and approved internal systems.',
    signal: 'Apps and browser actions',
    x: 50,
    y: 15,
  },
  {
    title: 'Context',
    description:
      'Give the system the task, rules, limits, and current state it needs to do the work well.',
    signal: 'Task rules and current state',
    x: 82,
    y: 31,
  },
  {
    title: 'Memory',
    description:
      'Keep useful details so the next run can start from a better place instead of starting over.',
    signal: 'Useful detail carried forward',
    x: 75,
    y: 76,
  },
  {
    title: 'Learned Skills',
    description:
      'Teach the system how to use specific tools so later runs become faster and more useful.',
    signal: 'Better ways of doing the work',
    x: 50,
    y: 88,
  },
  {
    title: 'Guardrails',
    description:
      'Set clear limits on what it can do so the work stays safe and deliberate.',
    signal: 'Clear limits and permissions',
    x: 25,
    y: 76,
  },
  {
    title: 'Human Approval',
    description:
      'Keep people in the loop where judgment, compliance, or customer changes need review.',
    signal: 'Visible review steps',
    x: 18,
    y: 31,
  },
];

export const agentHarnessSurface = {
  ariaLabel: 'Agent Harness work session',
  eyebrow: 'Client-owned setup',
  title: 'A controlled work session',
  bodyPoints: [
    {
      title: 'What the setup gives',
      body: 'It gives the system the tools, task context, memory, and review steps it needs.',
    },
    {
      title: 'Why it stays controlled',
      body: 'Each run stays inside a clear task, a clear limit, and a clear review path.',
    },
    {
      title: 'Why it helps the team',
      body: 'Work keeps moving without losing the human checks that matter.',
    },
  ],
  captionEyebrow: 'Why the setup matters',
  captionTitle: 'The setup is what makes AI useful in real work.',
  captionPoints: [
    {
      body: 'The setup gives AI the right tools and the right task context.',
    },
    {
      body: 'Memory and review steps make the work usable inside the business.',
    },
    {
      body: 'That makes it feel more like a teammate and less like a script.',
    },
  ],
  stackTitle: 'What the system can work with',
  stackBody:
    'The setup gives the system access, context, memory, and review without giving up control.',
  rails: [
    {
      id: 'tools',
      label: 'Tool access',
      body: 'The right business apps stay available while the work is being done.',
      tone: 'signal',
    },
    {
      id: 'context',
      label: 'Task context',
      body: 'The rules, limits, and current state stay attached to the task.',
      tone: 'calm',
    },
    {
      id: 'memory',
      label: 'Memory',
      body: 'Useful detail carries forward so the next run does not start from zero.',
      tone: 'calm',
    },
    {
      id: 'guardrails',
      label: 'Guardrails',
      body: 'Permissions and policy keep each action inside the allowed boundary.',
      tone: 'quiet',
    },
    {
      id: 'approval',
      label: 'Human review',
      body: 'Anything sensitive can pause for review before it is sent or released.',
      tone: 'quiet',
    },
  ],
  badges: ['Real tools', 'Task context', 'Useful memory', 'Human review'],
};

export const latticeSurface = {
  ariaLabel: 'The 8085 Lattice workflow map',
  intake: 'Work enters',
  intakeTitle: 'A clear task comes in',
  intakeNote: 'The system starts with one task and one goal.',
  workflowTitle: 'Send the work to the right step',
  reviewTitle: 'Keep context and review',
  chips: ['Right fit', 'Work lanes', 'Memory', 'Review hold', 'One result'],
  lanes: [
    {
      id: 'delegate',
      label: 'delegate',
      title: 'Send specialist work where it fits',
      note: 'Research or tool-heavy steps can be handled in the right lane.',
      x: '14%',
      y: '58%',
      tone: 'warm',
    },
    {
      id: 'routing',
      label: 'right fit',
      title: 'Choose the right model',
      note: 'Simple steps can use smaller models. Harder steps can use stronger ones.',
      x: '34%',
      y: '24%',
      tone: 'violet',
    },
    {
      id: 'memory',
      label: 'memory',
      title: 'Keep the right context',
      note: 'Important details stay with the task as it moves forward.',
      x: '61%',
      y: '66%',
      tone: 'teal',
    },
    {
      id: 'approval',
      label: 'review hold',
      title: 'Wait for human sign-off',
      note: 'A person reviews risky or customer-facing work before it goes out.',
      x: '76%',
      y: '28%',
      tone: 'slate',
    },
  ],
  result: {
    label: 'return',
    title: 'Send back one clear result',
    note: 'The team gets one checked output instead of many loose steps.',
  },
};

export const differentiationSurface = {
  ariaLabel: 'Chat AI, traditional automation, and 8085 comparison',
  panels: [
    {
      id: 'chat',
      tone: 'chat',
      eyebrow: 'Chat AI',
      title: 'Good for answers and drafting.',
      points: [
        'Answers questions',
        'Helps with one-off writing',
        'Useful for individual tasks',
        'Does not move the workflow on its own',
      ],
      footer: 'Helpful for individuals, but it does not move the work through the business by itself.',
    },
    {
      id: 'automation',
      tone: 'legacy',
      eyebrow: 'Traditional automation',
      title: 'Good for fixed steps that rarely change.',
      points: [
        'Runs one defined path',
        'Works best when the environment stays stable',
        'Struggles with changing inputs or exceptions',
        'Needs manual intervention when the process shifts',
      ],
      footer: 'Useful when the path is stable, but brittle when the work changes.',
    },
    {
      id: 'workflow',
      tone: 'harness',
      eyebrow: '8085',
      title: 'Built for repeatable work inside the business.',
      points: [
        'Uses the right tools and systems',
        'Follows business rules and current context',
        'Hands work to people when judgment is needed',
        'Keeps the workflow moving without losing control',
      ],
      footer: 'It keeps work moving through tools, rules, review, and context.',
    },
  ],
  summary: {
    eyebrow: 'What 8085 adds',
    title: 'AI that works inside the workflow.',
    body:
      'Instead of stopping at answers or breaking on the first change, the workflow can use tools, follow business rules, and hand work to people when judgment is needed.',
  },
};

export const trustSurface = {
  ariaLabel: 'Ownership and control',
  lead: {
    eyebrow: 'Ownership',
    title: 'You own what we build.',
    bullets: [
      {
        title: 'Built around your process',
        body: 'The workflow is shaped around the way your team already works, not a generic template.',
      },
      {
        title: 'Your team stays in control',
        body: 'Approvals, edge cases, and judgment calls stay visible instead of disappearing into a black box.',
      },
      {
        title: 'Expand at your pace',
        body: 'Start with one workflow, prove the value, then decide where to go next.',
      },
    ],
    badges: ['Your workflow', 'Your logic', 'Your data', 'Your approvals'],
  },
  stackTitle: 'How control stays visible',
  stackBody:
    'The workflow becomes part of the business without turning into a black box.',
  rails: [
    {
      id: 'logic',
      label: 'Business logic',
      body: 'The rules that matter stay attached to the work instead of living only in someone’s head.',
      tone: 'signal',
    },
    {
      id: 'approvals',
      label: 'Approvals',
      body: 'People review what matters and keep ownership of customer-facing or judgment-heavy decisions.',
      tone: 'calm',
    },
    {
      id: 'access',
      label: 'Scoped access',
      body: 'Tools and systems stay limited to the job the workflow is supposed to do.',
      tone: 'quiet',
    },
    {
      id: 'pace',
      label: 'Expansion pace',
      body: 'You decide when one workflow is enough and when it is worth adding the next one.',
      tone: 'calm',
    },
  ],
  ownership: {
    label: 'What stays yours',
    title: 'It becomes part of your business.',
    body:
      'You own the workflow, the operating logic, the tools, the data, and the approvals around it.',
  },
};

export const proofSurface = {
  ariaLabel: 'Workflow outcome proof',
  eyebrow: 'What this can unlock',
  title: 'The gains grow as the workflow gets more specialized.',
  body:
    'Start by removing manual time from the repeatable part. Then improve the workflow as the system gets better at the job.',
  cards: [
    {
      id: 'manual-time',
      value: '80%',
      label: 'Less manual time',
      body: 'In the right workflows, we have seen around 80% less manual time spent on the repeatable part.',
    },
    {
      id: 'same-team',
      value: 'Same team',
      label: 'More output',
      body: 'The same people can move more work without adding headcount.',
    },
    {
      id: 'specialization',
      value: '5x',
      label: 'Efficiency over time',
      body: 'In specialized workflows, efficiency can improve significantly over time, in some cases up to 5x.',
    },
  ],
  note: 'Results depend on the workflow. Start with one process and measure it.',
};

export const trustStripSurface = {
  ariaLabel: 'Trusted company logos',
  label: 'Trusted by teams from',
  logos: [
    { src: '/images/partners-logo-audi.svg', alt: 'Audi — Workflow automation', context: 'Workflow automation', outcome: 'Automated multi-step approval chains' },
    { src: '/images/partners-logo-dhl.svg', alt: 'DHL — Process optimization', context: 'Process optimization', outcome: 'Reduced manual handling in logistics ops' },
    { src: '/images/partners-logo-ci.webp', alt: 'Cologne Intelligence — Enterprise AI', context: 'Enterprise AI', outcome: 'Scaled AI across business units' },
    { src: '/images/partners-logo-bayer.svg', alt: 'Bayer — Operations scaling', context: 'Operations scaling', outcome: 'Faster batch processing without headcount' },
    { src: '/images/partners-logo-mubea.svg', alt: 'Mubea — Cost reduction', context: 'Cost reduction', outcome: 'Cut operational overhead on repeat tasks' },
    { src: '/images/partners-logo-postbank.svg', alt: 'Postbank — Compliance workflow', context: 'Compliance workflow', outcome: 'Streamlined audit-ready documentation' },
  ],
};

export const workflowStorySurface = {
  ariaLabel: 'Grounded workflow example',
  title: 'Turn repeatable business work into an intelligent workflow.',
  intro:
    'A team member already knows how to do the work. They gather information, apply business rules, update the right systems, and move the task forward. The problem is not knowing what to do. The problem is doing the same process over and over by hand.',
  cards: [
    {
      id: 'before',
      label: 'Before',
      title: 'One person repeats the same process',
      body:
        'The work depends on someone opening the right tools, gathering the right inputs, and pushing the task forward step by step.',
      tone: 'quiet',
    },
    {
      id: 'with-8085',
      label: 'With 8085',
      title: '8085 turns that process into an intelligent workflow',
      body:
        'The repeatable part runs through the right tools and business rules while the workflow stays tied to the job the team already knows.',
      tone: 'signal',
    },
    {
      id: 'after',
      label: 'After',
      title: 'The team focuses on judgment and exceptions',
      body:
        'People review what matters, handle edge cases, and move more work without carrying the same manual load every time.',
      tone: 'calm',
    },
  ],
};

export const motionSections = [
  {
    id: 'hero',
    label: 'Start',
    relay: 'Core promise',
    narration: [
      'This starts with one workflow your team already runs.',
      'The page moves from business value to mechanism to proof.',
    ],
    accent: '#81d9cb',
    glow: 'rgba(129, 217, 203, 0.34)',
  },
  {
    id: 'workflow-story',
    label: 'Example',
    relay: 'Work shape',
    narration: [
      'This grounds the offer in repeatable multi-step work.',
      'The team already knows the job. The problem is repeating it by hand.',
    ],
    accent: '#d2a14e',
    glow: 'rgba(210, 161, 78, 0.3)',
  },
  {
    id: 'agent-harness',
    label: 'How it works',
    relay: 'One workflow first',
    narration: [
      'Start with one workflow instead of a full transformation.',
      'Build the setup, run the repeatable part, and keep people in control.',
    ],
    accent: '#7bd0c2',
    glow: 'rgba(123, 208, 194, 0.32)',
  },
  {
    id: 'security',
    label: 'Ownership',
    relay: 'Control visible',
    narration: [
      'Ownership, approvals, and scoped access stay visible.',
      'What gets built becomes part of the business instead of a rented black box.',
    ],
    accent: '#6fb6ab',
    glow: 'rgba(111, 182, 171, 0.28)',
  },
  {
    id: 'differentiation',
    label: 'Difference',
    relay: 'Why 8085',
    narration: [
      'This is the difference between chat, fixed automation, and a workflow that can actually move work.',
      'The extra layer helps work continue through tools, rules, and review.',
    ],
    accent: '#cf7c45',
    glow: 'rgba(207, 124, 69, 0.28)',
  },
  {
    id: 'capabilities',
    label: 'Examples',
    relay: 'Best-fit work',
    narration: [
      'These examples show the kinds of repeatable work that fit well.',
      'The pattern is familiar business work done more consistently and with less manual effort.',
    ],
    accent: '#8f8ae4',
    glow: 'rgba(143, 138, 228, 0.3)',
  },
  {
    id: 'proof',
    label: 'Results',
    relay: 'Measured gains',
    narration: [
      'The stronger proof comes after the mechanism is clear.',
      'The gains grow as the workflow gets more specialized.',
    ],
    accent: '#7d8e97',
    glow: 'rgba(125, 142, 151, 0.24)',
  },
  {
    id: 'contact',
    label: 'Contact',
    relay: 'Start here',
    narration: [
      'The goal is one clear workflow conversation.',
      '8085 will tell you quickly whether the workflow is a good fit.',
    ],
    accent: '#81d9cb',
    glow: 'rgba(129, 217, 203, 0.34)',
  },
];

export const contactSurface = {
  ariaLabel: 'Start with one workflow',
  eyebrow: 'Start here',
  title: 'Show us one workflow.',
  body:
    'If your team is repeating the same multi-step work again and again, that is the best place to start. We will tell you quickly whether it is a good fit.',
  panelEyebrow: 'Agent Ada',
  panelTitle: 'Get to a clear first step.',
  panelBody:
    'Bring one workflow. We will help define the first scope, the review points, and the fastest way to test value.',
  status: 'Ready',
  statusActionLabel: 'Open Ada conversation',
  signals: ['One workflow first', 'Fast fit check', 'Human follow-up'],
  primaryActionLabel: 'Book Strategy Call',
  secondaryActionLabel: 'Talk to Agent Ada',
  tertiaryActionLabel: null,
  steps: [
    {
      id: 'describe',
      label: '01',
      title: 'Describe the workflow',
      body: 'Show where the team is repeating the same process and where manual effort is piling up.',
    },
    {
      id: 'repeatable',
      label: '02',
      title: 'Identify the repeatable part',
      body: 'We separate the repeatable work from the judgment-heavy parts that should stay with people.',
    },
    {
      id: 'next-step',
      label: '03',
      title: 'Leave with a clear next step',
      body: 'You leave with a practical first scope and a fast answer on whether the workflow is a fit.',
    },
  ],
  notes: [
    'Book a strategy call directly',
    'Talk to Agent Ada if you prefer',
  ],
};

export const capabilityScenes = [
  {
    id: 'multi-source-research',
    index: '01',
    title: 'Gather information from multiple sources',
    description:
      'Pull information together from several systems and sources without repeating the same manual process every time.',
    proof:
      'The workflow collects inputs, organizes them, and prepares one clear summary for the team.',
    control: 'Source aware',
    badges: ['Gather inputs', 'Organize findings', 'Ready summary'],
    modelNote:
      'The repeatable collection work can run automatically while people still review tradeoffs or edge cases.',
    accent: '#c98834',
    glow: 'rgba(201, 136, 52, 0.22)',
    surface: 'rgba(255, 249, 239, 0.88)',
    surfaceStrong: 'rgba(255, 241, 214, 0.92)',
    surfaceAlt: 'rgba(92, 58, 17, 0.08)',
    heroArtifact: {
      eyebrow: 'Workflow brief',
      title: 'Consolidated findings pack',
      body:
        'Relevant inputs arrive in one place with source notes, grouped findings, and missing items flagged for the team.',
      meta: ['Multiple sources', 'Rules applied', 'Ready for review'],
    },
    supportingFragments: [
      { label: 'Source lane', detail: 'Relevant systems and inputs collected' },
      { label: 'Rule check', detail: 'Missing or conflicting details flagged' },
      { label: 'Output pack', detail: 'One summary prepared for the team' },
    ],
  },
  {
    id: 'business-rule-checks',
    index: '02',
    title: 'Check work against business rules',
    description:
      'Apply the same business logic consistently before work moves forward to the next person or system.',
    proof:
      'The workflow can catch mismatches, incomplete inputs, and policy issues before they create downstream cleanup.',
    control: 'Rule bound',
    badges: ['Policy checks', 'Clear exceptions', 'Consistent decisions'],
    modelNote:
      'Repeatable checks stay automated while unclear cases can be held for human judgment.',
    accent: '#1f7f74',
    glow: 'rgba(31, 127, 116, 0.2)',
    surface: 'rgba(244, 251, 249, 0.9)',
    surfaceStrong: 'rgba(225, 244, 240, 0.94)',
    surfaceAlt: 'rgba(22, 115, 106, 0.08)',
    heroArtifact: {
      eyebrow: 'Decision queue',
      title: 'Rule-checked work queue',
      body:
        'Tasks are checked against the right rules and held with clear exception notes when something needs review.',
      meta: ['Rules attached', 'Exceptions flagged', 'Ready queue'],
    },
    supportingFragments: [
      { label: 'Policy lane', detail: 'Rules applied to each task' },
      { label: 'Mismatch note', detail: 'Conflicts surfaced before handoff' },
      { label: 'Review cue', detail: 'Unclear cases held for people' },
    ],
  },
  {
    id: 'system-record-updates',
    index: '03',
    title: 'Update systems and records',
    description:
      'Keep the right tools and records in sync as work gets completed, reviewed, or moved to the next step.',
    proof:
      'Instead of asking someone to re-enter the same information, the workflow can carry it forward consistently.',
    control: 'Record sync',
    badges: ['Update records', 'Keep systems aligned', 'Reduce re-entry'],
    modelNote:
      'Structured updates can run automatically while risky or ambiguous changes can wait for approval.',
    accent: '#6c63c9',
    glow: 'rgba(108, 99, 201, 0.22)',
    surface: 'rgba(248, 246, 255, 0.9)',
    surfaceStrong: 'rgba(233, 229, 255, 0.94)',
    surfaceAlt: 'rgba(108, 99, 201, 0.08)',
    heroArtifact: {
      eyebrow: 'System sync',
      title: 'Synced record update',
      body:
        'The workflow carries approved information into the right systems so the team does not have to retype the same state.',
      meta: ['Fields mapped', 'State aligned', 'Approvals visible'],
    },
    supportingFragments: [
      { label: 'Mapped fields', detail: 'Inputs lined up across systems' },
      { label: 'State carry', detail: 'Approved updates move forward' },
      { label: 'Audit cue', detail: 'Changes stay visible to the team' },
    ],
  },
  {
    id: 'review-ready-outputs',
    index: '04',
    title: 'Prepare outputs for review',
    description:
      'Draft, package, and organize work so people can approve it faster without losing context.',
    proof:
      'The workflow can prepare the first complete version, while the team focuses on what actually needs judgment.',
    control: 'Review ready',
    badges: ['Draft prepared', 'Context included', 'Faster approval'],
    modelNote:
      'The first pass can be prepared automatically, then held for human sign-off where it matters.',
    accent: '#2c6777',
    glow: 'rgba(44, 103, 119, 0.2)',
    surface: 'rgba(243, 248, 250, 0.9)',
    surfaceStrong: 'rgba(222, 237, 241, 0.94)',
    surfaceAlt: 'rgba(44, 103, 119, 0.08)',
    heroArtifact: {
      eyebrow: 'Approval pack',
      title: 'Review-ready output set',
      body:
        'The right context, draft work, and exception notes arrive together so people can approve faster.',
      meta: ['Draft assembled', 'Context attached', 'Review required'],
    },
    supportingFragments: [
      { label: 'Draft lane', detail: 'First version prepared automatically' },
      { label: 'Context pack', detail: 'Relevant notes travel with the task' },
      { label: 'Approval hold', detail: 'Nothing final moves without review' },
    ],
  },
  {
    id: 'specialist-work-at-scale',
    index: '05',
    title: 'Repeat specialist tasks at scale',
    description:
      'Take a known internal process and repeat it more consistently without asking specialists to do every pass manually.',
    proof:
      'The workflow can carry the repeatable part of expert work, while specialists focus on exceptions, strategy, and final calls.',
    control: 'Specialist lane',
    badges: ['Known process', 'Repeatable passes', 'Experts on exceptions'],
    modelNote:
      'As the workflow gets more specialized, the efficiency gains can compound over time.',
    accent: '#8757a5',
    glow: 'rgba(135, 87, 165, 0.2)',
    surface: 'rgba(250, 245, 255, 0.92)',
    surfaceStrong: 'rgba(240, 230, 250, 0.95)',
    surfaceAlt: 'rgba(135, 87, 165, 0.08)',
    heroArtifact: {
      eyebrow: 'Specialist lane',
      title: 'Repeatable specialist runbook',
      body:
        'The workflow handles the repeated part of expert work and leaves the high-judgment decisions with the team.',
      meta: ['Runbook applied', 'Exceptions surfaced', 'Experts stay focused'],
    },
    supportingFragments: [
      { label: 'Runbook cue', detail: 'Known process loaded into the workflow' },
      { label: 'Exception lane', detail: 'Unclear cases routed to specialists' },
      { label: 'Scale effect', detail: 'More passes completed with the same team' },
    ],
  },
];
