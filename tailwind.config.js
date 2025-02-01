/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#459132", 
        buttonColor:'#61AD4E'
      },
    },
  },
  plugins: [],
}

