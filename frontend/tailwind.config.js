/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      width: {
        "450": "32rem"
      }
    },
  },
  plugins: [],
}