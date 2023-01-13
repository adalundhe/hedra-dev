/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ['Monserrat'],
        rany: ['Rany'],
        creato: ["Creato"],
        onest: ["Onest"],
        informe: ["Informe"],
        eirene: ["Eirene"],
        zacbel: ["Zacbel"],
        mexon: ["Mexon"],
        adero: ['Adero'],
        omega: ['Omega'],
        arkhip: ['Arkhip'],
        environment: ['Environment'],
        geon: ['Geon'],
        molot: ['Molot'],
        avanti: ['Avanti'],
        octarine: ['Octarine']
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
