/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../index.html', '../email/signature.html'],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        primaryHover: '#059669',
        dark: '#0f172a',
        card: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
}
