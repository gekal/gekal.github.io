import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/organisms/PostCard'
import HomeHero from '@/components/organisms/HomeHero'
import SkillBadgeBar from '@/components/organisms/SkillBadgeBar'
import CTASection from '@/components/organisms/CTASection'
import SectionLabel from '@/components/atoms/SectionLabel'
import Icon from '@/components/atoms/Icon'

export default function HomePage() {
  const posts = getSortedPostsData()
  const [featured, ...rest] = posts
  const recent = rest.slice(0, 5)

  return (
    <>
      <HomeHero />
      <SkillBadgeBar />

      {/* ── Posts ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel className="mb-1.5">Latest</SectionLabel>
            <h2 className="section-heading">最新記事</h2>
          </div>
          <Link href="/posts" className="btn-ghost hidden sm:flex text-[13px]">
            すべての記事
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        {featured && (
          <div className="mb-5">
            <PostCard post={featured} featured />
          </div>
        )}

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
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <div className="px-5 sm:px-8 mb-10">
        <CTASection
          badge="Freelance Available"
          title="お仕事のご相談"
          description={
            <>
              クラウド構築・システム開発・DevOps 環境整備など、<br />
              お気軽にご相談ください。初回相談は無料です。
            </>
          }
          ctaText="お問い合わせ"
          ctaHref="/contact"
        />
      </div>
    </>
  )
}
