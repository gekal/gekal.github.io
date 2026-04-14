import type { Metadata } from 'next'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import HeroSection from '@/components/HeroSection'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'クラウド・DevOps・バックエンド開発に関する技術記事一覧',
}

export default function PostsPage() {
  const posts = getSortedPostsData()

  // Group posts by year
  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <>
      <HeroSection
        title="技術ブログ"
        subtitle={`Cloud · DevOps · Backend — ${posts.length} 記事`}
        backgroundImage="/img/bg-post.jpg"
        size="sm"
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
        {years.map((year) => (
          <div key={year} className="mb-16">
            {/* Year heading */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-5xl font-bold text-slate-100 select-none">
                {year}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {byYear[year].length} 記事
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byYear[year].map((post) => (
                <div key={post.slug} className="relative">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
