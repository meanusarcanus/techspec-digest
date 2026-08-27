/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0B0F19',
          deep: '#070A12',
          indigo: '#1E1B4B',
          violet: '#312E81',
          accent: '#7C3AED',
          gold: '#F59E0B',
          'gold-light': '#FBBF24',
          'gold-dark': '#D97706',
          slate: '#1E293B',
          card: 'rgba(15, 23, 42, 0.65)',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'indigo-glow': '0 0 35px -5px rgba(99, 102, 241, 0.25)',
        'cosmic-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.2))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.6))' },
        },
      },
    },
  },
  plugins: [],
}
