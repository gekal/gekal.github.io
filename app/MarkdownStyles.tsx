'use client'

import GlobalStyles from '@mui/material/GlobalStyles'
import { useTheme } from '@mui/material/styles'
import { monoFontFamily } from './theme'

/**
 * 記事本文 (Markdown → HTML) のスタイル。
 *
 * 本文は React コンポーネントではなく dangerouslySetInnerHTML で流し込む
 * 生成 HTML なので、sx では当てられずグローバル CSS が必要になる。
 * かつて @tailwindcss/typography が担っていた範囲をここで賄う。
 *
 * 配色は必ず theme.vars 経由 (= var(--mui-palette-*)) で参照すること。
 * cssVariables を有効にしたテーマでは theme.palette.* が既定スキーム
 * (ライト) の実際の色に解決されるため、そのまま書くとダークモードでも
 * 明色が焼き付き、本文が背景に沈んで読めなくなる。
 * ただしコードブロックだけは常に暗色 (GitHub Dark Dimmed) で固定している。
 */
export default function MarkdownStyles() {
  const theme = useTheme()
  // cssVariables を有効にしているので vars は必ず入るが、型上は optional なので保険を挟む
  const { palette, shadows } = theme.vars ?? theme

  return (
    <GlobalStyles
      styles={{
        '.markdown-body': {
          color: palette.text.primary,
          // 和文は字面が詰まるので 16px だと窮屈。行長・行間とあわせて少し大きめに取る
          fontSize: '1.0625rem',
          lineHeight: 1.9,
          letterSpacing: '0.02em',
          overflowWrap: 'break-word',
          // 禁則処理を効かせて、行頭に句読点や閉じ括弧が来ないようにする
          lineBreak: 'strict',

          '& > *:first-of-type': { marginTop: 0 },
          '& > *:last-child': { marginBottom: 0 },

          /* ── 見出し ── */
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: '0.01em',
            // 見出しは「上の節の終わり」より「次の節の始まり」に近く見えるべきなので、
            // 上マージンを下マージンよりはっきり大きく取る
            marginTop: '3.5rem',
            marginBottom: '1rem',
            scrollMarginTop: '80px',
          },
          '& h1': { fontSize: '1.9rem' },
          '& h2': {
            fontSize: '1.5rem',
            paddingBottom: '0.4rem',
            borderBottom: `1px solid ${palette.divider}`,
          },
          '& h3': { fontSize: '1.25rem', marginTop: '2.75rem' },
          '& h4': { fontSize: '1.0625rem', marginTop: '2.25rem' },
          '& h5, & h6': {
            fontSize: '1rem',
            marginTop: '2rem',
            color: palette.text.secondary,
          },

          /* ── 見出しへの直リンク (rehype-autolink-headings) ── */
          '& .heading-anchor': {
            marginLeft: '0.4em',
            color: palette.text.secondary,
            textDecoration: 'none',
            // 常時見えていると本文の邪魔になるので、見出しへのホバーで出す。
            // キーボード操作でも辿れるようフォーカス時にも表示する
            opacity: 0,
            transition: 'opacity 120ms',
          },
          '& h1:hover .heading-anchor, & h2:hover .heading-anchor, & h3:hover .heading-anchor, & h4:hover .heading-anchor, & h5:hover .heading-anchor, & h6:hover .heading-anchor, & .heading-anchor:focus-visible':
            { opacity: 1 },

          /* ── 本文 ── */
          '& p': { marginTop: 0, marginBottom: '1.5rem' },

          '& a': {
            color: palette.primary.main,
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            '&:hover': { textDecorationThickness: 2 },
          },

          '& strong': { fontWeight: 700 },

          /* ── リスト ── */
          '& ul, & ol': { marginTop: 0, marginBottom: '1.5rem', paddingLeft: '1.5rem' },
          '& li': { marginBottom: '0.6rem', paddingLeft: '0.2rem' },
          '& li::marker': { color: palette.text.secondary },
          '& li > ul, & li > ol': { marginTop: '0.6rem', marginBottom: 0 },

          /* ── 引用 ── */
          '& blockquote': {
            margin: '2rem 0',
            padding: '1rem 1.25rem',
            borderLeft: `4px solid ${palette.primary.main}`,
            backgroundColor: palette.action.hover,
            borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
            // text.secondary は背景が付いた枠内だとコントラストが落ちるので本文色のまま置く
            color: palette.text.primary,
            '& p:last-child': { marginBottom: 0 },
          },

          /* ── 表 ── */
          '& table': {
            width: '100%',
            margin: '2rem 0',
            borderCollapse: 'collapse',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            display: 'block',
            overflowX: 'auto',
          },
          '& th, & td': {
            padding: '0.7rem 1rem',
            border: `1px solid ${palette.divider}`,
            textAlign: 'left',
            verticalAlign: 'top',
          },
          '& th': {
            backgroundColor: palette.action.selected,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          },
          // 横長の表は行を追うのが難しいので、縞模様で視線を固定する
          '& tbody tr:nth-of-type(even)': { backgroundColor: palette.action.hover },

          /* ── 画像・区切り ── */
          // width/height 属性はレイアウトシフト防止のためにビルド時に埋めている。
          // 表示上は必ず可変にしたいので、CSS 側で上書きしておく
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: theme.shape.borderRadius,
            boxShadow: shadows[2],
          },
          '& hr': {
            border: 0,
            borderTop: `1px solid ${palette.divider}`,
            margin: '2.5rem 0',
          },

          /* ── インラインコード ── */
          '& :not(pre) > code': {
            fontFamily: monoFontFamily,
            // 等幅フォントは同じ px でも小さく見えるので 0.85em だと本文中で沈む
            fontSize: '0.9em',
            padding: '0.15em 0.4em',
            borderRadius: 6,
            backgroundColor: palette.action.selected,
            color: palette.text.primary,
            wordBreak: 'break-word',
          },

          /* ── コードブロック (常に暗色) ── */
          '& pre': {
            margin: '2rem 0',
            padding: 0,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            backgroundColor: '#22272e',
            // 影で浮かせるより枠線で面を区切るほうが、明るい背景でも落ち着く
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: shadows[1],
          },
          '& pre code': {
            display: 'block',
            overflowX: 'auto',
            padding: '1.25rem 1.4rem',
            backgroundColor: 'transparent',
            color: '#cdd9e5',
            fontFamily: monoFontFamily,
            fontSize: '0.875rem',
            lineHeight: 1.8,
            tabSize: 2,
          },
          '& pre ::selection': { background: 'rgba(88,166,255,0.4)', color: '#fff' },

          /* ── コードブロックのツールバー (言語ラベル + コピー) ── */
          '& pre.has-code-toolbar': { position: 'relative' },
          '& .code-toolbar': {
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.6rem',
            // コードの上に重なるので、下地なしだと文字同士が干渉する
            background: 'linear-gradient(to left, #22272e 70%, rgba(34,39,46,0))',
            paddingLeft: '2.5rem',
          },
          '& .code-language': {
            color: '#768390',
            fontFamily: monoFontFamily,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          },
          '& .code-copy-button': {
            margin: 0,
            padding: '0.25rem 0.6rem',
            border: '1px solid rgba(205,217,229,0.25)',
            borderRadius: 6,
            background: 'transparent',
            color: '#adbac7',
            font: 'inherit',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            cursor: 'pointer',
            transition: 'color 120ms, border-color 120ms',
            '&:hover': { color: '#cdd9e5', borderColor: 'rgba(205,217,229,0.55)' },
            '&[data-copied="true"]': { color: '#8ddb8c', borderColor: '#8ddb8c' },
          },

          /* ── Mermaid ── */
          '& .mermaid-figure': { margin: '2rem 0' },
          '& .mermaid': { margin: 0, overflowX: 'auto', textAlign: 'center' },
          '& .mermaid svg': { width: 'auto', maxWidth: '100%', height: 'auto', margin: '0 auto' },
          '& .mermaid-figure[data-animation-paused="true"] .mermaid svg *': {
            animationPlayState: 'paused !important',
          },
          '& .mermaid-controls': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '0.75rem',
            color: palette.text.secondary,
            fontSize: '0.75rem',
          },
          '& .mermaid-animation-toggle': {
            margin: 0,
            padding: '0.4rem 0.9rem',
            border: `1px solid ${palette.divider}`,
            borderRadius: 9999,
            background: palette.background.paper,
            color: palette.text.primary,
            font: 'inherit',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              borderColor: palette.primary.main,
              color: palette.primary.main,
            },
          },

          // 本文は読みやすい幅に絞る一方、コード・表・図は情報密度が高く幅が要るので、
          // 余白のある画面でだけ左右にはみ出させる。
          // 上の `margin` 一括指定に負けないよう、必ず後ろに置くこと
          '@media (min-width: 900px)': {
            '& > pre, & > table, & > .mermaid-figure': { marginInline: '-3rem' },
            // table は width:100% を持つので、負のマージンだけでは広がらない
            '& > table': { width: 'calc(100% + 6rem)' },
          },
        },

        /* ── highlight.js: GitHub Dark Dimmed ── */
        '.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_':
          { color: '#f47067' },
        '.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_': {
          color: '#dcbdfb',
        },
        '.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable':
          { color: '#6cb6ff' },
        '.hljs-meta .hljs-string,.hljs-regexp,.hljs-string': { color: '#96d0ff' },
        '.hljs-built_in,.hljs-symbol': { color: '#f69d50' },
        // コメントは #768390 だと #22272e 上で 4:1 を割るので少し明るくしている
        '.hljs-code,.hljs-comment,.hljs-formula': { color: '#8b949e' },
        '.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag': { color: '#8ddb8c' },
        '.hljs-subst': { color: '#cdd9e5' },
        '.hljs-section': { color: '#6cb6ff', fontWeight: 700 },
        '.hljs-bullet': { color: '#eac55f' },
        '.hljs-emphasis': { color: '#cdd9e5', fontStyle: 'italic' },
        '.hljs-strong': { color: '#cdd9e5', fontWeight: 700 },
        '.hljs-addition': { color: '#b4f1b4', backgroundColor: '#1b4721' },
        '.hljs-deletion': { color: '#ffd8d3', backgroundColor: '#78191b' },
      }}
    />
  )
}
