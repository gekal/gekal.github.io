import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { Post } from '@/lib/posts'

interface AdjacentPostNavProps {
  prev: Post | null
  next: Post | null
}

/** 記事末尾の前後ナビ。`prev` が新しい記事、`next` が古い記事。 */
export default function AdjacentPostNav({ prev, next }: AdjacentPostNavProps) {
  if (!prev && !next) return null

  return (
    <Box
      component="nav"
      aria-label="前後の記事"
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
      }}
    >
      {next && <AdjacentLink post={next} direction="older" />}
      {/* 新しい記事しかない場合でも右列に寄せる */}
      {!next && <Box sx={{ display: { xs: 'none', sm: 'block' } }} />}
      {prev && <AdjacentLink post={prev} direction="newer" />}
    </Box>
  )
}

function AdjacentLink({ post, direction }: { post: Post; direction: 'older' | 'newer' }) {
  const isNewer = direction === 'newer'

  return (
    <Link
      href={`/posts/${post.slug}/`}
      underline="none"
      sx={{
        display: 'block',
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        textAlign: isNewer ? 'right' : 'left',
        transition: 'border-color 120ms, background-color 120ms',
        '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          justifyContent: isNewer ? 'flex-end' : 'flex-start',
          color: 'text.secondary',
        }}
      >
        {!isNewer && <ArrowBackIcon sx={{ fontSize: 16 }} />}
        {isNewer ? '新しい記事' : '古い記事'}
        {isNewer && <ArrowForwardIcon sx={{ fontSize: 16 }} />}
      </Typography>
      <Typography sx={{ mt: 0.5, fontWeight: 500, lineHeight: 1.5 }}>{post.title}</Typography>
    </Link>
  )
}
