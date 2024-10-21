/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				light: '#FFFFFF',
				dark: '#1B1F27',
				slate: '#7B797B',
				darkvariant: '#2F3037',
				cream: '#FFF8EF',
				emerald: '#207A49',
				lime: '#D1BE17',
				pink: '#D72C5E',
				orange: '#BC5F19',
				orangevariant: '#FE923F',
				yellow: '#D29821'
			},
			fontFamily: {
				header: ['Anonymous Pro', 'sans-serif'],
				sans: ['Golos Text', 'sans-serif']
			},
			dropShadow: {
				glow: {
					emrald: ['0 0px 20px #207A49', '0 0px 65px #207A49']
				}
			}
		}
	},
	plugins: []
};
