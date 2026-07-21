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
 * 配色は theme を参照するため、ライト/ダーク切り替えに追従する。
 * ただしコードブロックだけは常に暗色 (GitHub Dark Dimmed) で固定している。
 */
export default function MarkdownStyles() {
  const theme = useTheme()

  return (
    <GlobalStyles
      styles={{
        '.markdown-body': {
          color: theme.palette.text.primary,
          fontSize: '1rem',
          lineHeight: 1.85,
          overflowWrap: 'break-word',

          '& > *:first-of-type': { marginTop: 0 },
          '& > *:last-child': { marginBottom: 0 },

          /* ── 見出し ── */
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 500,
            lineHeight: 1.3,
            marginTop: '2.5rem',
            marginBottom: '1rem',
            scrollMarginTop: '80px',
          },
          '& h1': { fontSize: '2rem', fontWeight: 700 },
          '& h2': {
            fontSize: '1.6rem',
            fontWeight: 700,
            paddingBottom: '0.4rem',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& h3': { fontSize: '1.3rem' },
          '& h4': { fontSize: '1.1rem' },
          '& h5, & h6': { fontSize: '1rem' },

          /* ── 本文 ── */
          '& p': { marginTop: 0, marginBottom: '1.25rem' },

          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            textUnderlineOffset: 2,
            '&:hover': { textDecorationThickness: 2 },
          },

          '& strong': { fontWeight: 700 },

          /* ── リスト ── */
          '& ul, & ol': { marginTop: 0, marginBottom: '1.25rem', paddingLeft: '1.6rem' },
          '& li': { marginBottom: '0.4rem' },
          '& li > ul, & li > ol': { marginTop: '0.4rem', marginBottom: 0 },

          /* ── 引用 ── */
          '& blockquote': {
            margin: '1.5rem 0',
            padding: '0.5rem 1.25rem',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.action.hover,
            borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
            color: theme.palette.text.secondary,
            '& p:last-child': { marginBottom: 0 },
          },

          /* ── 表 ── */
          '& table': {
            width: '100%',
            marginBottom: '1.5rem',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            display: 'block',
            overflowX: 'auto',
          },
          '& th, & td': {
            padding: '0.6rem 0.9rem',
            border: `1px solid ${theme.palette.divider}`,
            textAlign: 'left',
            verticalAlign: 'top',
          },
          '& th': {
            backgroundColor: theme.palette.action.hover,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          },

          /* ── 画像・区切り ── */
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[2],
          },
          '& hr': {
            border: 0,
            borderTop: `1px solid ${theme.palette.divider}`,
            margin: '2.5rem 0',
          },

          /* ── インラインコード ── */
          '& :not(pre) > code': {
            fontFamily: monoFontFamily,
            fontSize: '0.85em',
            padding: '0.15em 0.4em',
            borderRadius: 6,
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.text.primary,
          },

          /* ── コードブロック (常に暗色) ── */
          '& pre': {
            margin: '1.75rem 0',
            padding: 0,
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            backgroundColor: '#22272e',
            boxShadow: theme.shadows[3],
          },
          '& pre code': {
            display: 'block',
            overflowX: 'auto',
            padding: '1.25rem 1.4rem',
            backgroundColor: 'transparent',
            color: '#adbac7',
            fontFamily: monoFontFamily,
            fontSize: '0.82rem',
            lineHeight: 1.75,
            tabSize: 2,
          },
          '& pre ::selection': { background: 'rgba(88,166,255,0.4)', color: '#fff' },

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
            color: theme.palette.text.secondary,
            fontSize: '0.75rem',
          },
          '& .mermaid-animation-toggle': {
            margin: 0,
            padding: '0.4rem 0.9rem',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 9999,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            font: 'inherit',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
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
        '.hljs-code,.hljs-comment,.hljs-formula': { color: '#768390' },
        '.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag': { color: '#8ddb8c' },
        '.hljs-subst': { color: '#adbac7' },
        '.hljs-section': { color: '#316dca', fontWeight: 700 },
        '.hljs-bullet': { color: '#eac55f' },
        '.hljs-emphasis': { color: '#adbac7', fontStyle: 'italic' },
        '.hljs-strong': { color: '#adbac7', fontWeight: 700 },
        '.hljs-addition': { color: '#b4f1b4', backgroundColor: '#1b4721' },
        '.hljs-deletion': { color: '#ffd8d3', backgroundColor: '#78191b' },
      }}
    />
  )
}
