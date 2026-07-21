import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'

interface ContactCardProps {
  icon: ReactNode
  label: string
  value: string
  href: string
}

export default function ContactCard({ icon, label, value, href }: ContactCardProps) {
  return (
    <Card>
      <CardActionArea
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ p: 2 }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {label}
            </Typography>
            <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
