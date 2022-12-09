/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#84587C",
        secondary: "#f56a3f",
      },
      width: {
        "1/8": "12.5%",
        "3/8": "37.5%",
      },
    },
  },
  plugins: [],
};
