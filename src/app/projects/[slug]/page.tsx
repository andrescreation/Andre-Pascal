import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/sections/CaseStudyArticle";
import { publishedProjects } from "@/content/projects";
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

  return <CaseStudyArticle project={project} nextProject={nextProject} />;
}
