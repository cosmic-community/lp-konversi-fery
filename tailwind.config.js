/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f1f6f3',
          100: '#dcebe1',
          200: '#bad7c5',
          300: '#8dbb9f',
          400: '#5d9976',
          500: '#3d7c59',
          600: '#2c6246',
          700: '#234e39',
          800: '#1c3e2e',
          900: '#163327',
          950: '#0b1c16',
        },
        coffee: {
          50: '#faf6f2',
          100: '#f2e9e0',
          200: '#e3d0bf',
          300: '#cfaf95',
          400: '#b98a6a',
          500: '#a97250',
          600: '#8d5b41',
          700: '#734837',
          800: '#5d3b30',
          900: '#4c3229',
          950: '#291a15',
        },
        gold: {
          50: '#fdfaef',
          100: '#faf2d3',
          200: '#f4e3a5',
          300: '#eccd6d',
          400: '#e3b542',
          500: '#c99a2b',
          600: '#ab7822',
          700: '#88591f',
          800: '#714720',
          900: '#603b1f',
        },
        cream: '#FDFBF7',
        beige: '#F6F1E8',
        ink: '#1B211E',
        muted: '#5F6B64',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'ui-serif', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(27, 33, 30, 0.04), 0 12px 32px rgba(27, 33, 30, 0.06)',
        lift: '0 4px 12px rgba(27, 33, 30, 0.06), 0 20px 48px rgba(27, 33, 30, 0.10)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 300ms ease-out both',
        'scale-in': 'scale-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },
    },
  },
  plugins: [],
}