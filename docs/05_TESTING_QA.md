# 05. Testing and QA Plan

Nothing is "done" until `npm run test:all` passes. The agent must use the matching skill for each test type (see section 1) and report results after every milestone.

## 1. Skills to use per test type
Before testing, the agent lists the skills available in its environment and loads the right one:

| Test type | Skill to look for | Fallback if no skill exists |
|-----------|-------------------|------------------------------|
| Unit and content tests | Testing / Vitest / JavaScript testing skill | Follow section 3 |
| End to end flows | Browser automation, Playwright or E2E testing skill | Follow section 4 |
| Visual checks and screenshots | Browser or screenshot skill | Playwright `toHaveScreenshot` |
| Accessibility | Accessibility / a11y / axe skill | Follow section 5 |
| Performance | Lighthouse / web performance skill | Follow section 6 |
| Links and SEO | SEO or crawler skill | Follow section 7 |
| Writing and icon rules | Content or copy review skill | `npm run content:lint` (section 8) |
| Manual device review | Browser skill at mobile and desktop sizes | Section 9 checklist |

The report must say which skill was used for each row.

## 2. Test matrix
| Viewport | Size | Projects in Playwright |
|----------|------|------------------------|
| Desktop | 1440 x 900 | `chromium-desktop`, `firefox-desktop`, `webkit-desktop` |
| Laptop | 1280 x 720 | `chromium-laptop` |
| Tablet | 834 x 1194 | `webkit-tablet` |
| Mobile | 390 x 844 (iPhone), 412 x 915 (Pixel) | `webkit-mobile`, `chromium-mobile` |
| Reduced motion | 1440 x 900 with `reducedMotion: "reduce"` | `chromium-reduced` |

Run e2e against the production build: `npm run build && npm run start` (Playwright `webServer`).

## 3. Unit and content tests (Vitest), `tests/unit`
- **schema.test.ts:** every content file parses with its zod schema.
- **projects.test.ts:**
  - slugs are unique and URL safe
  - every published project has cover, summary under 110 characters, overview, approach, outcome
  - every image path (`cover`, `gallery`) has both `-card.webp` and `-full.webp` on disk
  - each published project has a `marqueeRow`
  - drafts are excluded from `publishedProjects`
- **images.test.ts:** every file in `public/images/**/*-card.webp` is under 120 KB, every `-full.webp` under 300 KB, hero poster under 200 KB, `public/video/hero.mp4` (if present) under 5 MB. No `.png` or `.jpg` over 150 KB anywhere in `public/` except favicons and OG images.
- **whatsapp.test.ts:** `buildWhatsAppUrl` returns `https://wa.me/2349039640382?text=...`, encodes line breaks, ampersands and emoji correctly, handles missing budget.
- **site.test.ts:** email, phone and links in `site.ts` match `docs/03_SITE_CONTENT.md` section 0.1; no link is an empty string; placeholder links are hidden.
- **cv.test.ts:** both CV PDFs exist in `public/cv/` and are under 2 MB.

## 4. End to end tests (Playwright), `tests/e2e`

### 4.1 navigation.spec.ts
- Home loads with status 200 and title "Andre Pascal | Brand & Visual Designer and Web Designer".
- Navbar is visible at top, then after scrolling to 25%, 50%, 75% and 100% of the page it is still visible and its bounding box top is 0.
- Each nav link scrolls to its section and the section is in view.
- Active nav dot updates when scrolling into each section.
- Mobile: menu opens, focus is trapped, Escape closes it, clicking a link closes it and scrolls.

### 4.2 theme.spec.ts
- Toggle switches `html` class between light and dark.
- Choice persists after reload.
- With `colorScheme: "dark"` emulation and no saved choice, site starts dark.
- No flash: screenshot taken at first paint matches the expected theme.

### 4.3 hero.spec.ts
- Desktop: `video` element exists, is muted, has `playsinline`, has a poster.
- Mobile and reduced motion: no `video` element, poster image is shown.
- Wordmark, role line, intro and both buttons are visible with the exact copy.
- "View my work" scrolls to `#work`. "Download CV" opens the CV menu with two links that return 200 and `application/pdf`.

### 4.4 motion.spec.ts (desktop chromium only)
- **Pull-over:** at scroll 0, About's top is at viewport bottom. Scroll 50vh: About top is near 50vh and hero is still at top 0. Scroll past the 80% point: hero's top is negative (it has started moving up).
- **Card stack:** when About is pinned, the counter shows `01 / 05`. Scroll 60vh steps and assert the counter reads `02 / 05` up to `05 / 05`, and the front card's caption matches the content doc each time. After the last step, About unpins (Skills section enters view).
- **Navbar stays on top:** at each of those scroll points, `elementFromPoint` at the navbar center returns a navbar element.
- **Reduced motion project:** no element has `position: fixed` from pinning except the navbar; card stack renders as a swipeable carousel.

### 4.5 work.spec.ts
- Two marquee rows exist, row 1 animation direction left, row 2 right (check computed `animation-name` or transform change over 1 second).
- Hovering a row pauses it (transform does not change over 500ms).
- Edge fade mask is applied (computed `mask-image` contains `linear-gradient`).
- Every card links to `/projects/<slug>` and that page returns 200.
- `/projects` filters: clicking "Brand" shows only projects with category Brand; "All" shows everything published.

