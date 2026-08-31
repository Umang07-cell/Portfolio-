# Plan: Clone Armaan Kachhawa's Portfolio into Umang's Portfolio

## Context
The user wants to completely replace their current portfolio with a clone of https://armaankachhawadev.vercel.app/, using their existing content (already in `src/data/content.js`). The target site is a Next.js app with sophisticated scroll animations (Lenis smooth scroll, clip-path text reveals, SVG timeline, horizontal project slider, canvas footer). We'll recreate this in their React + Vite + Framer Motion stack.

## Current Stack Analysis
- **React 19** + **Framer Motion** for animations
- **Vite** for build
- **Custom CSS variables** in `src/styles/globals.css` (design tokens)
- **Existing scroll utilities**: `useScrollReveal`, `ScrollReveal`, `StaggerReveal`, `HorizontalTimeline`
- **Content**: All user data in `src/data/content.js` (profile, heroCopy, aboutCopy, finsight, otherProjects, techGroups, experience, journey, horizontalTimeline, currentlyBuilding)

## Target Site Structure & Features

### 1. Hero Section (`hero-section`)
- Full-screen background image (aspect-ratio 16:9, absolute, behind content)
- Split layout: left text + right text
- Animated SVG icons (JS, Python, Java, Dollar signs) - appear on scroll with opacity transitions
- Large headline text: "I turn data chaos into intelligent solutions. $$$" / "I'm Voyager Armaan Kachhawa"
- Scroll cue at bottom

### 2. Intro Section (`intro-section`)
- Clip-path text reveal animations (polygon-based reveals)
- "Pleased to meet ya, I'm an AI & Data Science enthusiast based in IIT Jodhpur, India"
- Scroll-triggered reveals for "intelligent" and "impactful" words
- Uses `clip-path: polygon()` for progressive text reveals

### 3. Projects Section (`projects-container` + `bingeable-wrapper`)
- Large scaled title: "What crazy I've Been Build" (scale-[10] initially)
- Horizontal slider (`bingeable-slider`) with multiple slides:
  - **Slide 1**: Main project showcase (EduVoyage) - image + right panel with title, description, stats, Windows icon
  - **Front-end**: Tech logos scroll, feature tags, code snippet image
  - **Back-end**: Tech logos scroll, feature tags, code snippet image
  - **Challenges**: 3 challenges with clip-path text reveals
  - **Final**: Logo + name
- Scroll-snap horizontal scrolling

### 4. Timeline Section (`timeline-intro-wrapper` + `timeline`)
- "Let's take it back" title
- SVG path line with circles (balls) at milestones
- Images positioned absolutely along timeline (Newton, barber, haircuts, competition, camera, film stills)
- Text cards positioned along timeline with years (2022, 2023, 2024, 2025)
- Scroll-triggered opacity/rotate animations for images and text

### 5. Testimonials/Kind Words
- Three words: "Some Kind Words" with different colors

### 6. Footer (`footer-wrapper`)
- Canvas animation (particle/line effect)
- "Looks like you overflowed my tech stack..." text
- Contact buttons: Message (send icon), GitHub
- Profile photo circle

## Implementation Approach

### Phase 1: Core Infrastructure
1. **Add Lenis smooth scroll** - Install `@studio-freight/lenis` or implement custom smooth scroll for consistent scroll-driven animations
2. **Create scroll-driven animation utilities** - Extend `useScrollReveal` with Framer Motion's `useScroll`/`useTransform` for clip-path and progress-based animations
3. **Add SVG icon components** - Create animated SVG icons (JS, Python, Java, Dollar) as React components

### Phase 2: Hero Section
1. New `HeroV2.jsx` component with:
   - Full-screen background image (use existing hero image or placeholder)
   - Split layout with large text
   - Animated SVG icon groups (3 groups × 3 icons = 9 SVGs) with scroll-triggered opacity
   - Parallax on background image
   - Scroll indicator

### Phase 3: Intro Section
1. New `Intro.jsx` component with:
   - Clip-path text reveal utility (polygon animation)
   - `useScroll` + `useTransform` for scroll progress → clip-path
   - Staggered reveals for "intelligent" and "impactful"

