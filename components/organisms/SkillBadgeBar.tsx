import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

interface SkillBadge {
  label: string
  sub: string
  color: string
}

const badges: SkillBadge[] = [
  { label: 'AWS', sub: '5 certs', color: '#FF9500' },
  { label: 'GCP', sub: '5 certs', color: '#34A853' },
  { label: 'Azure', sub: '6 certs', color: '#0078D4' },
  { label: 'CKAD', sub: 'Kubernetes', color: '#326CE5' },
  { label: 'Java', sub: 'Spring Boot', color: '#F89820' },
  { label: 'DevOps', sub: 'CI/CD', color: '#6E6E73' },
]

export default function SkillBadgeBar() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack direction="row" spacing={1.25} useFlexGap sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          {badges.map(({ label, sub, color }) => (
            <Chip
              key={label}
              variant="outlined"
              // Chip の label は <span> として描画される。div を返す Box/Stack を
              // そのまま渡すと <span> 内に <div> という不正な入れ子になり、
              // ブラウザの構造補正でハイドレーションがずれるため、中身はすべて
              // component="span" で inline に保つこと。
              // 色ドットは icon スロットではなく label 内に置いている
              // (icon スロットに渡した要素は Chip 側の加工で描画されなかった)。
              label={
                <Box
                  component="span"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      flexShrink: 0,
                      borderRadius: '50%',
                      bgcolor: color,
                    }}
                  />
                  <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography component="span" variant="caption" color="text.secondary">
                    {sub}
                  </Typography>
                </Box>
              }
              sx={{ bgcolor: 'background.paper', py: 2.25 }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
