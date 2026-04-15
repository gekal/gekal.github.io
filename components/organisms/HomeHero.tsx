import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function HomeHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pt-[52px]"
      style={{
        backgroundImage: 'url(/img/bg-index.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bottom-to-top gradient — content readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.10) 100%)',
        }}
      />

      {/* Top-to-bottom gradient — navbar readability (always visible) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 15%, transparent 35%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pb-24 w-full">
        <div className="max-w-xl">
          <p className="text-[12px] font-medium text-white/60 uppercase tracking-[0.12em] mb-5 animate-fade-up">
            フリーランスエンジニア
          </p>

          <h1
            className="text-white font-bold leading-none animate-fade-up delay-100"
            style={{ fontSize: 'clamp(64px, 10vw, 96px)', letterSpacing: '-0.03em' }}
          >
            鴻鷹
          </h1>

          <p
            className="mt-5 text-[19px] text-white/80 font-light leading-relaxed animate-fade-up delay-200"
            style={{ letterSpacing: '-0.01em' }}
          >
            良い未来のため、頑張っています。
          </p>
          <p className="mt-1.5 text-[13px] text-white/50 tracking-wide animate-fade-up delay-300">
            Cloud Architecture · DevOps · Backend Engineering
          </p>

          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up delay-400">
            <Button href="/about" variant="primary" className="text-[15px]">
              プロフィールを見る
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Button>
            <Button
              href="/posts"
              variant="outline"
              className="text-[15px] !border-white/50 !text-white hover:!bg-white/10 hover:!border-white"
            >
              技術ブログ
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="arrow-down" className="h-4 w-4 text-white/30" strokeWidth={1.5} />
      </div>
    </section>
  )
}
