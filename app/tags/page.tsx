import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import HeroSection from '@/components/organisms/HeroSection'
import BreadcrumbNav from '@/components/molecules/BreadcrumbNav'
import { getAllTags } from '@/lib/posts'
import { tagHref } from '@/lib/tags'

export const metadata: Metadata = {
  title: 'タグ一覧',
  description: '技術ブログのタグ一覧。クラウド・コンテナ・DevOps などのトピックから記事を探せます。',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <>
      <HeroSection
        title="タグ"
        subtitle={`${tags.length} 個のトピックから記事を探す`}
        backgroundImage="/img/bg-post.jpg"
        size="sm"
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Tags' }]} />

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 4 }}>
          {tags.map(({ label, count }) => (
            <Chip
              key={label}
              component="a"
              clickable
              href={tagHref(label)}
              label={
                <>
                  {label}
                  <Typography component="span" variant="caption" sx={{ ml: 0.75, opacity: 0.6 }}>
                    {count}
                  </Typography>
                </>
              }
              variant="outlined"
              // よく書いているトピックほど目立つように、件数で強調を変える
              color={count >= 4 ? 'primary' : 'default'}
              size={count >= 4 ? 'medium' : 'small'}
            />
          ))}
        </Stack>
      </Container>
    </>
  )
}
