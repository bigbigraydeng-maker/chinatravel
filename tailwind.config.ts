/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B61E2E',
        secondary: '#D6A756',
        accent: '#1F2937',
        light: '#F8F6F2',
        dark: '#1F2937',
        white: '#FFFFFF',
        warm: {
          50: '#FFF9F5',
          100: '#FFF3EB',
          200: '#FFE8D6',
          300: '#FFD4B0',
          400: '#E8C9A0',
          500: '#D6A756',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(214, 167, 86, 0.15)',
        'warm-lg': '0 8px 40px rgba(214, 167, 86, 0.2)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 4px 25px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
