import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

/** Small uppercase label above section headings — e.g. "Latest", "Services" */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${className}`}
      style={{ color: 'var(--apple-blue)' }}
    >
      {children}
    </p>
  )
}
