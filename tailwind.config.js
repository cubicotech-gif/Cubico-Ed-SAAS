/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C3AED',
        'primary-light': '#8B5CF6',
        'primary-dark': '#5B21B6',
        accent: '#00D4FF',
        dark: {
          900: '#0A0A1A',
          800: '#0F0F2E',
          700: '#161640',
          600: '#1E1E50',
          500: '#2A2A5A',
        },
        surface: {
          dark: '#12122B',
          card: '#1A1A3E',
          hover: '#222255',
        }
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        body: ['General Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(108, 58, 237, 0.25) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(108, 58, 237, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
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
    },
  },
  plugins: [],
};
