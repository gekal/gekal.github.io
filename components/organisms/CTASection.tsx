import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { ReactNode } from 'react'

interface CTASectionProps {
  badge?: string
  title: string
  description: ReactNode
  ctaText: string
  ctaHref: string
}

export default function CTASection({
  badge,
  title,
  description,
  ctaText,
  ctaHref,
}: CTASectionProps) {
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderRadius: 4,
        p: { xs: 5, md: 7 },
        bgcolor: 'grey.900',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          pointerEvents: 'none',
          // theme のコールバックは Server Component から Client Component へ
          // 渡せない (関数は RSC 境界を越えられない) ため CSS 変数を使う
          background:
            'radial-gradient(ellipse at 30% 50%, var(--mui-palette-primary-main) 0%, transparent 60%)',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        {badge && (
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            {badge}
          </Typography>
        )}
        <Typography variant="h3" component="h2" sx={{ color: '#fff', fontWeight: 700, mt: 1, mb: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, maxWidth: 460, mx: 'auto' }}>
          {description}
        </Typography>
        <Button

          href={ctaHref}
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
        >
          {ctaText}
        </Button>
      </Box>
    </Paper>
  )
}
