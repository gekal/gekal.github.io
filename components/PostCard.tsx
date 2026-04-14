import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const tags = Array.isArray(post.tags)
    ? post.tags
    : post.tags
    ? String(post.tags).split(/\s+/)
    : []

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {post.background && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.background}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <time className="text-xs text-gray-500" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-serif text-lg font-bold text-dark mb-2 leading-snug">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>

        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          続きを読む
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
