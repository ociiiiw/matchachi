/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage:   { 50:'#f4faf4', 100:'#e6f4e6', 200:'#c8e6c8', 300:'#a3d4a3', 400:'#74bc74', 500:'#4ea04e', 600:'#3a7d3a' },
        mint:   { 100:'#e8f8f0', 200:'#c5eedd', 300:'#8adab8', 400:'#4dc496' },
        blush:  { 50:'#fff5f8', 100:'#ffe4ed', 200:'#ffcadd', 300:'#ffa4c2', 400:'#ff7aaa', 500:'#f54d8a' },
        cream:  { DEFAULT:'#fffdf7', 100:'#fdf6e7', 200:'#f8ecd0' },
        matcha: { light:'#d4edda', mid:'#8fbf8f', dark:'#4a7c59' },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float:   'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        fadeUp:  'fadeUp 0.6s ease both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
