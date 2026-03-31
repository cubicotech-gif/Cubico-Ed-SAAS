/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── 2026 Premium Warm EdTech Palette ── */
        primary: {
          DEFAULT: '#0A6B5C', // Deep forest sage — darker premium tone
          light: '#2E8F7E',
          dark: '#085248',
          50: '#F2F5F3',
          100: '#D6E6E0',
          200: '#A8CCC0',
          500: '#0A6B5C',
          600: '#085248',
          700: '#06403A',
        },
        accent: {
          DEFAULT: '#0C7A6E', // Deep teal — darker accent
          light: '#278F80',
          dark: '#085F56',
        },
        navy: {
          DEFAULT: '#0F172A', // Deep navy — primary text
          light: '#1E293B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B', // Slate neutral
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        dark: {
          950: '#020617',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
        },
        surface: {
          dark: '#0B1220',
          card: '#1A2536',
          hover: '#2D3A4D',
          light: '#F7F7F3', // Warm parchment background
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
        'hero-glow': 'radial-gradient(ellipse at 50% 30%, rgba(10, 107, 92, 0.08) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(10, 107, 92, 0.04) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #0A6B5C 0%, #0C7A6E 100%)',
        'gradient-dark': 'linear-gradient(-135deg, #0B1220 0%, #020612 50%, #0B1220 100%)',
        'gradient-teal-emerald': 'linear-gradient(135deg, #0A6B5C 0%, #0C7A6E 100%)',
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
