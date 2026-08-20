import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import Box from '@mui/material/Box'
import theme from './theme'
import MarkdownStyles from './MarkdownStyles'
import Analytics from './Analytics'
import Navbar from '@/components/organisms/Navbar'
import Footer from '@/components/organisms/Footer'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 各ルートが自身の URL を canonical として出す。apex からも到達できるため、
  // 正規形が www であることを明示しておく
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
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
    <html lang="ja" suppressHydrationWarning>
      <body>
        {/* ハイドレーション前に配色を確定させ、初回描画のちらつきを防ぐ */}
        <InitColorSchemeScript attribute="data-mui-color-scheme" defaultMode="system" />
        <AppRouterCacheProvider options={{ key: 'mui' }}>
          <ThemeProvider theme={theme} defaultMode="system">
            <CssBaseline />
            <MarkdownStyles />
            {/*
              スキップリンク。キーボード操作でナビを毎回辿らずに本文へ飛べるようにする。
              display:none だとフォーカスを受け取れないので、画面外に逃がしておき
              フォーカス時だけ引き戻す
            */}
            <Box
              component="a"
              href="#main"
              sx={{
                position: 'fixed',
                top: 8,
                left: 8,
                zIndex: 2000,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: 3,
                textDecoration: 'none',
                transform: 'translateY(-200%)',
                // :focus-visible ではなく :focus。このリンクは画面外に置かれていて
                // キーボードからしか到達できないうえ、:focus-visible は
                // ブラウザのヒューリスティック次第で発火しないことがある
                '&:focus': { transform: 'translateY(0)' },
              }}
            >
              本文へスキップ
            </Box>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <Box component="main" id="main" sx={{ flex: 1, scrollMarginTop: '80px' }}>
                {children}
              </Box>
              <Footer />
            </Box>
            <Analytics />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
