import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AccentLine from '@/components/atoms/AccentLine'

interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 260, md: 360, lg: 480 }

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = '/img/bg-index.jpg',
  size = 'md',
}: HeroSectionProps) {
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        pt: '52px',
        minHeight: heights[size],
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 下から上へのグラデーション — 本文の可読性 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
      {/* 上から下へのグラデーション — ナビゲーションの可読性 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.15) 20%, transparent 40%)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 6 }}>
        <AccentLine sx={{ mb: 2 }} />
        <Typography variant="h2" component="h1" sx={{ color: '#fff' }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  )
}
