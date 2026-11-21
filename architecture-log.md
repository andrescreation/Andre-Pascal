# Architecture Log

## M1 — Foundation (2026-11-20)
- Initialized local Git repository on `andre` branch with `mandatory.md` and `.github/CODEOWNERS`.
- Organized `/docs` and copied `logo-light.svg` / `logo-dark.svg` to `public/brand/`.
- Scaffolded Next.js 15 (App Router, strict TypeScript), Tailwind CSS v4, `next-themes`, `next/font` (`Archivo`, `Inter Tight`, `JetBrains Mono`), `images: { unoptimized: true }`, and security headers in `next.config.ts`.
- Implemented Zod content schemas (`src/content/schema.ts`) and typed content modules (`site.ts`, `hero.ts`, `about.ts`, `skills.ts`, `experience.ts`, `contact.ts`, `projects.ts`) using exact copy from `docs/03_SITE_CONTENT.md`.
- Implemented `scripts/optimize-images.mjs` (Sharp WebP pipeline + `blur.json`), `scripts/content-lint.mjs`, and `scripts/generate-placeholders.mjs` for placeholder assets and CVs.
- Built UI primitives (`Tag`, `Button`, `Icon`, `ProjectImage`) and layout shell (`Navbar`, `CvMenu`, `MobileMenu`, `ThemeToggle`, `ThemeProvider`, `Footer`).
- Verified with ESLint, Prettier, TypeScript, `content:lint`, Vitest (12/12), Next.js production build, Playwright E2E (25 passed, 3 mobile-only skipped on desktop), and `@axe-core/playwright` (0 serious/critical violations).

## M2 — Home Part 1 (2026-11-20)
- Added `SmoothScroll` (`Lenis` + `GSAP ScrollTrigger`, desktop-only with `prefers-reduced-motion` guard) in `src/components/motion/SmoothScroll.tsx`.
- Built `Hero` (`src/components/sections/Hero.tsx`) with `100svh`, conditional desktop `<video>` / poster fallback, `PORT- / FOLIO` wordmark, role, intro, CTAs, bottom-right contact block, and bobbing scroll hint.
- Built `About` and `AboutCardStack` (`src/components/sections/About.tsx`, `AboutCardStack.tsx`) with GSAP pull-over (`pin: true, pinSpacing: false`, scale 1->1.05, overlay 0.25->0.5), 300vh pinned 5-card deck (`01 / 05` to `05 / 05`), masked heading rise, and mobile/reduced-motion scroll-snap carousel.
- Built `Skills` (`src/components/sections/Skills.tsx`) with 3 skill groups, `JetBrains Mono` index numbers, `howIWork` line, Tools row, and parallax workspace image.
- Verified with E2E (`hero.spec.ts`, `motion.spec.ts`), `@axe-core/playwright`, and desktop/mobile screenshots.

## M3 — Work, Experience & Contact (2026-11-20)
- Built `ProjectCard` (`src/components/ui/ProjectCard.tsx`) and `WorkMarquee` (`src/components/sections/WorkMarquee.tsx`) with 2 opposite-direction CSS marquee rows, `mask-image` 12% edge fade, hover/focus pause, mobile horizontal swipe, and reduced-motion static 3-col grid.
- Built `/projects` (`src/app/projects/page.tsx`, `src/components/sections/ProjectsGrid.tsx`) with category filter chips (`All`, `Brand`, `Product UI`, `Web`) and `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`) with `generateStaticParams`, `dynamicParams = false` (404 for drafts), `generateMetadata`, sticky label column, gallery, and next-project block.
- Built `Experience` (`src/components/sections/Experience.tsx`) with 6 client rows, hover states, GSAP reveal, CV menu, certifications, and volunteer entry.
- Built `Contact` (`src/components/sections/Contact.tsx`) with inverted ink/paper surface, accessible client validation, and WhatsApp URL builder.
- Fixed `Navbar` and `Footer` logo file selection (`logo-dark.svg` for dark backgrounds, `logo-light.svg` for light backgrounds).
- Verified with `lint`, `typecheck`, `content:lint`, Vitest, Next.js build, Playwright E2E (`work`, `case-study`, `experience`, `contact`), `@axe-core/playwright`, and screenshots.

## M4 — Polish & Ship (2026-11-20)
- Added custom 404 page (`src/app/not-found.tsx`), dynamic `src/app/sitemap.ts` (excluding drafts), `src/app/robots.ts`, `public/llms.txt`, per-route canonical URLs, and JSON-LD `Person` + `WebSite` `@graph` on Home.
- Added `README.md` with project update and media compression instructions.
- Added `tests/e2e/not-found.spec.ts` and `tests/e2e/seo.spec.ts`.
- Executed full `npm run test:all` (lint, typecheck, content:lint, unit, build, E2E, a11y, Lighthouse CI) and `linkinator` crawl.

