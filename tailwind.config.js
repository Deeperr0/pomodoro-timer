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
		},
	},
	plugins: [],
};
