/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mainPurple: "hsl(242, 48%, 58%)",
        mainPurpleHover: "hsl(243, 100%, 82%)",
        black: "hsl(237, 100%, 4%)",
        darkBG: "hsl(235, 16%, 15%)",
        darkGrey: "hsl(235, 12%, 19%)",
        linesDark: "hsl(236, 11%, 27%)",
        mediumGrey: "hsl(216, 15%, 57%)",
        linesLight: "hsl(221, 69%, 94%)",
        lightBG: "hsl(220, 69%, 97%)",
        white: "hsl(0, 0%, 100%)",
        red: "hsl(0, 78%, 63%)",
        redHover: "hsl(0, 100%, 80%)",
        blueDot: "hsl(193, 75%, 59%)",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        "drop-shadow": "0 4px 6px 0 rgba(54, 78, 126, 0.10)",
      },
    },
  },
  plugins: [],
};
