# Minimal Portfolio Template — Design Spec

## Context

A single-page, reusable portfolio template for UX/UI designers and developers. Users swap content via a single config file — no component editing needed. The layout uses a bold split-hero with alternating project rows, inspired by editorial/magazine design.

## Color Palette

| Token          | Light Mode                     | Dark Mode                      |
| -------------- | ------------------------------ | ------------------------------ |
| `--background` | `#A4D8FF` (Icy Blue)          | `#35393C` (Gunmetal)           |
| `--foreground` | `#35393C` (Gunmetal)           | `#F5F5F5` (Off-white)          |
| `--muted`      | `#35393C` at 60% opacity       | `#9CA3AF` (Gray)               |
| `--accent`     | `#35393C` (Gunmetal)           | `#A4D8FF` (Icy Blue)           |
| `--card`       | `#FFFFFF` at 80%               | `#FFFFFF` at 5%                |
| `--border`     | `#35393C` at 10%               | `#FFFFFF` at 10%               |

## Layout — Sections (top to bottom)

### 1. Navigation

- Sticky top bar with backdrop blur
- Left: name/logo as text (clickable, scrolls to top)
- Right: anchor links — "Work", "About", "Contact"
- On mobile: same layout, links collapse behind a hamburger if needed (or stay visible if they fit)

### 2. Hero (split, full viewport height)

- **Left half:** Large heading (name), subtitle line (role — e.g. "Designer & Developer"), short tagline paragraph, CTA button ("View Projects" — smooth scrolls to projects section)
- **Right half:** Placeholder image area (configurable — could be a photo, illustration, or abstract visual)
- On mobile: stacks vertically — text above, image below

### 3. Projects (alternating rows)

- Section heading: "Selected Work"
- Each project is a row: large image (60% width) + text block (40% width)
- Text block: project title, 1-2 sentence description, category tags (pill-shaped)
- Rows alternate: image-left/text-right, then text-left/image-right
- 4-6 project slots (configurable via data file)
- Subtle fade-in animation on scroll (CSS `@keyframes` + Intersection Observer, no heavy library)
- On mobile: stacks — image on top, text below (every row)

### 4. About + Contact (split footer section)

- **Left half:** Heading "About", bio paragraph, skills as tags/pills
- **Right half:** Heading "Get in Touch", email link, social icon links (LinkedIn, Dribbble, GitHub, Twitter/X)
- Bottom: simple copyright line
- On mobile: stacks vertically — about above, contact below

## Typography

- **Font:** Inter via `next/font/google` (already common in the Next.js ecosystem, clean sans-serif)
- **Heading scale:** `text-5xl` / `text-4xl` / `text-2xl` (responsive)
- **Body:** `text-base` / `text-lg`
- **Weight:** 400 for body, 600-700 for headings

## Data Configuration

All portfolio content lives in a single file: `apps/web/data/portfolio.ts`

```ts
export const portfolio = {
  name: "Jane Doe",
  role: "Designer & Developer",
  tagline: "Crafting digital experiences that put people first.",
  heroImage: "/images/hero.jpg",
  about: {
    bio: "A short paragraph about yourself...",
    skills: ["UX Design", "UI Design", "Prototyping", "React", "Figma"],
  },
  projects: [
    {
      title: "Project Name",
      description: "One or two sentences about the project.",
      tags: ["UX", "Research"],
      image: "/images/project-01.jpg",
      url: "https://example.com", // optional external link
    },
    // ... more projects
  ],
  contact: {
    email: "hello@example.com",
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/..." },
      { platform: "Dribbble", url: "https://dribbble.com/..." },
      { platform: "GitHub", url: "https://github.com/..." },
    ],
  },
};
```

## Components to Build

| Component        | Location                           | Purpose                            |
| ---------------- | ---------------------------------- | ---------------------------------- |
| `Navbar`         | `apps/web/components/navbar.tsx`   | Sticky nav with anchor links       |
| `Hero`           | `apps/web/components/hero.tsx`     | Split hero section                 |
| `ProjectCard`    | `apps/web/components/project-card.tsx` | Single alternating project row |
| `ProjectsSection`| `apps/web/components/projects-section.tsx` | Maps over projects data     |
| `Footer`         | `apps/web/components/footer.tsx`   | About + Contact split section      |

## Animations

- **Scroll fade-in:** Project rows fade in + slight upward translate as they enter the viewport. Use a lightweight `useIntersectionObserver` hook or CSS `animation-timeline: view()` if targeting modern browsers.
- **Hover effects:** Project images scale slightly (1.02) on hover with a smooth transition. CTA button has a subtle color shift.
- **No heavy animation libraries** — CSS transitions + one small hook if needed.

## Responsive Breakpoints

- **Desktop:** `lg:` (1024px+) — split layouts, side-by-side
- **Tablet:** `md:` (768px+) — narrower splits, smaller images
- **Mobile:** default — fully stacked, single column

## Dark/Light Mode

- Already wired via existing `theme-provider.tsx` with 'd' key toggle
- Update `globals.css` color tokens to use the Icy Blue / Gunmetal palette
- Light mode: Icy Blue background, Gunmetal text
- Dark mode: Gunmetal background, Icy Blue accents on off-white text

## Files to Modify

- `packages/ui/src/styles/globals.css` — update CSS color variables
- `apps/web/app/page.tsx` — replace demo content with portfolio sections
- `apps/web/app/layout.tsx` — add Inter font, update metadata

## Files to Create

- `apps/web/data/portfolio.ts` — content configuration
- `apps/web/components/navbar.tsx`
- `apps/web/components/hero.tsx`
- `apps/web/components/project-card.tsx`
- `apps/web/components/projects-section.tsx`
- `apps/web/components/footer.tsx`
- `apps/web/hooks/use-intersection-observer.ts` (if needed for scroll animation)
- Placeholder images in `apps/web/public/images/`

## Verification

1. `npm run dev` — site loads with all sections visible
2. Scroll through: nav, hero, projects (alternating), about+contact
3. Toggle dark/light mode with 'd' key — colors swap correctly
4. Resize to mobile — all sections stack properly
5. Edit `data/portfolio.ts` — changes reflect without touching components
6. `npm run build` — no TypeScript or build errors
7. `npm run lint` — no linting errors
