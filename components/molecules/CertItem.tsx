import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CheckIcon from '@mui/icons-material/Check'

interface CertItemProps {
  name: string
}

export default function CertItem({ name }: CertItemProps) {
  return (
    <ListItem disableGutters disablePadding sx={{ alignItems: 'flex-start', mb: 0.5 }}>
      <ListItemIcon sx={{ minWidth: 26, mt: '2px' }}>
        <CheckIcon sx={{ fontSize: 16 }} color="success" />
      </ListItemIcon>
      <ListItemText
        primary={name}
        slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }}
      />
    </ListItem>
  )
}
