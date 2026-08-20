import type { MetadataRoute } from 'next'
import { getSortedPostsData, getAllTags } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'
import { WORKS_DRAFT } from '@/lib/works'

export const dynamic = 'force-static'

/**
 * クローラに正規 URL (www) を明示的に伝える。
 * URL は trailingSlash: true に合わせて末尾スラッシュ付き。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/posts/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/tags/`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/contact/`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/privacy/`, changeFrequency: 'yearly', priority: 0.1 },
    // 事例がサンプルのままの間は載せない (lib/works.ts の WORKS_DRAFT)
    ...(WORKS_DRAFT
      ? []
      : [{ url: `${SITE_URL}/works/`, changeFrequency: 'monthly' as const, priority: 0.9 }]),
  ]

  // date は lib/posts.ts で必ず有効な ISO 文字列に正規化されている
  const posts: MetadataRoute.Sitemap = getSortedPostsData().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const tags: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag.slug)}/`,
    changeFrequency: 'monthly',
    priority: 0.3,
  }))

  return [...staticPages, ...posts, ...tags]
}
