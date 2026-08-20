import Box from '@mui/material/Box'
import { heroBackgroundSx } from '@/lib/background-image'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { PROFILE, EXPERIENCE_YEARS } from '@/lib/profile'
import { CREDENTIAL_COUNT } from '@/lib/credentials'
import { AVAILABILITY, availabilityLabel } from '@/lib/business'

export default function HomeHero() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        pt: '52px',
        ...heroBackgroundSx('/img/bg-index.jpg'),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.10) 100%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 15%, transparent 35%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 12 }}>
        <Box sx={{ maxWidth: 780 }}>
          {AVAILABILITY.status !== 'closed' && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                display: 'inline-flex',
                mb: 2.5,
                px: 1.5,
                py: 0.5,
                borderRadius: 9999,
                bgcolor: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Box
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.light' }}
                aria-hidden
              />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                {availabilityLabel()}
              </Typography>
            </Stack>
          )}

          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block' }}>
            {PROFILE.role} · {PROFILE.name}
          </Typography>

          {/*
            h1 は名前ではなく「何ができるか」。初訪問者と検索エンジンが最初に読む
            1 行で職種と提供価値が伝わらないと、そのまま離脱される
          */}
          <Typography
            variant="h1"
            sx={{ color: '#fff', mt: 1.5, fontSize: 'clamp(30px, 5.4vw, 52px)', lineHeight: 1.2 }}
          >
            クラウド基盤を、
            <br />
            設計から運用まで一人で。
          </Typography>

          <Typography sx={{ mt: 3, fontSize: 19, fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>
            {'AWS・GCP・Azure のマルチクラウドと Kubernetes を軸に、'}
            {'インフラ設計・DevOps 環境構築・バックエンド開発までまとめて引き受けます。'}
            {`実務 ${EXPERIENCE_YEARS} 年 / ${CREDENTIAL_COUNT} 資格。`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1.5, color: 'rgba(255,255,255,0.6)' }}>
            Cloud Architecture · DevOps · Backend Engineering — 良い未来のため、頑張っています。
          </Typography>

          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 4.5 }}>
            <Button href="/contact" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
              お仕事のご相談
            </Button>
            <Button
              href="/about"
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              プロフィール
            </Button>
            <Button
              href="/posts"
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              技術ブログ
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  )
}
