  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust based on your folders
      "./public/index.html",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
        },
        colors: {
          primary: '#08a7f8',
        },
      },
    },
    plugins: [],
  }

