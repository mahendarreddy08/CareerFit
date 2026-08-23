# CareerFit

Know your fit. Close your skill gaps.

CareerFit helps users compare their resume with a job description and understand how well they match, what skills they already have, what skills they are missing, which missing skills matter most, and what they should learn next.

Built with Next.js, Tailwind CSS, and shadcn/ui in a Turborepo monorepo.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `apps/web/` — Next.js application
  - `app/page.tsx` — Landing page
  - `app/analyze/page.tsx` — Analysis input page
  - `app/analyzing/page.tsx` — Loading state
  - `app/results/page.tsx` — Results page
  - `components/` — Reusable UI components
  - `data/careerfit.ts` — CareerFit data and placeholder analysis
- `packages/ui/` — Shared UI component library
  - `src/styles/globals.css` — Design tokens and global styles

## Pages

- **Landing** — Hero with CareerFit analysis preview and "How it works" section
- **Analyze** — Upload resume (PDF/DOCX) or paste text, add job description
- **Analyzing** — Animated loading state showing analysis progress
- **Results** — Career fit score, matched skills, skill gaps, and next move recommendation

## Design

- Editorial typography with strong whitespace
- Graphite/charcoal neutrals with warm off-white surfaces
- One restrained amber accent color
- Thin borders and carefully controlled rounded corners
- Information-first layouts