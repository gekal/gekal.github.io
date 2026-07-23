import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getAllPostSlugs, getPostData, getAdjacentPosts, formatDate } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'
import TagList from '@/components/molecules/TagList'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import AccentLine from '@/components/atoms/AccentLine'
import PostContent from '@/components/organisms/PostContent'
import PostToc from '@/components/organisms/PostToc'
import AdjacentPostNav from '@/components/organisms/AdjacentPostNav'

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * 記事カラムの幅 (左右 padding 込み)。
 *
 * maxWidth="md" (852px) だと和文で 1 行 50 字を超えてしまい、行を折り返すたびに
 * 視線が迷う。本文が 1 行 40 字程度に収まる幅に絞っている。
 * ヒーローとパンくずにも同じ値を使い、タイトルと本文の左端を揃える。
 */
const COLUMN_WIDTH = 784

export async function generateStaticParams() {
  return getAllPostSlugs()
}

/** 記事のヒーロー画像。OG 画像にも流用する。 */
const heroImage = (background?: string) => background ?? '/img/bg-post.jpg'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug).catch(() => null)
  if (!post) return { title: 'Not Found' }

  // OG 画像は絶対 URL でなければクローラが解決できない
  const image = new URL(heroImage(post.background), SITE_URL).toString()

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/posts/${slug}/`,
      publishedTime: post.date,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
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

  const { prev, next } = getAdjacentPosts(slug)

  // 検索エンジンに記事として認識させるための構造化データ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: new URL(heroImage(post.background), SITE_URL).toString(),
    author: { '@type': 'Person', name: 'gekal', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'gekal', url: SITE_URL },
    mainEntityOfPage: new URL(`/posts/${slug}/`, SITE_URL).toString(),
    keywords: tags.join(', '),
    inLanguage: 'ja',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── ヒーロー ── */}
      <Box
        component="header"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          pt: '52px',
          minHeight: 320,
          backgroundImage: `url(${heroImage(post.background)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.15) 20%, transparent 40%)',
          }}
        />
        <Container
          maxWidth={false}
          sx={{ maxWidth: COLUMN_WIDTH, position: 'relative', zIndex: 1, pb: 5 }}
        >
          <TagList tags={tags.slice(0, 4)} dark sx={{ mb: 2.5 }} />
          <AccentLine sx={{ mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ color: '#fff', fontWeight: 700 }}>
            {post.title}
          </Typography>
          {post.subtitle && (
            <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>{post.subtitle}</Typography>
          )}
          <Typography
            variant="body2"
            component="time"
            dateTime={post.date}
            sx={{ display: 'block', mt: 2, color: 'rgba(255,255,255,0.55)' }}
          >
            {formatDate(post.date)}
          </Typography>
        </Container>
      </Box>

      {/* ── 本文 ── */}
      <Container maxWidth={false} sx={{ maxWidth: COLUMN_WIDTH, py: 6 }}>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/posts' },
            { label: post.title },
          ]}
        />

        <PostToc items={post.toc ?? []} />

        <PostContent content={post.content ?? ''} />

        <Divider sx={{ mt: 8, mb: 4 }} />

        <TagList tags={tags} sx={{ mb: 4 }} />

        <AdjacentPostNav prev={prev} next={next} />

        <Button href="/posts" startIcon={<ArrowBackIcon />} color="inherit" sx={{ mt: 4 }}>
          記事一覧へ戻る
        </Button>
      </Container>
    </>
  )
}
