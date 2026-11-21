# Andre Creations Portfolio (v2)

Static, zero-backend portfolio for Andre Pascal (Andre Creations), built with Next.js (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, and Lenis.

## Adding a project

1. Create `images-raw/projects/<slug>/` and drop `cover.png` plus gallery images in it.
2. Run `npm run img` to generate `-card.webp`, `-full.webp`, and blur placeholders in `src/content/blur.json`.
3. Add an entry in `src/content/projects.ts` (copy an existing one). Set `draft: false` when ready to publish.
4. Run `npm run test:all`.
5. Commit and push.

## Hero video compression

```bash
ffmpeg -i hero.mov -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/video/hero.mp4
```

Target under 5 MB, no audio.

## Commands

- `npm run dev`: local development server
- `npm run build`: production build
- `npm run img`: optimize images from `images-raw/` into `public/images/`
- `npm run content:lint`: verify writing and icon rules
- `npm run test:all`: lint, typecheck, content lint, unit tests, build, Playwright E2E, axe accessibility, and Lighthouse CI
