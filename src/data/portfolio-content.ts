import type { MakeItem, WorkItem } from "./types";

type HomeSection = {
  heroLines: {
    line1: string;
    accentLine: string;
    line3: string;
  };
  positioningLine: string;
  ctas: Array<{
    label: string;
    href: string;
    style: "button" | "link";
  }>;
  featuredWorkSlugs: string[];
};

type AboutSection = {
  bioParagraphs: string[];
  nowBlock: string;
  contactCta: {
    label: string;
    href: string;
  };
};

type PortfolioContent = {
  home: HomeSection;
  about: AboutSection;
  work: WorkItem[];
  make: MakeItem[];
};

export const PORTFOLIO_CONTENT: PortfolioContent = {
  home: {
    heroLines: {
      line1: "I ship AI products —",
      accentLine: "and end up owning the roadmap",
      line3: "whether anyone assigns it or not.",
    },
    positioningLine:
      "Product designer who’s spent the last year doing PM work because a team needed it — now doing it on purpose.",
    ctas: [
      {
        label: "VIEW WORK",
        href: "/work",
        style: "button",
      },
      {
        label: "ABOUT",
        href: "/about",
        style: "link",
      },
    ],
    featuredWorkSlugs: [
      "daosoft-ai-decision-intelligence",
      "nextleap-zomato-capstone",
    ],
  },
  about: {
    bioParagraphs: [
      "I started in chemical engineering, not design — NIT Nagpur, four years of process systems, before I found my way into UX during an internship at Univ.AI. That internship turned into building a learner platform’s first design system, and I was hooked.",
      "Since then I’ve spent three years building AI-powered products across edtech, legal-tech, and now decision-intelligence software — usually in small, founder-led teams where the line between 'design' and 'product' didn’t really exist. At DAOSoft.AI, that’s meant rebuilding an entire platform’s UI and design system, and also owning the AI feature roadmap, because the team didn’t have a dedicated PM and someone had to.",
      "That gap is what pushed me into NextLeap’s PM Fellowship, where I placed in the top 12% of 200+ fellows — not to leave design behind, but to get formal about the product thinking I’d already been doing informally for two years.",
    ],
    nowBlock:
      "Currently designing AI-native decision tools at DAOSoft.AI, while looking at roles — design or PM — where I can own a product end-to-end rather than just the interface.",
    contactCta: {
      label: "GET IN TOUCH",
      href: "mailto:deekshith.n7@gmail.com",
    },
  },
  work: [
    {
      slug: "daosoft-ai-decision-intelligence",
      id: "01",
      company: "DAOSoft.AI",
      title: "Filling the product gap on an AI decision-intelligence platform",
      category: "AI / Decision Intelligence",
      year: "2024",
      duration: "Mar 2024 – Present",
      tags: ["AI", "Enterprise", "Design Systems"],
      quickFacts: {
        role: "Product Designer (doing PM work)",
        duration: "Mar 2024 – Present",
        teamSize: "Small, founder-led, no dedicated PM",
        tools: "Figma, Cursor, VS Code, Codex",
      },
      tldr:
        "Rebuilt the entire UI and design system for an AI decision-intelligence platform, while also owning the AI feature roadmap in a team with no PM — cutting the design-to-dev cycle by roughly 20-25% along the way.",
      cover:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
      body: [
        {
          type: "text",
          content:
            "Context: DAOSoft.AI builds decision-intelligence software for large, technically sophisticated client organizations. The founding team came from an academic decision-analysis background — deep domain expertise, no product management function.",
        },
        {
          type: "text",
          content:
            "Constraints: No PM on the team. Domain knowledge (decision analysis theory) was dense and academic, needed translation into usable UX. Enterprise clients meant high stakes for every shipped decision.",
        },
        {
          type: "text",
          content:
            "Approach: Partnered directly with the academic founders to translate decision-analysis concepts into structured UX flows. Built a 100+ component design system to close the design-to-dev gap. Used Codex and VS Code to work directly in the front-end codebase rather than only handing off static designs.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop&auto=format",
          caption:
            "Abstracted workflow planner diagram of intake, synthesis, and execution loops.",
        },
        {
          type: "text",
          content:
            "Trade-offs & decisions: The first release prioritized reliable end-to-end workflows over feature breadth. We shipped the core planner and decision board before adding advanced personalization so the team could validate behavior with real clients.",
        },
        {
          type: "text",
          content:
            "Output: Rebuilt UI, visual language, and brand guidelines platform-wide. Shipped an AI-powered workflow planner that generates project charters and triggers downstream decision tasks. Designed 8+ complex task modules, each functioning as a standalone application within the platform.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=700&fit=crop&auto=format",
          caption:
            "Design-system sample: tokens, spacing, and component language used across modules.",
        },
        {
          type: "text",
          content: "Metrics: Roughly 20-25% reduction in design-to-dev cycle time.",
        },
        {
          type: "text",
          content:
            "Reflection: Operating without a PM taught me to think in roadmaps, not just screens. It’s also the experience that made me want to do product management deliberately, not by accident.",
        },
      ],
      closingNote: "Happy to walk through the workflow planner in more depth — reach out.",
    },
    {
      slug: "stealth-ai-legal-tech-split",
      id: "02",
      company: "Stealth AI Startup",
      title: "Splitting one legal-tech product into three, and shipping in 8 months",
      category: "Legal Tech / 0→1",
      year: "2023",
      duration: "Aug 2023 – Feb 2024",
      tags: ["Legal Tech", "0→1", "Segmentation"],
      quickFacts: {
        role: "Product Designer (MVP scoping & strategy)",
        duration: "Aug 2023 – Feb 2024",
        teamSize: "Small startup team",
        tools: "Figma",
      },
      tldr:
        "Ran customer segmentation that revealed three distinct user groups, drove the decision to split one unified legal-tech product into three focused solutions, and shipped web + mobile apps in 8 months to 1K+ downloads ahead of a seed-round demo.",
      cover:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop&auto=format",
      body: [
        {
          type: "text",
          content:
            "Context: A GPT-powered legal-tech startup (kept unnamed) building AI research and document-drafting tools for a broad early user base.",
        },
        {
          type: "text",
          content:
            "Constraints: 8-month runway, no room for scope creep, needed an investor-ready demo by a fixed date.",
        },
        {
          type: "text",
          content:
            "Approach: Conducted customer segmentation research, identifying lawyers, students, and the general public as three distinct groups with different jobs-to-be-done. Defined MVP scope and end-to-end user journeys for the AI research/drafting tools.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=700&fit=crop&auto=format",
          caption:
            "Segmentation matrix highlighting distinct jobs-to-be-done for lawyers, students, and public users.",
        },
        {
          type: "text",
          content:
            "Trade-offs & decisions: We chose to split into three focused products after user interviews showed radically different success criteria. Instead of building a configurable all-in-one tool, we delivered three products with clearer outcomes and faster proof.",
        },
        {
          type: "text",
          content:
            "Output: Two shipped products (web + mobile), concept to launch in 8 months.",
        },
        {
          type: "text",
          content: "Metrics: 1K+ downloads; successful seed-round investor demo.",
        },
        {
          type: "text",
          content:
            "Reflection: This is where I learned a segmentation insight can matter more than any single screen — the product decision came before any pixel did.",
        },
      ],
      closingNote: "Happy to talk through the segmentation approach — reach out.",
    },
    {
      slug: "univ-ai-design-system",
      id: "03",
      company: "Univ.AI",
      title: "Building a learner platform’s first design system",
      category: "EdTech / Design Systems",
      year: "2022",
      duration: "Oct 2022 – Apr 2023",
      tags: ["EdTech", "Design Systems", "Research"],
      quickFacts: {
        role: "UX/UI Design Intern",
        duration: "Oct 2022 – Apr 2023",
        teamSize: "Worked alongside senior designers",
        tools: "Figma",
      },
      tldr:
        "Redesigned an edtech learner platform’s onboarding and course discovery, then built the platform’s first scalable design system, reducing UI inconsistency and speeding up future development.",
      cover:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=700&fit=crop&auto=format",
      body: [
        {
          type: "text",
          content:
            "Where I was: My first real design role — still learning how research translates into decisions, working alongside senior designers who showed me the process.",
        },
        {
          type: "text",
          content:
            "Context: Univ.AI’s learner platform needed better onboarding, course discovery, and profile creation, plus a job-portal feature connecting learners with recruiters.",
        },
        {
          type: "text",
          content:
            "Approach: Conducted user interviews alongside senior designers, translating insights into actionable design decisions across onboarding, discovery, and profile flows.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop&auto=format",
          caption:
            "Recreated onboarding and discovery wireframes showing the simplified flow structure.",
        },
        {
          type: "text",
          content:
            "Output: Redesigned onboarding, discovery, and profile workflows; shipped job-portal features (application, tracking, feedback); built the platform’s first scalable design system.",
        },
        {
          type: "text",
          content:
            "Metrics: Reduced UI inconsistencies across the platform and cut iteration wait times during implementation handoffs.",
        },
        {
          type: "text",
          content:
            "Reflection: This internship set the direction for everything that followed — the first time I saw how research and system-thinking actually connect to shipped product.",
        },
      ],
      closingNote:
        "This was the project that got me hooked on design systems — happy to talk through it.",
    },
    {
      slug: "nextleap-zomato-capstone",
      id: "04",
      company: "NextLeap (Fellowship Capstone)",
      title: "Driving eco-feature adoption at Zomato — a PM fellowship project",
      category: "PM Fellowship Project",
      year: "2025",
      duration: "Feb – May 2025",
      tags: ["PM Fellowship", "KPI Trees", "PRD"],
      quickFacts: {
        role: "PM Fellow — capstone project",
        duration: "Feb – May 2025",
        teamSize: "Individual fellowship project",
        tools: "KPI trees, PRD writing, experimentation frameworks",
      },
      tldr:
        "Built a full PM case package — KPI dashboard, PRD, and experimentation roadmap — for driving eco-feature adoption on Zomato, as the capstone project for the NextLeap Product Management Fellowship (top ~12% of 200+ fellows, 87% score).",
      cover:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
      body: [
        {
          type: "text",
          content:
            "Note: This is a fellowship capstone exercise applied to a real consumer product (Zomato) as a case study, not a commissioned engagement with the company.",
        },
        {
          type: "text",
          content:
            "Context: The fellowship capstone required applying a full PM workflow to a real, publicly-understood consumer product problem — driving adoption of an eco-friendly feature on Zomato.",
        },
        {
          type: "text",
          content:
            "Approach: Built KPI trees, ran problem discovery, and applied prioritization frameworks learned during the fellowship to scope the eco-feature adoption problem.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
          caption:
            "Dashboard view with KPI tree, funnel health, and experimentation backlog.",
        },
        {
          type: "text",
          content:
            "Output: A KPI dashboard, a written PRD, and an experimentation roadmap.",
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
          caption: "PRD planning snapshot with hypotheses, scope, and release sequencing.",
        },
        {
          type: "text",
          content:
            "Reflection: This is the project where formal PM method — KPI trees, structured PRDs, experimentation design — replaced the informal product thinking I’d been doing on the job for two years.",
        },
      ],
      closingNote: "Full PRD and dashboard available on request.",
    },
  ],
  make: [
    {
      slug: "design-system-signal-board",
      id: "01",
      title: "Design System Signal Board",
      type: "Projects",
      year: "2024",
      link: "https://github.com",
      whatItIs:
        "A compact research ledger for collecting recurring design-system edge cases and recurring interface decisions.",
      whyIBuilt:
        "I wanted a faster way to keep design consistency when context shifts across features and teammates.",
      whatLearned:
        "A good system utility grows from repeated decisions, not one-time principles.",
    },
    {
      slug: "motion-threshold-lab",
      id: "02",
      title: "Motion Threshold Lab",
      type: "Experiments",
      year: "2025",
      link: "https://github.com",
      whatItIs:
        "A small interaction playground for timing motion, state transitions, and scroll-linked behavior before they become global patterns.",
      whyIBuilt:
        "I wanted to tune micro-interactions in isolation and avoid shipping subtle motion that distracted from content.",
      whatLearned:
        "The most noticeable motion is often the one users almost do not consciously notice.",
    },
  ],
};
