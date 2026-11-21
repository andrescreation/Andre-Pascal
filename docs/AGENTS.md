# AGENTS.md: Rules for any AI agent working in this repo

These rules apply to every task, every commit, every file. If a request conflicts with these rules, stop and ask.

## 1. Project in one line
A static, zero backend portfolio for Andre Pascal (Andre Creations), a Brand and Visual Designer who also designs and builds web products. Deployed on the existing Vercel project at https://andrescreation.vercel.app (Hobby plan, free).

## 2. Hard rules
1. **No backend.** No database, no API routes that write data, no auth, no live `/admin`, no server actions that mutate anything. Everything is static and generated at build time.
2. **All content lives in the repo**: `src/content/*.ts` and `public/`. Copy comes from `docs/03_SITE_CONTENT.md` word for word.
3. **No paid services.** No Cloudinary, Cloudflare, Sanity, Contentful or any CDN or CMS. Only what Vercel Hobby gives for free. Do not use Vercel Image Optimization (set `images.unoptimized: true`).
4. **No invented facts.** Never make up clients, metrics, testimonials, awards or links. Keep `[ANDRE: ...]` placeholders visible in code as `TODO` comments and hide unfinished items from the UI using the `draft: true` flag.
5. **Writing rules** in `docs/06_WRITING_AND_ICON_RULES.md` are mandatory. No em dashes, no en dashes in prose, no double hyphens, no AI cliche words. The `content:lint` script must pass.
6. **Icon rules** are mandatory. No sparkle, stars, magic wand, robot, brain or glow icons anywhere. Only the icons listed in the rules file.
7. **Desktop motion only.** Pinned and scrubbed scroll animations run only at `min-width: 1024px` and when `prefers-reduced-motion` is not set. Mobile gets a clean stacked layout with simple fade ins.
8. **Navbar is always visible.** It never scrolls away, never gets covered by an animated layer.
9. **Keep the existing logo.** Use the files in `public/brand/`. Do not redraw or restyle it.
10. **Tests before "done".** A task is not finished until `npm run test:all` passes (see `docs/05_TESTING_QA.md`). Report results honestly, including failures you could not fix.

## 3. Use your skills
Before each task, list the skills available to you and load the one that fits:
- Building UI, layout, styling: web app or frontend development skill.
- End to end and browser checks: browser automation or Playwright testing skill.
- Accessibility: accessibility or axe audit skill.
- Performance: Lighthouse or performance skill.
- Images and media: image processing skill.
- Git and deployment: git and Vercel skills.
If no matching skill exists, follow the relevant doc in `/docs` directly. Say which skill you used in your report.

## 4. Workflow
- Small commits with clear messages (`feat: about card stack`, `test: e2e for project pages`).
- One milestone at a time (milestones are in `docs/01_PRD.md`).
- After each milestone: run `npm run test:all`, attach desktop (1440px) and mobile (390px) screenshots, list open items.
- Never push secrets. This project needs zero environment variables.

## 5. Definition of done (every feature)
- Matches `02_UI_UX_MOTION_SPEC.md` on desktop and mobile.
- Uses copy from `03_SITE_CONTENT.md` exactly.
- Keyboard accessible, visible focus states, alt text on every image.
- No console errors or warnings.
- Unit, e2e, a11y, Lighthouse and content lint all green.
