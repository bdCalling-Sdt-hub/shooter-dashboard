/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "bg-gradient-to-r from-red-500 to-red-800",
        secondary: "#ffffff",
        btn: "bg-gradient-to-r from-red-500 to-red-800",
        bgColor: "#111111C4",
      },
    },
  },
  plugins: [],
}

