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
          DEFAULT: '#0D7C6B', // Deep sage — premium, desaturated
          light: '#3BA697',
          dark: '#0A6558',
          50: '#F5F7F5',
          100: '#E0EFEB',
          200: '#B8D8CF',
          500: '#0D7C6B',
          600: '#0A6558',
          700: '#085249',
        },
        accent: {
          DEFAULT: '#0F8C7F', // Muted teal — Teaching/Learn accent
          light: '#2EA894',
          dark: '#0A6E64',
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
          light: '#FAFAF7', // Warm cream background
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
        'hero-glow': 'radial-gradient(ellipse at 50% 30%, rgba(13, 124, 107, 0.10) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(13, 124, 107, 0.05) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, #0D7C6B 0%, #0F8C7F 100%)',
        'gradient-dark': 'linear-gradient(-135deg, #0F172A 0%, #020617 50%, #0F172A 100%)',
        'gradient-teal-emerald': 'linear-gradient(135deg, #0D7C6B 0%, #0F8C7F 100%)',
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
