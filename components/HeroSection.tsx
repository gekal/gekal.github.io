interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  overlay?: boolean
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = '/img/bg-index.jpg',
  overlay = true,
}: HeroSectionProps) {
  return (
    <header
      className="relative flex items-center justify-center pt-16"
      style={{
        minHeight: '420px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/55" />
      )}
      <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-gray-200 font-light drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
