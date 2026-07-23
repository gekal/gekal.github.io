import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import type { TocItem } from '@/lib/posts'

interface PostTocProps {
  items: TocItem[]
}

/**
 * 記事冒頭の目次。
 *
 * 見出しが 2 つ以下の記事では、目次があっても本文へ辿り着くまでの
 * 距離が伸びるだけなので何も描かない。
 */
export default function PostToc({ items }: PostTocProps) {
  if (items.length < 3) return null

  return (
    <Box
      component="nav"
      aria-label="目次"
      sx={{
        mb: 6,
        px: 3,
        py: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'action.hover',
      }}
    >
      <Typography
        variant="overline"
        component="h2"
        sx={{ display: 'block', mb: 1, color: 'text.secondary' }}
      >
        目次
      </Typography>
      <Box component="ol" sx={{ m: 0, pl: 0, listStyle: 'none' }}>
        {items.map((item) => (
          <Box
            component="li"
            key={item.id}
            sx={{ pl: item.depth === 3 ? 2.5 : 0, py: 0.4, lineHeight: 1.6 }}
          >
            <Link
              href={`#${item.id}`}
              underline="hover"
              sx={{
                color: item.depth === 3 ? 'text.secondary' : 'text.primary',
                fontSize: item.depth === 3 ? '0.875rem' : '0.9375rem',
                fontWeight: item.depth === 3 ? 400 : 500,
              }}
            >
              {item.text}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
