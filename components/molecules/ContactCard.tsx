import { ReactNode } from 'react'

interface ContactCardProps {
  icon: ReactNode
  label: string
  value: string
  href: string
}

export default function ContactCard({ icon, label, value, href }: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3.5 p-4 rounded-xl border transition-all group"
      style={{
        background: 'white',
        borderColor: 'var(--separator-opaque)',
      }}
    >
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:text-white"
        style={{
          background: 'var(--apple-blue-light)',
          color: 'var(--apple-blue)',
        }}
        /* hover handled via group */
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
          {label}
        </p>
        <p
          className="text-[13px] font-medium truncate transition-colors group-hover:opacity-70"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </p>
      </div>
    </a>
  )
}
