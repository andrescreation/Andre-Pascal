import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { skillsContent } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills & Craft",
  description: skillsContent.intro,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
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
          <Tag>{skillsContent.tag}</Tag>
          <h1 className="display-xl mt-4">{skillsContent.heading}</h1>
          <p className="mt-6 max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-lg">
            {skillsContent.intro}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6 space-y-10">
            {skillsContent.groups.map((group) => (
              <div key={group.title} className="border-t border-[var(--rule)] pt-6">
                <h2 className="heading-m">{group.title}</h2>
                <p className="mt-2 max-w-[62ch] text-sm text-[var(--ink-muted)]">
                  {group.shortLine}
                </p>
                <ol className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {group.items.map((item, iIdx) => (
                    <li key={item} className="flex items-baseline gap-3 text-sm md:text-base">
                      <span className="font-mono-meta text-xs text-[var(--ink-muted)]">
                        {String(iIdx + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}

            <p className="border-t border-[var(--rule)] pt-6 text-sm text-[var(--ink-muted)]">
              {skillsContent.howIWork}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="overflow-hidden aspect-[4/5] w-full bg-[var(--rule)]">
              <ProjectImage
                base={skillsContent.imageBase}
                alt={skillsContent.imageAlt}
                sizes="(max-width: 1023px) 92vw, 48vw"
                width={1200}
                height={1500}
                priority
              />
            </div>
            <div className="flex justify-end">
              <Tag className="font-mono-meta">{skillsContent.dateTag}</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
