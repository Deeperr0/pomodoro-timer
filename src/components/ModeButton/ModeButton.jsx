import PropTypes from "prop-types";
export default function ModeButton({
	mode,
	setMode,
	modeName,
	backgroundColor,
	font,
	setStatus,
}) {
	return (
		<button
			onClick={() => {
				setMode(modeName);
				localStorage.setItem("mode", modeName);
				localStorage.setItem("status", "stopped");
				setStatus("stopped");
			}}
			className={`px-6 py-4 text-xs md:text-sm font-bold rounded-full ${
				mode === modeName
					? "text-darkBlue"
					: "text-customGray opacity-40 hover:opacity-100 transition-all duration-300"
			}`}
			style={{
				backgroundColor: mode === modeName ? backgroundColor : "transparent",
				fontFamily: font,
			}}
		>
			{modeName}
		</button>
	);
}
ModeButton.propTypes = {
	mode: PropTypes.string,
	setMode: PropTypes.func,
	modeName: PropTypes.string,
	backgroundColor: PropTypes.string,
	font: PropTypes.string,
};
