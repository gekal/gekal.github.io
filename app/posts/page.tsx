import type { Metadata } from 'next'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getSortedPostsData, getAllTags } from '@/lib/posts'
import HeroSection from '@/components/organisms/HeroSection'
import PostSearch from '@/components/organisms/PostSearch'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'クラウド・DevOps・バックエンド開発に関する技術記事一覧',
}

/** 絞り込みチップに出すタグ数。多すぎると選べないので上位のみ。 */
const FILTER_TAG_LIMIT = 12

export default function PostsPage() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return (
    <>
      <HeroSection
        title="技術ブログ"
        subtitle={`Cloud · DevOps · Backend — ${posts.length} 記事`}
        backgroundImage="/img/bg-post.jpg"
        size="sm"
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <PostSearch posts={posts} tags={tags.slice(0, FILTER_TAG_LIMIT)} />

        <Box sx={{ textAlign: 'center' }}>
          <Button href="/tags" endIcon={<ArrowForwardIcon />}>
            すべてのタグを見る
          </Button>
        </Box>
      </Container>
    </>
  )
}
