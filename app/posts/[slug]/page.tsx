import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostData, formatDate } from '@/lib/posts'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug).catch(() => null)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostData(slug).catch(() => null)
  if (!post) notFound()

  const tags = Array.isArray(post.tags)
    ? post.tags
    : post.tags
    ? String(post.tags).split(/\s+/)
    : []

  return (
    <>
      {/* Hero */}
      <header
        className="relative flex items-center justify-center pt-16"
        style={{
          minHeight: '360px',
          backgroundImage: post.background
            ? `url(${post.background})`
            : 'url(/img/bg-post.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight drop-shadow-lg">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-3 text-lg text-gray-200 drop-shadow">{post.subtitle}</p>
          )}
          <p className="mt-4 text-gray-300 text-sm">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">ホーム</Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-primary transition-colors">ブログ</Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article */}
        <article
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-dark prose-a:text-primary prose-img:rounded-lg prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            記事一覧へ戻る
          </Link>
        </div>
      </div>
    </>
  )
}
