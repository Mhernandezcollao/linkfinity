/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        skycustom: 'rgba(101, 211, 241, 1)', // '#65D3F1' celeste cielo
        darkblue: 'rgba(5, 23, 49, 1)', // o '#051731' azul oscuro
        royalDark: 'rgba(46, 76, 183, 1)', // o #2E4CB7 azul
        graylight: '#909DAC', //gris claro
        bgcustom: 'rgba(249, 249, 249, 1)', // o #2E4CB7 azul
        bginput: 'rgba(245, 247, 253, 1)', 
      },
      screens: {
        'xxs': '380px',
        'my': '1180px',
      },
    },
  },
  darkMode: "class",
  plugins: []
}

