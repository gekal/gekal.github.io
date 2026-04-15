import { ReactNode } from 'react'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

interface CTASectionProps {
  badge?: string
  title: string
  description: ReactNode
  ctaText: string
  ctaHref: string
}

export default function CTASection({
  badge,
  title,
  description,
  ctaText,
  ctaHref,
}: CTASectionProps) {
  return (
    <section
      className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
      style={{ background: 'var(--dark-bg)' }}
    >
      {/* Subtle blue glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #0071E3 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">
        {badge && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-3 text-white/50">
            {badge}
          </p>
        )}
        <h2
          className="font-bold text-white mb-4"
          style={{ fontSize: 'clamp(24px, 4vw, 34px)', letterSpacing: '-0.03em' }}
        >
          {title}
        </h2>
        <p className="text-white/50 text-[15px] mb-9 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
        <Button href={ctaHref} variant="primary" className="text-[15px]">
          {ctaText}
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Button>
      </div>
    </section>
  )
}
