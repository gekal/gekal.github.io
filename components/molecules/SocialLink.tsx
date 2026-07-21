import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import XIcon from '@/components/atoms/XIcon'

export type SocialIconName = 'github' | 'twitter' | 'linkedin'

const icons = {
  github: GitHubIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
} as const

interface SocialLinkProps {
  href: string
  label: string
  icon: SocialIconName
  /** 'dark' = 暗い背景の上 */
  variant?: 'light' | 'dark'
}

export default function SocialLink({ href, label, icon, variant = 'light' }: SocialLinkProps) {
  const IconComponent = icons[icon]
  const dark = variant === 'dark'

  return (
    <IconButton
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      size="small"
      sx={{
        color: dark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
        '&:hover': { color: dark ? '#fff' : 'primary.main' },
      }}
    >
      <IconComponent fontSize="small" />
    </IconButton>
  )
}
