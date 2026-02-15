/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Crimson Pro', 'Charter', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'roboto-mono': ['Roboto Mono', 'Courier New', 'monospace'],
      },
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        earth: {
          50: '#fef7ed',
          100: '#fde8cc',
          200: '#fbce94',
          300: '#f8ac5c',
          400: '#f58d2f',
          500: '#ec6d16',
          600: '#d14f0f',
          700: '#ad3910',
          800: '#8c2e13',
          900: '#732813',
        },
        mineral: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        smoke: {
          50: "#E6E5E7",
          100: "#D0CED3",
          200: "#A09CA6",
          300: "#74707E",
          400: "#4B4752",
          500: "#242228",
          600: "#1E1D22",
          700: "#18171B",
          800: "#121014",
          900: "#0B0A0E",
          950: "#040305"
        },
        granite: {
          50: "#f1f4f2",
          100: "#e3e8e6",
          200: "#c7d1cd",
          300: "#abbab4",
          400: "#8fa39a",
          500: "#738c81",
          600: "#5c7067",
          700: "#45544e",
          800: "#2e3834",
          900: "#171c1a",
          950: "#101412"
        },
        pyrite: {
          50: "#FDF9EF",
          100: "#FDF6E7",
          200: "#FAEAC3",
          300: "#F8E1A3",
          400: "#F7D879",
          500: "#EFCF6D",
          600: "#E3C567",
          700: "#A58F49",
          800: "#6C5D2D",
          900: "#383014",
          950: "#211B09"
        }
      },
      backgroundImage: {
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"3\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
      },
      animation: {
        'fade-in': 'fadeIn 0.1s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
