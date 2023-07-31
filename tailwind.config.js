/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#B196FF",
        secgray:"#333333",
        tertiary: "#EEE9D9",
        theme: "#8A2BE2",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 100px -15px #8a2be2",
        cardlow: "0px 15px 10px -10px #8a2be2"
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/5134336.jpg')",
      },
    },
  },
  plugins: [],
};
