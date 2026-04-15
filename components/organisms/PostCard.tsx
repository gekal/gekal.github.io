import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'
import TagList from '@/components/molecules/TagList'

interface PostCardProps {
  post: Post
  featured?: boolean
}

function parseTags(raw: Post['tags']): string[] {
  if (Array.isArray(raw)) return raw
  if (raw) return String(raw).split(/\s+/).filter(Boolean)
  return []
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const tags = parseTags(post.tags)

  if (featured) {
    return (
      <article
        className="group relative overflow-hidden rounded-2xl"
        style={{ background: 'var(--dark-surface)' }}
      >
        {post.background && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.background}
              alt=""
              className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
              }}
            />
          </div>
        )}
        <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[340px]">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: 'var(--apple-blue)' }}
            >
              Featured
            </span>
            <span className="text-white/20">·</span>
            <time className="text-[12px] text-white/40">{formatDate(post.date)}</time>
          </div>
          <h2
            className="font-bold text-white leading-snug mb-3 group-hover:text-white/85 transition-colors"
            style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.02em' }}
          >
            <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed line-clamp-2 mb-5 max-w-2xl">
            {post.excerpt}
          </p>
          <TagList tags={tags} max={3} dark />
        </div>
      </article>
    )
  }

  return (
    <article className="group card overflow-hidden">
      {post.background && (
        <div className="h-44 overflow-hidden" style={{ background: 'var(--surface-secondary)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.background}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className={`p-5 ${!post.background ? 'pt-6' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <time
            className="text-[12px] font-medium"
            style={{ color: 'var(--text-tertiary)' }}
            dateTime={post.date}
          >
            {formatDate(post.date)}
          </time>
          <TagList tags={tags} max={2} />
        </div>
        <h2
          className="font-semibold leading-snug mb-2 group-hover:opacity-70 transition-opacity duration-200"
          style={{ color: 'var(--text-primary)', fontSize: '15px', letterSpacing: '-0.01em' }}
        >
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {post.excerpt}
        </p>
      </div>
    </article>
  )
}
