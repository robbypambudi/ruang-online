/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-poppins)', ...fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      colors: {
        success: {
          100: '#E9FCE8',
          200: '#C7FACA',
          300: '#98EDA5',
          400: '#71D98B',
          500: '#37B965',
          600: '#289F5E',
          700: '#1B8555',
          800: '#116B4B',
          900: '#455A32',
          1000: '#2E3C21',
        },
        critical: {
          100: '#FEF1F1',
          200: '#FED8D6',
          300: '#FBA59F',
          400: '#F97F73',
          500: '#F05151',
          600: '#D84949',
          700: '#CC4545',
          800: '#74252C',
          900: '#6C2527',
          1000: '48191A',
        },
        warning: {
          100: '#FFFAD9',
          200: '#FFF4B5',
          300: '#FFEB88',
          400: '#FFDC3F',
          500: '#FFCC00',
          600: '#DBAA00',
          700: '#B78B00',
          800: '#7C5C00',
          900: '#7F5900',
          1000: '#553B00',
        },
        orange: {
          100: '#FDE1CE',
          200: '#FCC29C',
          300: '#FAA46B',
          400: '#F8863A',
          500: '#E36008',
          600: '#C55307',
          700: '#943E05',
          800: '#632903',
          900: '#311502',
        },
        purple: {
          50: '#F0EBF9',
          100: '#E2D8F3',
          200: '#C5B1E7',
          300: '#A889DC',
          400: '#8A62D0',
          500: '#502B8F',
          600: '#572F9D',
          700: '#422376',
          800: '#2C184E',
          900: '#160C27',
          950: '#0B0614',
        },
        typo: {
          DEFAULT: '#1F201D',
          secondary: '#5A5D56',
          tertiary: '#989898',
          icons: '#878787',
          tag: '#E9E9E9',
        },
        primary: {
          100: '#F1F1FE',
          200: '#DFDFFD',
          300: '#C0C0FC',
          400: '#8685F2',
          500: '#5F5EEA',
          600: '#5555D3',
          700: '#504FC5',
          800: '#3F3EAD',
        },
        outline: {
          DEFAULT: '#E6E6E5',
          base: '#D3D6CC',
          button: '#BCBCBC',
        },
        surface: {
          background: '#EFF0EA',
          base: '#FBFAF8',
          card: '#FFFFFF',
          textfield: '#F1F1ED',
          hover: '#F3F3F1',
          pressed: '#E9EBE2',
        },

        dark: '#222222',
        light: '#F5F5F5',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};
