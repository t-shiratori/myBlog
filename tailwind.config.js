module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,jsx,ts,tsx,vue}', './components/**/*.{js,jsx,ts,tsx,vue}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Noto Sans JP', 'sans-serif'],
			},
		},
		screens: {
			tablet: '640px',
			// => @media (min-width: 640px) { ... }

			laptop: '1024px',
			// => @media (min-width: 1024px) { ... }

			desktop: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
