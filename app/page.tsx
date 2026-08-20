import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/organisms/PostCard'
import HomeHero from '@/components/organisms/HomeHero'
import SkillBadgeBar from '@/components/organisms/SkillBadgeBar'
import CTASection from '@/components/organisms/CTASection'
import SectionLabel from '@/components/atoms/SectionLabel'
import { personJsonLd } from '@/lib/structured-data'

export default function HomePage() {
  const posts = getSortedPostsData()
  const [featured, ...rest] = posts
  const recent = rest.slice(0, 5)

  return (
    <>
      {/* 「誰なのか」を機械可読で示す。記事の BlogPosting とは別に必要 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <HomeHero />
      <SkillBadgeBar />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack direction="row" sx={{ alignItems: 'flex-end', justifyContent: 'space-between', mb: 5 }}>
          <Box>
            <SectionLabel>Latest</SectionLabel>
            <Typography variant="h2" component="h2">
              最新記事
            </Typography>
          </Box>
          <Button

            href="/posts"
            endIcon={<ArrowForwardIcon />}
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
          >
            すべての記事
          </Button>
        </Stack>

        {featured && (
          <Box sx={{ mb: 3 }}>
            <PostCard post={featured} featured />
          </Box>
        )}

        <Grid container spacing={3}>
          {recent.map((post) => (
            <Grid key={post.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center', display: { sm: 'none' } }}>
          <Button href="/posts" endIcon={<ArrowForwardIcon />}>
            すべての記事を見る
          </Button>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <CTASection
          badge="Freelance Available"
          title="お仕事のご相談"
          description={
            <>
              クラウド構築・システム開発・DevOps 環境整備など、
              <br />
              お気軽にご相談ください。初回相談は無料です。
            </>
          }
          ctaText="お問い合わせ"
          ctaHref="/contact"
        />
      </Container>
    </>
  )
}
