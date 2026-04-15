import AccentLine from '@/components/atoms/AccentLine'

interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 'min-h-[260px]', md: 'min-h-[360px]', lg: 'min-h-[480px]' }

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = '/img/bg-index.jpg',
  size = 'md',
}: HeroSectionProps) {
  return (
    <header
      className={`relative flex items-end pt-[52px] ${heights[size]}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bottom-to-top gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
      {/* Top-to-bottom gradient — navbar readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.15) 20%, transparent 40%)',
        }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pb-12">
        <AccentLine className="mb-4 animate-fade-up" />
        <h1
          className="font-bold text-white leading-tight animate-fade-up delay-100"
          style={{ fontSize: 'clamp(32px, 6vw, 48px)', letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-3 text-[15px] text-white/60 max-w-xl animate-fade-up delay-200"
            style={{ letterSpacing: '-0.01em' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
