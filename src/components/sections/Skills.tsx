"use client";

import { useEffect, useRef } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { skillsContent } from "@/content/skills";

export function Skills({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const groupsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapRef = useRef<HTMLDivElement>(null);

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
        const inner = sectionRef.current?.querySelector(".skills-inner");
        if (inner && sectionRef.current) {
          gsap.fromTo(
            inner,
            { xPercent: -100 },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 95%",
                end: "top 20%",
                scrub: 0.4,
                invalidateOnRefresh: true,
                refreshPriority: -1,
              },
            },
          );
        }

        const groupEls = groupsRef.current.filter(Boolean);
        if (groupEls.length > 0) {
          gsap.fromTo(
            groupEls,
            { y: 24 },
            {
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
                once: true,
              },
            },
          );
        }

        if (imageWrapRef.current && sectionRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
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
      id="skills"
      data-testid="skills-section"
      className="relative z-20 border-t border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] section-pad overflow-x-clip"
    >
      <div
        className={`skills-inner container-editorial ${standalone ? "" : "will-change-transform"}`}
      >
        <Tag>{skillsContent.tag}</Tag>
        <h2 className="display-l mt-4">{skillsContent.heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-10">
            <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
              {skillsContent.intro}
            </p>

            <div className="space-y-10">
              {skillsContent.groups.map((group, gIdx) => (
                <div
                  key={group.title}
                  ref={(el) => {
                    groupsRef.current[gIdx] = el;
                  }}
                  className="border-t border-[var(--rule)] pt-6"
                >
                  <h3 className="heading-m">{group.title}</h3>
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
            </div>

            <p className="border-t border-[var(--rule)] pt-6 text-sm text-[var(--ink-muted)]">
              {skillsContent.howIWork}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden aspect-[4/5] bg-[var(--rule)]">
              <div ref={imageWrapRef} className="h-full w-full will-change-transform">
                <ProjectImage
                  base={skillsContent.imageBase}
                  alt={skillsContent.imageAlt}
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  width={800}
                  height={1000}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Tag className="font-mono-meta">{skillsContent.dateTag}</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
