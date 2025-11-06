/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', "[data-theme='dark']"],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      colors: {
        'apple-gray': {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#86868b',
          500: '#6e6e73',
          600: '#515154',
          700: '#424245',
          800: '#1d1d1f',
          900: '#000000',
        },
        'apple-blue': {
          50: '#e1f5fe',
          100: '#b3e5fc',
          500: '#007aff',
          600: '#0051d4',
          700: '#003d99',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          background: 'var(--glass)',
          'backdrop-filter': 'blur(var(--blur-lg))',
          '-webkit-backdrop-filter': 'blur(var(--blur-lg))',
          border: '1px solid var(--glass-border)',
        },
        '.glass-elevated': {
          background: 'var(--surface-elevated)',
          'backdrop-filter': 'blur(var(--blur-xl))',
          '-webkit-backdrop-filter': 'blur(var(--blur-xl))',
          border: '1px solid var(--glass-border)',
          'box-shadow': 'var(--shadow-xl)',
        },
        '.btn-primary': {
          '@apply bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transform transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95': {},
          background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 80%, #000))',
        },
        '.btn-secondary': {
          '@apply glass text-foreground px-6 py-3 rounded-lg font-medium transform transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95': {},
        },
        '.card-apple': {
          '@apply glass rounded-2xl p-6 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl': {},
        },
        '.scroll-reveal': {
          opacity: '0',
          transform: 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        },
        '.scroll-reveal.revealed': {
          opacity: '1',
          transform: 'translateY(0)',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, #ff6b6b))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-hero': {
          background: 'linear-gradient(135deg, var(--foreground), var(--primary))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.focus-apple': {
          '@apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50': {},
          transition: 'all 0.2s ease-out',
        },
        '.loading-shimmer': {
          background: 'linear-gradient(90deg, var(--muted) 25%, var(--accent) 50%, var(--muted) 75%)',
          'background-size': '200% 100%',
          animation: 'shimmer 2s infinite',
        },
        '.text-display-large': {
          '@apply text-4xl md:text-6xl lg:text-7xl xl:text-8xl': {},
          'font-weight': '700',
          'line-height': '0.9',
          'letter-spacing': '-0.04em',
        },
        '.text-display-medium': {
          '@apply text-3xl md:text-4xl lg:text-5xl xl:text-6xl': {},
          'font-weight': '600',
          'line-height': '1',
          'letter-spacing': '-0.03em',
        },
        '.text-display-small': {
          '@apply text-2xl md:text-3xl lg:text-4xl': {},
          'font-weight': '600',
          'line-height': '1.1',
          'letter-spacing': '-0.02em',
        },
        '.text-headline': {
          '@apply text-xl md:text-2xl lg:text-3xl': {},
          'font-weight': '500',
          'line-height': '1.2',
          'letter-spacing': '-0.01em',
        },
        '.text-body-large': {
          '@apply text-base md:text-lg': {},
          'font-weight': '400',
          'line-height': '1.6',
        },
        '.text-body': {
          '@apply text-sm md:text-base': {},
          'font-weight': '400',
          'line-height': '1.5',
        },
        '.section-padding': {
          '@apply py-16 md:py-24 lg:py-32': {},
        },
        '.container-apple': {
          '@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
        },
        '.scroll-offset': {
          'scroll-margin-top': '80px',
        },
      });
    },
  ],
};