### 4.6 case-study.spec.ts
- For every published project: page loads, title, role, year, tools, overview, approach and outcome are visible; cover image loaded (`naturalWidth > 0`); "Next project" links to the next slug; back link goes to `/projects`.
- Draft project slugs return 404.

### 4.7 experience.spec.ts
- Seven rows render in order, newest first, with the exact years and companies from the content doc.
- "Download full CV" works.

### 4.8 contact.spec.ts
- Submitting empty shows all four validation messages from the content doc.
- Invalid email shows the email message.
- Valid submit: intercept `window.open` (or the popup event) and assert the URL starts with `https://wa.me/2349039640382?text=` and the decoded text contains name, email, type, budget and message.
- Email link is `mailto:andrescreation1@gmail.com`.

### 4.9 not-found.spec.ts
- `/this-does-not-exist` returns 404 status and shows the 404 copy and the home button.

### 4.10 console.spec.ts
- Visit every route. Fail on any console error, any failed network request, or any React hydration warning.

### 4.11 visual.spec.ts
- `toHaveScreenshot` for home (hero, about, skills, work, experience, contact), `/projects`, one case study, 404, in light and dark, desktop and mobile. Max diff ratio 0.02. Update baselines only when Andre approves a design change.

### 4.12 layout.spec.ts
- At widths 320, 375, 768, 1024, 1280, 1440, 1920: `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scroll).
- All tap targets on mobile are at least 44 x 44.

## 5. Accessibility, `tests/a11y`
- Run `@axe-core/playwright` on every route in light and dark: **zero** serious or critical violations.
- Keyboard only walkthrough: Tab through home, every interactive element is reachable, focus ring visible (screenshot), order is logical, skip link "Skip to content" works.
- Every `img` has meaningful `alt` (or `alt=""` if decorative). Hero video has `aria-hidden="true"` and is not focusable.
- Heading order: one `h1` per page, no skipped levels.
- Hero text contrast over the poster is at least 4.5:1 for body text (sample with axe and a manual check).
- Form fields have labels, errors are linked with `aria-describedby` and announced (`aria-live="polite"`).

## 6. Performance (Lighthouse CI), `lighthouserc.json`
```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000/", "http://localhost:3000/projects", "http://localhost:3000/projects/pepsa"],
      "numberOfRuns": 3,
      "settings": { "preset": "mobile" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 200 }]
      }
    }
  }
}
```
Also run once with the desktop preset and report the scores.

## 7. Links and SEO
- `linkinator` crawl of the running build: zero broken internal links (external social links may be skipped).
- `sitemap.xml` lists every published route and no draft routes. `robots.txt` exists.
- Every page has a unique title, a description, canonical URL and OG image that returns 200.
- JSON-LD `Person` validates (parse it in a Playwright test and check required fields).

## 8. Content lint, `scripts/content-lint.mjs`
Scans `src/**/*.{ts,tsx,md,mdx,json}` and `public/**/*.svg` and fails the build if it finds:
- **Punctuation:** the em dash (U+2014), the en dash (U+2013) inside user visible strings, or ` -- ` double hyphens in copy.
- **Banned words and phrases** (case insensitive, user visible strings only): see the list in `06_WRITING_AND_ICON_RULES.md` section 2.
- **Banned icons:** imports or SVG names containing `Sparkle`, `Sparkles`, `Stars`, `Star` (as a decorative icon), `Wand`, `WandSparkles`, `Magic`, `Bot`, `Robot`, `Brain`, `BrainCircuit`, `Cpu`, `Zap` (when used as decoration), `Atom`, `Orbit`, or any emoji character in UI copy.
- **Placeholders leaking:** the text `[ANDRE:` or `lorem` in any rendered string of a non draft item.
Output: file, line, the offending text, and which rule it broke.

## 9. Manual review checklist (agent with browser skill, then Andre on real devices)
- [ ] Hero video plays smoothly, text readable over it.
- [ ] Pull-over feels smooth on a trackpad and a mouse wheel, no jumps.
- [ ] Card stack cycles all 5 cards, captions match, then releases.
- [ ] Navbar never disappears and is readable over every section (light, dark, inverted contact).
- [ ] Marquee loops with no visible seam, pauses on hover.
- [ ] Case study pages read well, images sharp on a retina screen.
- [ ] WhatsApp opens with the right message on a real phone.
- [ ] CV PDFs open and are the latest versions.
- [ ] Theme toggle works and looks right in both modes.
- [ ] No text looks machine written. No sparkle style icons.
- [ ] Tested on: iPhone Safari, Android Chrome, desktop Chrome, Safari, Firefox.

## 10. CI on GitHub (optional but recommended, free)
`.github/workflows/ci.yml` runs on every push and pull request: install, `npm run test:all` with Playwright browsers installed, upload the Playwright report and Lighthouse results as artifacts. Vercel still deploys on push; protect `main` so it only merges when CI is green.

## 11. Milestone report format
```
Milestone: M2 Home part 1
Built: ...
Skills used: ...
Tests: unit 24/24, e2e 31/31, a11y 0 violations, Lighthouse mobile P 94 / A 100 / BP 100 / SEO 100, content lint pass
Screenshots: desktop + mobile, light + dark
Open items / questions: ...
```
