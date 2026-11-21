# 03. Site Content: every word, link and image slot

This is the single source of truth for copy. The agent copies text from here **word for word** into `src/content/*.ts`.

**Placeholders:**
- `[ANDRE: ...]` means only Andre can fill this. The agent leaves a `TODO` comment and hides the item (or shows the neutral fallback written next to it) until it is filled.
- `IMG:` lines describe the image that goes in that slot and where the file lives.

Facts and dates here match Andre's two CVs (Nov 2026). If the CV changes, update this file first, then the site.

---

## 0. Global

### 0.1 Site identity
| Field | Value |
|-------|-------|
| Site name | Andre Creations |
| Owner | Andre Pascal |
| Primary role | Brand & Visual Designer |
| Secondary role | Web & Product Designer who builds what he designs |
| Location | Ibadan, Nigeria. Working remotely with teams in the UK, EU and US |
| Time zone | WAT (UTC+1) |
| Availability | Open to full time remote roles and freelance projects |
| Email | andrescreation1@gmail.com |
| Phone / WhatsApp | +234 903 964 0382 |
| WhatsApp link | https://wa.me/2349039640382 |
| GitHub | https://github.com/andrescreation |
| LinkedIn | `[ANDRE: LinkedIn URL]` (hide link until filled) |
| Behance | `[ANDRE: Behance URL or remove]` |
| Dribbble | `[ANDRE: Dribbble URL or remove]` |
| X / Instagram | `[ANDRE: handle or remove]` |
| Site URL | https://andrescreation.vercel.app |

### 0.2 Navigation
| Label | Target |
|-------|--------|
| Work | `/#work` |
| About | `/#about` |
| Skills | `/#skills` |
| Experience | `/#experience` |
| Contact | `/#contact` |
| Download CV (button) | opens menu: "Web & Product Designer CV" → `/cv/andre-pascal-web-product-designer-cv.pdf`, "Brand & Visual Designer CV" → `/cv/andre-pascal-brand-visual-designer-cv.pdf` |

Theme toggle aria labels: "Switch to dark mode" / "Switch to light mode".
Mobile menu button aria labels: "Open menu" / "Close menu".

### 0.3 SEO defaults
- **Title:** Andre Pascal | Brand & Visual Designer and Web Designer
- **Title template:** %s | Andre Pascal
- **Description:** Andre Pascal is a brand and visual designer with 6+ years of experience. He designs identities, product interfaces and websites, and builds them with Next.js. Based in Nigeria, working remotely worldwide.
- **OG image:** `public/og/default.jpg` (1200 x 630, the hero wordmark on paper background with name and role)
- **Keywords (meta, low priority):** brand designer, visual designer, UI UX designer, web designer, product designer, Next.js developer, remote designer Nigeria

---

## 1. Hero

| Slot | Content |
|------|---------|
| Tag top left | Portfolio 2026 |
| Tag top right | (auto) current month and year, e.g. Nov 2026 |
| Wordmark | PORT- / FOLIO |
| Role line | Brand & Visual Designer. Web & Product Designer. |
| Intro (one sentence) | I design brands and the digital products that carry them, then I build them so they actually ship. |
| Button 1 | View my work → `/#work` |
| Button 2 | Download CV → opens CV menu |
| Contact block (bottom right) | **Email:** andrescreation1@gmail.com · **WhatsApp:** +234 903 964 0382 · **Based in:** Ibadan, Nigeria (UTC+1) · **Status:** Available for remote roles |
| Scroll hint | Scroll |

IMG / VIDEO:
- Video: `public/video/hero.mp4` (Andre will supply. Muted, loop, under 5 MB).
- Poster: `public/images/hero-poster.webp`. Until the real video exists, use a warm, natural light photo of Andre at his desk or a moody workspace shot. `[ANDRE: hero video + poster]`
- Alt for poster: "Andre Pascal working at his desk"

---

