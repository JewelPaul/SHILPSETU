/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        linen: '#F1EADF',
        parchment: '#E7DDCF',
        charcoal: '#161513',
        'warm-black': '#0F0E0D',
        terracotta: {
          DEFAULT: '#8C3B1E',
          light: '#A64B2A',
          dark: '#6E2E17',
        },
        forest: '#2E4033',
        indigo: '#1E2C3D',
        ochre: '#C28B38',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
