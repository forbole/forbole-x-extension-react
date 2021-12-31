const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    // define custom color
    extend: {
      colors: {
        backgroundColor: {
          100: "#F7F7F7",
        },
        font: {
          1: "#E6E6E6",
          2: "#9D9D9D",
        },
        icon: {
          light: "#8B8B8B",
          dark: "#AFAFAF",
        },
      },
    },

    // define color mapping
    nightwind: {
      colors: {
        backgroundColor: {
          100: "#1D1E22",
        },
        font: {
          1: "#000000",
          2: "#646464",
        },
      },
    },
  },
  plugins: [require("nightwind")],
};
