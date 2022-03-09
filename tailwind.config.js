module.exports = {
  content: [
    "./src/**/*.svelte",
  ],
  theme: {
    extend: {
      colors:{
        'app-teal': {
          300:'#C5EAF5',
          400:'#C5EAE3',
          500:'#66A2AD',
        },
        'ocean': '#22699C',
        'question-heading': '#624D4D',
        'summer': {
          'primary': '',
          'secondary': '',
        }
      }
    },
  },
  plugins: [],
}
