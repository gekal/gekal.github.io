'use client'

import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import NextLink from 'next/link'

// 欧文のみ。latin サブセットは数ファイルで済むので配信しても軽い。
// 300 は HomeHero のサブタイトルが使っている
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

/**
 * 和文は OS 内蔵フォントに任せる。
 *
 * Noto Sans JP を next/font で配信していた頃は、記事 1 ページあたり
 * woff2 が 41 ファイル / 794KB に達していた。Google Fonts は和文を
 * 約 120 個の unicode-range サブセットに分割するため、ウェイト数が
 * そのまま倍率で効いてしまう。
 * macOS / Windows / Android のいずれも上質な和文ゴシックを内蔵しており、
 * ここを OS 任せにするとフォント転送量がほぼゼロになる。
 */
const japaneseFallback = [
  'Hiragino Kaku Gothic ProN', // macOS / iOS
  'Hiragino Sans',
  'Noto Sans CJK JP', // Linux / Android
  'Noto Sans JP',
  'Yu Gothic UI', // Windows
  'Yu Gothic',
  'Meiryo',
]
  .map((f) => `"${f}"`)
  .join(',')

const fontFamily = [roboto.style.fontFamily, japaneseFallback, 'sans-serif'].join(',')

export const monoFontFamily = [
  'ui-monospace',
  'SFMono-Regular',
  'Menlo',
  'Consolas',
  'monospace',
].join(',')

/**
 * Material Design 準拠のテーマ。
 *
 * cssVariables + colorSchemes により、ライト/ダークが CSS 変数で切り替わる。
 * 静的エクスポートでも InitColorSchemeScript がハイドレーション前に
 * 配色を確定させるため、初回描画のちらつきが起きない。
 */
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    // 長文を読む前提の配色。純白 × 純黒はコントラストが強すぎて目が疲れるので、
    // 背景をわずかに落とし、文字色も真っ黒 / 真っ白を避けている
    // (それでも本文は 13:1 以上あり WCAG AAA を満たす)。
    light: {
      palette: {
        // #1976d2 は白背景で 4.6:1 と本文リンクにはぎりぎり。少し暗くして余裕を持たせる
        primary: { main: '#1565c0' },
        secondary: { main: '#7b1fa2' },
        background: { default: '#fbfbfc', paper: '#ffffff' },
        text: { primary: '#1a1d21', secondary: '#59616b' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        secondary: { main: '#ce93d8' },
        // コードブロック (#22272e) がページより明るく浮くよう、背景を少し沈めている
        background: { default: '#121417', paper: '#1a1d22' },
        text: { primary: '#e2e5e9', secondary: '#9aa3ad' },
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily,
    h1: { fontSize: 'clamp(2.5rem, 8vw, 3.75rem)', fontWeight: 700, lineHeight: 1.15 },
    h2: { fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.25 },
    h3: { fontSize: '1.5rem', fontWeight: 500 },
    h4: { fontSize: '1.25rem', fontWeight: 500 },
    h5: { fontSize: '1.125rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
    overline: { fontWeight: 500, letterSpacing: '0.1em' },
  },
  components: {
    // href を渡した ButtonBase 系 (Button / CardActionArea / ListItemButton …) が
    // next/link を使うようにする。ここで指定しておけば、Server Component から
    // component={NextLink} を渡す必要がなくなる
    // (関数は RSC 境界を越えられないため、渡すとプリレンダリングで落ちる)。
    MuiButtonBase: {
      defaultProps: { LinkComponent: NextLink },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 9999, paddingInline: 20 },
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: { overflow: 'hidden' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
    },
    // 外部リンクや mailto: では component="a" を明示して上書きすること
    MuiLink: {
      defaultProps: { underline: 'hover', component: NextLink },
    },
  },
})

export default theme
