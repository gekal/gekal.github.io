import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const tags = Array.isArray(post.tags)
    ? post.tags
    : post.tags
    ? String(post.tags).split(/\s+/).filter(Boolean)
    : []

  if (featured) {
    return (
      <article className="group relative bg-ink rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        {post.background && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.background}
              alt=""
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
          </div>
        )}
        <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[360px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-primary-light uppercase tracking-widest">Featured</span>
            <span className="text-slate-600">·</span>
            <time className="text-xs text-slate-400">{formatDate(post.date)}</time>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-snug mb-3 group-hover:text-primary-light transition-colors">
            <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
              {post.title}
            </Link>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-5 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-slate-400 bg-white/8 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group card overflow-hidden">
      {post.background && (
        <div className="h-44 overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.background}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className={`p-6 ${!post.background ? 'pt-7' : ''}`}>
        {/* Left accent on hover */}
        <div className="absolute left-0 top-0 w-0.5 h-0 bg-primary rounded-full group-hover:h-full transition-all duration-300" />

        <div className="flex items-center gap-2 mb-3">
          <time className="text-xs text-slate-400 font-medium" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <h2 className="font-serif text-base font-bold text-ink leading-snug mb-2.5 group-hover:text-primary transition-colors duration-200">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </article>
  )
}
