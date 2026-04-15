interface AccentLineProps {
  className?: string
  animate?: boolean
}

/** Small horizontal blue accent line — used above headings */
export default function AccentLine({ className = '', animate = false }: AccentLineProps) {
  return (
    <div
      className={`w-8 h-0.5 rounded-full ${animate ? 'animate-fade-up' : ''} ${className}`}
      style={{ background: 'var(--apple-blue)' }}
    />
  )
}
