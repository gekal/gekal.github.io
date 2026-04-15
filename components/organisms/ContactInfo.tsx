import ContactCard from '@/components/molecules/ContactCard'
import AvailabilityBadge from '@/components/molecules/AvailabilityBadge'
import Icon from '@/components/atoms/Icon'

const cards = [
  {
    icon: <Icon name="mail" className="h-4 w-4" strokeWidth={1.5} />,
    label: 'Email',
    value: 'liu.hongying@hotmail.com',
    href: 'mailto:liu.hongying@hotmail.com',
  },
  {
    icon: <Icon name="linkedin" className="h-4 w-4" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/gekal',
    href: 'https://www.linkedin.com/in/gekal',
  },
  {
    icon: <Icon name="github" className="h-4 w-4" />,
    label: 'GitHub',
    value: 'github.com/gekal',
    href: 'https://github.com/gekal',
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
          style={{ color: 'var(--apple-blue)' }}
        >
          Get in touch
        </p>
        <h2
          className="font-bold text-[22px] mb-3"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
        >
          お話しましょう
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          お仕事のご依頼・技術相談・その他お問い合わせはフォームまたは直接ご連絡ください。
          通常 1〜2 営業日以内にご返信します。
        </p>
      </div>

      <div className="space-y-3">
        {cards.map(({ icon, label, value, href }) => (
          <ContactCard key={label} icon={icon} label={label} value={value} href={href} />
        ))}
      </div>

      <AvailabilityBadge />
    </div>
  )
}
