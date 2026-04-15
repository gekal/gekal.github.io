import Icon from '@/components/atoms/Icon'

interface CertItemProps {
  name: string
}

export default function CertItem({ name }: CertItemProps) {
  return (
    <li className="flex items-start gap-2 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
      <Icon name="check" className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
      {name}
    </li>
  )
}

// Workaround: CertItem icon needs a color override
// The green check uses a custom style via parent's CSS
