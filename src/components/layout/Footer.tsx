import Link from "next/link";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#111111] text-[#F2F1EE]">
      <div className="container-editorial py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Link href="/" aria-label={`${site.siteName} home`} className="inline-block">
              <img
                src="/brand/logo-dark.svg"
                alt={site.siteName}
                width={132}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <p className="max-w-md text-sm text-[#A3A39E]">
              Designed and built by Andre Pascal in Ibadan, Nigeria.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
              About
            </Link>
            <Link href="/skills" className="hover:text-[var(--accent)] transition-colors">
              Skills
            </Link>
            <Link href="/experience" className="hover:text-[var(--accent)] transition-colors">
              Experience
            </Link>
            <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
              Contact
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <Icon name="github" size={16} />
              <span>GitHub</span>
            </a>
            {site.linkedinUrl && (
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
              >
                <Icon name="linkedin" size={16} />
                <span>LinkedIn</span>
              </a>
            )}
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
              >
                <Icon name="instagram" size={16} />
                <span>Instagram</span>
              </a>
            )}
            {site.xUrl && (
              <a
                href={site.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
              >
                <Icon name="x" size={16} />
                <span>X</span>
              </a>
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#2A2A2A] pt-6 text-xs text-[#A3A39E] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Andre Creations. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[#F2F1EE] hover:text-[var(--accent)] transition-colors"
          >
            <span>Back to top</span>
            <Icon name="arrow-up-right" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
