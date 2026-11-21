"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { publishedProjects } from "@/content/projects";

export function WorkMarquee() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const row1 = publishedProjects.filter((p) => p.marqueeRow === 1);
  const row2 = publishedProjects.filter((p) => p.marqueeRow === 2);

  return (
    <section
      id="work"
      data-testid="work-section"
      className="relative z-20 border-t border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] section-pad"
    >
      <div className="container-editorial">
        <Tag>Selected Work</Tag>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h2 className="display-l">PROJECTS</h2>
            <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
              Brand systems, product interfaces and websites for teams in fintech, Web3, e-commerce,
              music and consumer goods.
            </p>
          </div>
          <Link
            href="/projects"
            className="editorial-link shrink-0 min-h-[44px] text-sm font-medium"
          >
            <span>See all projects</span>
            <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>
      </div>

      {reducedMotion ? (
        <div className="container-editorial mt-12">
          <div
            data-testid="work-static-grid"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {publishedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                className="w-full"
                sizes="(max-width: 768px) 92vw, 32vw"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="marquee-container marquee-mask mt-12 space-y-8 lg:space-y-12 overflow-hidden">
          <div data-testid="marquee-row-1" className="marquee-track-left flex w-max gap-5 lg:gap-8">
            {[...row1, ...row1].map((project, idx) => (
              <ProjectCard
                key={`r1-${project.slug}-${idx}`}
                project={project}
                className="w-[280px] sm:w-[340px] lg:w-[420px]"
              />
            ))}
          </div>

          <div
            data-testid="marquee-row-2"
            className="marquee-track-right flex w-max gap-5 lg:gap-8"
          >
            {[...row2, ...row2].map((project, idx) => (
              <ProjectCard
                key={`r2-${project.slug}-${idx}`}
                project={project}
                className="w-[280px] sm:w-[340px] lg:w-[420px]"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
