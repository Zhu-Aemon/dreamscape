/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue, js, ts, jsx, tsx}',
  ],
  theme: {
    extend:
      {
        fontFamily: {
          'Bruno-Ace': ['Bruno Ace', 'sans-serif']
        },
      },
  },
  plugins: [],
}

