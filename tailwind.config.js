/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5a00f0',
          light: '#7c3aed',
          dark: '#4400b8',
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          500: '#5a00f0',
          600: '#4c00d0',
          700: '#3b0098',
        },
        accent: {
          DEFAULT: '#00b783',
          light: '#03ec8f',
          dark: '#009e6f',
        },
        dark: {
          950: '#030014',
          900: '#0a0520',
          800: '#100830',
          700: '#1a0e45',
          600: '#241555',
          500: '#2e1c65',
        },
        surface: {
          dark: '#0d0728',
          card: '#150d3a',
          hover: '#1e1450',
          light: '#f8f9fc',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        body: ['General Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 30%, rgba(90, 0, 240, 0.15) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(90, 0, 240, 0.08) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #5a00f0 0%, #00b783 100%)',
        'gradient-dark': 'linear-gradient(-135deg, #1e0046 0%, #030014 50%, #001a12 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
