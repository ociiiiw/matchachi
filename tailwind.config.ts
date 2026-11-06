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
        // MatchaChi brand palette
        matcha: {
          50:  '#f0faf0',
          100: '#d6f5d6',
          200: '#aeeaae',
          300: '#76d576',
          400: '#4abf4a',
          500: '#2ea62e',
          600: '#228522',
          700: '#1b6a1b',
          800: '#175417',
          900: '#124512',
        },
        sakura: {
          50:  '#fff0f5',
          100: '#ffd6e7',
          200: '#ffadd0',
          300: '#ff80b5',
          400: '#f75995',
          500: '#e83878',
          600: '#c91f5e',
          700: '#a31449',
          800: '#840e38',
          900: '#6b0a2d',
        },
        cream: '#fdf8f0',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
