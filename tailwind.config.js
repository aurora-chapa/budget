/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: ["ui-sans-serif", "system-ui"],
      secondary: ["Alata", "sans-serif"],
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "1023px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      primary: "#fcba03",
      primarystrong: "#d49b00",
      accent: "#00aeff",
      accentstrong: "#007cb5",
      black: "#000000",
      600: "#4d4d4d",
      500: "#919191",
      400: "#bababa",
      200: "#ededed",
      100: "#f5f5f6",
      white: "#ffffff",
      darkone: "#242533",
      darktwo: "#333343",
      darktext: "#aca5ed",
      darktexttwo: "#8486aa",
      errorLtOne: "#ff9797",
      errorLtTwo: "#6b2020",
      errorDkOne: "#894646",
      errorDkTwo: "#ffebeb",
      warningText: "#f36363",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      none: "none",
      line: "2px 2px 0 0 rgb(000)",
    },
    spacing: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      hg: "60px",
    },
  },
};
