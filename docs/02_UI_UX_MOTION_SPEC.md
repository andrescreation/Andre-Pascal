# 02. UI, UX and Motion Specification

Reference: the editorial "Creative Presentation" template Andre supplied (`docs/reference/template.png`, copy the image there).
Feel: a printed design magazine brought to life. Big heavy type, lots of off white space, real photography, small black label tags, nothing that looks like a SaaS landing page or an AI product.

## 1. Design tokens

### 1.1 Color
| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--paper` | `#F2F1EE` | `#0F0F0F` | Page background |
| `--ink` | `#111111` | `#F2F1EE` | Main text, headings |
| `--ink-muted` | `#5A5A57` | `#A3A39E` | Body copy, captions |
| `--rule` | `#D9D7D2` | `#2A2A2A` | Thin dividers |
| `--tag-bg` | `#111111` | `#F2F1EE` | Label tags |
| `--tag-fg` | `#FFFFFF` | `#111111` | Label tag text |
| `--accent` | `#E8462B` | `#FF5A3D` | Used sparingly: link hover underline, active nav dot, focus ring |

No gradients on UI surfaces. No glows. No glassmorphism except the navbar blur described below.

### 1.2 Typography
| Role | Font | Weight | Size (desktop / mobile) | Notes |
|------|------|--------|-------------------------|-------|
| Display XL (hero word) | Archivo (variable) | 900 | `clamp(5rem, 13vw, 13rem)` / `22vw` | Uppercase, line height 0.85, letter spacing -0.03em |
| Display L (section titles) | Archivo | 900 | `clamp(3rem, 7vw, 7.5rem)` | Uppercase, line height 0.9 |
| Heading M | Archivo | 700 | 1.5rem | Project titles, role titles |
| Body | Inter Tight | 400 | 1.0625rem / 1rem | Line height 1.6, max width 62ch |
| Label / tag | Inter Tight | 500 | 0.75rem | Inside black tags, slight letter spacing 0.02em |
| Meta / mono | JetBrains Mono | 400 | 0.8125rem | Dates, years, index numbers like `01` |

Load fonts with `next/font` (self hosted, subset latin, `display: swap`). If Archivo 900 is not available in the chosen setup, fall back to Inter Tight 900.

### 1.3 Spacing and grid
- 12 column grid, max width 1440px, side padding `clamp(1rem, 4vw, 3.5rem)`, gutter 24px.
- Section vertical padding: `clamp(5rem, 10vw, 9rem)`.
- Radius: 0 on images and sections (editorial look). 2px on tags and buttons only.

### 1.4 Components
- **Tag:** black pill-less rectangle, white small text, 4px 10px padding. Used for section labels ("About", "Selected Work") and dates ("Nov 2026"). This is the signature detail from the template.
- **Button primary:** ink background, paper text, 14px 22px padding, hover: background accent, 200ms.
- **Button secondary:** 1px ink border, transparent, hover: ink fill.
- **Link:** underline offset 4px, underline animates from left on hover (accent color).
- **Image frame:** no border, no shadow, `object-fit: cover`, blur placeholder while loading.

### 1.5 Icons
Use only simple line icons (Lucide or inline SVG), stroke 1.5: arrow up right, arrow right, arrow down, mail, phone, map pin, download, menu, close, sun, moon, plus GitHub, LinkedIn, Behance, Dribbble, WhatsApp, X brand marks as inline SVG.
**Banned:** sparkles, stars, magic wand, robot, bot, brain, CPU chip, lightning bolt "AI" style, glowing orbs, emoji as icons. See `06_WRITING_AND_ICON_RULES.md`.

## 2. Layout per section (desktop 1440px reference)

### 2.1 Navbar (all pages)
- Fixed top, height 72px, `z-index: 1000`. Never hidden on scroll.
- Left: Andre Creations logo (existing file). Center: Work, About, Skills, Experience, Contact. Right: theme toggle, "Download CV" button.
- Over the hero video: transparent background, paper colored text.
- After 40px of scroll or when a light section is under it: `background: color-mix(in srgb, var(--paper) 80%, transparent)` with `backdrop-filter: blur(12px)`, ink text, 1px bottom rule. Transition 250ms.
- Active section shows a 6px accent dot under the link (IntersectionObserver).
- Mobile: logo left, menu button right. Full screen overlay menu with big Display L links, staggered in (60ms each).

### 2.2 Hero
- Full viewport height (`100svh`), background video edge to edge, dark overlay `rgba(0,0,0,0.25)` for text contrast.
- Top left tag: "Portfolio 2026". Top right tag: current month and year (auto, e.g. "Nov 2026").
- Bottom left: giant two line wordmark **"PORT- / FOLIO"** in Display XL, paper color.
- Bottom right: small contact block (phone, email, location, availability) in Body small, paper color, like the template.
- Under the wordmark on mobile, or right column on desktop: role line and two buttons (copy in content doc).
- Small "Scroll" label with arrow down, bottom center, gentle 2s bob.

### 2.3 About
- Paper background. Tag "About" top left.
- Left 5 columns: card stack image area (aspect 4:5).
- Right 7 columns: **"HELLO, I'M ANDRE PASCAL"** in Display L across three lines, intro paragraph, a two column mini list (Design / Engineering) and a date tag bottom right, like the template.

### 2.4 Skills (the template's "My Education" slot)
- Tag "What I do". Title **"SKILLS & CRAFT"**.
- Left 7 columns: intro line, then three groups (Design, Frontend Engineering, Backend & Full Stack). Each group: group name in Heading M, a short sentence, then a list of skills in two columns with JetBrains Mono index numbers.
- Right 5 columns: a tall image (Andre at work or a design process shot) with a date tag under it, like the template.
- Under everything: a single line "Tools" row with plain text tool names separated by a thin slash.

