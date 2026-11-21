import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/sections/Contact";
import { Icon } from "@/components/ui/Icon";
import { contactContent } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactContent.paragraph,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] pt-20">
      <div className="container-editorial pt-8">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <span>Back to home</span>
        </Link>
      </div>
      <Contact standalone />
    </div>
  );
}
