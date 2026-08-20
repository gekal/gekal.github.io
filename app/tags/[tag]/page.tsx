import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HeroSection from '@/components/organisms/HeroSection'
import PostCard from '@/components/organisms/PostCard'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import { getAllTags, getPostsByTag } from '@/lib/posts'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  // デコード済みの値を渡す。URL への符号化は Next.js が行う
  return getAllTags().map(({ slug }) => ({ tag: slug }))
}

/** ルートパラメータは符号化されて届くことがあるので必ず戻す */
function decode(tag: string): string {
  try {
    return decodeURIComponent(tag)
  } catch {
    return tag
  }
}

/** 表示用の名前 — 記事中で最も多い表記に揃える */
function labelOf(slug: string): string | undefined {
  return getAllTags().find((t) => t.slug === slug)?.label
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decode((await params).tag)
  const label = labelOf(slug)
  if (!label) return { title: 'Not Found' }

  const count = getPostsByTag(slug).length
  return {
    title: `${label} の記事`,
    description: `${label} に関する技術記事 ${count} 件。`,
    alternates: { canonical: `/tags/${encodeURIComponent(slug)}/` },
  }
}

export default async function TagPage({ params }: Props) {
  const slug = decode((await params).tag)
  const label = labelOf(slug)
  const posts = getPostsByTag(slug)
  if (!label || posts.length === 0) notFound()

  return (
    <>
      <HeroSection
        title={label}
        subtitle={`${posts.length} 件の記事`}
        backgroundImage="/img/bg-post.jpg"
        size="sm"
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tags', href: '/tags' },
            { label },
          ]}
        />

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {posts.map((post) => (
            <Grid key={post.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Button href="/tags" startIcon={<ArrowBackIcon />} color="inherit">
            タグ一覧へ戻る
          </Button>
        </Box>
      </Container>
    </>
  )
}
