"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import type { AboutSchema } from "@/content/schema";
import { getBlurDataUrl } from "@/lib/images";
import type { z } from "zod";

type CardItem = z.infer<typeof AboutSchema>["cards"][number];

interface AboutCardStackProps {
  cards: CardItem[];
  activeIndex: number;
  isMobileOrReduced: boolean;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function AboutCardStack({
  cards,
  activeIndex,
  isMobileOrReduced,
  cardRefs,
}: AboutCardStackProps) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [loadFullImages, setLoadFullImages] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setLoadFullImages(true);
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const displayIndex = isMobileOrReduced ? mobileIndex : activeIndex;
  const activeCard = cards[displayIndex] ?? cards[0];
  const counter = `${String(displayIndex + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;

  function selectCard(index: number, shouldFocus = false) {
    setMobileIndex(index);
    trackRef.current?.scrollTo({
      left: index * (trackRef.current?.clientWidth ?? 0),
      behavior: "smooth",
    });
    if (shouldFocus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleScroll() {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    if (clientWidth === 0) return;
    const next = Math.round(scrollLeft / clientWidth);
    if (next !== mobileIndex && next >= 0 && next < cards.length) {
      setMobileIndex(next);
    }
  }

  return (
    <div className="space-y-4">
      {isMobileOrReduced ? (
        <div data-testid="about-carousel">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            tabIndex={0}
            role="region"
            aria-label="About story cards"
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {cards.map((card) => (
              <div
                key={card.imageBase}
                className="w-full shrink-0 snap-center aspect-[4/5] bg-[var(--rule)]"
              >
                {loadFullImages ? (
                  <ProjectImage
                    base={card.imageBase}
                    alt={card.alt}
                    sizes="(max-width: 1023px) 92vw, 40vw"
                    width={800}
                    height={1000}
                  />
                ) : (
                  <img
                    src={getBlurDataUrl(card.imageBase)}
                    alt={card.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div
              className="flex items-center"
              role="tablist"
              aria-label="About cards"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  selectCard((mobileIndex + 1) % cards.length, true);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  selectCard((mobileIndex - 1 + cards.length) % cards.length, true);
                } else if (e.key === "Home") {
                  e.preventDefault();
                  selectCard(0, true);
                } else if (e.key === "End") {
                  e.preventDefault();
                  selectCard(cards.length - 1, true);
                }
              }}
            >
              {cards.map((card, i) => (
                <button
                  key={card.imageBase}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={mobileIndex === i}
                  aria-label={`Show card ${i + 1}`}
                  onClick={() => selectCard(i)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] cursor-pointer"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      mobileIndex === i ? "bg-[var(--accent)]" : "bg-[var(--rule)]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Tag className="font-mono-meta" data-testid="about-counter">
              {counter}
            </Tag>
          </div>
          <p className="mt-2 text-sm text-[var(--ink-muted)]" data-testid="about-caption">
            {activeCard.caption}
          </p>
        </div>
      ) : (
        <div data-testid="about-stack" className="overflow-hidden pb-2">
          <div className="relative aspect-[4/5] w-full">
            {cards.map((card, i) => (
              <div
                key={card.imageBase}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0 overflow-hidden bg-[var(--rule)] will-change-transform"
                style={{
                  zIndex: cards.length - i,
                  transform:
                    i === 0
                      ? "translateY(0px) scale(1)"
                      : i === 1
                        ? "translateY(14px) scale(0.96)"
                        : "translateY(28px) scale(0.92)",
                  opacity: i <= 2 ? 1 : 0,
                }}
              >
                <ProjectImage
                  base={card.imageBase}
                  alt={card.alt}
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  width={800}
                  height={1000}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--ink-muted)]" data-testid="about-caption">
              {activeCard.caption}
            </p>
            <span data-testid="about-counter">
              <Tag className="font-mono-meta">{counter}</Tag>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
