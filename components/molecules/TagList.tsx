import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { SxProps, Theme } from '@mui/material/styles'
import { tagHref } from '@/lib/tags'

interface TagListProps {
  tags: string[]
  max?: number
  /** 暗い背景の上に置く場合 */
  dark?: boolean
  /**
   * タグページへのリンクにする。
   * PostCard のようにカード全体が既にリンクになっている場所では、
   * リンクの入れ子になるので false のままにすること。
   */
  linked?: boolean
  sx?: SxProps<Theme>
}

export default function TagList({ tags, max, dark = false, linked = false, sx }: TagListProps) {
  const visible = max ? tags.slice(0, max) : tags
  if (visible.length === 0) return null

  return (
    <Stack
      direction="row"
      useFlexGap
      spacing={0.75}
      sx={[
        { alignItems: 'center', flexWrap: 'wrap' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {visible.map((tag) => (
        <Chip
          key={tag}
          label={dark ? `#${tag}` : tag}
          size="small"
          // Chip は clickable でも ButtonBase に component="div" を渡すため、
          // href だけでは <a> にならない。component="a" を明示する
          // (素のアンカーなので next/link のクライアント遷移にはならない)
          {...(linked ? ({ component: 'a', clickable: true, href: tagHref(tag) } as const) : {})}
          {...(dark
            ? {
                sx: {
                  bgcolor: 'rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.85)',
                },
              }
            : { color: 'primary', variant: 'outlined' })}
        />
      ))}
    </Stack>
  )
}
