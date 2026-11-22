import { AboutSchema } from "./schema";

export const aboutContent = AboutSchema.parse({
  tag: "About",
  headingLines: ["HELLO, I'M", "ANDRE", "PASCAL"],
  paragraphs: [
    "I've spent the last six years helping startups and growing brands look as good as the work they do through Andre Creations (Freelance), 2020 to Now. I started in graphic and brand design, moved into product and interface design, and now I design and build complete web experiences. Brand, interface, code. One person, one consistent vision from the first sketch to the live site.",
    "I've worked with fintech, Web3, e-commerce, music and consumer product teams, remotely, across very different time zones. I care about clear hierarchy, type that feels intentional, and websites that load fast and make it obvious what to do next.",
  ],
  columns: [
    {
      title: "As a designer",
      text: "Brand identities, design systems, product UI, packaging and campaigns that hold together across every touchpoint.",
    },
    {
      title: "As a builder",
      text: "Responsive websites and web apps in Next.js, React and Tailwind, deployed on Vercel, with the backend pieces they need.",
    },
  ],
  dateTag: "Since 2020",
  cards: [
    {
      imageBase: "/images/about/01-portrait",
      caption: "That's me. Ibadan, Nigeria.",
      alt: "That's me. Ibadan, Nigeria. Portrait of Andre Pascal wearing glasses in a sunlit room beside a tall window.",
    },
    {
      imageBase: "/images/about/02-brand",
      caption: "Every project starts with the brand.",
      alt: "Every project starts with the brand. Andre Pascal sketching geometric monogram letterforms in a notebook beside a color swatch fan.",
    },
    {
      imageBase: "/images/about/03-system",
      caption: "Then I turn it into a system.",
      alt: "Then I turn it into a system. Laptop on a wooden desk displaying a Figma design system with grid rules, typography scales and UI components.",
    },
    {
      imageBase: "/images/about/04-build",
      caption: "Then I build it.",
      alt: "Then I build it. Responsive web wireframe layouts open side by side on a laptop and smartphone.",
    },
    {
      imageBase: "/images/about/05-live",
      caption: "And ship it.",
      alt: "And ship it. A live website displayed on a phone and laptop.",
    },
  ],
  extraCard: {
    imageBase: "/images/about/06-learning-shipping",
    caption: "Always Learning, Always Shipping",
    alt: "Always Learning, Always Shipping. Andre Pascal reading an open design book at his wooden studio desk beside a laptop displaying an editorial web layout.",
  },
});
