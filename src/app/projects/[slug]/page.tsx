import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { caseStudyLabels, publishedProjects } from "@/content/projects";
import { getFullImageSrc } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = publishedProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: getFullImageSrc(project.cover),
          width: 1600,
          height: 1200,
          alt: `${project.title} cover`,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = publishedProjects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = publishedProjects[idx];
  const nextProject = publishedProjects[(idx + 1) % publishedProjects.length];

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

        <div className="mt-10 aspect-[16/9] w-full overflow-hidden bg-[var(--rule)]">
          <ProjectImage
            base={project.cover}
            alt={`${project.title} cover image`}
            sizes="100vw"
            width={1600}
            height={900}
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
            <section id="overview" className="space-y-3">
              <h2 className="heading-m">{caseStudyLabels.sections.overview}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.overview}
              </p>
            </section>

            {project.challenge && (
              <section id="challenge" className="space-y-3 border-t border-[var(--rule)] pt-8">
                <h2 className="heading-m">{caseStudyLabels.sections.challenge}</h2>
                <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                  {project.challenge}
                </p>
              </section>
            )}

            <section id="approach" className="space-y-3 border-t border-[var(--rule)] pt-8">
              <h2 className="heading-m">{caseStudyLabels.sections.approach}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.approach}
              </p>
            </section>

            <section id="outcome" className="space-y-3 border-t border-[var(--rule)] pt-8">
              <h2 className="heading-m">{caseStudyLabels.sections.outcome}</h2>
              <p className="max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
                {project.outcome}
              </p>
            </section>

            {project.gallery.length > 0 && (
              <div className="space-y-8 border-t border-[var(--rule)] pt-8">
                {project.gallery.map((imgBase, i) => (
                  <div
                    key={imgBase}
                    className="aspect-[4/3] w-full overflow-hidden bg-[var(--rule)]"
                  >
                    <ProjectImage
                      base={imgBase}
                      alt={`${project.title} gallery image ${i + 1}`}
                      sizes="(max-width: 1023px) 95vw, 60vw"
                      width={1600}
                      height={1200}
                    />
                  </div>
                ))}
              </div>
            )}
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
