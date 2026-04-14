interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = '/img/bg-index.jpg',
  size = 'md',
}: HeroSectionProps) {
  const heights = { sm: 'min-h-[280px]', md: 'min-h-[380px]', lg: 'min-h-[500px]' }

  return (
    <header
      className={`relative flex items-end pt-16 ${heights[size]}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        {/* Accent line */}
        <div className="w-10 h-0.5 bg-primary-light mb-4 animate-fade-up" />
        <h1 className="font-serif text-4xl md:text-5xl text-white font-bold leading-tight animate-fade-up delay-100">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base text-slate-300 max-w-xl animate-fade-up delay-200">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
