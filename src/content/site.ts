import { SiteSchema } from "./schema";

export const site = SiteSchema.parse({
  siteName: "Andre Creations",
  owner: "Andre Pascal",
  primaryRole: "Brand & Visual Designer",
  secondaryRole: "Web & Product Designer who builds what he designs",
  location: "Ibadan, Nigeria. Working remotely with teams in the UK, EU and US",
  shortLocation: "Ibadan, Nigeria (UTC+1)",
  timeZone: "WAT (UTC+1)",
  availability: "Open to full time remote roles and freelance projects",
  email: "andrescreation1@gmail.com",
  phone: "+234 903 964 0382",
  whatsappUrl: "https://wa.me/2349039640382",
  githubUrl: "https://github.com/andrescreation",
  linkedinUrl: "https://www.linkedin.com/in/andre-pascal-%E5%BE%97-5b6702235",
  instagramUrl: "https://www.instagram.com/andreofficial_x/",
  xUrl: "https://x.com/andreOfficial_x",
  // TODO: [ANDRE: Behance URL or remove]
  // TODO: [ANDRE: Dribbble URL or remove]
  siteUrl: "https://andrescreation.vercel.app",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],
  cvOptions: [
    {
      label: "Web & Product Designer CV",
      href: "/cv/andre-pascal-web-product-designer-cv.pdf",
    },
    {
      label: "Brand & Visual Designer CV",
      href: "/cv/andre-pascal-brand-visual-designer-cv.pdf",
    },
  ],
  seo: {
    title: "Andre Pascal | Brand & Visual Designer and Web Designer",
    titleTemplate: "%s | Andre Pascal",
    description:
      "Andre Pascal is a brand and visual designer with 6+ years of experience. He designs identities, product interfaces and websites, and builds them with Next.js. Based in Nigeria, working remotely worldwide.",
    ogImage: "/og/default.jpg",
    keywords: [
      "brand designer",
      "visual designer",
      "UI UX designer",
      "web designer",
      "product designer",
      "Next.js developer",
      "remote designer Nigeria",
    ],
  },
});
