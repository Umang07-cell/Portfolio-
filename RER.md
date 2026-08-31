# RER.md — Assets Required for Portfolio

This file lists all placeholder assets currently in use. Replace each with your actual files when ready.

---

## 🎯 Hero Section (`/public/hero-bg.*`)

**Current:** CSS gradient mesh background  
**Needed:** Full-screen background image (16:9 aspect ratio)

| File | Specs | Usage |
|------|-------|-------|
| `hero-bg.jpg` / `hero-bg.webp` | 1920×1080 min, 3840×2160 ideal | Full-screen hero background behind text |
| `hero-bg-mobile.jpg` | 750×1334 (portrait) | Optional: mobile-specific crop |

**Drop into:** `public/hero-bg.jpg` (or .webp/.png)

---

## 🖼️ Project Screenshots (`/public/projects/`)

**Current:** Colored placeholder cards with project icons  
**Needed:** Actual screenshots for the horizontal project slider

### Required per project:

| Project | Files Needed | Specs |
|---------|--------------|-------|
| **FinSight** (featured) | `finsight-main.jpg` — hero screenshot<br>`finsight-fe.jpg` — frontend code snippet<br>`finsight-be.jpg` — backend code snippet | 16:9 ratio, 1920×1080+ |
| **HR-PolicyIQ** | `hr-policyiq-main.jpg`<br>`hr-policyiq-fe.jpg`<br>`hr-policyiq-be.jpg` | 16:9 ratio |
| **Atlas-AI** | `atlas-ai-main.jpg`<br>`atlas-ai-fe.jpg`<br>`atlas-ai-be.jpg` | 16:9 ratio |
| **Closira AI** | `closira-main.jpg`<br>`closira-fe.jpg`<br>`closira-be.jpg` | 16:9 ratio |

**Drop into:** `public/projects/` folder

**Code snippet images:** Terminal/code editor screenshots showing key implementation (cursor pagination, custom hooks, AI pipeline, etc.)

---

## 📸 Timeline Photos (`/public/timeline/`)

**Current:** Lucide icons as placeholders  
**Needed:** Personal photos for each timeline milestone (positioned along SVG path)

| Milestone | File | Suggested Content |
|-----------|------|-------------------|
| 2022 — Video Editing | `timeline-2022-editing.jpg` | Premiere/After Effects workspace, or creative project |
| 2022 — Physics/College | `timeline-2022-physics.jpg` | Study desk, textbook, or IIT-related |
| 2023 — 11th Grade | `timeline-2023-11th.jpg` | Report card, certificate, or school memory |
| 2023 — College Race | `timeline-2023-race.jpg` | JEE prep, mock test, or motivation board |
| 2023 — Dropped Year | `timeline-2023-drop.jpg` | Honest photo: coffee, books, late night |
| 2023 — IIT Jodhpur | `timeline-2023-iit.jpg` | Campus, acceptance letter, or celebration |
| 2024 — Coding Start | `timeline-2024-code.jpg` | First code, laptop setup, "Hello World" |
| 2024 — Creative Exploration | `timeline-2024-creative.jpg` | Design work, video edit, UGC ad |
| 2025 — EduVoyage Launch | `timeline-2025-eduvoyage.jpg` | Dashboard screenshot, launch tweet, team |
| 2025 — Freelance/Clients | `timeline-2025-freelance.jpg` | Client work, feedback, or payment proof |
| 2026 — FinSight Live | `timeline-2026-finsight.jpg` | Live demo, analytics, or deployment |
| 2026 — LanceSoft | `timeline-2026-lancesoft.jpg` | Office, badge, or team photo |

**Drop into:** `public/timeline/` folder

**Specs:** Square-ish (1:1 or 4:5), 800×800+ — they'll be displayed at 100-250px wide

---

## 👤 Profile Photo (`/public/profile.jpg`)

**Current:** Placeholder circle  
**Needed:** Professional headshot for footer contact section

| File | Specs |
|------|-------|
| `profile.jpg` | 500×500 minimum, square crop, good lighting |

**Drop into:** `public/profile.jpg`

---

## 🎨 Favicon & Social

**Current:** Default Vite/React icons  
**Needed:**

| File | Specs |
|------|-------|
| `favicon.svg` | Already have — keep or replace |
| `og-image.jpg` | 1200×630 for social sharing (LinkedIn/Twitter cards) |

---

## 📝 How to Replace

1. **Add your files** to the `public/` folders as listed above
2. **Keep exact filenames** (or update the component imports)
3. **Run dev server** — Vite serves `public/` at root, so `/hero-bg.jpg` = `public/hero-bg.jpg`
4. **Test** — images should appear immediately (no rebuild needed for `public/` assets)

---

## ✅ Quick Checklist

- [ ] `public/hero-bg.jpg` — Hero background
- [ ] `public/projects/finsight-main.jpg` — FinSight hero
- [ ] `public/projects/finsight-fe.jpg` — FinSight frontend code
- [ ] `public/projects/finsight-be.jpg` — FinSight backend code
- [ ] `public/projects/hr-policyiq-main.jpg` — HR-PolicyIQ
- [ ] `public/projects/atlas-ai-main.jpg` — Atlas-AI
- [ ] `public/projects/closira-main.jpg` — Closira
- [ ] `public/timeline/timeline-2022-editing.jpg` — First milestone
- [ ] `public/timeline/timeline-2022-physics.jpg`
- [ ] `public/timeline/timeline-2023-11th.jpg`
- [ ] `public/timeline/timeline-2023-race.jpg`
- [ ] `public/timeline/timeline-2023-drop.jpg`
- [ ] `public/timeline/timeline-2023-iit.jpg`
- [ ] `public/timeline/timeline-2024-code.jpg`
- [ ] `public/timeline/timeline-2024-creative.jpg`
- [ ] `public/timeline/timeline-2025-eduvoyage.jpg`
- [ ] `public/timeline/timeline-2025-freelance.jpg`
- [ ] `public/timeline/timeline-2026-finsight.jpg`
- [ ] `public/timeline/timeline-2026-lancesoft.jpg`
- [ ] `public/profile.jpg` — Footer photo
- [ ] `public/og-image.jpg` — Social sharing

---

## 💡 Tips

- **Optimize:** Use WebP for photos (`cwebp -q 80 input.jpg -o output.webp`)
- **Compress:** TinyPNG / ImageOptim before committing
- **Naming:** Keep lowercase, hyphens only — matches import paths
- **Alt text:** Update `alt` props in components when adding real images