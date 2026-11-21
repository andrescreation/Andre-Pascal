import { CvMenu } from "@/components/layout/CvMenu";
import { Icon } from "@/components/ui/Icon";
import { heroContent } from "@/content/hero";
import { site } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

export function Hero({ hasHeroVideo = false }: { hasHeroVideo?: boolean }) {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative z-10 min-h-[100svh] w-full overflow-hidden bg-[#111111] text-[#F2F1EE]"
    >
      <div className="hero-media absolute inset-0 h-full w-full will-change-transform">
        <img
          src={heroContent.poster}
          alt={heroContent.posterAlt}
          width={1600}
          height={900}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        {hasHeroVideo && <HeroVideo videoSrc={heroContent.video} posterSrc={heroContent.poster} />}
      </div>

      <div
        aria-hidden="true"
        className="hero-overlay absolute inset-0 bg-black opacity-25 pointer-events-none"
      />

      <div className="container-editorial relative z-10 flex min-h-[100svh] flex-col justify-between pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="my-auto py-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="display-hero text-[#F2F1EE]">
              {heroContent.wordmarkLines[0]}
              <br />
              {heroContent.wordmarkLines[1]}
            </h1>

            <div
              className="mt-6 flex flex-wrap items-center gap-3"
              aria-label="Direct contact and social links"
            >
              <a
                href={`mailto:${site.email}`}
                aria-label="Email Andre Pascal"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon name="mail" size={18} />
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Andre Pascal on WhatsApp"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon name="whatsapp" size={18} />
              </a>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andre Pascal on GitHub"
                className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon name="github" size={18} />
              </a>
              {site.linkedinUrl && (
                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Andre Pascal on LinkedIn"
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon name="linkedin" size={18} />
                </a>
              )}
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Andre Pascal on Instagram"
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon name="instagram" size={18} />
                </a>
              )}
              {site.xUrl && (
                <a
                  href={site.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Andre Pascal on X"
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] border border-[#F2F1EE]/30 text-[#F2F1EE] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon name="x" size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4 lg:col-span-5 lg:mt-0">
            <p className="font-display text-2xl font-bold tracking-tight text-[#F2F1EE] md:text-3xl">
              {site.owner}
            </p>
            <p className="text-lg font-medium text-[#F2F1EE]/90 md:text-xl">
              {heroContent.roleLine}
            </p>
            <p className="max-w-[52ch] text-base leading-relaxed text-[#F2F1EE]/85">
              {heroContent.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={heroContent.primaryCta.href}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-[2px] bg-[#F2F1EE] px-[22px] py-[14px] text-[0.9375rem] font-medium leading-none text-[#111111] transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white"
              >
                <span>{heroContent.primaryCta.label}</span>
                <Icon name="arrow-down" size={16} />
              </a>
              <CvMenu variant="hero" />
            </div>

            <p className="border-t border-[#F2F1EE]/20 pt-4 font-mono-meta text-xs uppercase tracking-wider text-[#F2F1EE]/80">
              Available for remote roles
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="#about"
            className="inline-flex min-h-[44px] items-center gap-1.5 font-mono-meta text-xs uppercase tracking-widest text-[#F2F1EE]/80 hover:text-[#F2F1EE]"
          >
            <span>{heroContent.scrollHint}</span>
            <Icon name="arrow-down" size={14} className="animate-scroll-bob" />
          </a>
        </div>
      </div>
    </section>
  );
}
