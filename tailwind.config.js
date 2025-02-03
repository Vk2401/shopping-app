/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#459132", 
        buttonColor:'#61AD4E',
        redColor:'#FF2A2A',
        lightBlack:'#666666',
        lightWhite:'#FFFFFF',
        ligghtGray:'#F5F5F5'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

