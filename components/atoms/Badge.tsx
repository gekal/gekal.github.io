import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  /** dot color (CSS color value) */
  dotColor?: string
  className?: string
}

export default function Badge({ children, dotColor, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[12px] font-medium rounded-full px-3 py-1 ${className}`}
      style={{ color: 'var(--apple-blue)', background: 'var(--apple-blue-light)' }}
    >
      {dotColor && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: dotColor }}
        />
      )}
      {children}
    </span>
  )
}
