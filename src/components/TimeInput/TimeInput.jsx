export default function TimeInput({ time, setTime, defaultValue, font }) {
	return (
		<div className="h-10 bg-customLightGray w-[140px] px-4 rounded-[10px] flex items-center justify-between">
			<input
				type="number"
				min="1"
				max="60"
				value={time}
				defaultValue={defaultValue}
				onChange={(e) => setTime(e.target.value)}
				className="bg-transparent font-bold text-sm leading-[17px] w-full h-full outline-none"
				style={{ fontFamily: font }}
			/>
			<div className="flex flex-col gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="7"
					onClick={() => {
						setTime((prev) => prev + 1);
					}}
					className="cursor-pointer opacity-25 group-hover:opacity-100 transition-all duration-300"
				>
					<path
						fill="none"
						stroke="currentColor"
						strokeOpacity="1"
						strokeWidth="2"
						d="M1 6l6-4 6 4"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="7"
					className="rotate-180 cursor-pointer opacity-25 group-hover:opacity-100 group-hover:text-darkBlue transition-all duration-300"
					onClick={() => {
						setTime((prev) => prev - 1);
					}}
				>
					<path
						fill="none"
						stroke="currentColor"
						strokeOpacity="1"
						strokeWidth="2"
						d="M1 6l6-4 6 4"
					/>
				</svg>
			</div>
		</div>
	);
}
