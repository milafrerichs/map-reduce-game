const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.svelte"],
  safelist: [
    "bg-gradient-summer",
    "bg-gradient-spring",
    "bg-gradient-winter",
    "bg-gradient-fall",
  ],
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
        ocean: "#22699C",
      },
      backgroundImage: {
        "gradient-spring":
          "linear-gradient(180deg, #BCDAFC 0%, #A1CFF3 48.93%, #68ACE1 100%)",
        "gradient-summer":
          "linear-gradient(180deg, #BD8CD0 0%, #F19183 48.93%, #FFC975 100%)",
        "gradient-winter":
          "linear-gradient(180deg, #3956A4 0%, #587BBA 48.93%, #7990C1 100%)",
        "gradient-fall":
          "linear-gradient(180deg, rgba(217,221,228,1) 0%, rgba(243,199,181,1) 43%, rgba(251,181,147,1) 100%)",
        "gradient-morning":
          "linear-gradient(180deg, #BD8CD0 0%, #D9DDE4 0%, #F3C7B5 48.93%, #FBB593 100%);",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("first-child", "& > :first-child");
      addVariant("last-child", "& > :last-child");
      addVariant("children", "& > *");
      // we need these for the tables with border radius to avoid artifacts, see: https://stackoverflow.com/questions/4094126/how-to-add-border-radius-on-table-row
      addVariant("even-children", "&:nth-child(even) > *");
      addVariant("odd-children", "&:nth-child(odd) > *");
    }),
  ],
};
