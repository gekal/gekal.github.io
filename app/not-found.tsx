import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center pt-16 bg-cover bg-center"
      style={{ backgroundImage: 'url(/img/bg-index.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-9xl font-bold text-white opacity-80">404</h1>
        <p className="text-2xl text-gray-200 mt-4 mb-8">ページが見つかりません</p>
        <Link href="/" className="btn-primary">
          ホームへ戻る
        </Link>
      </div>
    </div>
  )
}
