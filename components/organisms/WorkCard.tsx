import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import type { Work } from '@/lib/works'
import SectionLabel from '@/components/atoms/SectionLabel'

/** 「業界 / 規模 / 期間 / 稼働」のような 1 行のメタ情報 */
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 9 }}>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    </Grid>
  )
}

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Card component="article" sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 1.5 }}>
          <Chip label={work.industry} size="small" color="primary" variant="outlined" />
          <Chip label={work.period} size="small" variant="outlined" />
        </Stack>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
          {work.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {work.summary}
        </Typography>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <MetaRow label="規模" value={work.scale} />
          <MetaRow label="役割" value={work.role} />
          <MetaRow label="稼働" value={work.engagement} />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SectionLabel>Challenge</SectionLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {work.challenge}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SectionLabel>Approach</SectionLabel>
            <Stack component="ul" spacing={0.5} sx={{ m: 0, mt: 0.5, pl: 2.5 }}>
              {work.actions.map((action) => (
                <Typography key={action} component="li" variant="body2" color="text.secondary">
                  {action}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, p: 2.5, borderRadius: 2, bgcolor: 'action.hover' }}>
          <SectionLabel sx={{ mb: 1.5 }}>Results</SectionLabel>
          <Grid container spacing={2}>
            {work.results.map((result) => (
              <Grid key={result.label} size={{ xs: 12, sm: 4 }}>
                <Typography
                  component="p"
                  sx={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, color: 'primary.main' }}
                >
                  {result.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {result.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap', mt: 3 }}>
          {work.stack.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
