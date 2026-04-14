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

  return (
    <>
      <HeroSection
        title="技術ブログ"
        subtitle="Cloud / DevOps / Backend に関する記事"
        backgroundImage="/img/bg-post.jpg"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-gray-500 text-sm mb-10">
          全 {posts.length} 件の記事
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
