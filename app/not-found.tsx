import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="text-center">
        <p className="font-mono text-xs font-semibold text-primary uppercase tracking-widest mb-4">404 — Not Found</p>
        <h1 className="font-serif text-8xl font-bold text-white/10 select-none mb-2">404</h1>
        <p className="text-lg text-slate-400 mb-8">ページが見つかりません</p>
        <Link href="/" className="btn-primary">
          ホームへ戻る
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
