# Minimal Portfolio Template

A minimal portfolio template for designers and developers, built with Next.js, Tailwind CSS, and shadcn/ui in a Turborepo monorepo.

Designed and developed by **[Ali Madjaji](https://www.alimadjaji.com)** — free to download at [alimadjaji.com/templates](https://www.alimadjaji.com/templates).

![Minimal Portfolio Template — homepage](apps/web/public/homepage.png)

## Stack

- Next.js (App Router)
- Tailwind CSS + shadcn/ui
- MDX for blog and project content
- Turborepo monorepo (`apps/web`, `packages/ui`)

## Use this template

The fastest way is the green **Use this template** button at the top of this repo — it creates a fresh repository on your account with a clean commit history.

Prefer the command line? `degit` strips the `.git` folder and gives you a pristine working tree:

```bash
npx degit SublimeAli/minimal-portfolio-template my-portfolio
cd my-portfolio
git init
npm install
npm run dev
```

## Requirements

- Node.js **≥ 20**
- npm (this repo uses **npm workspaces** + Turborepo)

## Getting started

If you've cloned the repo directly instead of using one of the options above:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Customizing your portfolio

- **Content** — edit `apps/web/data/portfolio.ts` to update your name, role, bio, projects, and contact info. Almost everything visible on the landing page is driven from this single file.
- **Images** — drop your own assets into `apps/web/public/images/` (e.g. `hero.svg`, `project-01.svg`, `blog-01.svg`) and reference them as `/images/your-file.svg` from `portfolio.ts` and your MDX frontmatter. The default hero (`/ali.webp`) lives directly in `apps/web/public/` — replace it with your own photo and update `portfolio.heroImage`.
- **Blog & projects** — add MDX files under `apps/web/content/blog` and `apps/web/content/projects`.
- **SEO metadata** — update title, description, and OpenGraph tags in `apps/web/app/layout.tsx`.
- **Banner** — the bottom banner credits the template author and is part of the template; please keep it visible if you publish your portfolio. You can edit it in `apps/web/components/banner.tsx`.

## Adding shadcn components

```bash
npx shadcn@latest add button -c apps/web
```

Components are placed in `packages/ui/src/components` and imported via `@workspace/ui/components/<name>`.

## Deploy

The fastest way is Vercel (zero config):

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js. Set the **Root Directory** to `apps/web`.
4. Click Deploy.

Netlify, Cloudflare Pages, or self-hosting (`npm run build && npm start` from `apps/web`) all work too — no environment variables required.

## License

Released under the [MIT License](./LICENSE).

---

© [Ali Madjaji](https://www.alimadjaji.com) · [alimadjaji.com](https://www.alimadjaji.com)
