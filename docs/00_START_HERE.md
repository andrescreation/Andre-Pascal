# Andre Creations Portfolio: Start Here

This folder is the full brief for rebuilding **andrescreation.vercel.app** from scratch.
Copy the whole folder into the root of the new repo as `/docs`, then paste the kickoff prompt below into your coding agent.

## Files and reading order

| # | File | What it covers |
|---|------|----------------|
| 0 | `00_START_HERE.md` | This file. Kickoff prompt and how to use the pack |
| 1 | `AGENTS.md` | Standing rules the agent must follow on every task |
| 2 | `01_PRD.md` | Product requirements: goals, audience, scope, acceptance |
| 3 | `02_UI_UX_MOTION_SPEC.md` | Visual system, layout, every animation with timings |
| 4 | `03_SITE_CONTENT.md` | Every word, link and image slot on the site |
| 5 | `04_TECH_ARCHITECTURE.md` | Stack, folder structure, data model, image pipeline |
| 6 | `05_TESTING_QA.md` | Unit, end to end, accessibility, performance and content tests |
| 7 | `06_WRITING_AND_ICON_RULES.md` | Tone of voice, banned punctuation, banned words, banned icons |
| 8 | `07_DEPLOYMENT_VERCEL.md` | Connecting the new GitHub repo to the existing Vercel project |

## Before you start (your checklist, Andre)

- [ ] Create a new GitHub repo (example: `andrescreation-portfolio`) and turn on 2FA on GitHub and Vercel.
- [ ] Copy this folder into the repo as `/docs`.
- [ ] Export both CVs from Google Docs as PDF and save them as:
  - `public/cv/andre-pascal-web-product-designer-cv.pdf`
  - `public/cv/andre-pascal-brand-visual-designer-cv.pdf`
- [ ] Put raw project images in `images-raw/<project-slug>/` (the agent will optimize them).
- [ ] Put your logo files in `public/brand/` (SVG preferred).
- [ ] Fill every item marked `[ANDRE: ...]` in `03_SITE_CONTENT.md` when you can. The site can ship with placeholders, but not with fake numbers.

## Kickoff prompt (paste into your coding agent)

```text
You are building my portfolio website from scratch in this repo. The full brief is in /docs.

1. Read every file in /docs in this order: 00_START_HERE.md, AGENTS.md, 01_PRD.md,
   02_UI_UX_MOTION_SPEC.md, 03_SITE_CONTENT.md, 04_TECH_ARCHITECTURE.md, 05_TESTING_QA.md,
   06_WRITING_AND_ICON_RULES.md, 07_DEPLOYMENT_VERCEL.md.
2. Check which skills and tools are available in your environment. For every task, load and
   follow the skill that matches it (web app development, browser or end to end testing,
   accessibility, performance, image handling, git, deployment). Tell me which skill you used
   for each task.
3. Before writing code, reply with: a short build plan split into the milestones in 01_PRD.md,
   any conflicts or gaps you found in the docs, and questions you need answered.
4. Build milestone by milestone. At the end of each milestone run the full test suite in
   05_TESTING_QA.md, fix failures, then give me a short report: what was built, test results,
   screenshots of desktop and mobile, and anything left open.
5. Copy on the site must come from 03_SITE_CONTENT.md word for word. Do not invent new claims,
   numbers, clients or testimonials. If something is missing, leave the marked placeholder.
6. Follow AGENTS.md and 06_WRITING_AND_ICON_RULES.md strictly. The content lint test must pass.
7. The Vercel project already exists and owns andrescreation.vercel.app. Do NOT create a new
   Vercel project. Follow 07_DEPLOYMENT_VERCEL.md.
```

## How you check in

After each milestone, log what was done in your portfolio sprint Google Sheet (date, milestone, status, link to preview deploy, notes).
