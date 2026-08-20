import Alert from '@mui/material/Alert'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import { AVAILABILITY, availabilityLabel, type AvailabilityStatus } from '@/lib/business'

interface AvailabilityBadgeProps {
  /** 既定の文言を上書きしたいときだけ渡す */
  label?: string
}

const severities: Record<AvailabilityStatus, 'success' | 'info' | 'warning'> = {
  available: 'success',
  limited: 'info',
  closed: 'warning',
}

/**
 * 稼働状況。
 *
 * 「受付中」だけだといつ時点の話か分からず信用されないので、
 * 基準日を含めた文言を lib/business.ts から作って出す。
 */
export default function AvailabilityBadge({ label }: AvailabilityBadgeProps) {
  return (
    <Alert
      severity={severities[AVAILABILITY.status]}
      variant="outlined"
      icon={<CheckCircleOutlineIcon fontSize="small" />}
    >
      {label ?? availabilityLabel()}
    </Alert>
  )
}
