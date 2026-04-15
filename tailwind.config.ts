import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Apple Blue */
        primary: {
          DEFAULT: '#0071E3',
          light: '#0077ED',
          dark: '#005BB5',
        },
        /* Warm charcoal series */
        ink: {
          DEFAULT: '#1A1916',
          soft: '#2C2A26',
          muted: '#6E6B63',
        },
        apple: {
          blue: '#0071E3',
          'blue-hover': '#0077ED',
          'blue-light': '#E5EFFC',
          gray: '#F2F0EB',
          'gray-2': '#F7F5F0',
          'dark-bg': '#141210',
          'dark-surface': '#1E1C19',
          'dark-surface-2': '#2C2A26',
          text: '#1A1916',
          'text-secondary': '#6E6B63',
          separator: '#D4D1CA',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
        snug: '-0.01em',
      },
      opacity: {
        '8': '0.08',
        '15': '0.15',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        modal: '0 22px 70px rgba(0,0,0,0.20)',
        glow: '0 0 40px rgba(0,113,227,0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1D1D1F',
            lineHeight: '1.8',
            a: {
              color: '#0071E3',
              '&:hover': { color: '#0077ED' },
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            },
            'h2, h3, h4': {
              fontFamily: 'Inter, -apple-system, sans-serif',
              color: '#1D1D1F',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#F5F5F7',
              borderRadius: '6px',
              padding: '2px 7px',
              fontWeight: '400',
              fontSize: '0.875em',
              color: '#0071E3',
            },
            pre: { backgroundColor: '#1D1D1F', borderRadius: '14px' },
            blockquote: {
              borderLeftColor: '#0071E3',
              color: '#6E6E73',
              fontStyle: 'normal',
            },
            img: { borderRadius: '14px' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
