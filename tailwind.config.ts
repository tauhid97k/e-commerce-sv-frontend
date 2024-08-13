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
        primary: {
          '300': '#4078FF',
          '200': '#5C83FF',
          '100': '#F0F1FF',
        },
        dark: {
          '300': '#202533',
          '200': '#333845',
          '100': '#E6E7E8',
        },
        light: {
          '200': '#E9E9EB',
          '100': '#F6F6F6',
        },
        muted: '#5C5F6A',
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
