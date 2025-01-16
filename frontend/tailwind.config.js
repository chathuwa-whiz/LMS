/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#F4F4F4",
        primary2: "#D4BEE4",
        primary3: "#9B7EBD",
        primary4: "#3B1E54",
      }
    },
  },
  plugins: [],
}