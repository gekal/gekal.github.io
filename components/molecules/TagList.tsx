import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { SxProps, Theme } from '@mui/material/styles'

interface TagListProps {
  tags: string[]
  max?: number
  /** 暗い背景の上に置く場合 */
  dark?: boolean
  sx?: SxProps<Theme>
}

export default function TagList({ tags, max, dark = false, sx }: TagListProps) {
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
