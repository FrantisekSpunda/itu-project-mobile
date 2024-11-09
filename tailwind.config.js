/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.js', './app/**/*.js'], // Adjust this path based on your file structure
	theme: {
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
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['Roboto', 'serif'],
		},
		fontSize: {
			heading1: ['20px', { lineHeight: '120%', fontWeight: '500' }],
			heading2: ['18px', { lineHeight: '120%', fontWeight: '500' }],
			body1: ['12px', { lineHeight: '120%', fontWeight: '500' }],
			body2: ['10px', { lineHeight: '120%', fontWeight: '500' }],
			caption: ['8px', { lineHeight: '120%', fontWeight: '500' }],
		},
		extend: {},
	},
	plugins: [],
};
