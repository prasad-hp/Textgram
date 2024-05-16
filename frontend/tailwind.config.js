/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      width: {
        "450": "32rem",
        "475":  "36rem",
        "425":  "28rem",
        "412": "412px"
      }
    },
  },
  plugins: [],
}