### Phase 4: Projects Slider
1. New `ProjectsSlider.jsx` component with:
   - Horizontal scroll container with `scroll-snap-x`
   - Large title with scale animation (using `useScroll` + `useTransform`)
   - 5 slides as described above
   - Map user's `finsight` + `otherProjects` data to slides
   - Tech logo marquee (auto-scroll)
   - Feature tag pills
   - Code snippet images (use placeholders or user's screenshots)

### Phase 5: Timeline Section
1. New `TimelineV2.jsx` component with:
   - SVG path with circles (like existing `HorizontalTimeline` but vertical)
   - Absolute positioned images along path
   - Text cards with scroll reveals
   - Map user's `journey` + `horizontalTimeline` data

### Phase 6: Footer
1. New `FooterV2.jsx` with:
   - Canvas particle animation (simple requestAnimationFrame loop)
   - Contact CTAs
   - Profile image

### Phase 7: Integration & Cleanup
1. Update `App.jsx` to use new components in order
2. Update `globals.css` with new design tokens matching target (dark bg, sand text, blue accent)
3. Remove old components no longer needed
4. Test scroll performance, reduced motion

## File Changes

### New Files to Create
```
src/components/
├── HeroV2.jsx              # New hero with animated SVGs
├── Intro.jsx               # Clip-path text reveals
├── ProjectsSlider.jsx      # Horizontal project slider
├── TimelineV2.jsx          # Vertical SVG timeline
├── FooterV2.jsx            # Canvas footer
├── ui/
│   ├── ClipPathReveal.jsx  # Reusable clip-path text reveal
│   ├── AnimatedSVGIcon.jsx # SVG icon with scroll opacity
│   ├── TechLogoMarquee.jsx # Auto-scrolling tech logos
│   └── CanvasParticles.jsx # Footer canvas animation
└── hooks/
    └── useScrollTransform.js # Framer Motion scroll utilities
```

### Files to Modify
- `src/App.jsx` - Replace component imports and order
- `src/styles/globals.css` - Update design tokens to match target
- `src/styles/components.css` - Add new component styles
- `src/styles/scroll-effects.css` - Add scroll-driven animation styles
- `src/data/content.js` - May need additional fields for new sections
- `package.json` - Add `@studio-freight/lenis` dependency

### Files to Remove/Archive
- `src/components/Hero.jsx` → archive
- `src/components/About.jsx` → archive (merged into Intro)
- `src/components/FinSight.jsx` → archive (merged into ProjectsSlider)
- `src/components/Projects.jsx` → archive
- `src/components/Experience.jsx` → archive (merged into TimelineV2)
- `src/components/Journey.jsx` → archive (merged into TimelineV2)
- `src/components/HorizontalTimeline.jsx` → archive
- `src/components/CurrentlyBuilding.jsx` → archive
- `src/components/Contact.jsx` → archive (merged into FooterV2)

## Design Token Updates (globals.css)
```css
:root {
  --bg-primary: #0e0e0e;        /* Target's dark */
  --bg-secondary: #111118;
  --bg-tertiary: #1a1a24;
  --text-primary: #f5f0e1;      /* Sand/cream */
  --text-secondary: #9999b3;
  --text-muted: #555570;
  --accent-primary: #2e54d1;    /* Target's blue */
  --accent-primary-rgb: 46, 84, 209;
  --accent-glow: rgba(46, 84, 209, 0.15);
  --border-subtle: rgba(255, 255, 255, 0.06);
  /* ... rest similar */
}
```

## Data Mapping
| Target Section | User's Data Source |
|----------------|-------------------|
| Hero text | `heroCopy.positioning`, `heroCopy.description` |
| Intro text | `aboutCopy.paragraphs[0]`, profile.location |
| Projects | `finsight` + `otherProjects` |
| Timeline | `journey` + `horizontalTimeline` |
| Footer | `profile` |

## Verification Checklist
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Smooth scroll works on all sections
- [ ] Clip-path reveals trigger at correct scroll positions
- [ ] Horizontal slider snaps and navigates
- [ ] Timeline images/text reveal on scroll
- [ ] SVG icons animate on scroll
- [ ] Canvas footer animation runs
- [ ] Reduced motion respected (prefers-reduced-motion)
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] All user content displays correctly
- [ ] No console errors

## Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Scroll performance with many animations | Use `will-change`, `transform3d`, limit concurrent animations |
| Clip-path browser support | Fallback to opacity/transform for unsupported browsers |
| Horizontal slider touch UX | Add touch drag, scroll snap, momentum |
| Canvas performance | Limit particle count, use `requestAnimationFrame` efficiently |
| Content mismatch | Map user data carefully, add fallbacks for missing fields |

## Timeline Estimate
- Phase 1-2 (Core + Hero): 2-3 hours
- Phase 3 (Intro): 1 hour
- Phase 4 (Projects Slider): 3-4 hours
- Phase 5 (Timeline): 2-3 hours
- Phase 6 (Footer): 1-2 hours
- Phase 7 (Integration): 1-2 hours
**Total: ~10-15 hours**

## Questions for User
1. **Hero background image**: Do you have a hero image to use, or should I use a placeholder/gradient?
2. **Project screenshots**: The target uses code snippet images and project screenshots. Do you have these for FinSight/HR-PolicyIQ/Atlas-AI/Closira?
3. **Timeline images**: The target has personal photos along the timeline. Do you have images to use, or should I use placeholders?
4. **Smooth scroll library**: Should I use `@studio-freight/lenis` (industry standard) or a lighter custom implementation?
5. **Canvas footer**: The target has a WebGL/canvas particle effect. Want a simplified version or full particle system?
6. **Fonts**: Target uses custom heading font. Keep your current `Syne` or match theirs?