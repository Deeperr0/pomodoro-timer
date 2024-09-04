export default function ModeButton({
	mode,
	setMode,
	modeName,
	backgroundColor,
}) {
	return (
		<button
			onClick={() => {
				setMode(modeName);
			}}
			className={`px-6 py-4 text-xs font-bold rounded-full ${
				mode === modeName ? "text-darkBlue" : "text-customGray"
			}`}
			style={{
				backgroundColor: mode === modeName ? backgroundColor : "transparent",
			}}
		>
			{modeName}
		</button>
	);
}
