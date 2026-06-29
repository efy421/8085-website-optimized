const founders = [
  {
    name: "Farhan Shamim",
    role: "Chief Technology Officer",
    description: "Engineering AI architectures that scale enterprise operations without adding headcount.",
    linkedin: "https://linkedin.com/in/farhanshamim",
    image: `${import.meta.env.BASE_URL}images/founder-farhan.jpg`
  },
  {
    name: "Sameer Shamim",
    role: "Chief Operating Officer",
    description: "Designing lean operational frameworks that maximize ROI from day one.",
    linkedin: "https://linkedin.com/in/sameershamim",
    image: `${import.meta.env.BASE_URL}images/founder-sameer.jpg`
  },
  {
    name: "Essam Shamim",
    role: "Chief Marketing Officer",
    description: "Building market strategies that translate technical excellence into client growth.",
    linkedin: "https://linkedin.com/in/essamshamim",
    image: `${import.meta.env.BASE_URL}images/founder-essam.jpg`
  }
];

const securityItems = [
  {
    title: "Data Sovereignty",
    icon: "shield",
    description: "All AI agents run inside your own infrastructure. Your data never leaves your environment."
  },
  {
    title: "Enterprise Compliance",
    icon: "check-circle",
    description: "SOC2-ready architecture built to meet the compliance requirements of regulated industries."
  },
  {
    title: "End-to-End Encryption",
    icon: "lock",
    description: "Every data pipeline is encrypted in transit and at rest. Zero exposure points."
  }
];

const integrationIcons = [
  { name: "n8n", light: `${import.meta.env.BASE_URL}images/tech-n8n.svg`, dark: `${import.meta.env.BASE_URL}images/tech-n8n.svg` },
  { name: "Apify", light: `${import.meta.env.BASE_URL}images/tech-apify.svg`, dark: `${import.meta.env.BASE_URL}images/tech-apify.svg` },
  { name: "OpenAI", light: `${import.meta.env.BASE_URL}images/tech-openai.svg`, dark: `${import.meta.env.BASE_URL}images/tech-openai.svg` },
  { name: "Make.com", light: `${import.meta.env.BASE_URL}images/tech-make.svg`, dark: `${import.meta.env.BASE_URL}images/tech-make.svg` },
  { name: "Python", light: `${import.meta.env.BASE_URL}images/tech-python.svg`, dark: `${import.meta.env.BASE_URL}images/tech-python.svg` },
  { name: "AWS / GCP", light: `${import.meta.env.BASE_URL}images/tech-cloud.svg`, dark: `${import.meta.env.BASE_URL}images/tech-cloud.svg` }
];

