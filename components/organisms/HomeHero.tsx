import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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
        backgroundImage: 'url(/img/bg-index.jpg)',
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
        <Box sx={{ maxWidth: 620 }}>
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            フリーランスエンジニア
          </Typography>

          <Typography
            variant="h1"
            sx={{ color: '#fff', mt: 1, fontSize: 'clamp(64px, 10vw, 96px)', lineHeight: 1 }}
          >
            鴻鷹
          </Typography>

          <Typography sx={{ mt: 2.5, fontSize: 19, fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>
            良い未来のため、頑張っています。
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.6)' }}>
            Cloud Architecture · DevOps · Backend Engineering
          </Typography>

          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', mt: 4.5 }}>
            <Button

              href="/about"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              プロフィールを見る
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
