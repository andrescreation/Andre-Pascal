import { ExperienceSchema } from "./schema";

export const experienceContent = ExperienceSchema.parse({
  tag: "Experience",
  heading: "WHERE I'VE WORKED",
  intro: "Six years of independent brand, product and web work for remote teams.",
  buttonLabel: "Download full CV",
  rows: [
    {
      years: "2026",
      role: "Product Designer & UI Builder (monthly retainer)",
      company: "MySounds Global",
      summary: "Led UI for an 11 screen creator and music marketplace app.",
      location: "Remote",
    },
    {
      years: "2025 to 2026",
      role: "Brand & Digital Designer",
      company: "Apus Industries Limited",
      summary: "Packaging, print and digital assets. Cut creative turnaround by about 20%.",
      location: "Remote",
    },
    {
      years: "2024 to 2025",
      role: "UI/UX & Graphic Designer",
      company: "Trenztech Limited",
      summary: "Web and mobile UI refresh. About 25% better app usability.",
      location: "Remote",
    },
    {
      years: "2024",
      role: "Lead UI/UX & Web Designer",
      company: "Supa Inc. (SupaShop, SupaDAO, SupaDex, SupaCore)",
      summary: "Built the design system for four products. About 40% more engagement.",
      location: "Remote",
    },
    {
      years: "2022 to 2023",
      role: "UI/UX & Frontend Interface Designer",
      company: "Pepsa",
      summary: "Dashboards and onboarding for a payments and credit platform.",
      location: "Remote",
    },
    {
      years: "2020 to 2022",
      role: "Graphic & Brand Designer",
      company: "Amyola (formerly Gossipears)",
      summary: "Brand system and campaign visuals across web and social.",
      location: "Remote",
    },
  ],
  certifications: [
    "Google UX Design Professional Certificate, Coursera",
    "Graphic Design Specialization, Coursera",
    "Google Project Management Certificate, Coursera",
    "HubSpot Inbound Marketing Certification",
  ],
  volunteer:
    "Volunteer Graphic Designer, Afridole Charity Hub (2020 to 2021). Fundraising and outreach visuals.",
});
