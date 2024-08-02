import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        muted: '#9ca3af',
        light: '#f3f4f6',
        lighter: '#f9fafb',
        dark: '#374151',
        darker: '#1f2937',
      },
      keyframes: {
        'collapsible-expand': {
          from: { height: '0px' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-collapse': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'collapsible-expand': 'collapsible-expand 0.2s ease-out',
        'collapsible-collapse': 'collapsible-collapse 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
