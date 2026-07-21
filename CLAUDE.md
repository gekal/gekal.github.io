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

This is a **Next.js 15 static export** personal blog/portfolio site served from S3 + CloudFront at `www.gekal.cn`.

### Key constraints

- `output: 'export'` in `next.config.ts` — no server-side features (no API routes, no dynamic route handlers). Any route that needs data at build time must use `generateStaticParams`. Any image-generation route must export `dynamic = 'force-static'`.
- `images.unoptimized: true` — use plain `<img>` tags or suppress `@next/next/no-img-element` lint warnings where needed.
- `trailingSlash: true` — all links use trailing slashes. The origin is the S3 **REST** endpoint, which does not resolve `/foo/` → `/foo/index.html` on its own; a CloudFront Function does that (see Deployment).
- **Every emitted file must have a file extension.** The CloudFront Function treats extensionless URIs as directories and 301-redirects them, and S3 cannot infer a `Content-Type` without one. This is why the icons are static `.png` files rather than `ImageResponse` routes.

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

Three static files under `app/`, picked up by Next's file convention and referenced explicitly from `metadata.icons` in `app/layout.tsx`:
- `app/icon.svg` — SVG source (hawk silhouette on teal gradient)
- `app/icon.png` — 32×32
- `app/apple-icon.png` — 180×180

These were previously `icon.tsx` / `apple-icon.tsx` generating PNGs via `ImageResponse`. That emitted extensionless `out/icon` and `out/apple-icon`, which S3 + CloudFront cannot serve correctly — see Key constraints. If you regenerate them, keep them as static files with extensions.

### Styling

Tailwind CSS with `@tailwindcss/typography`. Primary color `#0085A1` is defined as `primary` in `tailwind.config.ts`. Post content uses the `prose` class. Code blocks are highlighted **at build time** by `rehype-highlight` in `lib/posts.ts`; the GitHub Dark Dimmed theme is inlined in `app/globals.css` (no CDN, no client-side highlighting).

### Infrastructure (`cdk/`)

A separate npm project — do not add its dependencies to the root `package.json`. The root `tsconfig.json` excludes `cdk/`.

```bash
cd cdk && npm install
npx cdk deploy --all
```

Two stacks, both in **us-east-1** (CloudFront requires its ACM certificate there; the bucket is co-located to avoid cross-region references):

| Stack | Contents |
|---|---|
| `GekalBlogCertificate` | ACM certificate for `www.gekal.cn` |
| `GekalBlogSite` | S3 bucket (private), CloudFront + OAC, URI-rewrite Function, security headers, GitHub OIDC deploy role |

The certificate is a separate stack because `gekal.cn` is served by Aliyun DNS, not Route 53 — validation is manual, so the stack stalls waiting for a CNAME record. Isolating it means a validation timeout cannot roll back the bucket or distribution.

Domain and repo names come from `context` in `cdk/cdk.json`. Set `createGithubOidcProvider` to `false` if the account already has a `token.actions.githubusercontent.com` provider.

### Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`: `npm ci && npm run build`, then assumes the CDK-created role via OIDC and syncs `out/` to S3 in three passes, each setting a different `Cache-Control` (CloudFront honours the origin header):

| Pass | Paths | Cache-Control |
|---|---|---|
| 1 | `_next/static/*` (content-hashed) | `max-age=31536000, immutable` |
| 2 | `assets/*`, `img/*` | `max-age=604800` |
| 3 | everything else (HTML, `.txt` RSC payloads) | `max-age=0, must-revalidate` |

Then a `/*` CloudFront invalidation. Requires three repo secrets: `AWS_DEPLOY_ROLE_ARN`, `AWS_S3_BUCKET`, `AWS_CLOUDFRONT_DISTRIBUTION_ID` (all available as stack outputs).

Note that pass 3's `--delete` is what prunes removed pages, so its `--exclude` list must stay in sync with the prefixes covered by passes 1 and 2.