## 2. About

| Slot | Content |
|------|---------|
| Tag | About |
| Heading (3 lines) | HELLO, I'M / ANDRE / PASCAL |
| Intro paragraph | I've spent the last six years helping startups and growing brands look as good as the work they do. I started in graphic and brand design, moved into product and interface design, and now I design and build complete web experiences. Brand, interface, code. One person, one consistent vision from the first sketch to the live site. |
| Second paragraph | I've worked with fintech, Web3, e-commerce, music and consumer product teams, remotely, across very different time zones. I care about clear hierarchy, type that feels intentional, and websites that load fast and make it obvious what to do next. |
| Mini column 1 title | As a designer |
| Mini column 1 text | Brand identities, design systems, product UI, packaging and campaigns that hold together across every touchpoint. |
| Mini column 2 title | As a builder |
| Mini column 2 text | Responsive websites and web apps in Next.js, React and Tailwind, deployed on Vercel, with the backend pieces they need. |
| Date tag | Since 2020 |
| Card counter | 01 / 05 (auto) |

### 2.1 About card stack (5 cards)
| # | Image (IMG) | Caption |
|---|-------------|---------|
| 1 | Portrait of Andre, natural light. `public/images/about/01-portrait.webp` `[ANDRE: photo]` | That's me. Ibadan, Nigeria. |
| 2 | Sketchbook or brand moodboard spread. `public/images/about/02-brand.webp` | Every project starts with the brand. |
| 3 | Close up of a design system or UI components. `public/images/about/03-system.webp` | Then I turn it into a system. |
| 4 | Screen with code next to the matching design. `public/images/about/04-build.webp` | Then I build it. |
| 5 | A live site on a phone and laptop (Pepsa or MySounds). `public/images/about/05-live.webp` | And ship it. |

Alt text = caption + a short description of the image (agent writes it from the actual image).

---

## 3. Skills (section id `skills`)

| Slot | Content |
|------|---------|
| Tag | What I do |
| Heading | SKILLS & CRAFT |
| Intro | Design is where I started and it's still my strongest tool. Over time I learned to build what I design, so the details survive all the way to production. |

### 3.1 Design
**Short line:** Six years of identity, product and marketing design for startups and consumer brands.
1. Brand identity and logo systems
2. Brand guidelines and visual language
3. Typography and art direction
4. UI/UX design for web and mobile
5. Design systems and component libraries
6. Wireframes, user flows and prototyping
7. Packaging and print design
8. Campaign, social and ad creatives
9. Pitch decks and launch material

### 3.2 Frontend Engineering
**Short line:** I turn designs into fast, responsive, accessible interfaces, with the motion and polish intact.
1. HTML, CSS and modern JavaScript
2. TypeScript
3. React and Next.js (App Router)
4. Tailwind CSS
5. GSAP and Framer Motion animation
6. Responsive and accessible layouts
7. Performance and technical SEO
8. React Native UI

### 3.3 Backend & Full Stack
**Short line:** Enough backend to take a product from idea to a working, deployed MVP.
1. Node.js
2. Next.js route handlers and server actions
3. REST APIs and third party integrations
4. Supabase (Postgres, Auth, Storage)
5. Data modelling for small products
6. Authentication flows
7. Git, GitHub and code review
8. Vercel deployment and CI

> `[ANDRE: Only keep items here you are comfortable discussing in an interview. Remove any you are not.]`

### 3.4 How I work (one line under the groups)
I use AI coding tools to move faster, and I review, test and take responsibility for everything that ships.
> `[ANDRE: keep or remove this line]`

### 3.5 Tools row
Figma / Adobe Photoshop / Illustrator / InDesign / Framer / Webflow / VS Code / Cursor / GitHub / Vercel / Supabase / Notion / Linear / Slack

IMG (right column): `public/images/skills/workspace.webp` (Andre at work, or a desk with sketches and a laptop). Date tag under it: "2020 to now".

