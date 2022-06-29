/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'n-1': 'repeat(1,1fr)',
        'n-2': 'repeat(2,1fr)',
        'n-3': 'repeat(3,1fr)',
        'n-3auto': 'auto auto auto'
      },
      colors: {
        'n-black':"#333333",
        'n-white': '#F2F2F2',
        'n-red': "#EB5757",
        'n-grey': "#BDBDBD",
        'n-dark-grey' : "#4F4F4F"
      }
    },
  },
  plugins: [],
}
