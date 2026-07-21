import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  sx?: SxProps<Theme>
}

/** セクション見出しの上に置く小さなラベル — 例: "Latest", "Services" */
export default function SectionLabel({ children, sx }: SectionLabelProps) {
  return (
    <Typography
      variant="overline"
      component="p"
      color="primary"
      sx={[{ display: 'block', lineHeight: 1.6 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Typography>
  )
}
