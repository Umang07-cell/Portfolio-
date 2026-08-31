# Umang Pawar — AI Engineer Portfolio

Built per `umang-portfolio-PRD.md` (Vite + React, no Next.js — the site is fully static).

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` (Vercel fills these in automatically).
4. Deploy.

Or from the CLI, run `vercel` inside this folder and follow the prompts.

## Before you consider this "done" (per PRD Section 11 & 9)

The PRD's placeholder policy hid these rather than faking them — you still need to fill them in:

- **LinkedIn URL** — currently `null` in `src/data/content.js` (`profile.linkedin`), so the LinkedIn link is hidden site-wide (nav, hero, contact). Add the real URL there.
- **Atlas-AI GitHub link** — `otherProjects` in the same file, `links.github` is `null` for Atlas-AI. Add it if the repo is public, otherwise leave as-is.
- **IJRASET publication link** — not currently linked anywhere in the UI; the PRD flags it as a `[TODO]`. Add a link if you want it clickable.

Search `src/data/content.js` for `null` to find every spot.

## Structure

```
src/
  components/        one file per page section (Hero, FinSight, Experience, ...)
  components/ui/     shared pieces (Badge, TechTag, ProjectCard, ArchitectureDiagram, ...)
  data/content.js    all copy and verified stats — edit here, not inside components
  styles/
    globals.css       design tokens (colors, type scale, spacing) — PRD Section 3
    components.css    component + responsive styles
  hooks/useScrollReveal.js   IntersectionObserver hook (used as a lighter-weight
                             alternative pattern to framer-motion's whileInView)
```

Content, stats, and links live in one file (`src/data/content.js`) on purpose —
update your resume details there without touching component code.
