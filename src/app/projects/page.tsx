import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Tag } from "@/components/ui/Tag";
import { publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "All Projects",
  description: "A closer look at Andre Pascal's brand, product UI, and web design case studies.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="container-editorial">
        <div className="flex flex-col items-center text-center">
          <Tag>Selected Work</Tag>
          <h1 className="display-xl mt-4">ALL PROJECTS</h1>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.6] text-[var(--ink-muted)] md:text-[1.0625rem]">
            A closer look at the work. Each project shows the problem, what I did and what came out
            of it.
          </p>
        </div>

        <ProjectsGrid projects={publishedProjects} />
      </div>
    </div>
  );
}
