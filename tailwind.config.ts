/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    screens: {
      sm: '640px',
      md: '960px',
      lg: '1174px',
      xl: '1380px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily: {
        raceSports: ['var(--font-race-sports)'],
        poppins: ['var(--font-poppins)'],
        styrene: ['var(--font-styrene)'],
        proximaNova: ['var(--font-proxima-nova)'],
      },
      animation: {
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fill-divider': 'fill-divider 1s linear infinite',
        'slide-in-right': 'slide-in-right .3s ease-in-out 1',
        'slide-in-left': 'slide-in-left .3s ease-in-out 1',
        'slide-in-left-card': 'slide-in-left 1s ease-in-out 1',
        'zoom-in-desktop': 'zoom-in-desktop .4s ease-in-out 1',
        'zoom-in-desktop-modal': 'zoom-in-desktop-modal .4s ease 1',
        'zoom-in-mobile': 'zoom-in-mobile .4s ease-in-out 1',
        'pulse-two-colors': 'pulse-two-colors 0.6s infinite',
      },
      keyframes: {
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        // Deposit divider
        'fill-divider': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
        // Modal
        'slide-in-right': {
          '0%': {
            translate: '100%',
          },
          '100%': {
            translate: '0%',
          },
        },
        'slide-in-left': {
          '0%': {
            translate: '-100%',
          },
          '100%': {
            translate: '0%',
          },
        },
        // Tutorial video text
        'pulse-two-colors': {
          '0%, 100%': {
            color: '#FFF',
          },
          '50%': {
            color: 'transparent',
          },
        },
        // bonus modal
        'zoom-in-desktop': {
          '0%': {
            transform: 'scale(1.4)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'zoom-in-mobile': {
          '0%': {
            transform: 'scale(1.2, 1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        // modal
        'zoom-in-desktop-modal': {
          '0%': {
            transform: 'scaleX(1.5) scaleY(1.5)',
          },
          '100%': {
            transform: 'scaleX(1) scaleY(1)',
          },
        },
      },
      colors: {
        yellow: {
          400: '#FFD800',
          500: '#F8C237',
        },
        black: {
          300: '#1E2326',
          400: '#121212',
          450: '#1C1E22',
          500: '#282937',
          550: '#2B2F35',
          600: '#353645',
          650: '#1B1F23',
          700: '#111315',
          750: '#15191C',
          800: '#0E0F23',
          850: '#131418',
          900: '#000000',
        },
        gray: {
          150: '#EAEAEB',
          200: '#F5F5F6',
          300: '#B8B8B8',
          350: '#B9B9B4',
          400: '#E9E9EC',
          450: '#78848F',
          500: '#707070',
          600: '#D9D9D9',
          650: '#9598A7',
          700: '#F7F7F7',
          800: '#F1F1F1',
        },
        blue: {
          300: '#8FD2ED',
        },
      },
      fontSize: {
        tiny: '0.5rem',
        caption: '0.625rem',
      },
    },
  },
};