const landingContent = {
  hero: {
    badge: "AI & Automation Agency",
    headline: "Scale your operations without scaling your headcount.",
    headlineEmphasis: ["operations", "headcount."],
    description: "We engineer intelligent agents and seamless automation workflows that eliminate repetitive tasks, slash costs by 85%, and let your team focus on growth.",
    signals: [
      "Custom workflow architecture",
      "Seamless API integrations",
      "You own the final system"
    ],
    primaryCTA: { label: "Book a Call", href: "#contact" },
    secondaryCTA: { label: "Explore Our Process", href: "#how-we-work" },
    trustRow: {
      metrics: [
        { value: "80%", label: "Efficiency Increase" },
        { value: "85%", label: "Cost Reduction" },
        { value: "4–12wk", label: "To First ROI" }
      ]
    }
  },

  problems: {
    badge: "The Breakdown",
    headline: "Sound painfully familiar?",
    description: "These are the operational bottlenecks draining your margins every single day.",
    items: [
      {
        id: "p1",
        title: "Drowning in data entry",
        description: "Copy-pasting between CRMs, spreadsheets, and emails is stealing thousands of hours from your team's strategic work."
      },
      {
        id: "p2",
        title: "Growth equals chaos",
        description: "Every new client or hire adds another layer of manual overhead. Your team is working harder just to stay in the exact same place."
      },
      {
        id: "p3",
        title: "Empty sales pipelines",
        description: "Lead generation is inconsistent because manual outreach takes too much time, and follow-ups constantly fall through the cracks."
      },
      {
        id: "p4",
        title: "Siloed software systems",
        description: "Your tech stack doesn't communicate. Your team spends more time reconciling fragmented data than actually using it to make decisions."
      },
      {
        id: "p5",
        title: "Costly human errors",
        description: "Missed emails, incorrect data logs, and delayed responses—small manual mistakes that compound into lost clients and revenue."
      },
      {
        id: "p6",
        title: "Hiring isn't the fix",
        description: "You need scalable systems, not just more headcount. Throwing more people at a broken process just multiplies the confusion."
      }
    ]
  },

  solutions: {
    badge: "Our Solutions",
    headline: "How we engineer the fix",
    description: "We don't just patch problems; we eliminate the root cause through intelligent automation, data scraping, and agentic workflows.",
    items: [
      {
        id: "s1",
        problem: "Your team spends hours each week on repetitive data entry and manual handoffs.",
        title: "End-to-End Automation",
        description: "We connect your entire tech stack, eliminating manual touchpoints so work flows instantly.",
        outcome: "Processes that took days are executed flawlessly in seconds. Your team gets 20+ hours back every week."
      },
      {
        id: "s2",
        problem: "Sales reps waste time manually hunting for leads and managing outreach.",
        title: "Automated Lead Generation",
        description: "We build dynamic outreach architectures that scrape, qualify, and engage prospects automatically.",
        outcome: "A consistently full pipeline of qualified leads, allowing your sales team to focus purely on closing."
      },
      {
        id: "s3",
        problem: "Growth adds complexity and requires expensive new hires to manage the volume.",
        title: "Scalable Infrastructure",
        description: "Deploy AI agents and automated systems that handle infinite volume without breaking a sweat.",
        outcome: "You scale your client base and revenue while keeping operational costs completely flat."
      },
      {
        id: "s4",
        problem: "Critical data is trapped on third-party websites or buried in unstructured documents.",
        title: "Advanced Data Extraction",
        description: "Custom web scraping and parsing tools that pull exactly the data you need from anywhere on the web.",
        outcome: "Clean, structured data delivered directly to your database, powering faster, more accurate business decisions."
      }
    ]
  },

  howWeWork: {
    badge: "The Process",
    headline: "How we deploy",
    description: "A lean, engineering-first approach designed to get you maximum ROI with zero operational disruption.",
    steps: [
      { id: "w1", number: "01", title: "Audit", description: "We analyze your current tech stack and pinpoint the exact workflows bleeding time and money." },
      { id: "w2", number: "02", title: "Architect", description: "We design a custom automation blueprint tailored specifically to your business logic." },
      { id: "w3", number: "03", title: "Engineer", description: "We build, integrate, and stress-test the AI agents and automation logic in a secure environment." },
      { id: "w4", number: "04", title: "Launch", description: "Seamless deployment into your live operations, complete with team training and documentation." },
      { id: "w5", number: "05", title: "Optimize", description: "Continuous monitoring and refinement to ensure your new systems scale effortlessly." }
    ]
  },

  services: {
    badge: "Core Expertise",
    headline: "Our technical capabilities",
    description: "We build robust, tailored systems. No duct-tape solutions, no cookie-cutter templates.",
    items: [
      {
        id: "sv1",
        title: "B2B Lead Gen & Outreach",
        description: "Automated data extraction and dynamic LinkedIn/Email outreach architectures that keep your sales pipeline full.",
        outcome: "Consistent, high-quality appointments booked on autopilot."
      },
      {
        id: "sv2",
        title: "Web Scraping & Data Extraction",
        description: "Advanced scraping workflows leveraging tools like Apify and PhantomBuster to pull critical market or client data.",
        outcome: "Structured, real-time data delivered directly to your CRM without manual input."
      },
      {
        id: "sv3",
        title: "AI Voice & Chat Agents",
        description: "Intelligent, conversational AI deployed across your channels to handle customer inquiries, qualify leads, and provide 24/7 support.",
        outcome: "Instant response times and massive reductions in customer support overhead."
      },
      {
        id: "sv4",
        title: "Complex Workflow Automation",
        description: "Deep API integrations connecting your disparate software tools so data moves seamlessly from trigger to final action.",
        outcome: "Zero manual handoffs, eliminating human error and drastically speeding up delivery."
      },
      {
        id: "sv5",
        title: "Custom AI Tooling",
        description: "Bespoke AI solutions and internal dashboards built specifically around your unique operational bottlenecks.",
        outcome: "Proprietary software assets that give your business a permanent competitive advantage."
      }
    ]
  },

  projects: {
    badge: "Case Studies",
    headline: "Proven results across industries",
    description: "Real outcomes for real businesses. Here is how we transform operations.",
    items: [
      {
        id: "cs1",
        industry: "Automotive",
        client: "Audi",
        title: "Manufacturing Quality Reporting Automation",
        problem: "Quality inspection teams spent 20+ hours per week manually compiling reports from production line sensors, spreadsheets, and ERP systems. Delayed reporting meant defects went undetected for days.",
        solution: "We built an automated data pipeline that ingests sensor data, quality metrics, and production logs in real-time. Reports generate automatically with anomaly detection highlighting issues instantly.",
        outcome: "Reporting time dropped from 20 hours to 2 hours per week. Defect detection went from days to minutes. Quality team redirected to root-cause analysis.",
        metrics: [
          { value: "90%", label: "Time Reduction" },
          { value: "10x", label: "Faster Detection" }
        ],
        cta: { label: "Read Full Case Study", href: "#contact" },
        imageColor: "#1a1a2e"
      },
      {
        id: "cs2",
        industry: "Logistics",
        client: "DHL",
        title: "Warehouse Operations Streamlining",
        problem: "Warehouse staff manually reconciled orders across 3 separate systems. Errors in data entry caused 12% of shipments to have incorrect inventory records, leading to returns and customer complaints.",
        solution: "We unified the order management system with automated inventory sync across all warehouses. Barcode scanning feeds directly into the system, eliminating manual data entry entirely.",
        outcome: "Error rate dropped from 12% to 0.3%. Fulfillment speed doubled. Customer complaints reduced by 78% within the first quarter.",
        metrics: [
          { value: "97%", label: "Error Reduction" },
          { value: "2x", label: "Fulfillment Speed" }
        ],
        cta: { label: "Read Full Case Study", href: "#contact" },
        imageColor: "#1a2e1a"
      },
      {
        id: "cs3",
        industry: "Pharmaceuticals",
        client: "Bayer",
        title: "Research Data Pipeline Modernization",
        problem: "Research teams spent 30% of their time on data wrangling — copying results between lab systems, formatting for reports, and chasing approvals via email. Critical insights were buried in spreadsheets.",
        solution: "We automated the data pipeline from lab instruments to analysis dashboards. Approval workflows moved to automated routing with SLA tracking. Researchers get real-time visibility into pipeline status.",
        outcome: "Researchers reclaimed 15+ hours per week previously spent on data wrangling. Time from experiment to actionable insight reduced by 60%.",
        metrics: [
          { value: "60%", label: "Faster Insights" },
          { value: "15hr", label: "Saved Weekly" }
        ],
        cta: { label: "Read Full Case Study", href: "#contact" },
        imageColor: "#2e1a1a"
      }
    ]
  },

  trust: {
    badge: "The Proof",
    headline: "Trusted by forward-thinking teams",
    description: "We've earned the confidence of organizations across the globe by consistently delivering scalable infrastructure.",
    founders,
    logos: [
      { name: "Audi", src: `${import.meta.env.BASE_URL}images/partners-logo-audi.svg` },
      { name: "DHL", src: `${import.meta.env.BASE_URL}images/partners-logo-dhl.svg` },
      { name: "Bayer", src: `${import.meta.env.BASE_URL}images/partners-logo-bayer.svg` },
      { name: "Mubea", src: `${import.meta.env.BASE_URL}images/partners-logo-mubea.svg` },
      { name: "Postbank", src: `${import.meta.env.BASE_URL}images/partners-logo-postbank.svg` },
      { name: "Cologne Intelligence", src: `${import.meta.env.BASE_URL}images/partners-logo-ci.webp` }
    ],
    testimonials: [
      {
        id: "t1",
        quote: "The 8085.ai team understood our business logic before writing a single line of code. They didn't just automate tasks—they completely transformed our operational capacity.",
        author: "Operations Director",
        company: "Financial Services"
      },
      {
        id: "t2",
        quote: "Our lead generation used to require three full-time employees. Now, the scraping and outreach workflows they built handle it flawlessly in the background.",
        author: "VP of Sales",
        company: "B2B SaaS"
      },
      {
        id: "t3",
        quote: "They found and eliminated bottlenecks we didn't even know we had. Our processes run smoother than ever, and our margins have drastically improved.",
        author: "CEO",
        company: "Logistics Firm"
      }
    ],
    metrics: [
      { value: "80%", label: "Avg. Efficiency Gain" },
      { value: "85%", label: "Cost Reduction" },
      { value: "4–12wk", label: "To First ROI" },
      { value: "100%", label: "Client Retention" }
    ]
  },

  security: {
    badge: "Enterprise Security",
    headline: "Built for the most demanding compliance environments.",
    description: "Your infrastructure, your data, your control. We architect systems that meet enterprise-grade security requirements out of the box.",
    items: securityItems
  },

  integrationHub: {
    badge: "Your Stack",
    headline: "Integrates with the tools you already use.",
    description: "We connect directly to your existing tech stack via APIs. No migration required.",
    items: integrationIcons
  },

  faq: {
    badge: "FAQ",
    headline: "Common questions",
    items: [
      {
        id: "f1",
        question: "How long do implementation projects take?",
        answer: "Most automated workflows are deployed within 4–12 weeks. We prioritize low-hanging fruit first, ensuring you see tangible ROI while we build out the more complex architectures."
      },
      {
        id: "f2",
        question: "Do we need to replace our current software?",
        answer: "No. We integrate directly with your existing tech stack via APIs. Our goal is to make your current tools talk to each other seamlessly, not force you to migrate to new platforms."
      },
      {
        id: "f3",
        question: "How do you handle web scraping and lead generation?",
        answer: "We build resilient, compliant data extraction pipelines. Whether pulling market data or automating B2B outreach, we ensure the data is clean, structured, and routed directly into your CRM."
      },
      {
        id: "f4",
        question: "What happens during the initial consultation?",
        answer: "We conduct a 30-minute technical discovery call to map your current bottlenecks. If we can solve them, we'll outline a clear architectural plan. No aggressive sales pitches."
      },
      {
        id: "f5",
        question: "Who owns the automations once they are built?",
        answer: "You do. We build the infrastructure inside your accounts, meaning you retain full ownership and control of the data, the AI agents, and the workflows."
      },
      {
        id: "f6",
        question: "Do you provide ongoing support?",
        answer: "Absolutely. APIs update and business logic changes. We offer retainer packages to monitor, maintain, and continuously optimize your systems so they never break."
      }
    ]
  },

  cta: {
    headline: "Stop paying humans to act like robots.",
    description: "Let's engineer a system that scales your business without scaling your payroll. Book a technical discovery call today.",
    primaryCTA: { label: "Book a Call", href: "#contact" },
    secondaryCTA: { label: "Email Us", href: "mailto:hello@8085.ai" }
  },

  footer: {
    brandDescription: "8085.ai engineers intelligent agents and automated workflows so businesses can scale efficiently and focus on growth.",
    servicesLinks: [
      { label: "B2B Lead Generation", href: "#services" },
      { label: "Web Scraping", href: "#services" },
      { label: "AI Voice Agents", href: "#services" },
      { label: "Workflow Automation", href: "#services" },
      { label: "Custom Tooling", href: "#services" }
    ],
    companyLinks: [
      { label: "About", href: "#" },
      { label: "Case Studies", href: "#projects" },
      { label: "Our Process", href: "#how-we-work" },
      { label: "Contact", href: "#contact" }
    ],
    connectLinks: [
      { label: "Book a Call", href: "#contact" },
      { label: "hello@8085.ai", href: "mailto:hello@8085.ai" },
      { label: "LinkedIn", href: "https://linkedin.com/company/8085ai", external: true }
    ],
    copyright: "All rights reserved."
  }
};

export default landingContent;