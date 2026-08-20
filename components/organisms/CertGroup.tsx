import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import CertItem from '@/components/molecules/CertItem'
import type { CredentialGroup } from '@/lib/credentials'

type CertGroupProps = CredentialGroup

export default function CertGroup({ vendor, accent, items }: CertGroupProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: accent, flexShrink: 0 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            {vendor}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {items.length} certs
          </Typography>
        </Stack>
        <List dense disablePadding>
          {items.map((item) => (
            <CertItem key={item.name} {...item} />
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
