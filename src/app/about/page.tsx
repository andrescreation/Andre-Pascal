import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.paragraphs[0],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const allCards = [...aboutContent.cards, aboutContent.extraCard];

  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="container-editorial">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <span>Back to home</span>
        </Link>

        <div className="mt-6 flex flex-col items-center text-center">
          <Tag>{aboutContent.tag}</Tag>
          <h1 className="mt-4 font-display font-black uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2rem,8.5vw,3.5rem)] md:text-[clamp(2.75rem,8vw,7.5rem)]">
            <span className="block">{aboutContent.headingLines[0]}</span>
            <span className="block">
              {aboutContent.headingLines[1]} {aboutContent.headingLines[2]}
            </span>
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4 max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
            {aboutContent.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6 border-t border-[var(--rule)] pt-6 lg:border-t-0 lg:pt-0">
            {aboutContent.columns.map((col) => (
              <div key={col.title} className="space-y-2">
                <h2 className="heading-m text-[var(--ink)]">{col.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--ink-muted)]">{col.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--rule)] pt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCards.map((card, i) => (
              <figure key={card.imageBase} className="space-y-2">
                <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--rule)]">
                  <ProjectImage
                    base={card.imageBase}
                    alt={card.alt}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                    width={800}
                    height={1000}
                    priority={i < 3}
                  />
                </div>
                <figcaption className="flex items-center justify-between text-xs text-[var(--ink-muted)]">
                  <span>{card.caption}</span>
                  <span className="font-mono-meta">0{i + 1} / 06</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-6">
          <Tag className="font-mono-meta">{aboutContent.dateTag}</Tag>
          <Link
            href="/projects"
            className="editorial-link min-h-[44px] whitespace-nowrap text-sm font-medium"
          >
            <span>See selected projects</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
