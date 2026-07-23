import { getSortedPostsData } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

// static export では Route Handler もビルド時に一度だけ実行させる必要がある。
// 出力は拡張子付きの out/feed.xml になるので、静的ホストでも Content-Type が効く
export const dynamic = 'force-static'

const FEED_TITLE = '鴻鷹'
const FEED_DESCRIPTION = 'フリーランスエンジニアの技術ブログ。Cloud・DevOps・Backend を中心に発信。'
const MAX_ITEMS = 20

export async function GET() {
  const posts = getSortedPostsData().slice(0, MAX_ITEMS)
  const updated = posts[0]?.date ?? new Date(0).toISOString()

  const items = posts
    .map((post) => {
      const url = new URL(`/posts/${post.slug}/`, SITE_URL).toString()
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
    <atom:link href="${new URL('/feed.xml', SITE_URL).toString()}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
