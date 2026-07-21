import Alert from '@mui/material/Alert'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'

interface AvailabilityBadgeProps {
  label?: string
}

export default function AvailabilityBadge({
  label = '現在、新規案件受付中です',
}: AvailabilityBadgeProps) {
  return (
    <Alert severity="success" variant="outlined" icon={<CheckCircleOutlineIcon fontSize="small" />}>
      {label}
    </Alert>
  )
}
