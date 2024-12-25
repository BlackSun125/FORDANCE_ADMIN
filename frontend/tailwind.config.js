/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        raleway: 'Raleway, sans-serif',
        roboto: 'Roboto, sans-serif',
        nunito: 'Nunito, sans-serif',
        inter: 'Inter, sans-serif'
      },
      colors: {
        'app-primary-color': '#5a8dff', 
      }
    },
  },
  plugins: [
    daisyui,
  ],
}