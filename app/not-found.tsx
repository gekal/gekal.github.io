import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.900',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: 'primary.light' }}>
          404 — Not Found
        </Typography>
        <Typography
          sx={{
            fontSize: 'clamp(80px, 15vw, 120px)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.08)',
            userSelect: 'none',
          }}
        >
          404
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', mt: 1, mb: 4 }}>
          ページが見つかりません
        </Typography>
        <Button

          href="/"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
        >
          ホームへ戻る
        </Button>
      </Container>
    </Box>
  )
}
