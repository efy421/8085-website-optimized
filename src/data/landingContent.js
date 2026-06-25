const landingContent = {
  hero: {
    badge: "AI Automation Agency",
    headline: "Increase efficiency by 80%. Decrease cost by 85%.",
    headlineEmphasis: ["80%", "85%"],
    subheadline: "We automate repetitive work, streamline operations, and build AI-powered systems so your team focuses on what matters — growth.",
    primaryCTA: { label: "Book Consultation", href: "#contact" },
    secondaryCTA: { label: "See How We Work", href: "#process" },
    trustRow: {
      metrics: [
        { value: "80%", label: "Efficiency Increase" },
        { value: "85%", label: "Cost Decrease" },
        { value: "4–12wk", label: "To First Results" }
      ]
    }
  },

  problems: {
    badge: "Challenges",
    headline: "Sound familiar?",
    description: "These are the problems we solve every day.",
    items: [
      {
        id: "p1",
        title: "Your team wastes hours on repetitive tasks",
        description: "Data entry, copy-pasting between tools, manual reports — the work that drains energy and steals time from strategy."
      },
      {
        id: "p2",
        title: "Growth means more complexity, not less",
        description: "Every new client, product, or hire adds another layer of manual processes. Your team works harder just to stay in place."
      },
      {
        id: "p3",
        title: "Critical knowledge lives in people's heads",
        description: "When someone is out, sick, or leaves — operations suffer. Tribal knowledge creates single points of failure."
      },
      {
        id: "p4",
        title: "Your tools don't talk to each other",
        description: "Data lives in spreadsheets, emails, and separate systems. Your team wastes time reconciling information instead of using it."
      },
      {
        id: "p5",
        title: "Manual errors cost you clients and revenue",
        description: "Missed follow-ups, incorrect data, delayed responses — the small mistakes that compound into big problems."
      },
      {
        id: "p6",
        title: "Hiring more people isn't the answer",
        description: "You need scale, not headcount. Adding people to broken processes just multiplies the overhead."
      }
    ]
  },

  solutions: {
    badge: "Solutions",
    headline: "How we fix this",
    items: [
      {
        id: "s1",
        problem: "Your team spends hours each week on repetitive data entry and manual handoffs between systems.",
        solution: "We automate end-to-end workflows that connect your existing tools and eliminate manual steps entirely.",
        outcome: "Your team saves 15–20 hours per week. Processes complete in minutes instead of days."
      },
      {
        id: "s2",
        problem: "Critical information is scattered across spreadsheets, emails, and different software platforms.",
        solution: "We integrate your data into a single source of truth that everyone can access and trust.",
        outcome: "Faster decisions with accurate, real-time information. No more chasing data across five tools."
      },
      {
        id: "s3",
        problem: "Growth means more complexity, more errors, and more people needed just to keep up.",
        solution: "We build scalable systems that handle increased volume without requiring proportional staffing.",
        outcome: "You scale revenue while keeping operational costs flat. Growth becomes a strength, not a burden."
      },
      {
        id: "s4",
        problem: "Key processes depend on specific individuals, creating risk when people are unavailable.",
        solution: "We document and systematize tribal knowledge into reliable, repeatable processes.",
        outcome: "Operations continue smoothly regardless of who's available. New hires get productive faster."
      }
    ]
  },

  howWeWork: {
    badge: "Process",
    headline: "How we work",
    steps: [
      { id: "w1", number: "01", title: "Discover", description: "We learn your business, workflows, and where the biggest opportunities are." },
      { id: "w2", number: "02", title: "Design", description: "We map out solutions that fit your operations — not generic templates." },
      { id: "w3", number: "03", title: "Build", description: "We develop and test with your real data, in your real environment." },
      { id: "w4", number: "04", title: "Deploy", description: "We launch with zero disruption to your team. Training included." },
      { id: "w5", number: "05", title: "Optimize", description: "We refine based on real performance. Your systems get better over time." }
    ]
  },

  services: {
    badge: "Services",
    headline: "What we help with",
    items: [
      {
        id: "sv1",
        title: "AI Chatbots",
        description: "Intelligent chatbots that handle customer inquiries, qualify leads, and provide instant support — 24/7.",
        outcome: "Your team focuses on complex conversations while AI handles the routine."
      },
      {
        id: "sv2",
        title: "Workflow Automation",
        description: "We connect your tools and eliminate manual handoffs so work flows automatically from start to finish.",
        outcome: "Processes that used to take days now happen in minutes, without human intervention."
      },
      {
        id: "sv3",
        title: "Sales Funnel Optimization",
        description: "We automate lead capture, nurturing, and follow-up so no opportunity falls through the cracks.",
        outcome: "More leads converted, faster response times, and a pipeline that runs itself."
      },
      {
        id: "sv4",
        title: "Email Marketing Automation",
        description: "Targeted, personalized email sequences that nurture prospects and retain customers automatically.",
        outcome: "Higher open rates, better engagement, and revenue that grows while you sleep."
      },
      {
        id: "sv5",
        title: "Custom AI Tools",
        description: "Bespoke AI solutions built for your specific workflows — from data analysis to process automation.",
        outcome: "Tools that do exactly what your business needs, not what a generic platform allows."
      }
    ]
  },

  projects: {
    badge: "Projects",
    headline: "Proven results",
    placeholder: {
      title: "Case studies coming soon",
      text: "We're building our portfolio of client success stories. Each project follows the same structure: Industry, Problem, Solution, and Measurable Outcome.",
      fields: ["Industry", "Problem", "Solution", "Outcome", "Metric 1", "Metric 2"]
    },
    items: []
  },

  trust: {
    badge: "Trust",
    headline: "Trusted by teams building the future",
    logos: [],
    testimonials: [
      {
        id: "t1",
        quote: "The team understood our business before suggesting solutions. That made all the difference. They didn't just automate — they transformed how we work.",
        author: "Operations Director",
        company: "Financial Services"
      },
      {
        id: "t2",
        quote: "What used to take our team hours now happens automatically. The difference is night and day. Our team finally has time for strategic work.",
        author: "COO",
        company: "Healthcare Organization"
      },
      {
        id: "t3",
        quote: "They removed bottlenecks we didn't even know we had. Our processes run smoother than ever, and our team morale has improved significantly.",
        author: "CEO",
        company: "Logistics Company"
      }
    ],
    metrics: [
      { value: "80%", label: "Avg. Efficiency Gain" },
      { value: "85%", label: "Cost Reduction" },
      { value: "4–12wk", label: "To First Results" },
      { value: "100%", label: "Client Retention" }
    ]
  },

  faq: {
    badge: "FAQ",
    headline: "Common questions",
    items: [
      {
        id: "f1",
        question: "How long do projects take?",
        answer: "Most projects complete in 4–12 weeks, depending on scope and complexity. We start with smaller, high-impact wins and expand from there. You see results before the full project finishes."
      },
      {
        id: "f2",
        question: "Can my existing systems remain?",
        answer: "Yes. We work with your current tools and systems. Our goal is to improve how they work together, not replace everything. We integrate with what you already have."
      },
      {
        id: "f3",
        question: "Which industries do you work with?",
        answer: "We work across industries — finance, healthcare, logistics, e-commerce, and operations teams. Our approach works wherever there are repetitive processes and manual workflows."
      },
      {
        id: "f4",
        question: "What happens after I contact you?",
        answer: "We schedule a 30-minute discovery call to understand your operations and challenges. From there, we identify quick wins and outline a clear path forward. No pressure, no sales pitch."
      },
      {
        id: "f5",
        question: "How do projects work?",
        answer: "We follow a structured process: discover your needs, design solutions, build and test with real data, deploy with minimal disruption, and optimize based on results. You stay involved throughout."
      },
      {
        id: "f6",
        question: "Do you provide ongoing support?",
        answer: "Yes. We offer maintenance, optimization, and support packages after launch. Your systems continue running smoothly, and we refine them as your business evolves."
      },
      {
        id: "f7",
        question: "What if I'm not sure what I need?",
        answer: "That's exactly why we start with discovery. We help you identify where improvements will have the biggest impact. Many clients come to us knowing something is broken but not knowing where to start."
      },
      {
        id: "f8",
        question: "How does pricing work?",
        answer: "Pricing depends on project scope and complexity. We provide clear estimates after discovery so you know exactly what to expect. No hidden fees, no surprise costs."
      }
    ]
  },

  cta: {
    headline: "Ready to stop doing manual work?",
    description: "Let's identify where automation will save your team the most time and money. A 30-minute call to start.",
    primaryCTA: { label: "Book Consultation", href: "#contact" },
    secondaryCTA: { label: "Email Us", href: "mailto:hello@8085.ai" }
  },

  footer: {
    brandDescription: "8085 automates repetitive work and builds AI-powered systems so businesses can focus on growth.",
    servicesLinks: [
      { label: "AI Chatbots", href: "#services" },
      { label: "Workflow Automation", href: "#services" },
      { label: "Sales Funnels", href: "#services" },
      { label: "Email Marketing", href: "#services" },
      { label: "Custom AI Tools", href: "#services" }
    ],
    companyLinks: [
      { label: "About", href: "#" },
      { label: "Projects", href: "#projects" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" }
    ],
    connectLinks: [
      { label: "Book Consultation", href: "#contact" },
      { label: "hello@8085.ai", href: "mailto:hello@8085.ai" },
      { label: "LinkedIn", href: "https://linkedin.com/company/8085ai", external: true }
    ],
    copyright: "All rights reserved."
  }
};

export default landingContent;
