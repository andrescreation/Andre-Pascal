"use client";

import { useEffect, useRef } from "react";
import { CvMenu } from "@/components/layout/CvMenu";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { experienceContent } from "@/content/experience";

export function Experience({
  standalone = false,
  centeredHeading = false,
}: {
  standalone?: boolean;
  centeredHeading?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (standalone || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    let cancelled = false;
    let revertFn: (() => void) | undefined;

    async function initMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      revertFn = () => mm.revert();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const inner = sectionRef.current?.querySelector(".experience-inner");
        if (inner && sectionRef.current) {
          gsap.fromTo(
            inner,
            { xPercent: 100 },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 95%",
                end: "top 20%",
                scrub: 0.4,
                invalidateOnRefresh: true,
                refreshPriority: -2,
              },
            },
          );
        }

        const els = rowsRef.current.filter(Boolean);
        if (els.length > 0) {
          gsap.fromTo(
            els,
            { y: 18 },
            {
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
                once: true,
              },
            },
          );
        }

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }

    initMotion();

    return () => {
      cancelled = true;
      revertFn?.();
    };
  }, [standalone]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-testid="experience-section"
      className="relative z-20 border-t border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] section-pad overflow-x-clip"
    >
      <div
        className={`experience-inner container-editorial ${standalone ? "" : "will-change-transform"}`}
      >
        {centeredHeading ? (
          <div className="flex flex-col items-center text-center">
            <Tag>{experienceContent.tag}</Tag>
            <h1 className="display-xl mt-4">{experienceContent.heading}</h1>
            <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
              {experienceContent.intro}
            </p>
            <div className="mt-6">
              <CvMenu variant="section" />
            </div>
          </div>
        ) : (
          <>
            <Tag>{experienceContent.tag}</Tag>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <h2 className="display-l">{experienceContent.heading}</h2>
                <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                  {experienceContent.intro}
                </p>
              </div>
              <CvMenu variant="section" />
            </div>
          </>
        )}

        <div className="mt-12 border-b border-[var(--rule)]" data-testid="experience-rows">
          {experienceContent.rows.map((row, idx) => (
            <div
              key={`${row.company}-${row.years}`}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="group grid grid-cols-1 gap-3 border-t border-[var(--rule)] py-5 px-2 transition-colors duration-200 hover:bg-[var(--rule)]/40 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <div className="font-mono-meta text-xs text-[var(--ink-muted)] md:col-span-2">
                {row.years}
              </div>
              <div className="font-medium md:col-span-3">{row.role}</div>
              <div className="font-semibold md:col-span-2">{row.company}</div>
              <div className="text-sm text-[var(--ink-muted)] md:col-span-4">{row.summary}</div>
              <div className="flex items-center justify-between md:justify-end gap-2 font-mono-meta text-xs text-[var(--ink-muted)] md:col-span-1">
                <span>{row.location}</span>
                <Icon
                  name="arrow-up-right"
                  size={14}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              Certifications
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {experienceContent.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              Volunteer
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
              {experienceContent.volunteer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
