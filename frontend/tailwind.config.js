/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
    colors: {
      primaryblue: '#19AFFF',
      secondarygray: '#D9D9D9',
    },
    },
  },
  plugins: [],
  }