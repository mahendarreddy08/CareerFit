# Blog + Project Detail Pages — Design Spec

## Context

The portfolio template is currently a single-page bento grid. The user wants to add:
1. A blog page with MDX-based posts
2. A project detail page (also MDX) that opens when clicking a project tile

Both use MDX files as the content source — no database, fully static.

## Navigation

Add a floating glass pill nav bar to all pages:
- Left: portfolio name (links to `/`)
- Right: "Work" (links to `/#work` or `/`), "Blog" (links to `/blog`)
- Same `.glass` styling as other elements
- Positioned at top center, consistent across all pages

## Blog

### Listing page — `/blog`

- Page title: "Blog" or "Writing"
- Clean vertical list inside a glass card container
- Each post row: title (link), date (formatted), one-line excerpt
- Sorted by date descending (newest first)
- Minimal — no thumbnails, no tags, just text
- Responsive: works naturally in single column

### Post page — `/blog/[slug]`

- MDX content rendered with Tailwind Typography (`prose` class)
- Wrapped in a glass card on the gradient background
- Header: title, date, optional excerpt as subtitle
- Back link to `/blog` at top
- Max-width for comfortable reading (~720px)

### Content source

- MDX files in `apps/web/content/blog/`
- Filename is the slug: `my-first-post.mdx` → `/blog/my-first-post`
- Frontmatter schema:
  ```yaml
  title: "Post Title"
  date: "2026-03-29"
  excerpt: "A one-line summary."
  ```
- Include 2 sample blog posts

## Project Detail

### Page — `/projects/[slug]`

- MDX case study format
- Header area: cover image (full-width, rounded), title, metadata row (role, year, tags as pills)
- MDX body below for rich content — headings, paragraphs, images, code blocks
- Wrapped in glass card styling, max-width for readability
- Back link to `/` at top

### Content source

- MDX files in `apps/web/content/projects/`
- Filename is the slug: `mindful.mdx` → `/projects/mindful`
- Frontmatter schema:
  ```yaml
  title: "Mindful — Wellness App"
  description: "A mobile-first wellness application..."
  tags: ["UX", "Mobile", "Research"]
  image: "/images/project-01.svg"
  role: "Lead Designer"
  year: "2025"
  ```
- Create MDX files for the 4 existing sample projects

### Homepage integration

- Project tiles in the bento grid link to `/projects/[slug]` instead of `#`
- Update `portfolio.ts`: change `url` field to match slug, or derive slug from title

## Technical Approach

### MDX parsing

Use `next-mdx-remote` for loading and rendering MDX at build time:
- `next-mdx-remote/rsc` for React Server Components (Next.js 16 App Router)
- Utility functions to read/parse MDX files from the content directory
- Gray-matter for frontmatter parsing

### Packages to install

- `next-mdx-remote` — MDX rendering
- `gray-matter` — frontmatter parsing
- `@tailwindcss/typography` — prose styling for rendered content

### Shared utilities

- `apps/web/lib/mdx.ts` — functions to:
  - `getPostBySlug(dir, slug)` — read + parse a single MDX file
  - `getAllPosts(dir)` — list all posts with frontmatter, sorted by date
  - Return frontmatter + raw MDX content

### Shared layout

- `apps/web/components/mdx-layout.tsx` — glass card wrapper with back link, used by both blog posts and project pages
- `apps/web/components/nav.tsx` — floating glass pill nav for all pages

## Files to Create

| File | Purpose |
|------|---------|
| `apps/web/content/blog/design-systems-matter.mdx` | Sample blog post 1 |
| `apps/web/content/blog/from-figma-to-code.mdx` | Sample blog post 2 |
| `apps/web/content/projects/mindful.mdx` | Project case study |
| `apps/web/content/projects/nova-dashboard.mdx` | Project case study |
| `apps/web/content/projects/bloom.mdx` | Project case study |
| `apps/web/content/projects/pulse.mdx` | Project case study |
| `apps/web/lib/mdx.ts` | MDX file reading utilities |
| `apps/web/app/blog/page.tsx` | Blog listing page |
| `apps/web/app/blog/[slug]/page.tsx` | Blog post page |
| `apps/web/app/projects/[slug]/page.tsx` | Project detail page |
| `apps/web/components/mdx-layout.tsx` | Shared glass card layout for MDX pages |
| `apps/web/components/nav.tsx` | Floating glass pill navigation |

## Files to Modify

| File | Change |
|------|--------|
| `apps/web/app/layout.tsx` | Add `<Nav />` component |
| `apps/web/app/page.tsx` | Add nav spacing |
| `apps/web/data/portfolio.ts` | Update project `url` fields to `/projects/[slug]` |
| `apps/web/components/bento-grid.tsx` | Add blog link tile or update nav reference |

## Verification

1. `npm run dev` — all pages load
2. `/blog` — lists sample posts, sorted by date
3. `/blog/[slug]` — renders MDX with prose styling in glass card
4. Click project tile on homepage → navigates to `/projects/[slug]`
5. `/projects/[slug]` — renders cover image, metadata, MDX body
6. Nav works on all pages — links to home, blog
7. Dark/light mode works on all new pages
8. Mobile responsive — all pages stack properly
9. `npm run build && npm run lint` — clean
