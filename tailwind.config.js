/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode variant
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1F2937', // Dark mode background color
          // Add more dark mode color definitions as needed
        },
      },
    },
  },
  plugins: [],
}