"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/content/schema";

const FILTERS = ["All", "Brand", "Product UI", "Web"] as const;
type Filter = (typeof FILTERS)[number];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <div className="mt-10">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTERS.map((filter) => {
          const isSelected = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActive(filter)}
              className={`min-h-[44px] rounded-[2px] px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isSelected
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "border border-[var(--rule)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div
        data-testid="projects-grid"
        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="w-full"
            sizes="(max-width: 768px) 92vw, 32vw"
            priority={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