---

## 4. Selected Work (section id `work`)

| Slot | Content |
|------|---------|
| Tag | Selected Work |
| Heading | PROJECTS |
| Intro | Brand systems, product interfaces and websites for teams in fintech, Web3, e-commerce, music and consumer goods. |
| Link | See all projects → `/projects` |
| Card link label | View case study |

Marquee row 1: Pepsa, MySounds Global, SupaShop, SupaDex, Andre Creations Portfolio
Marquee row 2: SupaDAO, SupaCore Design System, Apus Industries, Amyola, Trenztech (only if Andre approves, see 4.10)

### 4.0 `/projects` page
- Title: ALL PROJECTS
- Intro: A closer look at the work. Each project shows the problem, what I did and what came out of it.
- Filters: All · Brand · Product UI · Web

### Project entries
Each entry gives every field for `projects.ts`. Long text fields go on the case study page.

#### 4.1 Pepsa
- **slug:** `pepsa`
- **title:** Pepsa
- **category:** Product UI, Web
- **year:** 2022 to 2023
- **role:** UI/UX & Frontend Interface Designer
- **tools:** Figma, React, Adobe Illustrator
- **live:** `[ANDRE: Pepsa live URL]`
- **summary (card):** Dashboards and onboarding for a digital payments and credit platform.
- **overview:** Pepsa is a digital payments and credit platform for everyday customers and merchants. I joined to design the core product experience: onboarding, dashboards and the screens people use to track their money.
- **challenge:** Financial products live or die on trust. The interface had to make balances, transactions and credit information easy to read on small screens, without feeling cold or complicated.
- **approach:** I set a clear hierarchy for financial data so the most important number on each screen is obvious. I designed onboarding as a short, guided flow, built responsive dashboard layouts, and worked closely with the product and engineering leads so the React build matched the designs pixel for pixel.
- **outcome:** The product launched and is live. The design gave Pepsa a calm, trustworthy interface that works as well on a budget Android phone as on desktop. `[ANDRE: add a real metric if you have one]`
- **IMG:** cover `images-raw/projects/pepsa/cover.png`, gallery: onboarding, dashboard, transaction history, mobile views.

#### 4.2 MySounds Global
- **slug:** `mysounds-global`
- **title:** MySounds Global
- **category:** Product UI, Brand
- **year:** 2026
- **role:** Product Designer & UI Builder (retainer)
- **tools:** Figma, React Native, Adobe Photoshop
- **live:** `[ANDRE: MySounds live URL or app store link]`
- **summary (card):** An 11 screen creator and music marketplace app, from onboarding to storefront.
- **overview:** MySounds Global is a Web3 creator and music marketplace where artists sell and share their work. I led the visual direction and the UI architecture for the mobile experience.
- **challenge:** Artists and fans are very different users, and Web3 concepts can scare people away. The app needed to feel like a music product first and a marketplace second.
- **approach:** I designed 11 core screens covering artist onboarding, profiles, storefronts and digital asset flows. I built a set of reusable components and interface specs so new features could roll out quickly without breaking the look. I also produced launch graphics and mockups for creator acquisition.
- **outcome:** The product went live with a consistent visual system the team could keep extending. `[ANDRE: add a real metric if you have one]`
- **IMG:** cover `images-raw/projects/mysounds-global/cover.png`, gallery: onboarding, artist profile, storefront, launch graphics.

