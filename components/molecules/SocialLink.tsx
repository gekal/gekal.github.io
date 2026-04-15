import Icon, { IconName } from '@/components/atoms/Icon'

interface SocialLinkProps {
  href: string
  label: string
  icon: IconName
  /** 'light' = dark icon on light bg, 'dark' = light icon on dark bg */
  variant?: 'light' | 'dark'
}

export default function SocialLink({ href, label, icon, variant = 'light' }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60"
      style={{
        background: variant === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        color: variant === 'dark' ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)',
      }}
    >
      <Icon name={icon} className="h-4 w-4" />
    </a>
  )
}
