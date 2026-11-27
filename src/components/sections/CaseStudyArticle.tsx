"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { caseStudyLabels } from "@/content/projects";
import type { Project } from "@/content/schema";

interface MediaSlot {
  base: string;
  alt: string;
}

export function CaseStudyArticle({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const [mainMedia, setMainMedia] = useState<MediaSlot>({
    base: project.cover,
    alt: `${project.title} cover image`,
  });

  const [galleryMedia, setGalleryMedia] = useState<MediaSlot[]>(() =>
    project.gallery.map((imgBase, i) => ({
      base: imgBase,
      alt: `${project.title} gallery image ${i + 1}`,
    })),
  );

  function handleSwapWithMain(index: number) {
    const selected = galleryMedia[index];
    if (!selected) return;
    const previousMain = mainMedia;
    setMainMedia(selected);
    setGalleryMedia((prev) => prev.map((item, idx) => (idx === index ? previousMain : item)));
  }

  return (
    <article className="pt-24 md:pt-28">
      <header className="container-editorial pb-12">
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <span>{caseStudyLabels.backLink}</span>
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.category.map((cat) => (
            <Tag key={cat}>{cat}</Tag>
          ))}
        </div>

        <h1 className="display-l mt-4">{project.title}</h1>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-b border-[var(--rule)] py-6 md:grid-cols-4">
          <div>
            <dt className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              {caseStudyLabels.meta.role}
            </dt>
            <dd className="mt-1.5 text-sm font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              {caseStudyLabels.meta.year}
            </dt>
            <dd className="mt-1.5 font-mono-meta text-sm">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              {caseStudyLabels.meta.tools}
            </dt>
            <dd className="mt-1.5 text-sm">{project.tools.join(", ") || "Figma"}</dd>
          </div>
          {project.liveUrl && (
            <div>
              <dt className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
                {caseStudyLabels.meta.liveSite}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-sm font-medium"
                >
                  <span>{caseStudyLabels.liveLinkLabel}</span>
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div
          data-testid="case-study-main-banner"
          className="mt-10 aspect-[4/3] w-full overflow-hidden bg-[var(--rule)]"
        >
          <ProjectImage
            key={mainMedia.base}
            base={mainMedia.base}
            alt={mainMedia.alt}
            sizes="100vw"
            width={1600}
            height={1200}
            priority
          />
        </div>
      </header>

      <div className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <nav
              aria-label="Case study sections"
              className="lg:sticky lg:top-24 space-y-3 border-t border-[var(--rule)] pt-4"
            >
              <a
                href="#overview"
                className="block text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)]"
              >
                {caseStudyLabels.sections.overview}
              </a>
              {project.challenge && (
                <a
                  href="#challenge"
                  className="block text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)]"
                >
                  {caseStudyLabels.sections.challenge}
                </a>
              )}
              <a
                href="#approach"
                className="block text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)]"
              >
                {caseStudyLabels.sections.approach}
              </a>
              <a
                href="#outcome"
                className="block text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--accent)]"
              >
                {caseStudyLabels.sections.outcome}
              </a>
            </nav>
          </aside>

          <div className="lg:col-span-8 space-y-12">
            {galleryMedia.length > 0 && (
              <div
                data-testid="case-study-gallery"
                className={`grid grid-cols-1 gap-6 ${
                  galleryMedia.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}
              >
                {galleryMedia.map((slot, i) => (
                  <button
                    key={`${slot.base}-${i}`}
                    type="button"
                    data-testid="case-study-gallery-item"
                    onClick={() => handleSwapWithMain(i)}
                    aria-label={`Display ${slot.alt} in main banner`}
                    className="group relative aspect-[4/3] w-full overflow-hidden bg-[var(--rule)] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <ProjectImage
                      base={slot.base}
                      alt={slot.alt}
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 30vw"
                      width={800}
                      height={600}
                      className="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </button>
                ))}
              </div>
            )}

            <section
              id="overview"
              className={`space-y-3 scroll-mt-24 ${
                galleryMedia.length > 0 ? "border-t border-[var(--rule)] pt-8" : ""
              }`}
            >
              <h2 className="heading-m">{caseStudyLabels.sections.overview}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.overview}
              </p>
            </section>

            {project.challenge && (
              <section
                id="challenge"
                className="space-y-3 scroll-mt-24 border-t border-[var(--rule)] pt-8"
              >
                <h2 className="heading-m">{caseStudyLabels.sections.challenge}</h2>
                <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                  {project.challenge}
                </p>
              </section>
            )}

            <section
              id="approach"
              className="space-y-3 scroll-mt-24 border-t border-[var(--rule)] pt-8"
            >
              <h2 className="heading-m">{caseStudyLabels.sections.approach}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.approach}
              </p>
            </section>

            <section
              id="outcome"
              className="space-y-3 scroll-mt-24 border-t border-[var(--rule)] pt-8"
            >
              <h2 className="heading-m">{caseStudyLabels.sections.outcome}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.outcome}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Link
        href={`/projects/${nextProject.slug}`}
        className="group relative block border-t border-[var(--rule)] bg-[var(--paper)] py-16 overflow-hidden transition-colors hover:bg-[var(--rule)]/30"
      >
        <div className="container-editorial flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
              {caseStudyLabels.nextBlockLabel}
            </span>
            <p className="display-l mt-2 group-hover:text-[var(--accent)] transition-colors">
              {nextProject.title}
            </p>
          </div>
          <div className="hidden md:block w-56 aspect-[4/3] overflow-hidden opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ProjectImage
              base={nextProject.cover}
              alt={`${nextProject.title} preview`}
              sizes="224px"
              width={800}
              height={600}
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