#### 4.3 SupaShop
- **slug:** `supashop`
- **title:** SupaShop
- **category:** Product UI, Web
- **year:** 2024
- **role:** Lead UI/UX & Web Designer, Supa Inc.
- **tools:** Figma, Next.js, Tailwind CSS
- **live:** `[ANDRE: URL or remove]`
- **summary (card):** Storefront, catalogue and checkout design for Supa Inc.'s e-commerce product.
- **overview:** SupaShop is the e-commerce product in the Supa Inc. suite. I designed the storefront experience, from browsing the catalogue to checking out.
- **challenge:** Shoppers needed to find products quickly and check out without friction, on mobile first.
- **approach:** I designed responsive storefront layouts, catalogue browsing and filtering, product pages and a short checkout flow, all built from the shared Supa design system so it felt like one family with the other products.
- **outcome:** The redesigned UI and marketing visuals helped drive about a 40% increase in user engagement.
- **IMG:** cover `images-raw/projects/supashop/cover.png`, gallery: home, catalogue, product page, checkout.

#### 4.4 SupaDAO
- **slug:** `supadao`
- **title:** SupaDAO
- **category:** Product UI
- **year:** 2024
- **role:** Lead UI/UX & Web Designer, Supa Inc.
- **tools:** Figma
- **summary (card):** A governance interface that makes proposals and voting easy to follow.
- **overview:** SupaDAO is the community governance product in the Supa Inc. suite, where members create proposals and vote.
- **challenge:** Governance tools are usually dense and technical. Members needed to understand a proposal and cast a vote in a few taps.
- **approach:** I designed clear proposal cards, a simple voting flow with confirmation states and a results view that shows where a vote stands at a glance, using components from the shared design system.
- **outcome:** A cleaner, more approachable governance experience, consistent with the rest of the Supa suite. `[ANDRE: add detail or metric]`
- **IMG:** cover `images-raw/projects/supadao/cover.png`.

#### 4.5 SupaDex
- **slug:** `supadex`
- **title:** SupaDex
- **category:** Product UI
- **year:** 2024
- **role:** Lead UI/UX & Web Designer, Supa Inc.
- **tools:** Figma
- **summary (card):** A token exchange interface designed for clarity under pressure.
- **overview:** SupaDex is the decentralized exchange in the Supa Inc. suite.
- **challenge:** Trading screens carry a lot of live information, and mistakes cost real money. Every number had to be readable and every action reversible until confirmed.
- **approach:** I designed the swap flow, token selection, price and fee breakdowns and confirmation states, with strong visual hierarchy and clear warnings where they matter.
- **outcome:** A trading experience that feels calm and readable, sharing one design language with the other Supa products. `[ANDRE: add detail or metric]`
- **IMG:** cover `images-raw/projects/supadex/cover.png`.

#### 4.6 SupaCore Design System
- **slug:** `supacore-design-system`
- **title:** SupaCore Design System
- **category:** Product UI, Brand
- **year:** 2024
- **role:** Lead UI/UX & Web Designer, Supa Inc.
- **tools:** Figma, Tailwind CSS
- **summary (card):** One documented design system powering four products.
- **overview:** SupaCore is the foundation of the Supa Inc. suite. I built and documented the design system that SupaShop, SupaDAO and SupaDex all use.
- **challenge:** Four products, one small team. Without a shared system, every screen would drift and every feature would take longer to build.
- **approach:** I defined the brand foundations (type, color, spacing, iconography), built a component library with documented states and usage rules, and set up handoff conventions with developers. I also mentored junior designers on typography, layout and brand consistency.
- **outcome:** Design to development work became about 30% more efficient, and the four products finally looked and felt like one company.
- **IMG:** cover `images-raw/projects/supacore-design-system/cover.png`, gallery: tokens, components, documentation pages.

#### 4.7 Apus Industries
- **slug:** `apus-industries`
- **title:** Apus Industries
- **category:** Brand
- **year:** 2025 to 2026
- **role:** Brand & Digital Designer
- **tools:** Adobe Illustrator, Photoshop, InDesign
- **summary (card):** Packaging, print and digital brand assets for a consumer products company.
- **overview:** Apus Industries Limited makes consumer products sold in retail. I designed their packaging, marketing collateral and web ready brand assets.
- **challenge:** The products had to stand out on crowded shelves and stay consistent across print, social and the web.
- **approach:** I designed product packaging and print ready marketing materials, created digital campaign assets, and built reusable templates and asset libraries so recurring work could be produced faster.
- **outcome:** Stronger shelf presence and a consistent brand across channels, with creative turnaround time cut by about 20%.
- **IMG:** cover `images-raw/projects/apus-industries/cover.png`, gallery: packaging, print, social.

