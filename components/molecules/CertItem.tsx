import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'
import CheckIcon from '@mui/icons-material/Check'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import type { Credential } from '@/lib/credentials'

/**
 * 資格 1 件。
 * 公開バッジの URL があれば、検証できるようにリンクにする。
 */
export default function CertItem({ name, url }: Credential) {
  return (
    <ListItem disableGutters disablePadding sx={{ alignItems: 'flex-start', mb: 0.5 }}>
      <ListItemIcon sx={{ minWidth: 26, mt: '2px' }}>
        <CheckIcon sx={{ fontSize: 16 }} color="success" />
      </ListItemIcon>
      <ListItemText
        primary={
          url ? (
            <Link
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              {name}
              <OpenInNewIcon sx={{ fontSize: 13 }} />
            </Link>
          ) : (
            name
          )
        }
        slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }}
      />
    </ListItem>
  )
}
