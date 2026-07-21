import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/organisms/PostCard'
import HeroSection from '@/components/organisms/HeroSection'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'クラウド・DevOps・バックエンド開発に関する技術記事一覧',
}

export default function PostsPage() {
  const posts = getSortedPostsData()

  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <>
      <HeroSection
        title="技術ブログ"
        subtitle={`Cloud · DevOps · Backend — ${posts.length} 記事`}
        backgroundImage="/img/bg-post.jpg"
        size="sm"
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {years.map((year) => (
          <Box key={year} sx={{ mb: 8 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', mb: 4 }}>
              <Typography
                component="p"
                sx={{ color: 'text.disabled', userSelect: 'none', fontSize: 48, fontWeight: 700 }}
              >
                {year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {byYear[year].length} 記事
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {byYear[year].map((post) => (
                <Grid key={post.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  )
}