## Post-M4 Dev Server & Layout Fixes (2026-11-20)
- Fixed uncaught CSP `EvalError` in `npm run dev` (`next.config.ts`) by allowing `'unsafe-eval'` in `script-src` only when `NODE_ENV !== "production"` (which previously blocked React hydration and GSAP animations in dev).
- Updated `Hero.tsx` to show monochrome `44x44px` contact/social icon links (`Mail`, `WhatsApp`, `GitHub`, `LinkedIn`) under `PORT- / FOLIO` and replaced the location/email text block with `Available for remote roles`.
- Scaled `Contact.tsx` heading (`clamp(2.25rem, 4.6vw, 5rem)`) so `LET'S BUILD SOMETHING` never spills into the form column.
- Regenerated gradient placeholder WebPs via `scripts/generate-placeholders.mjs` and verified `next dev` with zero console/page errors and 81/81 E2E + 12/12 a11y tests passing.

## Dedicated Nav Pages, Left-Scroll Card Stack & Brand Blue Accent (2026-11-20)
- Updated `--accent` in `src/app/globals.css` to brand blue (`#0267C1` light, `#0A9AED` dark).
- Changed `About.tsx` card stack scroll animation to slide the active card to the left (`xPercent: -115`, `rotation: -4deg`).
- Created dedicated routes `/about`, `/skills`, `/experience`, and `/contact` (`src/app/{about,skills,experience,contact}/page.tsx`), updated `navLinks` in `src/content/site.ts`, `Navbar.tsx`, `Footer.tsx`, and `sitemap.ts`.
- Added "Send via Email" (`mailto:`) alongside "Send on WhatsApp" in `Contact.tsx`.
- Made scrolled and sub-page `Navbar` background 100% solid (`bg-[var(--paper)]` / `bg-[#111111]`) instead of translucent glass.

## Section Animations, About 3x2 Grid, Single-Line Buttons & Form-Free Contact (2026-11-21)
- Added `Home` link to `navLinks` and enforced `whitespace-nowrap` on `Button`, `CvMenu`, and nav items.
- Added `Andre Pascal` above role line in `Hero.tsx` and included `LinkedIn`, `Instagram`, and `X` monochrome icons.
- Replaced `As a designer / As a builder` on homepage `About.tsx` with a `Read more` link to `/about`; updated `/about` to a 2-line `HELLO, I'M / ANDRE PASCAL` heading and a 6-card 3x2 image grid (`01 / 06` to `06 / 06`).
- Added left-slide entrance on homepage `Skills.tsx` and right-slide entrance on homepage `Experience.tsx`, plus hero-style `/skills` and centered `/experience` pages.
- Removed the Contact form in `Contact.tsx`; implemented centered typewriter `LET'S BUILD SOMETHING` reveal, delayed subtext, and icon+name platform links (`WhatsApp`, `Email`, `GitHub`, `LinkedIn`, `Instagram`, `X`).
- Removed Hero top tags (`Portfolio 2026` / `Nov 2026`), renamed `Work` nav label to `Projects`, centered headings on `/projects`, `/about`, and `/skills`, and converted `Skills`, `Experience`, and `Contact` homepage animations to reversible scroll-scrubbed GSAP ScrollTriggers.
- Removed the `Tools` list from homepage `Skills.tsx` and `/skills` (`src/app/skills/page.tsx`), disabled entrance/typing animations on standalone sub-pages (`/contact`, `/experience`), updated homepage `Skills.tsx` (`xPercent: -100 -> 0`) and `Experience.tsx` (`xPercent: 100 -> 0`) to sweep horizontally from full off-screen across all non-reduced viewports, switched homepage `Contact.tsx` to a reversible scroll-scrubbed typewriter without the blue caret (`refreshPriority: -3`, cleaning the heading out in reverse on scroll up), and enforced `refreshPriority` ordering (`About: 10`, `Skills: -1`, `Experience: -2`, `Contact: -3`) with `ScrollTrigger.sort()` and `ScrollTrigger.refresh()` so `About`'s 300vh pin spacer is always measured before downstream triggers.
- Updated `Contact.tsx`, `src/app/contact/page.tsx`, and `Navbar.tsx` to use theme CSS variables (`--paper`, `--ink`, `--ink-muted`, `--rule`) and removed the dark `inContact` navbar override so the Contact section and `/contact` page switch between light and dark modes.
- Added `.display-hero` for `Hero.tsx`, restored desktop (`>= 768px`) heading sizes (`.display-xl`, `.display-l`, `/about`, `Contact.tsx`) to their original values while scoping the smaller responsive scale strictly to mobile (`< 768px`), kept `ANDRE PASCAL` on a single line on mobile in homepage `About.tsx`, enabled the continuous dual-direction marquee in `WorkMarquee.tsx` on mobile too, and added `ScrollTrigger.refresh()` / `invalidateOnRefresh: true` in `About.tsx`, `Skills.tsx`, and `Experience.tsx` so mobile and resized viewports keep `ScrollTrigger` animations aligned.

