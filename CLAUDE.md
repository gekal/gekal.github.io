# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server at http://localhost:3000
npm run build    # Static export → out/ directory (required before deploy)
npm run lint     # ESLint check
```

`lint` runs `eslint .` directly against `eslint.config.mjs` (flat config). `next lint` was removed
in Next.js 16, and `eslint-config-next` 16 exports flat config natively — no `FlatCompat` shim.
**ESLint must stay pinned to v9**: the `eslint-plugin-react` bundled with `eslint-config-next`
still calls `context.getFilename()`, which ESLint 10 removed, so v10 crashes on every React file.

There are no automated tests. Verify changes with `npm run build` to catch type errors and prerendering failures.

## Architecture

This is a **Next.js 15 static export** personal blog/portfolio site deployed to GitHub Pages at `www.gekal.cn`.

### Key constraints

- `output: 'export'` in `next.config.ts` — no server-side features (no API routes, no dynamic route handlers). Any route that needs data at build time must use `generateStaticParams`. Any image-generation route must export `dynamic = 'force-static'`.
- `images.unoptimized: true` — use plain `<img>` tags or suppress `@next/next/no-img-element` lint warnings where needed.
- `trailingSlash: true` — all links use trailing slashes.
- **Prefer emitting files with extensions.** Static hosts infer `Content-Type` from the extension, and extensionless files are ambiguous. This is why the icons are static `.png` files rather than `ImageResponse` routes.

### Blog post pipeline

Posts live in `_posts/` as `.markdown` or `.md` files with Jekyll-style YAML frontmatter (`title`, `date`, `categories`, `tags`, `background`, `subtitle`). The file `lib/posts.ts` reads them at build time using `gray-matter` (frontmatter) → `remark` + `remark-gfm` + `remark-html` (Markdown → HTML). Date parsing is guarded against invalid values (falls back to `new Date(0)`). Tags may be a space-separated string or an array.

The rehype chain in `getPostData` is **order-sensitive**:

`rehype-slug` → `collectToc` → `rehype-autolink-headings` → `withImageDimensions` → `rehype-highlight`

- `collectToc` must come *after* slug (needs the `id`s) but *before* autolink — otherwise the
  appended `#` anchor text gets swept into the TOC labels.
- `collectToc` / `withImageDimensions` live in `lib/markdown-plugins.ts`. The latter reads real
  files from `public/` to emit `width`/`height`, since `next/image` is unavailable under static
  export and missing dimensions cause layout shift. Broken image paths are skipped, not fatal.
- hast `Properties` are not HTML attributes: `className` takes an **array**, and `aria-*` take
  **strings** (`ariaHidden: 'true'`, not `true`). Passing the HTML-ish form is a type error.

`buildExcerpt` feeds `meta description`, OGP, JSON-LD and RSS. It collapses links/images
structurally rather than stripping the punctuation — deleting just `[`/`]`/`(`/`)` glued label
and URL together (`Claude Codehttps://…`).

New posts: add a file to `_posts/` named `YYYY-MM-DD-slug.markdown`. No other changes needed — `generateStaticParams` in `app/posts/[slug]/page.tsx` picks them up automatically.

### Routing

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Shows 6 most recent posts |
| `/about` | `app/about/page.tsx` | Freelance engineer profile — static content |
| `/posts` | `app/posts/page.tsx` | Full post list |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | Rendered from `_posts/` |
| `/contact` | `app/contact/page.tsx` | Formspree form — the live endpoint is in `components/organisms/ContactForm.tsx` |
| `/feed.xml` | `app/feed.xml/route.ts` | RSS 2.0, 20 most recent posts. Needs `dynamic = 'force-static'` |

### Favicon / icons

Three static files under `app/`, picked up by Next's file convention and referenced explicitly from `metadata.icons` in `app/layout.tsx`:
- `app/icon.svg` — SVG source (hawk silhouette on teal gradient)
- `app/icon.png` — 32×32
- `app/apple-icon.png` — 180×180

These were previously `icon.tsx` / `apple-icon.tsx` generating PNGs via `ImageResponse`, which emitted extensionless `out/icon` and `out/apple-icon`. If you regenerate them, keep them as static files with extensions — see Key constraints.

### Styling

**MUI (Material UI) v9 with Emotion.** There is no Tailwind and no global stylesheet — style with the `sx` prop and the theme.