#### 4.8 Amyola (formerly Gossipears)
- **slug:** `amyola`
- **title:** Amyola
- **category:** Brand
- **year:** 2020 to 2022
- **role:** Graphic & Brand Designer
- **tools:** Adobe Illustrator, Photoshop
- **summary (card):** Building a recognisable visual identity for a growing digital brand.
- **overview:** Amyola, formerly Gossipears, was where I built my foundation as a brand designer. I owned the visual side of the brand across web and social.
- **challenge:** The brand was growing fast and needed a consistent look so people could recognise it anywhere.
- **approach:** I created the brand system, web graphics, editorial visuals and recurring campaign assets, working with marketing leadership to keep every release on brand and on time.
- **outcome:** A consistent visual language across every customer touchpoint, through the rename from Gossipears to Amyola. `[ANDRE: add detail or metric]`
- **IMG:** cover `images-raw/projects/amyola/cover.png`.

#### 4.9 Andre Creations Portfolio (this site)
- **slug:** `andre-creations-portfolio`
- **title:** Andre Creations Portfolio
- **category:** Web, Brand
- **year:** 2026
- **role:** Designer and developer
- **tools:** Next.js, TypeScript, Tailwind CSS, GSAP, Vercel
- **live:** https://andrescreation.vercel.app
- **code:** `[ANDRE: GitHub repo URL if public]`
- **summary (card):** The site you're on. Designed and built from scratch, no backend, scores 90+ on Lighthouse.
- **overview:** I rebuilt my portfolio as a fast, static site with editorial design and scroll driven motion.
- **challenge:** My old portfolio relied on an admin panel and a database that kept losing data. I wanted something that could never break, still looked premium and was easy to update.
- **approach:** Static Next.js with all content in the codebase, an image pipeline that compresses every image to lightweight WebP before deploy, GSAP scroll animation on desktop only, automated end to end, accessibility and performance tests.
- **outcome:** Zero backend, zero database, nothing to hack or wipe. `[ANDRE: add final Lighthouse scores after launch]`

#### 4.10 Trenztech (optional, default `draft: true`)
- **slug:** `trenztech`
- **title:** Trenztech
- **category:** Product UI
- **year:** 2024 to 2025
- **role:** UI/UX & Graphic Designer
- **summary (card):** Refreshing web and mobile interfaces ahead of new feature launches.
- **overview:** At Trenztech Limited I designed and iterated on web and mobile interfaces and modernised product visuals for new releases.
- **approach:** I ran design iterations based on structured usability feedback, simplified key customer workflows and built interactive prototypes with stakeholders before launch.
- **outcome:** Key workflows became simpler, contributing to about a 25% improvement in app usability.
> `[ANDRE: publish only if you have images you're allowed to show]`

---

## 5. Experience (section id `experience`)

| Slot | Content |
|------|---------|
| Tag | Experience |
| Heading | WHERE I'VE WORKED |
| Intro | Six years of independent brand, product and web work for remote teams. |
| Umbrella role | Independent Brand & Product Designer, Andre Creations (Freelance) · 2020 to Now · Remote |
| Button | Download full CV |

Selected clients under Andre Creations:

