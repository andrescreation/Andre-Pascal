import { z } from "zod";
import { ProjectSchema, type Project } from "./schema";

const rawProjects: Project[] = [
  {
    slug: "pepsa",
    title: "Pepsa",
    category: ["Product UI", "Web"],
    year: "2022 to 2023",
    role: "UI/UX & Frontend Interface Designer",
    tools: ["Figma", "React", "Adobe Illustrator"],
    // TODO: [ANDRE: Pepsa live URL]
    summary: "Dashboards and onboarding for a digital payments and credit platform.",
    overview:
      "Pepsa is a digital payments and credit platform for everyday customers and merchants. I joined to design the core product experience: onboarding, dashboards and the screens people use to track their money.",
    challenge:
      "Financial products live or die on trust. The interface had to make balances, transactions and credit information easy to read on small screens, without feeling cold or complicated.",
    approach:
      "I set a clear hierarchy for financial data so the most important number on each screen is obvious. I designed onboarding as a short, guided flow, built responsive dashboard layouts, and worked closely with the product and engineering leads so the React build matched the designs pixel for pixel.",
    // TODO: [ANDRE: add a real metric for Pepsa if you have one]
    outcome:
      "The product launched and is live. The design gave Pepsa a calm, trustworthy interface that works as well on a budget Android phone as on desktop.",
    cover: "/images/projects/pepsa/cover",
    gallery: [
      "/images/projects/pepsa/onboarding",
      "/images/projects/pepsa/dashboard",
      "/images/projects/pepsa/transactions",
    ],
    marqueeRow: 1,
    order: 1,
    draft: false,
  },
  {
    slug: "mysounds-global",
    title: "MySounds Global",
    category: ["Product UI", "Brand"],
    year: "2026",
    role: "Product Designer & UI Builder (retainer)",
    tools: ["Figma", "React Native", "Adobe Photoshop"],
    // TODO: [ANDRE: MySounds live URL or app store link]
    summary: "An 11 screen creator and music marketplace app, from onboarding to storefront.",
    overview:
      "MySounds Global is a Web3 creator and music marketplace where artists sell and share their work. I led the visual direction and the UI architecture for the mobile experience.",
    challenge:
      "Artists and fans are very different users, and Web3 concepts can scare people away. The app needed to feel like a music product first and a marketplace second.",
    approach:
      "I designed 11 core screens covering artist onboarding, profiles, storefronts and digital asset flows. I built a set of reusable components and interface specs so new features could roll out quickly without breaking the look. I also produced launch graphics and mockups for creator acquisition.",
    // TODO: [ANDRE: add a real metric for MySounds Global if you have one]
    outcome: "The product went live with a consistent visual system the team could keep extending.",
    cover: "/images/projects/mysounds-global/cover",
    gallery: [
      "/images/projects/mysounds-global/onboarding",
      "/images/projects/mysounds-global/storefront",
    ],
    marqueeRow: 1,
    order: 2,
    draft: false,
  },
  {
    slug: "supashop",
    title: "SupaShop",
    category: ["Product UI", "Web"],
    year: "2024",
    role: "Lead UI/UX & Web Designer, Supa Inc.",
    tools: ["Figma", "Next.js", "Tailwind CSS"],
    // TODO: [ANDRE: SupaShop URL or remove]
    summary: "Storefront, catalogue and checkout design for Supa Inc.'s e-commerce product.",
    overview:
      "SupaShop is the e-commerce product in the Supa Inc. suite. I designed the storefront experience, from browsing the catalogue to checking out.",
    challenge:
      "Shoppers needed to find products quickly and check out without friction, on mobile first.",
    approach:
      "I designed responsive storefront layouts, catalogue browsing and filtering, product pages and a short checkout flow, all built from the shared Supa design system so it felt like one family with the other products.",
    outcome:
      "The redesigned UI and marketing visuals helped drive about a 40% increase in user engagement.",
    cover: "/images/projects/supashop/cover",
    gallery: ["/images/projects/supashop/checkout", "/images/projects/supashop/catalogue"],
    marqueeRow: 1,
    order: 3,
    draft: false,
  },
  {
    slug: "supadex",
    title: "SupaDex",
    category: ["Product UI"],
    year: "2024",
    role: "Lead UI/UX & Web Designer, Supa Inc.",
    tools: ["Figma"],
    summary: "A token exchange interface designed for clarity under pressure.",
    overview: "SupaDex is the decentralized exchange in the Supa Inc. suite.",
    challenge:
      "Trading screens carry a lot of live information, and mistakes cost real money. Every number had to be readable and every action reversible until confirmed.",
    approach:
      "I designed the swap flow, token selection, price and fee breakdowns and confirmation states, with strong visual hierarchy and clear warnings where they matter.",
    // TODO: [ANDRE: add detail or metric for SupaDex]
    outcome:
      "A trading experience that feels calm and readable, sharing one design language with the other Supa products.",
    cover: "/images/projects/supadex/cover",
    gallery: [],
    marqueeRow: 1,
    order: 4,
    draft: false,
  },
  {
    slug: "andre-creations-portfolio",
    title: "Andre Creations Portfolio",
    category: ["Web", "Brand"],
    year: "2026",
    role: "Designer and developer",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Vercel"],
    liveUrl: "https://andrescreation.vercel.app",
    // TODO: [ANDRE: GitHub repo URL if public]
    summary:
      "The site you're on. Designed and built from scratch, no backend, scores 90+ on Lighthouse.",
    overview:
      "I rebuilt my portfolio as a fast, static site with editorial design and scroll driven motion.",
    challenge:
      "My old portfolio relied on an admin panel and a database that kept losing data. I wanted something that could never break, still looked premium and was easy to update.",
    approach:
      "Static Next.js with all content in the codebase, an image pipeline that compresses every image to lightweight WebP before deploy, GSAP scroll animation on desktop only, automated end to end, accessibility and performance tests.",
    // TODO: [ANDRE: add final Lighthouse scores after launch]
    outcome: "Zero backend, zero database, nothing to hack or wipe.",
    cover: "/images/projects/andre-creations-portfolio/cover",
    gallery: [],
    marqueeRow: 1,
    order: 5,
    draft: false,
  },
  {
    slug: "supadao",
    title: "SupaDAO",
    category: ["Product UI"],
    year: "2024",
    role: "Lead UI/UX & Web Designer, Supa Inc.",
    tools: ["Figma"],
    summary: "A governance interface that makes proposals and voting easy to follow.",
    overview:
      "SupaDAO is the community governance product in the Supa Inc. suite, where members create proposals and vote.",
    challenge:
      "Governance tools are usually dense and technical. Members needed to understand a proposal and cast a vote in a few taps.",
    approach:
      "I designed clear proposal cards, a simple voting flow with confirmation states and a results view that shows where a vote stands at a glance, using components from the shared design system.",
    // TODO: [ANDRE: add detail or metric for SupaDAO]
    outcome:
      "A cleaner, more approachable governance experience, consistent with the rest of the Supa suite.",
    cover: "/images/projects/supadao/cover",
    gallery: [],
    marqueeRow: 2,
    order: 6,
    draft: false,
  },
  {
    slug: "supacore-design-system",
    title: "SupaCore Design System",
    category: ["Product UI", "Brand"],
    year: "2024",
    role: "Lead UI/UX & Web Designer, Supa Inc.",
    tools: ["Figma", "Tailwind CSS"],
    summary: "One documented design system powering four products.",
    overview:
      "SupaCore is the foundation of the Supa Inc. suite. I built and documented the design system that SupaShop, SupaDAO and SupaDex all use.",
    challenge:
      "Four products, one small team. Without a shared system, every screen would drift and every feature would take longer to build.",
    approach:
      "I defined the brand foundations (type, color, spacing, iconography), built a component library with documented states and usage rules, and set up handoff conventions with developers. I also mentored junior designers on typography, layout and brand consistency.",
    outcome:
      "Design to development work became about 30% more efficient, and the four products finally looked and felt like one company.",
    cover: "/images/projects/supacore-design-system/cover",
    gallery: [
      "/images/projects/supacore-design-system/tokens",
      "/images/projects/supacore-design-system/components",
    ],
    marqueeRow: 2,
    order: 7,
    draft: false,
  },
  {
    slug: "apus-industries",
    title: "Apus Industries",
    category: ["Brand"],
    year: "2025 to 2026",
    role: "Brand & Digital Designer",
    tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
    summary: "Packaging, print and digital brand assets for a consumer products company.",
    overview:
      "Apus Industries Limited makes consumer products sold in retail. I designed their packaging, marketing collateral and web ready brand assets.",
    challenge:
      "The products had to stand out on crowded shelves and stay consistent across print, social and the web.",
    approach:
      "I designed product packaging and print ready marketing materials, created digital campaign assets, and built reusable templates and asset libraries so recurring work could be produced faster.",
    outcome:
      "Stronger shelf presence and a consistent brand across channels, with creative turnaround time cut by about 20%.",
    cover: "/images/projects/apus-industries/cover",
    gallery: [
      "/images/projects/apus-industries/packaging",
      "/images/projects/apus-industries/social",
    ],
    marqueeRow: 2,
    order: 8,
    draft: false,
  },
  {
    slug: "amyola",
    title: "Amyola",
    category: ["Brand"],
    year: "2020 to 2022",
    role: "Graphic & Brand Designer",
    tools: ["Adobe Illustrator", "Photoshop"],
    summary: "Building a recognisable visual identity for a growing digital brand.",
    overview:
      "Amyola, formerly Gossipears, was where I built my foundation as a brand designer. I owned the visual side of the brand across web and social.",
    challenge:
      "The brand was growing fast and needed a consistent look so people could recognise it anywhere.",
    approach:
      "I created the brand system, web graphics, editorial visuals and recurring campaign assets, working with marketing leadership to keep every release on brand and on time.",
    // TODO: [ANDRE: add detail or metric for Amyola]
    outcome:
      "A consistent visual language across every customer touchpoint, through the rename from Gossipears to Amyola.",
    cover: "/images/projects/amyola/cover",
    gallery: [],
    marqueeRow: 2,
    order: 9,
    draft: false,
  },
  {
    // TODO: [ANDRE: publish only if you have images you're allowed to show]
    slug: "trenztech",
    title: "Trenztech",
    category: ["Product UI"],
    year: "2024 to 2025",
    role: "UI/UX & Graphic Designer",
    tools: ["Figma"],
    summary: "Refreshing web and mobile interfaces ahead of new feature launches.",
    overview:
      "At Trenztech Limited I designed and iterated on web and mobile interfaces and modernised product visuals for new releases.",
    approach:
      "I ran design iterations based on structured usability feedback, simplified key customer workflows and built interactive prototypes with stakeholders before launch.",
    outcome:
      "Key workflows became simpler, contributing to about a 25% improvement in app usability.",
    cover: "/images/projects/trenztech/cover",
    gallery: [],
    marqueeRow: 2,
    order: 10,
    draft: true,
  },
];

export const projects = z.array(ProjectSchema).parse(rawProjects);

export const publishedProjects = projects.filter((p) => !p.draft).sort((a, b) => a.order - b.order);

export const caseStudyLabels = {
  meta: {
    role: "Role",
    year: "Year",
    tools: "Tools",
    liveSite: "Live site",
  },
  sections: {
    overview: "Overview",
    challenge: "The challenge",
    approach: "What I did",
    outcome: "The result",
  },
  liveLinkLabel: "Visit live site",
  nextBlockLabel: "Next project",
  backLink: "All projects",
};
