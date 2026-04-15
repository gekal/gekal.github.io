import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/PostCard'

const badges = [
  { label: 'AWS', sub: '5 certs', color: '#FF9500' },
  { label: 'GCP', sub: '5 certs', color: '#34A853' },
  { label: 'Azure', sub: '6 certs', color: '#0078D4' },
  { label: 'CKAD', sub: 'Kubernetes', color: '#326CE5' },
  { label: 'Java', sub: 'Spring Boot', color: '#F89820' },
  { label: 'DevOps', sub: 'CI/CD', color: '#6E6E73' },
]

export default function HomePage() {
  const posts = getSortedPostsData()
  const [featured, ...rest] = posts
  const recent = rest.slice(0, 5)

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-end pt-[52px]"
        style={{
          backgroundImage: 'url(/img/bg-index.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay — Apple-style gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)',
        }} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pb-24 w-full">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-white/60 uppercase tracking-[0.12em] mb-5 animate-fade-up">
              フリーランスエンジニア
            </p>

            <h1
              className="text-white font-bold leading-none tracking-tight animate-fade-up delay-100"
              style={{ fontSize: 'clamp(64px, 10vw, 96px)', letterSpacing: '-0.03em' }}
            >
              鴻鷹
            </h1>

            <p className="mt-5 text-[19px] text-white/80 font-light leading-relaxed animate-fade-up delay-200"
               style={{ letterSpacing: '-0.01em' }}>
              良い未来のため、頑張っています。
            </p>
            <p className="mt-1.5 text-[13px] text-white/50 tracking-wide animate-fade-up delay-300">
              Cloud Architecture · DevOps · Backend Engineering
            </p>

            <div className="mt-9 flex flex-wrap gap-3 animate-fade-up delay-400">
              <Link href="/about" className="btn-primary text-[15px]">
                プロフィールを見る
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/posts" className="btn-outline text-[15px] border-white/50 text-white hover:bg-white/10 hover:border-white">
                技術ブログ
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Skill badges ─────────────────────────── */}
      <section style={{ background: 'var(--surface-secondary)', borderBottom: '1px solid var(--separator-opaque)' }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-6">
          <div className="flex flex-wrap justify-center gap-2.5">
            {badges.map(({ label, sub, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 cursor-default"
                style={{
                  background: 'white',
                  border: '1px solid var(--separator-opaque)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</span>
                <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5"
              style={{ color: 'var(--apple-blue)' }}
            >
              Latest
            </p>
            <h2 className="section-heading">最新記事</h2>
          </div>
          <Link href="/posts" className="btn-ghost hidden sm:flex text-[13px]">
            すべての記事
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-5">
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
          <Link href="/posts" className="btn-ghost text-[13px]">
            すべての記事を見る
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="px-5 sm:px-8 mb-10">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ background: 'var(--apple-dark-bg, #000000)' }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'url(/img/bg-contact.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Subtle blue glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, #0071E3 0%, transparent 60%)' }}
          />

          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-3 text-white/50">
              Freelance Available
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(28px, 5vw, 44px)', letterSpacing: '-0.03em' }}
            >
              お仕事のご相談
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-9 leading-relaxed text-[15px]">
              クラウド構築・システム開発・DevOps 環境整備など、<br />
              お気軽にご相談ください。初回相談は無料です。
            </p>
            <Link href="/contact" className="btn-primary text-[15px] px-8 py-3">
              お問い合わせ
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
