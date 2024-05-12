import defaultTheme from 'tailwindcss/defaultTheme'
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        patrickhand: ['"Patrick Hand"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#F9A8D4",
              foreground: "#000000",
            },
            focus: "#F472B6",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#F9A8D4",
              foreground: "#000000",
            },
            focus: "#F472B6",
          },
        },
      },
    }),
  ],
}

