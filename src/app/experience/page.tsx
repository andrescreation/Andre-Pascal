import type { Metadata } from "next";
import Link from "next/link";
import { Experience } from "@/components/sections/Experience";
import { Icon } from "@/components/ui/Icon";
import { experienceContent } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: experienceContent.intro,
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <div className="container-editorial pt-8">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <span>Back to home</span>
        </Link>
      </div>
      <Experience standalone centeredHeading />
    </div>
  );
}
