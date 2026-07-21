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
              icon={
                <Box
                  sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, ml: '10px !important' }}
                />
              }
              label={
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
                  <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography component="span" variant="caption" color="text.secondary">
                    {sub}
                  </Typography>
                </Stack>
              }
              sx={{ bgcolor: 'background.paper', py: 2.25 }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
