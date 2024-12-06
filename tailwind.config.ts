/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './app/**/*.js'], // Adjust this path based on your file structure
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto', 'serif'],
    },
    fontSize: {
      title: ['26px', { lineHeight: '120%', fontWeight: '900' }],
      heading1: ['22px', { lineHeight: '120%', fontWeight: '900' }],
      heading2: ['20px', { lineHeight: '120%', fontWeight: '500' }],
      body1: ['14px', { lineHeight: '120%', fontWeight: '500' }],
      body2: ['12px', { lineHeight: '120%', fontWeight: '500' }],
      caption: ['10px', { lineHeight: '120%', fontWeight: '500' }],
    },
    extend: {
      colors: {
        black: '#393939',
        white: '#FFFFFF',
        primary: '#B382D8',
        green: '#07990C',
        red: '#EB5B5B',
        gray: '#ABABAB',
        background: '#F4F4F4',
        lightGray: '#EAEAEA',
        secondary: '#7A5795',
        blue: '#2183F2',
        lightBlue: '#94D6FF',
      },
    },
  },
  plugins: [],
}
