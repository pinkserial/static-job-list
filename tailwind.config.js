/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-header": "url('/images/bg-header-mobile.svg')",
        "desktop-header": "url('/images/bg-header-desktop.svg')",
      },
    },
  },
  plugins: [],
};
