import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'

export const metadata: Metadata = {
  title: {
    default: '鴻鷹 | フリーランスエンジニア',
    template: '%s | 鴻鷹',
  },
  description:
    'フリーランスエンジニア gekal のポートフォリオ＆技術ブログ。クラウド・DevOps・バックエンド開発を中心に発信しています。',
  keywords: [
    'フリーランスエンジニア',
    'クラウドエンジニア',
    'AWS',
    'GCP',
    'Azure',
    'Kubernetes',
    'DevOps',
    'Java',
    'Next.js',
  ],
  authors: [{ name: 'gekal' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/icon.svg',
  },
  openGraph: {
    siteName: '鴻鷹',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
