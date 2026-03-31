/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── 2026 Navy + Coral Premium B2B Palette ── */
        primary: {
          DEFAULT: '#0F172A', // Navy 950 — brand foundation
          light: '#1E3A5F',   // Navy 700
          dark: '#172554',    // Navy 900
          50: '#EFF6FF',      // Navy 50
          100: '#DBEAFE',     // Navy 100
          200: '#93C5FD',     // Navy 300
          500: '#0F172A',
          600: '#172554',
          700: '#0F172A',
        },
        accent: {
          DEFAULT: '#E8634A', // Coral 500 — CTA energy
          light: '#D14F38',   // Coral 600
          dark: '#9A3412',    // Coral 800
        },
        coral: {
          50: '#FFF5F3',
          200: '#FFD5CC',
          500: '#E8634A',
          600: '#D14F38',
          800: '#9A3412',
        },
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E3A5F',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#E2E8F0',
          300: '#93C5FD',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#1E3A5F',
          800: '#172554',
          900: '#0F172A',
          950: '#0F172A',
        },
        dark: {
          950: '#020617',
          900: '#0F172A',
          800: '#172554',
          700: '#1E3A5F',
          600: '#475569',
          500: '#64748B',
        },
        surface: {
          dark: '#0F172A',
          card: '#172554',
          hover: '#1E3A5F',
          light: '#F8FAFC',
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
        heading: ['Inter', 'Clash Display', 'system-ui', 'sans-serif'],
        body: ['Inter', 'General Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 30%, rgba(232, 99, 74, 0.06) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(15, 23, 42, 0.04) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
        'gradient-dark': 'linear-gradient(-135deg, #0F172A 0%, #020617 50%, #0F172A 100%)',
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
