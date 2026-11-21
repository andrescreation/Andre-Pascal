# 01. Product Requirements Document (PRD)

**Product:** Andre Creations portfolio website
**Owner:** Andre Pascal
**URL:** https://andrescreation.vercel.app (existing Vercel project, must not change)
**Version:** 2.0 (full rebuild, static, no backend)
**Target ship:** 4 day sprint

## 1. Background
The previous portfolio had an admin panel backed by a database that kept wiping, and the GitHub repo was deleted. The Vercel project and URL still exist and are printed on Andre's CVs. Version 2 is a clean rebuild: static, fast, impossible to wipe, and written for recruiters and founders.

## 2. Problem
A recruiter or founder lands on the site with 30 to 90 seconds of attention. They need to answer three questions fast:
1. What does Andre do, and how good is he?
2. Has he shipped real work for real companies?
3. How do I contact him or get his CV?

The old site did not answer these quickly and was unreliable.

## 3. Goals
| Goal | Measure |
|------|---------|
| Make Andre's positioning clear in under 5 seconds | Hero states role and offer above the fold |
| Show proof of work | At least 6 project case studies with real images |
| Make hiring easy | CV download and contact visible from every page in 1 click |
| Feel premium and memorable | Editorial design and scroll motion from the reference template |
| Never break or wipe | Zero backend, zero database, zero env vars |
| Load fast on Nigerian and global mobile networks | Lighthouse mobile Performance 90+, LCP under 2.5s |

## 4. Non goals
- No blog, no CMS, no admin panel, no login.
- No e-commerce, no booking system, no newsletter backend.
- No testimonials until Andre has real ones with permission.

## 5. Audience
| Persona | What they want | What we show them |
|---------|----------------|-------------------|
| **Recruiter / talent partner** | Role fit, years, stack, CV, time zone | Hero role line, Experience timeline, Skills, CV download |
| **Hiring manager / design lead** | Craft quality, process, systems thinking | Project case studies, design system work at Supa Inc. |
| **Engineering lead** | Can he build what he designs? | Frontend and full stack section, GitHub link, this site itself |
| **Founder / client** | Can he brand and launch my product fast? | Services line, live sites (Pepsa, MySounds), WhatsApp contact |

## 6. Sitemap
```
/                      Home (all main sections)
/projects              All projects grid
/projects/[slug]       Project case study (static)
/cv                    Redirects or links to CV PDFs (optional, can be a section)
/404                   Custom not found page
```

## 7. Functional requirements

### 7.1 Global
- **FR-1** Fixed navbar on every page: logo (left), links: Work, About, Skills, Experience, Contact; theme toggle; "Download CV" button.
- **FR-2** Light and dark theme toggle, saved in `localStorage`, follows system preference on first visit, no flash of the wrong theme on load.
- **FR-3** Mobile menu: full screen overlay, focus trapped, closes on Escape and on link click.
- **FR-4** Smooth scrolling (Lenis) on desktop only. Native scroll on touch devices.
- **FR-5** Footer on every page with contact links and copyright.

### 7.2 Home sections (order matters)
- **FR-6 Hero:** background video (poster image fallback), greeting, role line, short intro, two buttons (View work, Download CV).
- **FR-7 About pull-over:** About section slides over the pinned hero on desktop (see motion spec).
- **FR-8 About card stack:** 5 image cards cycle like a deck while About is pinned.
- **FR-9 Skills:** three groups: Design, Frontend Engineering, Backend and Full Stack, plus a Tools row.
- **FR-10 Selected Work:** two marquee rows moving in opposite directions, edge fade, pause on hover, each card links to its case study.
- **FR-11 Experience:** timeline of roles from 2020 to now, matching the CV.
- **FR-12 Contact:** form that opens WhatsApp with a prefilled message. Email and social links beside it.

### 7.3 Projects
- **FR-13** `/projects` grid with filter chips: All, Brand, Product UI, Web.
- **FR-14** `/projects/[slug]` case study generated at build time from `src/content/projects.ts`. Sections: cover, summary, role, timeline, tools, challenge, approach, outcome, gallery, live link, next project.
- **FR-15** Projects with `draft: true` are excluded from every page, sitemap and test of visible content.

### 7.4 CV
- **FR-16** "Download CV" opens a small menu with two PDFs: Web and Product Designer, Brand and Visual Designer. Files served from `public/cv/`.

### 7.5 Content management
- **FR-17** Adding a project = add images to `images-raw/<slug>/`, run `npm run img`, add an entry to `projects.ts`, push. Documented in README.
- **FR-18** Content is validated at build with a zod schema. Bad data fails the build with a clear message.

## 8. Non functional requirements
| ID | Requirement |
|----|-------------|
| NFR-1 | Lighthouse mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ |
| NFR-2 | LCP under 2.5s, CLS under 0.05, INP under 200ms |
| NFR-3 | WCAG 2.2 AA: contrast, keyboard, focus, alt text, reduced motion |
| NFR-4 | Images: card WebP 40 to 90 KB, full WebP 120 to 250 KB, hero poster under 200 KB, hero video under 5 MB |
| NFR-5 | Works on latest Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome |
| NFR-6 | Zero env vars, zero runtime API calls, builds with `npm run build` |
| NFR-7 | Security headers set (see architecture doc) |
| NFR-8 | Writing and icon rules enforced by automated lint |

## 9. Milestones (4 day sprint)
| Day | Milestone | Done when |
|-----|-----------|-----------|
| 1 | **M1 Foundation:** repo, Next.js, Tailwind, fonts, theme, navbar, footer, content files, image script, CI tests scaffold, Vercel connected | Preview deploy live, tests run |
| 2 | **M2 Home part 1:** Hero with video, About pull-over, About card stack, Skills | Motion matches spec on desktop, mobile clean |
| 3 | **M3 Work:** marquee, `/projects`, `/projects/[slug]`, Experience, Contact (WhatsApp) | All pages generated, e2e green |
| 4 | **M4 Polish and ship:** SEO, OG images, 404, a11y fixes, Lighthouse budget, content lint, final review, production deploy | All tests green, live on andrescreation.vercel.app |

## 10. Risks
| Risk | Mitigation |
|------|------------|
| Heavy video slows the hero | Compressed MP4 under 5 MB, poster first, no video on mobile or reduced data |
| Scroll animations feel janky | GSAP ScrollTrigger with transforms only, test at 60fps, disable on mobile |
| Missing project images | Placeholders allowed, mark `draft: true` until ready |
| Inflated claims hurt trust in interviews | Only CV verified numbers, everything else marked `[ANDRE: ...]` |
| Account takeover | 2FA on GitHub and Vercel, no admin surface |

## 11. Acceptance
The release is accepted when every item in section 7 works, every NFR is met, `npm run test:all` passes, and Andre has reviewed the live site on his phone and laptop.
