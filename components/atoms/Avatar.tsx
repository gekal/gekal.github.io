import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  online?: boolean
}

const sizes = { sm: 40, md: 96, lg: 144 }

export default function Avatar({ src, alt, size = 'md', online = false }: AvatarProps) {
  const dimension = sizes[size]

  const avatar = (
    <MuiAvatar
      src={src}
      alt={alt}
      variant="rounded"
      sx={{ width: dimension, height: dimension, boxShadow: 4 }}
    />
  )

  if (!online) return avatar

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      color="success"
      sx={{
        '& .MuiBadge-badge': {
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'background.paper',
        },
      }}
    >
      {avatar}
    </Badge>
  )
}
