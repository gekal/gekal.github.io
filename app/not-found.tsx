import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--dark-bg)' }}>
      <div className="text-center">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: 'var(--apple-blue)' }}
        >
          404 — Not Found
        </p>
        <h1
          className="font-bold select-none mb-2"
          style={{ fontSize: 'clamp(80px, 15vw, 120px)', color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em' }}
        >
          404
        </h1>
        <p className="text-[17px] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          ページが見つかりません
        </p>
        <Button href="/" variant="primary" className="text-[15px]">
          ホームへ戻る
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  )
}
