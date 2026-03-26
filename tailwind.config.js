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
          DEFAULT: '#14B8A6', // Vibrant teal — Growth/Marketing accent
          light: '#2DD4BF',
          dark: '#0D9488',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
        accent: {
          DEFAULT: '#10B981', // Fresh emerald — Teaching/Learn accent (Islamic green nod)
          light: '#34D399',
          dark: '#059669',
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
          dark: '#0F172A',
          card: '#1E293B',
          hover: '#334155',
          light: '#F8FAFC', // Soft off-white background
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
        'hero-glow': 'radial-gradient(ellipse at 50% 30%, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(20, 184, 166, 0.06) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
        'gradient-dark': 'linear-gradient(-135deg, #0F172A 0%, #020617 50%, #0F172A 100%)',
        'gradient-teal-emerald': 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
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
