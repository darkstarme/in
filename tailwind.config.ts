/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        surface: '#1E293B',
        backdrop: 'rgba(0,0,0,0.7)'
      }
    }
  },
  plugins: []
};