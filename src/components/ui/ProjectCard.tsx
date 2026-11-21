import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ProjectImage } from "@/components/ui/ProjectImage";
import type { Project } from "@/content/schema";

interface ProjectCardProps {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProjectCard({
  project,
  className = "",
  sizes = "(max-width: 768px) 85vw, 420px",
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${className}`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--rule)]">
        <ProjectImage
          base={project.cover}
          alt={`${project.title} project cover`}
          sizes={sizes}
          width={800}
          height={600}
          priority={priority}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="heading-m text-[var(--ink)]">{project.title}</h3>
          <span className="font-mono-meta text-xs text-[var(--ink-muted)] shrink-0">
            {project.year}
          </span>
        </div>

        <p className="font-mono-meta text-xs text-[var(--ink-muted)]">
          {project.category.join(" · ")}
        </p>

        <p className="text-sm leading-relaxed text-[var(--ink-muted)] line-clamp-2">
          {project.summary}
        </p>

        <span className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
          <span>View case study</span>
          <Icon
            name="arrow-up-right"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>
    </Link>
  );
}
