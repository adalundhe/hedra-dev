/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ['Monserrat'],
        rany: ['Rany']
      },
      boxShadow: {
        top: '0px -2px 0px rgba(0, 0, 0, 0.3);'
      },
      transitionProperty: {
        height: 'height'
      }
    },
  },
  plugins: [],
};
