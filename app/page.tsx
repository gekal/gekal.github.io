import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/PostCard'

const badges = [
  { label: 'AWS', sub: '5 certs' },
  { label: 'GCP', sub: '5 certs' },
  { label: 'Azure', sub: '6 certs' },
  { label: 'CKAD', sub: 'Kubernetes' },
  { label: 'Java', sub: 'Spring Boot' },
  { label: 'DevOps', sub: 'CI/CD' },
]

export default function HomePage() {
  const posts = getSortedPostsData()
  const [featured, ...rest] = posts
  const recent = rest.slice(0, 5)

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-end pt-16"
        style={{
          backgroundImage: 'url(/img/bg-index.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-20 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-up">
              <span className="w-6 h-px bg-primary-light" />
              <span className="text-xs font-medium text-primary-light uppercase tracking-widest">
                フリーランスエンジニア
              </span>
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-none tracking-tight animate-fade-up delay-100">
              鴻鷹
            </h1>

            <p className="mt-5 text-lg md:text-xl text-slate-300 font-light leading-relaxed animate-fade-up delay-200">
              良い未来のため、頑張っています。
            </p>
            <p className="mt-2 text-sm text-slate-400 animate-fade-up delay-300">
              Cloud Architecture · DevOps · Backend Engineering
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-400">
              <Link href="/about" className="btn-primary">
                プロフィールを見る
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/posts" className="btn-outline">
                技術ブログ
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Skill badges ─────────────────────────── */}
      <section className="bg-ink-soft border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-3">
            {badges.map(({ label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/5 hover:bg-primary/15 border border-white/8 hover:border-primary/30 rounded-full px-4 py-2 transition-all duration-200 cursor-default"
              >
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-xs text-slate-500">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Latest</p>
            <h2 className="section-heading">最新記事</h2>
          </div>
          <Link href="/posts" className="btn-ghost text-slate-500 hover:text-primary hidden sm:flex">
            すべての記事
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-6">
            <PostCard post={featured} featured />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((post) => (
            <div key={post.slug} className="relative">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/posts" className="btn-ghost text-slate-500 hover:text-primary">
            すべての記事を見る
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink mx-4 sm:mx-8 mb-8 rounded-3xl">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/img/bg-contact.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-ink" />

        <div className="relative z-10 px-8 py-16 md:py-20 text-center">
          <p className="text-xs font-semibold text-primary-light uppercase tracking-widest mb-3">
            Freelance Available
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
            お仕事のご相談
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            クラウド構築・システム開発・DevOps 環境整備など、<br />
            お気軽にご相談ください。初回相談は無料です。
          </p>
          <Link href="/contact" className="btn-primary text-sm px-8 py-3">
            お問い合わせ
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
