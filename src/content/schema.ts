import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(2),
  category: z.array(z.enum(["Brand", "Product UI", "Web"])).min(1),
  year: z.string(),
  role: z.string(),
  tools: z.array(z.string()).default([]),
  summary: z.string().max(110),
  overview: z.string(),
  challenge: z.string().optional(),
  approach: z.string(),
  outcome: z.string(),
  cover: z.string().startsWith("/images/projects/"),
  gallery: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  codeUrl: z.string().url().optional(),
  marqueeRow: z.union([z.literal(1), z.literal(2)]),
  order: z.number(),
  draft: z.boolean().default(false),
});

export type Project = z.infer<typeof ProjectSchema>;

export const SiteSchema = z.object({
  siteName: z.string().min(1),
  owner: z.string().min(1),
  primaryRole: z.string().min(1),
  secondaryRole: z.string().min(1),
  location: z.string().min(1),
  shortLocation: z.string().min(1),
  timeZone: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  whatsappUrl: z.string().url(),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
  behanceUrl: z.string().url().optional(),
  dribbbleUrl: z.string().url().optional(),
  socialUrl: z.string().url().optional(),
  siteUrl: z.string().url(),
  navLinks: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  ),
  cvOptions: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().startsWith("/cv/"),
    }),
  ),
  seo: z.object({
    title: z.string().min(1),
    titleTemplate: z.string().min(1),
    description: z.string().min(1),
    ogImage: z.string().startsWith("/og/"),
    keywords: z.array(z.string()).min(1),
  }),
});

export const HeroSchema = z.object({
  tagLeft: z.string().min(1),
  wordmarkLines: z.tuple([z.string().min(1), z.string().min(1)]),
  roleLine: z.string().min(1),
  intro: z.string().min(1),
  primaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  secondaryCta: z.object({ label: z.string().min(1) }),
  scrollHint: z.string().min(1),
  poster: z.string().startsWith("/images/"),
  posterAlt: z.string().min(1),
  video: z.string().startsWith("/video/"),
});

export const AboutSchema = z.object({
  tag: z.string().min(1),
  headingLines: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1)]),
  paragraphs: z.array(z.string().min(1)).min(2),
  columns: z.tuple([
    z.object({ title: z.string().min(1), text: z.string().min(1) }),
    z.object({ title: z.string().min(1), text: z.string().min(1) }),
  ]),
  dateTag: z.string().min(1),
  cards: z
    .array(
      z.object({
        imageBase: z.string().startsWith("/images/about/"),
        caption: z.string().min(1),
        alt: z.string().min(1),
      }),
    )
    .length(5),
  extraCard: z.object({
    imageBase: z.string().startsWith("/images/about/"),
    caption: z.string().min(1),
    alt: z.string().min(1),
  }),
});

export const SkillsSchema = z.object({
  tag: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  groups: z
    .array(
      z.object({
        title: z.string().min(1),
        shortLine: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      }),
    )
    .length(3),
  howIWork: z.string().min(1),
  tools: z.array(z.string().min(1)).min(1),
  imageBase: z.string().startsWith("/images/skills/"),
  imageAlt: z.string().min(1),
  dateTag: z.string().min(1),
});

export const ExperienceSchema = z.object({
  tag: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  buttonLabel: z.string().min(1),
  rows: z
    .array(
      z.object({
        years: z.string().min(1),
        role: z.string().min(1),
        company: z.string().min(1),
        summary: z.string().min(1),
        location: z.string().min(1),
      }),
    )
    .min(6),
  certifications: z.array(z.string().min(1)).min(1),
  volunteer: z.string().min(1),
});

export const ContactSchema = z.object({
  tag: z.string().min(1),
  heading: z.string().min(1),
  paragraph: z.string().min(1),
  recruiterLine: z.string().min(1),
  helperText: z.string().min(1),
  fields: z.object({
    name: z.object({ label: z.string(), placeholder: z.string(), error: z.string() }),
    email: z.object({ label: z.string(), placeholder: z.string(), error: z.string() }),
    type: z.object({
      label: z.string(),
      options: z.array(z.string()).min(1),
      error: z.string(),
    }),
    budget: z.object({
      label: z.string(),
      options: z.array(z.string()).min(1),
    }),
    message: z.object({ label: z.string(), placeholder: z.string(), error: z.string() }),
    submit: z.string(),
  }),
});
