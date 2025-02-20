/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  
  theme: {
    extend: {
      screens: {
        '2xl': { max: '1900px' },
        xl: { max: '1279px' },
        lg: { max: '1121px' },
        sm: { max: '1121px' },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        mainBg: 'rgba(16, 16, 16, 1)',
        lightBg: 'rgba(34, 34, 34, 1)',
        onBg: '#1A1A1A',
        lightGray: '#f8f8f8',
        white: '#ffffff',
        'black-100': 'rgba(0, 0, 0, 0.10)',
        'black-200': 'rgba(0, 0, 0, 0.20)',
        'black-300': 'rgba(0, 0, 0, 0.30)',
        'black-400': 'rgba(0, 0, 0, 0.40)',
        'black-500': 'rgba(0, 0, 0, 0.50)',
        'black-600': 'rgba(0, 0, 0, 0.60)',
        'black-700': 'rgba(0, 0, 0, 0.70)',
        'black-800': 'rgba(0, 0, 0, 0.80)',
        'black-900': 'rgba(0, 0, 0, 0.90)',
        'white-50': 'rgba(255,255,255,.0)',
        'white-100': 'rgba(255,255,255,.1)',
        'white-200': 'rgba(255,255,255,.2)',
        'white-300': 'rgba(255,255,255,.3)',
        'white-400': 'rgba(255,255,255,.4)',
        'white-500': 'rgba(255,255,255,.5)',
        'white-600': 'rgba(255,255,255,.6)',
        'white-700': 'rgba(255,255,255,.7)',
        'white-800': 'rgba(255,255,255,.8)',
      }
    },
   
    
  },
  plugins: [
    require('daisyui'),
  ],
}