| Years | Role | Client | One line | Location |
|-------|------|--------|----------|----------|
| 2026 | Product Designer & UI Builder (monthly retainer) | MySounds Global | Led UI for an 11 screen creator and music marketplace app. | Remote |
| 2025 to 2026 | Brand & Digital Designer | Apus Industries Limited | Packaging, print and digital assets. Cut creative turnaround by about 20%. | Remote |
| 2024 to 2025 | UI/UX & Graphic Designer | Trenztech Limited | Web and mobile UI refresh. About 25% better app usability. | Remote |
| 2024 | Lead UI/UX & Web Designer | Supa Inc. (SupaShop, SupaDAO, SupaDex, SupaCore) | Built the design system for four products. About 40% more engagement. | Remote |
| 2022 to 2023 | UI/UX & Frontend Interface Designer | Pepsa | Dashboards and onboarding for a payments and credit platform. | Remote |
| 2020 to 2022 | Graphic & Brand Designer | Amyola (formerly Gossipears) | Brand system and campaign visuals across web and social. | Remote |

### 5.1 Certifications (small list under the table)
- Google UX Design Professional Certificate, Coursera
- Graphic Design Specialization, Coursera
- Google Project Management Certificate, Coursera
- HubSpot Inbound Marketing Certification

### 5.2 Volunteer
- Volunteer Graphic Designer, Afridole Charity Hub (2020 to 2021). Fundraising and outreach visuals.

---

## 6. Contact (section id `contact`)

| Slot | Content |
|------|---------|
| Tag | Contact |
| Heading | LET'S BUILD SOMETHING |
| Paragraph | Hiring for a design or design engineering role? Need a brand and a website that match? Tell me what you're working on. I usually reply within a day. |
| Direct links | Email: andrescreation1@gmail.com · WhatsApp: +234 903 964 0382 · GitHub · LinkedIn (when filled) |
| Recruiter line (small) | Recruiters: my CV is one click away, and I'm happy to do a call in UK, EU or US hours. |

### 6.1 Form
| Field | Label | Type | Required | Options / placeholder |
|-------|-------|------|----------|-----------------------|
| name | Your name | text | yes | Jane Doe |
| email | Your email | email | yes | jane@company.com |
| type | What do you need? | select | yes | A full time hire · Brand identity · Website or landing page · Product UI/UX · Something else |
| budget | Budget | select | no | Under $1,000 · $1,000 to $3,000 · $3,000 to $7,000 · $7,000+ · Not sure yet · It's a salaried role |
| message | Message | textarea | yes | A few lines about the role or project |
| submit | Send on WhatsApp | button | | |

Helper text under button: "This opens WhatsApp with your message ready to send. Prefer email? Write to andrescreation1@gmail.com."

**WhatsApp message template** (URL encoded into `https://wa.me/2349039640382?text=`):
```
Hi Andre, I'm {name} ({email}).
I'm reaching out about: {type}
Budget: {budget}

{message}

(Sent from andrescreation.vercel.app)
```

Validation messages:
- name: "Please add your name."
- email: "Please add a valid email."
- type: "Please pick one."
- message: "A short message helps me reply properly."

---

## 7. Footer
- Logo
- Line: Designed and built by Andre Pascal in Ibadan, Nigeria.
- Links: Work · About · Experience · Contact · GitHub · LinkedIn
- Copyright: © {current year} Andre Creations. All rights reserved.
- Back to top: "Back to top"

---

## 8. Case study page template labels
- Meta labels: Role · Year · Tools · Live site
- Section labels: Overview · The challenge · What I did · The result
- Live link label: Visit live site
- Next block label: Next project
- Back link: All projects

---

## 9. 404 page
- Heading: 404
- Text: This page doesn't exist, or it moved. Let's get you back.
- Button: Back to home

---

## 10. Recruiter checklist (the agent must confirm each is visible without scrolling more than one section)
- [ ] Name and role in the hero
- [ ] Years of experience (About intro)
- [ ] Design skills vs engineering skills clearly split (Skills)
- [ ] Real companies and dates (Experience)
- [ ] Two CV downloads (navbar, Experience)
- [ ] Time zone and remote availability (Hero contact block, Contact)
- [ ] Email and WhatsApp reachable in one click
