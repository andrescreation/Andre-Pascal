import fs from "node:fs";
import path from "node:path";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { WorkMarquee } from "@/components/sections/WorkMarquee";
import { site } from "@/content/site";

export default function HomePage() {
  const hasHeroVideo = fs.existsSync(path.join(process.cwd(), "public", "video", "hero.mp4"));

  const sameAs = [site.githubUrl, site.linkedinUrl].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.owner,
        jobTitle: site.primaryRole,
        url: site.siteUrl,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ibadan",
          addressCountry: "NG",
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        name: site.siteName,
        url: site.siteUrl,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero hasHeroVideo={hasHeroVideo} />
      <About />
      <Skills />
      <WorkMarquee />
      <Experience />
      <Contact />
    </div>
  );
}
