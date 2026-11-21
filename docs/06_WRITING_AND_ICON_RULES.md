# 06. Writing and Icon Rules

The site must read like a real person wrote it and look like a designer made it. Recruiters spot AI copy and AI styling instantly, and it costs trust.

## 1. Voice
- First person, warm, direct. "I design..." not "Andre is a passionate..."
- Short sentences. Plain words. One idea per sentence.
- Specific over impressive. Name the company, the product, the screen count, the number.
- Confident, not loud. No hype, no superlatives you can't prove.
- Contractions are fine (I'm, I've, it's, don't).
- British or American spelling is fine, but stay consistent within the site. Default: British (recognise, colour in prose; CSS stays `color`).

## 2. Banned

### 2.1 Punctuation
- **No em dashes** ( — ) anywhere in copy.
- **No en dashes** ( – ) in copy. For date ranges write "2022 to 2023" or "Jan 2024 to Now".
- **No double hyphens** ( -- ) in copy.
- No ellipses for drama (...).
- No exclamation marks, except inside a quoted testimonial.
- Use commas, full stops, colons or a new sentence instead of a dash.

### 2.2 Words and phrases (do not use in visible copy)
passionate, leverage, delve, seamless, seamlessly, cutting-edge, cutting edge, state-of-the-art, elevate, unlock, unleash, empower, harness, supercharge, revolutionize, revolutionise, game-changer, game changing, next-level, world-class, synergy, robust, holistic, innovative solutions, tapestry, testament, realm, landscape (as metaphor), journey (as metaphor), navigate (as metaphor), in today's fast-paced world, in the ever-evolving, look no further, I'm thrilled, dive in, deep dive, crafted with love, pixel-perfect experiences, bespoke solutions, AI-powered, magic, magical

### 2.3 Patterns
- No "not just X, but Y" constructions.
- No rule of three lists used just for rhythm ("fast, flexible and future proof").
- No rhetorical questions in headings ("Ready to take your brand to the next level?").
- No emoji in UI copy.
- No fake numbers. Only numbers that are on Andre's CV, or filled in by Andre.

## 3. Icons

### 3.1 Allowed
Simple line icons, stroke 1.5, 20 to 24px, ink colored:
- Arrow up right, arrow right, arrow left, arrow down
- Mail, phone, map pin, download, external link
- Menu, close, plus, minus, check (form success only)
- Sun, moon (theme toggle)
- Brand marks as plain monochrome SVG: GitHub, LinkedIn, Behance, Dribbble, WhatsApp, X, Instagram

### 3.2 Banned
- Sparkle, sparkles, stars, twinkle, magic wand, wand with sparkles
- Robot, bot, brain, brain circuit, CPU chip, atom, orbit
- Lightning bolt used as decoration
- Glowing orbs, gradient blobs, mesh gradients, "aurora" backgrounds
- Emoji as icons
- Any "AI" badge or label

### 3.3 Visual patterns to avoid (they read as AI product UI)
- Purple to blue gradients, neon glows, glass cards stacked everywhere
- Rounded "bento" grids with icons in every tile
- Typing cursor or text scramble effects on the headline
- Custom cursor blobs that follow the mouse
- Particle backgrounds

## 4. Enforcement
`npm run content:lint` (see `05_TESTING_QA.md` section 8) checks punctuation, banned words and banned icon imports, and fails the build. The agent also does a human style read of every page before each milestone report.
