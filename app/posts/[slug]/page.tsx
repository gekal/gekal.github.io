import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPostSlugs, getPostData, formatDate } from '@/lib/posts'
import TagList from '@/components/molecules/TagList'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import AccentLine from '@/components/atoms/AccentLine'
import Icon from '@/components/atoms/Icon'

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
        className="relative flex items-end pt-[52px] min-h-[320px]"
        style={{
          backgroundImage: post.background ? `url(${post.background})` : 'url(/img/bg-post.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.18) 100%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pb-10 w-full">
          <TagList tags={tags.slice(0, 4)} dark className="mb-5" />
          <AccentLine className="mb-4" />
          <h1
            className="font-bold text-white leading-snug"
            style={{ fontSize: 'clamp(22px, 4vw, 32px)', letterSpacing: '-0.025em' }}
          >
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-2 text-[15px] text-white/60">{post.subtitle}</p>
          )}
          <p className="mt-4 text-[13px] text-white/40">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </div>
      </header>

      {/* ── Content ───────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/posts' },
            { label: post.title },
          ]}
        />

        <article
          className="prose prose-lg max-w-none
            prose-headings:text-[#1D1D1F] prose-headings:tracking-tight
            prose-a:text-[#0071E3] prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg
            prose-code:text-[#0071E3] prose-code:text-sm
            prose-blockquote:border-[#0071E3] prose-blockquote:text-[#6E6E73]
            prose-pre:p-0 prose-pre:bg-transparent"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--separator-opaque)' }}>
          <TagList tags={tags} className="mb-8" />

          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-[14px] font-medium transition-opacity hover:opacity-60 group"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Icon
              name="arrow-left"
              className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
              strokeWidth={2}
            />
            記事一覧へ戻る
          </Link>
        </div>
      </div>
    </>
  )
}
