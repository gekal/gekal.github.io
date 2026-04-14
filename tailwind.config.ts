import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0085A1',
          light: '#00a8cc',
          dark: '#005f73',
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#1e293b',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      opacity: {
        '8': '0.08',
        '15': '0.15',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 10px 30px -5px rgb(0 133 161 / 0.15), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
        glow: '0 0 40px rgb(0 133 161 / 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1e293b',
            lineHeight: '1.8',
            a: { color: '#0085A1', '&:hover': { color: '#005f73' }, textDecoration: 'underline' },
            'h2, h3, h4': { fontFamily: 'Lora, serif', color: '#0f172a', fontWeight: '700' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#f1f5f9',
              borderRadius: '5px',
              padding: '2px 7px',
              fontWeight: '400',
              fontSize: '0.875em',
              color: '#0085A1',
            },
            pre: { backgroundColor: '#0f172a', borderRadius: '0.75rem' },
            blockquote: {
              borderLeftColor: '#0085A1',
              color: '#475569',
              fontStyle: 'italic',
            },
            img: { borderRadius: '0.75rem' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
