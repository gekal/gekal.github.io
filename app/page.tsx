import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const recentPosts = getSortedPostsData().slice(0, 6)

  return (
    <>
      {/* Hero */}
      <header
        className="relative flex items-center justify-center pt-16"
        style={{
          minHeight: '520px',
          backgroundImage: 'url(/img/bg-index.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight drop-shadow-lg">
            鴻鷹
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 font-light drop-shadow">
            良い未来のため、頑張っています。
          </p>
          <p className="mt-2 text-base text-gray-300 drop-shadow">
            フリーランスエンジニア — Cloud / DevOps / Backend
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/about" className="btn-primary">
              プロフィールを見る
            </Link>
            <Link href="/posts" className="btn-outline text-white border-white hover:bg-white hover:text-dark">
              ブログを読む
            </Link>
          </div>
        </div>
      </header>

      {/* Skills bar */}
      <section className="bg-dark text-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            {[
              'AWS Professional',
              'GCP Professional',
              'Azure Expert',
              'Kubernetes (CKAD)',
              'Java / Spring Boot',
              'Docker / Kubernetes',
              'CI/CD / DevOps',
            ].map((skill) => (
              <span key={skill} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold text-dark">最新記事</h2>
          <Link
            href="/posts"
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            すべての記事
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 text-center"
        style={{
          backgroundImage: 'url(/img/bg-contact.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
            お仕事のご相談
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            クラウド構築・システム開発・DevOpsなど、お気軽にご相談ください。
          </p>
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  )
}