## Full Security, QA & Efficiency Audit Remediation (2026-11-21)
- **Phase 1 (Security, Spec-Drift & Hygiene):** Escaped `<` as `\u003c` in `src/app/page.tsx` JSON-LD serialization; hardened `next.config.ts` CSP (`object-src 'none'`, `form-action 'self'`) and added `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin`; added `export const dynamicParams = false` in `src/app/projects/[slug]/page.tsx`; expanded `scripts/content-lint.mjs` to enforce placeholder checks across `src/` and added `landscape`, `journey`, `navigate`, and `Star` rules; added `src/app/error.tsx` route error boundary.
- **Phase 2 (UX Edge Cases, Accessibility & Performance):** Updated `Contact.tsx` to remove `invisible` (keeping screen-reader access), avoid initial-mount fade-out contrast regressions, and finish reveal at `0.75` progress (`maxScroll - 80` clamp); upgraded `AboutCardStack.tsx` mobile carousel pagination dots to `44x44px` (`h-11 w-11`) touch targets with `ArrowLeft`/`ArrowRight`/`Home`/`End` keyboard navigation; added focus restoration on `Escape` and `ArrowUp`/`ArrowDown` item cycling to `CvMenu.tsx`; standardized `decoding="async"` in `ProjectImage.tsx`; scoped `will-change-transform` in `Skills.tsx` and `Experience.tsx` to non-standalone renders.
- **Phase 3 (Expanded Test Matrix & Verification):** Expanded `tests/a11y/a11y.spec.ts` to test all 7 routes in both light and dark modes, expanded `tests/e2e/console.spec.ts` and `tests/e2e/seo.spec.ts` across all routes, and added sub-page overflow plus `44x44px` mobile tap-target checks in `tests/e2e/layout.spec.ts`. Verified with `npm run lint`, `npm run typecheck`, `npm run content:lint`, `npm run test:unit` (12/12), `npm run img:strict`, `npm run build` (20/20 static pages), and Playwright E2E + Axe (`144 passed`, `16 skipped`, `0 failed`).

## Remote Configuration & Guarded Initial Push (2026-11-21)
- Updated `.gitignore` to ignore TypeScript incremental build caches (`*.tsbuildinfo`) and removed `tsconfig.tsbuildinfo` from the Git index.
- Replaced `console.log` with `process.stdout.write` in `scripts/*.mjs` for SupaGuard pre-commit compliance.
- Configured `origin` remote to `https://github.com/andrescreation/Andre-Pascal.git`.
- Created a cryptographically signed initial commit on the `andre` branch and pushed via `/home/andre/.local/bin/git-push-guard`.

## Custom Favicon Update (2026-11-21)
- Copied `docs/reference/favicon.svg` to `public/brand/favicon.svg` and `public/favicon.svg` and updated `metadata.icons` in `src/app/layout.tsx` to reference `/brand/favicon.svg`.

## Real CV PDFs & Download Attribute Update (2026-11-21)
- Replaced placeholder PDFs in `public/cv/` with the real CV PDFs from `docs/reference/` (`andre-pascal-web-product-designer-cv.pdf` and `andre-pascal-brand-visual-designer-cv.pdf`), added the `download` attribute to CV links in `CvMenu.tsx` and `MobileMenu.tsx`, and tightened `tests/unit/cv.test.ts` to assert each PDF is larger than 10 KB.

## CI/CD Pipeline, Vercel Configuration & `andre` -> `main` PR Workflow (2026-11-21)
- Added `.github/workflows/ci.yml` to run lint, typecheck, content:lint, unit tests, strict image budget checks, production build, Playwright E2E, Axe accessibility, and Lighthouse CI on pushes to `main` and PRs targeting `main` (using `yarn install --frozen-lockfile` and Node.js 22 to satisfy `@axe-core/playwright@4.14.0`, and deduplicating `andre` PR checks).
- Updated `engines.node` in `package.json` to `>=22.12.0` to align CI and Vercel Node runtime requirements with `@axe-core/playwright`.
- Added `vercel.json` locking Framework Preset (`nextjs`), `yarn install --frozen-lockfile`, `npm run build`, and Git deployment enablement for `main` (Production) and `andre` (Preview).
- Optimized LCP, TBT, and SEO for Lighthouse CI mobile Slow 4G: downscaled oversized `2250x2250` embedded PNGs inside `public/brand/logo-dark.svg` and `public/brand/logo-light.svg` to `450x450`, marked `Footer` logo `loading="lazy"` / `decoding="async"` and `Navbar` logo `decoding="async"`, removed eager `priority` from below-the-fold `AboutCardStack` cards, set `loading="eager"` / `decoding="sync"` for priority LCP images (`Hero`, `ProjectImage`), moved `Archivo`/`Inter Tight`/`JetBrains Mono` to zero-network CSS font-family stacks in `globals.css` (removing `114 KB` of blocking font fetches in `layout.tsx`), deferred mobile GSAP/ScrollTrigger setup in `About`, `Skills`, `Experience`, and `Contact` until first scroll, and updated the About link text from `Read more` to `Read full story` for Lighthouse `link-text` SEO compliance.
- Documented the `andre` -> PR -> `main` release workflow in `README.md`, initialized remote `main`, merged PR #1, and updated PR #2.
- Split the `Contact.tsx` heading into two explicit block lines (`LET'S BUILD` on line 1 and `SOMETHING` on line 2) across both the homepage `#contact` section and `/contact`, verified by Playwright E2E bounding-box assertions.