### 2.5 Selected Work
- Tag "Selected Work". Title **"PROJECTS"**. Right aligned "See all projects" link.
- Two full width marquee rows. Row 1 moves left, row 2 moves right.
- Card: width 420px, image 4:3, below it: project title (Heading M), category and year in mono, one line summary, "View case study" link with arrow up right.
- Left and right 12% of the viewport fade into the paper color using `mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)`.

### 2.6 Experience
- Tag "Experience". Title **"WHERE I'VE WORKED"**.
- Table like list: each row has years (mono), role, company, one line summary, location. Thin rule between rows. Hover: row background shifts to `--rule` at 40% and an arrow appears.
- Under the list: "Download full CV" button.

### 2.7 Contact
- Ink background, paper text (inverted section).
- Left: Display L **"LET'S BUILD SOMETHING"**, short paragraph, direct links (email, WhatsApp, LinkedIn, GitHub).
- Right: form (Name, Email, What do you need, Budget range, Message). Submit button "Send on WhatsApp".

### 2.8 Footer
- Ink background continues. Logo, small nav, social links, "© 2026 Andre Creations. Designed and built by Andre Pascal.", back to top link.

### 2.9 Project case study page
- Hero: full width cover image (16:9), tag with category, title in Display L, meta row (Role, Year, Tools, Live link).
- Body: two column layout. Left sticky column with section labels (Overview, Challenge, Approach, Outcome). Right column with copy and full width gallery images.
- End: "Next project" block, full width, hover reveals the next cover image.

### 2.10 404
- Display XL "404", one line of copy, button back home. Same navbar and footer.

## 3. Motion specification

Library: GSAP + ScrollTrigger (free for all use), Lenis for smooth scroll on desktop. Animate only `transform` and `opacity`. Kill and rebuild ScrollTriggers on resize. Use `gsap.matchMedia()`:

```ts
mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => { /* desktop pinned motion */ });
mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => { /* simple fades only */ });
```

### 3.1 Hero to About pull-over (desktop)
1. Hero is pinned (`pin: true, pinSpacing: false`) from top of page.
2. About section sits directly after and scrolls up over the hero (About has higher `z-index` than the hero, lower than the navbar).
3. While About travels from `top bottom` to `top 20%` (it has covered about 80% of the viewport), the hero stays still and its video scales from 1 to 1.05 and darkens slightly (overlay opacity 0.25 to 0.5).
4. From that 80% point, the hero unpins and moves up with About for the remaining 20% (`yPercent` 0 to -20), so About never simply sits as a full cover over a frozen hero.
5. Easing: scrubbed (`scrub: 0.6`), no snapping.

### 3.2 About card stack (desktop)
1. When About's top reaches the navbar bottom (`top 72px`), pin the About section.
2. Pin length: `5 cards x 60vh = 300vh`.
3. The card area holds 5 stacked images. Visible stack: front card at full size, the next two peek behind it, offset `y: 14px` and `scale: 0.96`, then `y: 28px` and `scale: 0.92`.
4. Each scroll step (60vh): the front card moves up `y: -110%`, rotates `-4deg`, then drops behind the stack (z-index to back, returns to `y: 28px, scale: 0.92, rotation: 0`). The other cards move forward one slot. Duration per step mapped to scroll (scrub 0.5).
5. A small counter tag under the stack updates: `01 / 05`, `02 / 05` and so on, plus the caption for the front card.
6. After card 5 completes, unpin and continue to Skills.
7. Text on the right enters once at pin start: the three heading lines rise from `y: 100%` with a mask, 80ms stagger, 700ms, `power3.out`. Paragraph fades up after.

### 3.3 Skills
- Section title lines: same masked rise as About.
- Skill groups: fade up `y: 30 to 0`, opacity 0 to 1, 90ms stagger, triggered at `top 75%`.
- Right image: subtle parallax `yPercent: -8 to 8` scrubbed.

### 3.4 Selected Work marquee
- Pure CSS animation (`@keyframes` translateX), duplicated track for a seamless loop.
- Row 1: 0 to -50% over 45s, linear, infinite. Row 2: -50% to 0 over 50s.
- Pause both rows on hover and on keyboard focus inside a card.
- Scroll velocity boost (desktop only, optional): while scrolling, speed scales up to 1.6x then eases back.
- Card hover: image scales 1 to 1.04 over 500ms, "View case study" arrow moves 4px up right.
- Reduced motion: no marquee, show a static 3 column grid instead.

### 3.5 Experience
- Rows reveal one by one (fade up, 60ms stagger) at `top 80%`.

### 3.6 Contact
- Section background is ink. As it enters, the navbar switches to the inverted (paper text) style.
- Title masked rise.

### 3.7 Page transitions
- Between home and case study pages: simple 300ms fade of `main`, no fancy wipes. Scroll to top on route change.

### 3.8 Mobile (under 1024px)
- No pinning, no pull-over, no card stack scroll. The card stack becomes a swipeable horizontal carousel (CSS scroll snap) with dots.
- Marquee rows become one horizontal swipe row each (scroll snap).
- Every section uses one simple reveal: fade up 20px, 400ms, once.
- Hero shows the poster image only if the user has reduced data on or is on a small screen. Otherwise video plays muted, inline.

## 4. Interaction and UX rules
- Every interactive element has a visible focus ring: 2px accent outline, 3px offset.
- Tap targets at least 44 x 44px.
- No horizontal page scroll at any width from 320px up.
- Contrast: body text 4.5:1 minimum, large display text 3:1 minimum, including text on the hero video.
- Loading: images use a blur placeholder, no layout shift. No full screen preloader.
- Cursor: default system cursor. No custom cursor blob.
