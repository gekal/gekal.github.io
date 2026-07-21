import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getAllPostSlugs, getPostData, formatDate } from '@/lib/posts'
import TagList from '@/components/molecules/TagList'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import AccentLine from '@/components/atoms/AccentLine'
import PostContent from '@/components/organisms/PostContent'

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
      {/* ── ヒーロー ── */}
      <Box
        component="header"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          pt: '52px',
          minHeight: 320,
          backgroundImage: `url(${post.background ?? '/img/bg-post.jpg'})`,
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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pb: 5 }}>
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
      <Container maxWidth="md" sx={{ py: 6 }}>
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/posts' },
            { label: post.title },
          ]}
        />

        <PostContent content={post.content ?? ''} />

        <Divider sx={{ mt: 8, mb: 4 }} />

        <TagList tags={tags} sx={{ mb: 4 }} />

        <Button href="/posts" startIcon={<ArrowBackIcon />} color="inherit">
          記事一覧へ戻る
        </Button>
      </Container>
    </>
  )
}
