/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#58CC02',
        primaryDark: '#46A302',
        danger: '#FF4B4B',
        warning: '#FFC800',
        info: '#1CB0F6',
        success: '#58CC02',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
