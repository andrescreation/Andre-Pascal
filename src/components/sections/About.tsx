"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { aboutContent } from "@/content/about";
import { AboutCardStack } from "./AboutCardStack";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(true);

  useEffect(() => {
    const check = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobileOrReduced(!desktop || reduced);
    };
    check();

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqDesktop.addEventListener("change", check);
    mqReduced.addEventListener("change", check);
    return () => {
      mqDesktop.removeEventListener("change", check);
      mqReduced.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let revertFn: (() => void) | undefined;

    if (isMobileOrReduced) {
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ default: gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        },
      );
      return () => {
        cancelled = true;
      };
    }

    async function initMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      revertFn = () => mm.revert();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const heroEl = document.getElementById("hero");
        const heroMedia = heroEl?.querySelector(".hero-media");
        const heroOverlay = heroEl?.querySelector(".hero-overlay");
        const sectionEl = sectionRef.current;

        if (!heroEl || !sectionEl) return;

        // 1. Pin hero while About pulls over it (0% -> 80%)
        ScrollTrigger.create({
          trigger: heroEl,
          start: "top top",
          endTrigger: sectionEl,
          end: "top 20%",
          pin: true,
          pinSpacing: false,
        });

        if (heroMedia) {
          gsap.fromTo(
            heroMedia,
            { scale: 1 },
            {
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top bottom",
                end: "top 20%",
                scrub: 0.6,
              },
            },
          );
        }

        if (heroOverlay) {
          gsap.fromTo(
            heroOverlay,
            { opacity: 0.25 },
            {
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top bottom",
                end: "top 20%",
                scrub: 0.6,
              },
            },
          );
        }

        // From 80% covered to top, hero travels up with About
        gsap.fromTo(
          heroEl,
          { yPercent: 0 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 20%",
              end: "top top",
              scrub: 0.6,
            },
          },
        );

        // 2. Heading masked rise on pin start
        const lineEls = headingLinesRef.current.filter(Boolean);
        if (lineEls.length > 0) {
          gsap.fromTo(
            lineEls,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 70%",
                once: true,
              },
            },
          );
        }

        // 3. Pin About for 5 cards x 60vh = 300vh and cycle the card deck
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const total = cards.length;
        if (total === 5) {
          const updateStackPositions = (progress: number) => {
            const stepFloat = progress * 5;
            const active = Math.min(4, Math.floor(stepFloat));
            setActiveIndex(active);

            cards.forEach((card, i) => {
              if (i < active) {
                // Already cycled behind
                gsap.set(card, {
                  xPercent: 0,
                  yPercent: 0,
                  y: 28,
                  scale: 0.92,
                  rotation: 0,
                  zIndex: 1,
                  opacity: 0,
                });
              } else if (i === active) {
                const localT = active < 4 ? stepFloat - active : 0;
                gsap.set(card, {
                  xPercent: localT * -115,
                  yPercent: 0,
                  y: 0,
                  scale: 1,
                  rotation: localT * -4,
                  zIndex: 10,
                  opacity: Math.max(0.2, 1 - localT * 0.45),
                });
              } else {
                const slot = i - active;
                const localT = active < 4 ? stepFloat - active : 0;
                const effectiveSlot = slot - localT;
                const yOffset = Math.max(0, effectiveSlot) * 14;
                const scaleVal = 1 - Math.max(0, effectiveSlot) * 0.04;
                gsap.set(card, {
                  xPercent: 0,
                  yPercent: 0,
                  y: Math.min(28, yOffset),
                  scale: Math.max(0.92, scaleVal),
                  rotation: 0,
                  zIndex: 10 - slot,
                  opacity: slot <= 2 ? 1 : Math.max(0, 1 - (slot - 2 - localT)),
                });
              }
            });
          };

          ScrollTrigger.create({
            trigger: sectionEl,
            start: "top 72px",
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 0.5,
            refreshPriority: 10,
            onUpdate: (self) => updateStackPositions(self.progress),
          });
        }

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }

    initMotion();

    return () => {
      cancelled = true;
      revertFn?.();
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };
  }, [isMobileOrReduced]);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-testid="about-section"
      className="relative z-20 bg-[var(--paper)] text-[var(--ink)] section-pad"
    >
      <div className="container-editorial">
        <Tag>{aboutContent.tag}</Tag>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-5">
            <AboutCardStack
              cards={aboutContent.cards}
              activeIndex={activeIndex}
              isMobileOrReduced={isMobileOrReduced}
              cardRefs={cardRefs}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <h2 className="display-l">
              {aboutContent.headingLines.map((line, idx) => (
                <span
                  key={line}
                  className={`${idx === 0 ? "block" : "inline md:block"} overflow-hidden`}
                >
                  <span
                    ref={(el) => {
                      headingLinesRef.current[idx] = el;
                    }}
                    className={`${idx === 0 ? "block" : "inline md:block"} will-change-transform`}
                  >
                    {line}
                  </span>
                  {idx === 1 && <span className="md:hidden"> </span>}
                </span>
              ))}
            </h2>

            <div className="space-y-4 max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
              {aboutContent.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-6">
              <Link
                href="/about"
                className="group inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
              >
                <span>Read more</span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <Tag className="font-mono-meta">{aboutContent.dateTag}</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
