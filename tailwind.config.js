const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        bamboo: ["DK-Black-Bamboo", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "app-teal": {
          300: "#C5EAF5",
          400: "#C5EAE3",
          500: "#66A2AD",
        },
        "app-blue": {
          900: "#001C4B",
          700: "#3B4F76",
        },
        "question-heading": "#624D4D",
      },
      backgroundImage: {
        "gradient-sky":
          "linear-gradient(180deg, #BCDAFC 0%, #A1CFF3 48.93%, #68ACE1 100%)",
        "gradient-sunset":
          "linear-gradient(180deg, #BD8CD0 0%, #F19183 48.93%, #FFC975 100%)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("first-child", "& > :first-child");
      addVariant("last-child", "& > :last-child");
      addVariant("children", "& > *");
    }),
  ],
};
