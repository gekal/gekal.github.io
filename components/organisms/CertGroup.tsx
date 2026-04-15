import CertItem from '@/components/molecules/CertItem'

interface CertGroupProps {
  vendor: string
  accent: string
  items: string[]
}

export default function CertGroup({ vendor, accent, items }: CertGroupProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'var(--surface-secondary)',
        border: '1px solid var(--separator-opaque)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
        <h3
          className="font-semibold text-[13px] tracking-[-0.01em]"
          style={{ color: 'var(--text-primary)' }}
        >
          {vendor}
        </h3>
        <span className="ml-auto text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
          {items.length} certs
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <CertItem key={item} name={item} />
        ))}
      </ul>
    </div>
  )
}
