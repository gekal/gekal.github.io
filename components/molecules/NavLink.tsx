import Button from '@mui/material/Button'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  /** ヒーロー画像など暗い背景の上に描画されるとき */
  dark?: boolean
}

export default function NavLink({ href, label, isActive, dark = false }: NavLinkProps) {
  const activeColor = dark ? '#fff' : 'text.primary'
  const idleColor = dark ? 'rgba(255,255,255,0.72)' : 'text.secondary'

  return (
    <Button
      component={Link}
      href={href}
      size="small"
      sx={{
        borderRadius: 2,
        px: 2,
        color: isActive ? activeColor : idleColor,
        fontWeight: isActive ? 700 : 500,
        bgcolor: isActive ? (dark ? 'rgba(255,255,255,0.14)' : 'action.selected') : 'transparent',
        '&:hover': {
          color: activeColor,
          bgcolor: dark ? 'rgba(255,255,255,0.1)' : 'action.hover',
        },
      }}
    >
      {label}
    </Button>
  )
}
