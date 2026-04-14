# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server at http://localhost:3000
npm run build    # Static export → out/ directory (required before deploy)
npm run lint     # ESLint check
```

There are no automated tests. Verify changes with `npm run build` to catch type errors and prerendering failures.

## Architecture

This is a **Next.js 15 static export** personal blog/portfolio site deployed to GitHub Pages at `www.gekal.cn`.

### Key constraints

- `output: 'export'` in `next.config.ts` — no server-side features (no API routes, no dynamic route handlers). Any route that needs data at build time must use `generateStaticParams`. Any `app/icon.tsx` or image-generation routes must export `dynamic = 'force-static'`.
- `images.unoptimized: true` — use plain `<img>` tags or suppress `@next/next/no-img-element` lint warnings where needed.
- `trailingSlash: true` — all links use trailing slashes.

### Blog post pipeline

Posts live in `_posts/` as `.markdown` or `.md` files with Jekyll-style YAML frontmatter (`title`, `date`, `categories`, `tags`, `background`, `subtitle`). The file `lib/posts.ts` reads them at build time using `gray-matter` (frontmatter) → `remark` + `remark-gfm` + `remark-html` (Markdown → HTML). Date parsing is guarded against invalid values (falls back to `new Date(0)`). Tags may be a space-separated string or an array.

New posts: add a file to `_posts/` named `YYYY-MM-DD-slug.markdown`. No other changes needed — `generateStaticParams` in `app/posts/[slug]/page.tsx` picks them up automatically.

### Routing

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Shows 6 most recent posts |
| `/about` | `app/about/page.tsx` | Freelance engineer profile — static content |
| `/posts` | `app/posts/page.tsx` | Full post list |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | Rendered from `_posts/` |
| `/contact` | `app/contact/page.tsx` | `'use client'` — Formspree form. Replace `YOUR_FORM_ID` with real ID |

### Favicon / icons

Three icon files are generated at build time:
- `app/icon.svg` — SVG source (hawk silhouette on teal gradient)
- `app/icon.tsx` — 32×32 PNG via `ImageResponse`
- `app/apple-icon.tsx` — 180×180 PNG via `ImageResponse`

Both `.tsx` icons require `export const dynamic = 'force-static'` for static export compatibility.

### Styling

Tailwind CSS with `@tailwindcss/typography`. Primary color `#0085A1` is defined as `primary` in `tailwind.config.ts`. Post content uses the `prose` class. Code blocks are highlighted client-side by Highlight.js (loaded from CDN in `app/layout.tsx`).

### Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and deploys `out/` to GitHub Pages via `actions/deploy-pages@v4`. GitHub Pages must be configured to use **GitHub Actions** as the source (not the legacy branch method). `public/CNAME` contains `www.gekal.cn` for the custom domain.
