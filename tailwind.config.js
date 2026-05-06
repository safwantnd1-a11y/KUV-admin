/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#002e1c',
        'primary-light': '#14452f',
        'primary-dim': '#39684f',
        secondary: '#735c00',
        'secondary-gold': '#fed65b',
        'secondary-gold-dim': '#e9c349',
        'on-primary': '#ffffff',
        'surface': '#f9f9f9',
        'surface-low': '#f3f3f3',
        'surface-container': '#eeeeee',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#414943',
        'outline': '#717973',
        'outline-variant': '#c0c9c1',
        'inverse-surface': '#2f3131',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '700' }],
      },
      spacing: {
        'section': '128px',
        'gutter': '32px',
        'edge': '64px',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
