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
      },
        boxShadow: {
          'custom': '0 0 50px rgba(0, 0, 0, 0.6)'
      },
      backgroundImage: {
        'signup-bg': "url('/src/assets/signpBg1.webp')",
      },
    },
  },
  plugins: [],
}