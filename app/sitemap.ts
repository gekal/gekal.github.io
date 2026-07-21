import type { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * apex (gekal.cn) を廃止して www に一本化したため、クローラに正規 URL を
 * 明示的に伝える。URL は trailingSlash: true に合わせて末尾スラッシュ付き。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/posts/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact/`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  // date は lib/posts.ts で必ず有効な ISO 文字列に正規化されている
  const posts: MetadataRoute.Sitemap = getSortedPostsData().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...staticPages, ...posts]
}
