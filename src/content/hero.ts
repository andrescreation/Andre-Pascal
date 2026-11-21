import { HeroSchema } from "./schema";

export const heroContent = HeroSchema.parse({
  tagLeft: "Portfolio 2026",
  wordmarkLines: ["PORT-", "FOLIO"],
  roleLine: "Brand & Visual Designer. Web & Product Designer.",
  intro:
    "I design brands and the digital products that carry them, then I build them so they actually ship.",
  primaryCta: { label: "View my work", href: "/#work" },
  secondaryCta: { label: "Download CV" },
  scrollHint: "Scroll",
  // TODO: [ANDRE: hero video + poster]
  poster: "/images/hero-poster.webp",
  posterAlt: "Andre Pascal working at his desk",
  video: "/video/hero.mp4",
});
