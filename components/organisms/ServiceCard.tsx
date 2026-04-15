interface ServiceCardProps {
  icon: string
  title: string
  desc: string
  tags: string[]
}

export default function ServiceCard({ icon, title, desc, tags }: ServiceCardProps) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'var(--surface-secondary)',
        border: '1px solid var(--separator-opaque)',
      }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3
        className="font-semibold text-[15px] mb-2 tracking-[-0.01em]"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[11px] rounded-md px-2 py-0.5 border"
            style={{
              background: 'white',
              borderColor: 'var(--separator)',
              color: 'var(--text-secondary)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
