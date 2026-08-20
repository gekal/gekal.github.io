import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { AVAILABILITY } from '@/lib/business'
import AvailabilityBadge from '@/components/molecules/AvailabilityBadge'

/**
 * 稼働条件の一覧。
 *
 * 「条件が合うか」を確かめるためだけの問い合わせを減らすのが目的なので、
 * 単価・稼働日数・商流まで含めて先に出しておく。
 */
const rows: { label: string; value: string }[] = [
  { label: '稼働開始', value: AVAILABILITY.from },
  { label: '稼働日数', value: AVAILABILITY.daysPerWeek },
  { label: '契約形態', value: AVAILABILITY.contract },
  { label: '勤務形態', value: AVAILABILITY.workStyle },
  { label: '商流', value: AVAILABILITY.channel },
  { label: '契約期間', value: AVAILABILITY.minimumTerm },
  { label: '単価', value: AVAILABILITY.rate },
]

export default function ConditionsTable() {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <AvailabilityBadge />
        <Divider sx={{ my: 3 }} />
        <Stack spacing={1.75} component="dl" sx={{ m: 0 }}>
          {rows.map(({ label, value }) => (
            <Grid container spacing={1} key={label}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography component="dt" variant="body2" color="text.secondary">
                  {label}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                  {value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
