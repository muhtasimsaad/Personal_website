/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#171717',
        'secondarytheme': '#57534e',
      },
    },
  },
  plugins: [],
}