/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				darkBlue: "#1E213F",
				veryDarkBlue: "#161932",
				customCyan: "#70F3F8",
				customRed: "#F87070",
				customPurple: "#D881F8",
				customGray: "#D7E0FF",
				customLightGray: "#EFF1FA",
			},
			fontFamily: {
				spaceMono: ["Space Mono", "monospace"],
				kumbh: ["Kumbh Sans", "sans-serif"],
				roboto: ["Roboto Slab", "serif"],
			},
			gradientColorStops: {
				"gradient-1": "#2E325A 0%, #0E112A 100%",
			},
			boxShadow: {
				shadow1: "-50px -50px 100px 0px #272C5A",
				shadow2: "50px 50px 100px 0px #121530",
			},
		},
	},
	plugins: [],
};
