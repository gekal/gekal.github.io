interface SkillBadge {
  label: string
  sub: string
  color: string
}

const badges: SkillBadge[] = [
  { label: 'AWS', sub: '5 certs', color: '#FF9500' },
  { label: 'GCP', sub: '5 certs', color: '#34A853' },
  { label: 'Azure', sub: '6 certs', color: '#0078D4' },
  { label: 'CKAD', sub: 'Kubernetes', color: '#326CE5' },
  { label: 'Java', sub: 'Spring Boot', color: '#F89820' },
  { label: 'DevOps', sub: 'CI/CD', color: '#6E6E73' },
]

export default function SkillBadgeBar() {
  return (
    <section
      style={{
        background: 'var(--surface-secondary)',
        borderBottom: '1px solid var(--separator-opaque)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-6">
        <div className="flex flex-wrap justify-center gap-2.5">
          {badges.map(({ label, sub, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full px-4 py-2 cursor-default transition-opacity hover:opacity-75"
              style={{
                background: 'white',
                border: '1px solid var(--separator-opaque)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                {label}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
