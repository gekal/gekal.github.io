import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/format'
import { parseTags } from '@/lib/tags'
import TagList from '@/components/molecules/TagList'

interface PostCardProps {
  post: Post
  featured?: boolean
}

/** 2 行で省略するための共通スタイル */
const clamp2 = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical' as const,
  overflow: 'hidden',
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const tags = parseTags(post.tags)

  if (featured) {
    return (
      <Card sx={{ position: 'relative', bgcolor: 'grey.900' }}>
        <CardActionArea href={`/posts/${post.slug}/`}>
          {post.background && (
            <Box
              component="img"
              src={post.background}
              alt=""
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
              }}
            />
          )}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            }}
          />
          <CardContent
            sx={{
              position: 'relative',
              minHeight: 340,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 4, md: 5 },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
              <Typography variant="overline" sx={{ color: 'primary.light' }}>
                Featured
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                {formatDate(post.date)}
              </Typography>
            </Stack>
            <Typography variant="h4" component="h2" sx={{ color: '#fff', mb: 1.5, fontWeight: 700 }}>
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.6)', mb: 2.5, maxWidth: 640, ...clamp2 }}
            >
              {post.excerpt}
            </Typography>
            <TagList tags={tags} max={3} dark />
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea

        href={`/posts/${post.slug}/`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {post.background && (
          <CardMedia component="img" image={post.background} alt={post.title} sx={{ height: 176 }} />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }} useFlexGap>
            <Typography variant="caption" color="text.secondary" component="time" dateTime={post.date}>
              {formatDate(post.date)}
            </Typography>
            <TagList tags={tags} max={2} />
          </Stack>
          <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 500, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={clamp2}>
            {post.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