- `app/theme.ts` — `'use client'`. Material Design palette with `colorSchemes` (light/dark) and `cssVariables`, so the site follows the OS colour scheme. Roboto via `next/font` for Latin; **Japanese text is deliberately left to OS-installed fonts** (Hiragino / Yu Gothic / Noto Sans CJK). Serving Noto Sans JP through `next/font` cost 41 woff2 files / 794 KB per article page — Google Fonts splits CJK into ~120 unicode-range subsets, so every extra weight multiplies that. The current stack is 3 files / 88 KB. Do not add a webfont for Japanese without re-measuring.
- `app/layout.tsx` — `AppRouterCacheProvider` (from `@mui/material-nextjs/v16-appRouter`) wraps `ThemeProvider` + `CssBaseline`. `InitColorSchemeScript` settles the colour scheme before hydration to avoid a flash.
- `app/MarkdownStyles.tsx` — `GlobalStyles` for the `.markdown-body` class. Post bodies are generated HTML injected via `dangerouslySetInnerHTML`, so `sx` cannot reach them; this replaces what `@tailwindcss/typography` used to do, plus the GitHub Dark Dimmed syntax theme.

> **In `MarkdownStyles.tsx`, read colours from `theme.vars.palette`, never `theme.palette`.**
> With `cssVariables` enabled, `theme.palette.*` resolves to the *default* (light) scheme's literal
> colour, so it bakes light values into dark mode. This once shipped body text at **1.09:1** contrast
> in dark mode. `theme.vars.palette.*` emits `var(--mui-palette-*)`, which follows the scheme.
> `theme.vars` is typed optional, so destructure as `const { palette, shadows } = theme.vars ?? theme`.
>
> The same trap applies to anything picking colours in JS: `components/organisms/PostContent.tsx`
> chooses the Mermaid theme from the `data-mui-color-scheme` attribute and re-renders diagrams from
> preserved source when it changes, because Mermaid's own palette cannot follow CSS variables.

Article measure is capped by `COLUMN_WIDTH` in `app/posts/[slug]/page.tsx` (784px incl. padding
≈ 40 Japanese characters per line), shared by the hero and the body so their left edges align.
Inside `.markdown-body`, `pre` / `table` / `.mermaid-figure` break out by `-3rem` above 900px —
that rule **must stay last**, since the earlier `margin` shorthands would otherwise override it.

Code blocks are highlighted **at build time** by `rehype-highlight` in `lib/posts.ts` (no CDN, no client-side highlighting).

#### MUI v9 gotchas hit during the migration

- **System props were removed from `Stack` and `Typography`.** `alignItems`, `justifyContent`, `flexWrap`, `fontWeight`, `display` etc. must go inside `sx`. `Stack` accepts only `children`, `direction`, `divider`, `spacing`, `sx`, `useFlexGap`.
- **Never pass a function across the RSC boundary.** Two things break prerendering from a Server Component: `component={NextLink}` (the theme sets `MuiButtonBase.defaultProps.LinkComponent` and `MuiLink.defaultProps.component` instead — override with `component="a"` for external and `mailto:` links), and theme callbacks in `sx` such as ``background: (t) => `...${t.palette.primary.main}` `` — use a CSS variable like `var(--mui-palette-primary-main)`.
- **Icon names are variant-suffixed.** `CheckCircleOutline` and `MailOutline` do not exist; use `CheckCircleOutlined` / `MailOutlineOutlined`.
- `Grid` uses the v2 API (`size={{ xs: 12, md: 6 }}`), not `item xs={12}`.

### Canonical URL

`www.gekal.cn` is the canonical origin. The apex `gekal.cn` also resolves, but GitHub Pages 301-redirects it to the value in `public/CNAME` — so www is what should be advertised everywhere:

- `lib/site.ts` — `SITE_URL`, the single source of truth
- `app/layout.tsx` — `metadataBase` and `alternates.canonical: './'` (each route emits its own canonical)
- `app/sitemap.ts` / `app/robots.ts` — statically generated at build time to `out/sitemap.xml` and `out/robots.txt`

When adding absolute URLs anywhere, import `SITE_URL` rather than hardcoding the host.

### Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and deploys `out/` to GitHub Pages via `actions/deploy-pages@v5`. GitHub Pages must be configured to use **GitHub Actions** as the source (not the legacy branch method). `public/CNAME` contains `www.gekal.cn` for the custom domain — it also drives the apex→www redirect, so do not delete it.

Because the workflow runs `npm ci`, `package-lock.json` must always be committed alongside `package.json`. A lockfile missing platform-specific optional dependencies installs fine on macOS but fails `npm ci` on the Linux runner.
