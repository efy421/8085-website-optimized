const landingContent = {
  hero: {
    badge: "Software House",
    headline: "Scale operations without increasing complexity",
    subheadline: "We help businesses reduce operational bottlenecks and automate repetitive work so teams can focus on growth instead of manual processes.",
    primaryCTA: { label: "Book Consultation", href: "#contact" },
    secondaryCTA: { label: "See How We Work", href: "#process" },
    trustRow: {
      metrics: [
        { value: "50+", label: "Projects Delivered" },
        { value: "70%", label: "Average Time Saved" },
        { value: "98%", label: "Client Satisfaction" }
      ]
    }
  },

  problems: {
    badge: "Challenges",
    headline: "Common operational challenges",
    description: "These are the problems we solve every day.",
    items: [
      {
        id: "p1",
        title: "Manual Operations",
        description: "Your team spends hours on repetitive tasks that could be handled automatically. Every manual step is time stolen from strategic work."
      },
      {
        id: "p2",
        title: "Process Bottlenecks",
        description: "Approvals pile up, tasks wait on individuals, and workflows stall. Slow processes cost you revenue and frustrate your team."
      },
      {
        id: "p3",
        title: "Disconnected Tools",
        description: "Data lives in spreadsheets, emails, and separate systems. Your team wastes time switching between tools and reconciling information."
      },
      {
        id: "p4",
        title: "Human Dependency",
        description: "Critical knowledge lives in a few people's heads. When they leave or take time off, operations suffer and mistakes increase."
      },
      {
        id: "p5",
        title: "Scaling Challenges",
        description: "Growth brings more complexity, not less. Your current processes break down under pressure, and hiring more people only adds overhead."
      },
      {
        id: "p6",
        title: "Slow Execution",
        description: "Good ideas take months to implement. By the time solutions are ready, the business needs have already changed."
      }
    ]
  },

  solutions: {
    badge: "Solutions",
    headline: "How we help",
    items: [
      {
        id: "s1",
        problem: "Your team spends hours each week on repetitive data entry and manual handoffs between systems.",
        solution: "We automate end-to-end workflows that connect your existing tools and eliminate manual steps.",
        outcome: "Your team saves 15-20 hours per week and processes complete in minutes instead of days."
      },
      {
        id: "s2",
        problem: "Critical information is scattered across spreadsheets, emails, and different software platforms.",
        solution: "We integrate your data into a single source of truth that everyone can access and trust.",
        outcome: "Your team makes faster decisions with accurate, real-time information at their fingertips."
      },
      {
        id: "s3",
        problem: "Growth means more complexity, more errors, and more people needed just to keep up.",
        solution: "We build scalable systems that handle increased volume without requiring proportional staffing increases.",
        outcome: "You scale revenue while keeping operational costs flat and team stress manageable."
      },
      {
        id: "s4",
        problem: "Key processes depend on specific individuals, creating risk when people are unavailable.",
        solution: "We document and systematize tribal knowledge into reliable, repeatable processes.",
        outcome: "Your operations continue smoothly regardless of who is available, and new hires get productive faster."
      }
    ]
  },

  howWeWork: {
    badge: "Process",
    headline: "How we work",
    steps: [
      { id: "w1", number: "01", title: "Discover", description: "We learn your business, workflows, and challenges." },
      { id: "w2", number: "02", title: "Design", description: "We map out solutions that fit your operations." },
      { id: "w3", number: "03", title: "Build", description: "We develop and test with real data." },
      { id: "w4", number: "04", title: "Deploy", description: "We launch with zero disruption to your team." },
      { id: "w5", number: "05", title: "Optimize", description: "We refine based on real performance." }
    ]
  },

  services: {
    badge: "Services",
    headline: "What we help with",
    items: [
      {
        id: "sv1",
        title: "Process Automation",
        description: "We replace manual, repetitive tasks with automated workflows that run consistently.",
        outcome: "Your team frees up hours each week for higher-value work."
      },
      {
        id: "sv2",
        title: "Workflow Optimization",
        description: "We redesign how work moves through your organization to eliminate bottlenecks.",
        outcome: "Projects complete faster with fewer delays and handoff issues."
      },
      {
        id: "sv3",
        title: "Data Integration",
        description: "We connect your systems so information flows automatically between them.",
        outcome: "Your team stops switching tools and starts making decisions faster."
      },
      {
        id: "sv4",
        title: "Reporting & Analytics",
        description: "We build dashboards and reports that give you real-time visibility into operations.",
        outcome: "You spot problems early and track improvements with clear metrics."
      },
      {
        id: "sv5",
        title: "Operations Consulting",
        description: "We analyze your workflows and identify where improvements will have the biggest impact.",
        outcome: "You get a clear roadmap for reducing costs and improving efficiency."
      },
      {
        id: "sv6",
        title: "System Modernization",
        description: "We upgrade outdated systems to reliable, maintainable solutions that scale.",
        outcome: "You reduce technical debt and gain systems that grow with your business."
      }
    ]
  },

  projects: {
    badge: "Projects",
    headline: "Proven results",
    items: [
      {
        id: "pj1",
        industry: "Finance",
        title: "Automated Reporting & Approvals",
        problem: "A financial services firm was spending 40 hours per week compiling reports from multiple spreadsheets. Approval workflows stalled regularly, causing delays in client deliverables.",
        solution: "We consolidated their reporting into a single automated system and streamlined approval workflows. Managers now review and approve with one click instead of chasing emails.",
        outcome: "Reporting time dropped from 2 days to 2 hours. Approvals that took a week now complete same-day.",
        metrics: [
          { value: "90%", label: "Faster Reporting" },
          { value: "38hrs", label: "Saved Weekly" }
        ],
        cta: { label: "View Case Study", href: "#" },
        imageColor: "#1a365d"
      },
      {
        id: "pj2",
        industry: "Healthcare",
        title: "Streamlined Patient Intake",
        problem: "A healthcare organization handled patient intake through paper forms and manual data entry. Staff spent hours each day transcribing information, leading to errors and long wait times.",
        solution: "We digitized the intake process and connected it directly to their scheduling system. Patients now complete forms online before their visit, and data flows automatically.",
        outcome: "Patient wait times reduced by 60%. Staff error rates dropped to near zero, and team morale improved significantly.",
        metrics: [
          { value: "60%", label: "Less Wait Time" },
          { value: "95%", label: "Fewer Errors" }
        ],
        cta: { label: "View Case Study", href: "#" },
        imageColor: "#1a3a2a"
      },
      {
        id: "pj3",
        industry: "Logistics",
        title: "Delivery Route Optimization",
        problem: "A logistics company managed delivery routes manually, resulting in inefficient schedules, excessive fuel costs, and inconsistent delivery windows that frustrated customers.",
        solution: "We implemented a route management system that automatically assigns deliveries based on location, priority, and capacity. Drivers receive optimized routes each morning.",
        outcome: "Fuel costs decreased 25% and on-time deliveries improved from 78% to 96%. Customer complaints dropped significantly.",
        metrics: [
          { value: "25%", label: "Lower Fuel Costs" },
          { value: "96%", label: "On-Time Delivery" }
        ],
        cta: { label: "View Case Study", href: "#" },
        imageColor: "#3a2a1a"
      },
      {
        id: "pj4",
        industry: "Operations",
        title: "Cross-Department Data Entry",
        problem: "An operations team manually entered the same data into 5 different systems. Each department maintained separate records, causing version conflicts and wasted hours.",
        solution: "We created a unified data entry point that automatically syncs information across all systems. Updates made once propagate everywhere in real-time.",
        outcome: "Data entry time reduced by 80%. Team members now spend time analyzing information instead of inputting it.",
        metrics: [
          { value: "80%", label: "Less Data Entry" },
          { value: "12hrs", label: "Saved Weekly" }
        ],
        cta: { label: "View Case Study", href: "#" },
        imageColor: "#2a1a3a"
      }
    ]
  },

  trust: {
    badge: "Trust",
    headline: "Trusted by teams across industries",
    logos: [
      { name: "Client 1", src: "/logos/client1.svg" },
      { name: "Client 2", src: "/logos/client2.svg" },
      { name: "Client 3", src: "/logos/client3.svg" },
      { name: "Client 4", src: "/logos/client4.svg" },
      { name: "Client 5", src: "/logos/client5.svg" }
    ],
    testimonials: [
      {
        id: "t1",
        quote: "The team helped us remove bottlenecks and significantly reduce manual effort.",
        author: "Operations Director",
        company: "Financial Services Firm"
      },
      {
        id: "t2",
        quote: "What used to take our team hours now happens automatically. The difference is night and day.",
        author: "COO",
        company: "Healthcare Organization"
      },
      {
        id: "t3",
        quote: "They understood our business before suggesting solutions. That made all the difference.",
        author: "CEO",
        company: "Logistics Company"
      }
    ],
    metrics: [
      { value: "50+", label: "Projects Delivered" },
      { value: "30+", label: "Industries Served" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "70%", label: "Average Time Saved" }
    ]
  },

  faq: {
    badge: "FAQ",
    headline: "Common questions",
    items: [
      {
        id: "f1",
        question: "How long do projects take?",
        answer: "Most projects complete in 4-12 weeks, depending on scope and complexity. We start with smaller, high-impact wins and expand from there. You will see results before the full project finishes."
      },
      {
        id: "f2",
        question: "Can my existing systems remain?",
        answer: "Yes. We work with your current tools and systems. Our goal is to improve how they work together, not replace everything. We integrate with what you already have."
      },
      {
        id: "f3",
        question: "Which industries do you work with?",
        answer: "We serve financial services, healthcare, logistics, manufacturing, and operations teams across various sectors. Our approach works wherever there are repetitive processes and manual workflows."
      },
      {
        id: "f4",
        question: "What happens after I contact you?",
        answer: "We schedule a 30-minute discovery call to understand your operations and challenges. From there, we identify quick wins and outline a plan. No pressure, no sales pitch."
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
        question: "What if I am not sure what I need?",
        answer: "That is exactly why we start with discovery. We help you identify where improvements will have the biggest impact. Many clients come to us knowing something is broken but not knowing where to start."
      },
      {
        id: "f8",
        question: "How does pricing work?",
        answer: "Pricing depends on project scope and complexity. We provide clear estimates after discovery so you know exactly what to expect. No hidden fees, no surprise costs."
      }
    ]
  },

  cta: {
    headline: "Ready to improve your operations?",
    description: "Let's discuss your workflows and identify opportunities to reduce manual work and improve efficiency.",
    primaryCTA: { label: "Book Consultation", href: "#contact" },
    secondaryCTA: { label: "Contact Team", href: "#contact" }
  },

  footer: {
    brandDescription: "8085 helps businesses automate repetitive work and improve operational efficiency.",
    servicesLinks: [
      { label: "Process Automation", href: "#services" },
      { label: "Workflow Optimization", href: "#services" },
      { label: "Data Integration", href: "#services" },
      { label: "Operations Consulting", href: "#services" }
    ],
    companyLinks: [
      { label: "About", href: "#" },
      { label: "Projects", href: "#projects" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" }
    ],
    connectLinks: [
      { label: "Book Consultation", href: "#contact" },
      { label: "hello@8085.io", href: "mailto:hello@8085.io" }
    ],
    copyright: "All rights reserved."
  }
};

export default landingContent;
