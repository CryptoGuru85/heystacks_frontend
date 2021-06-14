module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-text': '#E36132',
        'footer-icon':'#0D727E',
        'default': 'rgba(0,0,0,.85)',
        'lightergrey': 'rgba(0,0,0,.54)',
        'lightgrey': '#d3d3d3',
        'grey': '#808080',
        'darken-green': '#074246',
        'lightgray': '#cecece'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
