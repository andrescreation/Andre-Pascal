import { SkillsSchema } from "./schema";

export const skillsContent = SkillsSchema.parse({
  tag: "What I do",
  heading: "SKILLS & CRAFT",
  intro:
    "Design is where I started and it's still my strongest tool. Over time I learned to build what I design, so the details survive all the way to production.",
  groups: [
    {
      title: "Design",
      shortLine:
        "Six years of identity, product and marketing design for startups and consumer brands.",
      items: [
        "Brand identity and logo systems",
        "Brand guidelines and visual language",
        "Typography and art direction",
        "UI/UX design for web and mobile",
        "Design systems and component libraries",
        "Wireframes, user flows and prototyping",
        "Packaging and print design",
        "Campaign, social and ad creatives",
        "Pitch decks and launch material",
      ],
    },
    {
      title: "Frontend Engineering",
      shortLine:
        "I turn designs into fast, responsive, accessible interfaces, with the motion and polish intact.",
      items: [
        "HTML, CSS and modern JavaScript",
        "TypeScript",
        "React and Next.js (App Router)",
        "Tailwind CSS",
        "GSAP and Framer Motion animation",
        "Responsive and accessible layouts",
        "Performance and technical SEO",
        "React Native UI",
      ],
    },
    {
      title: "Backend & Full Stack",
      shortLine: "Enough backend to take a product from idea to a working, deployed MVP.",
      items: [
        "Node.js",
        "Next.js route handlers and server actions",
        "REST APIs and third party integrations",
        "Supabase (Postgres, Auth, Storage)",
        "Data modelling for small products",
        "Authentication flows",
        "Git, GitHub and code review",
        "Vercel deployment and CI",
      ],
    },
  ],
  howIWork:
    "I use AI coding tools to move faster, and I review, test and take responsibility for everything that ships.",
  tools: [
    "Figma",
    "Adobe Photoshop",
    "Illustrator",
    "InDesign",
    "Framer",
    "Webflow",
    "VS Code",
    "Cursor",
    "GitHub",
    "Vercel",
    "Supabase",
    "Notion",
    "Linear",
    "Slack",
  ],
  imageBase: "/images/skills/workspace",
  imageAlt: "Andre Pascal at his workspace with sketches and a laptop",
  dateTag: "2020 to now",
});
