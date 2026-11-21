"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { contactContent } from "@/content/contact";
import { site } from "@/content/site";

export function Contact({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const fullHeading = contactContent.heading;
  const [typedLength, setTypedLength] = useState(fullHeading.length);
  const [typingDone, setTypingDone] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (standalone || reduced) {
      setTypedLength(fullHeading.length);
      setTypingDone(true);
      return;
    }

    let cancelled = false;
    let revertFn: (() => void) | undefined;

    async function initScrollTyping() {
      setTypedLength(0);
      setTypingDone(false);
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        end: () => {
          const el = sectionRef.current;
          if (!el) return "top 30%";
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const elTopDoc = el.getBoundingClientRect().top + window.scrollY;
          const startScroll = elTopDoc - window.innerHeight * 0.9;
          const desiredEndScroll = elTopDoc - window.innerHeight * 0.3;
          const actualEndScroll = Math.max(
            startScroll + 150,
            Math.min(desiredEndScroll, maxScroll - 80),
          );
          return `+=${Math.round(actualEndScroll - startScroll)}`;
        },
        scrub: 0.25,
        invalidateOnRefresh: true,
        refreshPriority: -3,
        onUpdate: (self) => {
          const next = Math.round(self.progress * fullHeading.length);
          setTypedLength(next);
          setTypingDone(self.progress >= 0.75);
        },
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      revertFn = () => trigger.kill();
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      initScrollTyping();
    } else {
      window.addEventListener("scroll", initScrollTyping, { once: true, passive: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", initScrollTyping);
      revertFn?.();
    };
  }, [fullHeading, standalone]);

  const firstLineFull = "LET'S BUILD";
  const firstLineText = fullHeading.slice(0, Math.min(typedLength, firstLineFull.length));
  const secondLineText =
    typedLength > firstLineFull.length + 1
      ? fullHeading.slice(firstLineFull.length + 1, typedLength)
      : "";

  const platforms: Array<{ name: string; href: string; icon: IconName; external?: boolean }> = [
    { name: "WhatsApp", href: site.whatsappUrl, icon: "whatsapp", external: true },
    { name: "Email", href: `mailto:${site.email}`, icon: "mail", external: false },
    { name: "GitHub", href: site.githubUrl, icon: "github", external: true },
    ...(site.linkedinUrl
      ? [{ name: "LinkedIn", href: site.linkedinUrl, icon: "linkedin" as const, external: true }]
      : []),
    ...(site.instagramUrl
      ? [{ name: "Instagram", href: site.instagramUrl, icon: "instagram" as const, external: true }]
      : []),
    ...(site.xUrl ? [{ name: "X", href: site.xUrl, icon: "x" as const, external: true }] : []),
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-testid="contact-section"
      className="relative z-20 border-t border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] section-pad"
    >
      <div className="container-editorial flex flex-col items-center text-center">
        <Tag>{contactContent.tag}</Tag>

        <h2
          aria-label={fullHeading}
          className="mt-6 min-h-[1.8em] font-display font-black uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.25rem,7.5vw,7rem)] md:text-[clamp(2.5rem,7.5vw,7rem)] text-[var(--ink)]"
        >
          <span data-testid="contact-heading-line-1" className="block">
            {firstLineText}
          </span>
          {secondLineText.length > 0 && (
            <span data-testid="contact-heading-line-2" className="block">
              {secondLineText}
            </span>
          )}
        </h2>

        <div
          className={`mt-6 max-w-[58ch] space-y-3 ${
            typingDone ? "opacity-100 transition-opacity duration-200" : "opacity-0"
          }`}
        >
          <p className="text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
            {contactContent.paragraph}
          </p>
          <p className="text-sm text-[var(--ink-muted)]">{contactContent.recruiterLine}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {platforms.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-[44px] items-center gap-2.5 whitespace-nowrap rounded-[2px] border border-[var(--rule)] bg-[var(--paper)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon name={item.icon} size={18} />
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
