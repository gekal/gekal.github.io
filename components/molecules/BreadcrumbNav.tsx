import Link from 'next/link'
import Icon from '@/components/atoms/Icon'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-1.5 text-[12px] mb-10" style={{ color: 'var(--text-tertiary)' }}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <Icon
              name="arrow-right"
              className="h-3 w-3 flex-shrink-0"
              strokeWidth={2}
            />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </Link>
          ) : (
            <span className="truncate max-w-[200px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
