/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c3e50',
          dark: '#1a252f',
        },
        secondary: '#ecf0f1',
        accent: {
          DEFAULT: '#e67e22',
          hover: '#d35400',
        },
        'accent-secondary': {
          DEFAULT: '#3498db',
          hover: '#2980b9',
        },
        text: {
          DEFAULT: '#34495e',
          light: '#7f8c8d',
        },
        site-bg: '#ffffff',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
