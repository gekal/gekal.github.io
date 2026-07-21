import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

interface ServiceCardProps {
  icon: string
  title: string
  desc: string
  tags: string[]
}

export default function ServiceCard({ icon, title, desc, tags }: ServiceCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ fontSize: 32, mb: 1.5, lineHeight: 1 }}>{icon}</Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {desc}
        </Typography>
        <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
