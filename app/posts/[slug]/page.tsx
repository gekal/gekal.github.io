import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPostSlugs, getPostData, formatDate } from '@/lib/posts'

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
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostData(slug).catch(() => null)
  if (!post) notFound()

  const tags = Array.isArray(post.tags)
    ? post.tags
    : post.tags
    ? String(post.tags).split(/\s+/).filter(Boolean)
    : []

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <header
        className="relative flex items-end pt-16 min-h-[340px]"
        style={{
          backgroundImage: post.background ? `url(${post.background})` : 'url(/img/bg-post.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 pb-10 w-full">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs font-medium text-primary-light bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Accent line */}
          <div className="w-8 h-0.5 bg-primary-light mb-4" />

          <h1 className="font-serif text-3xl md:text-4xl text-white font-bold leading-snug">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-2 text-slate-300 text-base">{post.subtitle}</p>
          )}
          <p className="mt-4 text-sm text-slate-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </div>
      </header>

      {/* ── Content ───────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/posts" className="hover:text-primary transition-colors">Blog</Link>
          <svg className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-500 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Article */}
        <article
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-ink
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg
            prose-code:text-primary prose-code:text-sm
            prose-blockquote:border-primary prose-blockquote:text-slate-500
            prose-pre:p-0 prose-pre:bg-transparent"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>

          {/* Nav */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors group"
          >
            <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            記事一覧へ戻る
          </Link>
        </div>
      </div>
    </>
  )
}
