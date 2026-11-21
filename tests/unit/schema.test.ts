import { describe, expect, it } from "vitest";
import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { experienceContent } from "@/content/experience";
import { heroContent } from "@/content/hero";
import { projects } from "@/content/projects";
import {
  AboutSchema,
  ContactSchema,
  ExperienceSchema,
  HeroSchema,
  ProjectSchema,
  SiteSchema,
  SkillsSchema,
} from "@/content/schema";
import { site } from "@/content/site";
import { skillsContent } from "@/content/skills";
import { z } from "zod";

describe("content schemas", () => {
  it("validates all content modules", () => {
    expect(() => SiteSchema.parse(site)).not.toThrow();
    expect(() => HeroSchema.parse(heroContent)).not.toThrow();
    expect(() => AboutSchema.parse(aboutContent)).not.toThrow();
    expect(() => SkillsSchema.parse(skillsContent)).not.toThrow();
    expect(() => ExperienceSchema.parse(experienceContent)).not.toThrow();
    expect(() => ContactSchema.parse(contactContent)).not.toThrow();
    expect(() => z.array(ProjectSchema).parse(projects)).not.toThrow();
  });
});
