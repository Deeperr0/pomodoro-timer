import { useState } from "react";
import PropTypes from "prop-types";
import TimeInput from "../TimeInput/TimeInput";
export default function Settings({ setToggleSettings }) {
	const [localPomodoro, setLocalPomodoro] = useState(
		parseInt(localStorage.getItem("localPomodoro")) || 25
	);
	const [localShortBreak, setLocalShortBreak] = useState(
		parseInt(localStorage.getItem("localShortBreak")) || 5
	);
	const [localLongBreak, setLocalLongBreak] = useState(
		parseInt(localStorage.getItem("localLongBreak")) || 15
	);
	const [localFont, setLocalFont] = useState(
		localStorage.getItem("localFont") || "Kumbh Sans"
	);
	const [localBackgroundColor, setLocalBackgroundColor] = useState(
		localStorage.getItem("localBackgroundColor") || "#0A0C1C"
	);
	function applyChanges() {
		localStorage.setItem("localPomodoro", localPomodoro);
		localStorage.setItem("localShortBreak", localShortBreak);
		localStorage.setItem("localLongBreak", localLongBreak);
		localStorage.setItem("localFont", localFont);
		localStorage.setItem("localBackgroundColor", localBackgroundColor);
		setToggleSettings((prev) => !prev);
	}
	return (
		<div className="absolute top-0 left-0 h-screen w-screen z-40 flex flex-col px-6 md:items-center md:px-0 py-12 md:py-0 md:justify-center bg-[#0A0C1C] bg-opacity-50">
			<div className="bg-white rounded-2xl group/container md:w-auto">
				<div className="flex justify-between p-6 md:px-10 md:py-8 items-center">
					<p
						className="text-veryDarkBlue text-xl font-bold font-kumbh"
						style={{ fontFamily: localFont }}
					>
						Settings
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						onClick={() => {
							setToggleSettings((prev) => !prev);
						}}
						className="cursor-pointer text-darkBlue opacity-50 group-hover/container:opacity-100 transition-all duration-300"
					>
						<path
							fill="currentColor"
							fillRule="evenodd"
							d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
							opacity="1"
						/>
					</svg>
				</div>
				<hr></hr>
				<div className="flex flex-col items-center p-6 md:px-10 gap-4">
					<p
						className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px] w-full text-center md:text-left"
						style={{ fontFamily: localFont }}
					>
						Time (Minutes)
					</p>
					<div className="flex flex-col gap-4 text-black md:flex-row w-full md:w-auto md:gap-5 md:[&_p]:w-full md:[&>div]:gap-[10px]">
						<div className="flex justify-between w-full items-center group md:flex-col ">
							<p style={{ fontFamily: localFont }}>pomodoro</p>
							<TimeInput
								time={localPomodoro}
								setTime={setLocalPomodoro}
								font={localFont}
							/>
						</div>
						<div className="flex justify-between w-full items-center group md:flex-col">
							<p style={{ fontFamily: localFont }}>short break</p>
							<TimeInput
								time={localShortBreak}
								setTime={setLocalShortBreak}
								defaultValue={localStorage.getItem("localShortBreak") || 5}
								font={localFont}
							/>
						</div>
						<div className="flex justify-between w-full items-center group md:flex-col">
							<p style={{ fontFamily: localFont }}>long break</p>
							<TimeInput
								time={localLongBreak}
								setTime={setLocalLongBreak}
								defaultValue={localStorage.getItem("localLongBreak") || 15}
								font={localFont}
							/>
						</div>
					</div>
				</div>
				<hr className="mx-6"></hr>
				<div className="flex flex-col items-center p-6 md:px-10 md:flex-row md:justify-between">
					<p
						className="text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase"
						style={{ fontFamily: localFont }}
					>
						Font
					</p>
					<div className="mt-[18px] [&_button]:rounded-full [&_button]:aspect-square [&_button]:w-10 [&_button]:h-10 flex gap-3 items-center md:mt-0">
						<div className="p-[5px] rounded-full border border-transparent hover:border-customLightGray transition-colors duration-300 ease-in">
							<button
								className={`font-kumbh ${
									localFont === "Kumbh Sans"
										? "text-white bg-veryDarkBlue"
										: "text-darkBlue bg-customLightGray"
								} font-bold`}
								onClick={() => setLocalFont("Kumbh Sans")}
							>
								Aa
							</button>
						</div>
						<div className="p-[5px] rounded-full hover:border hover:border-customLightGray transition-colors duration-300 ease-in">
							<button
								className={`font-roboto ${
									localFont === "Roboto Slab"
										? "text-white bg-veryDarkBlue"
										: "text-darkBlue bg-customLightGray"
								} font-bold`}
								onClick={() => setLocalFont("Roboto Slab")}
							>
								Aa
							</button>
						</div>
						<div className="p-[5px] rounded-full hover:border hover:border-customLightGray transition-colors duration-300 ease-in">
							<button
								className={`font-spaceMono ${
									localFont === "Space Mono"
										? "text-white bg-veryDarkBlue"
										: "text-darkBlue bg-customLightGray"
								} font-bold`}
								onClick={() => setLocalFont("Space Mono")}
							>
								Aa
							</button>
						</div>
					</div>
				</div>
				<hr className="mx-6"></hr>
				<div className="flex flex-col items-center p-6 md:px-10 md:flex-row md:justify-between pb-0">
					<p
						className="text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase"
						style={{ fontFamily: localFont }}
					>
						Color
					</p>
					<div className="mt-[18px] [&>button]:rounded-full [&>button]:aspect-square [&>button]:w-10 [&>button]:h-10 flex gap-4 md:mt-0 items-center">
						<button
							className="bg-customRed flex justify-center items-center"
							onClick={() => setLocalBackgroundColor("#f87070")}
						>
							{localBackgroundColor === "#f87070" && (
								<svg
									width="15"
									height="11"
									viewBox="0 0 15 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5.5L4.95263 9.45263L13.4053 1"
										stroke="#161932"
										strokeWidth="2"
									/>
								</svg>
							)}
						</button>
						<button
							className=" bg-customCyan flex justify-center items-center"
							onClick={() => setLocalBackgroundColor("#70f3f8")}
						>
							{localBackgroundColor === "#70f3f8" && (
								<svg
									width="15"
									height="11"
									viewBox="0 0 15 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5.5L4.95263 9.45263L13.4053 1"
										stroke="#161932"
										strokeWidth="2"
									/>
								</svg>
							)}
						</button>
						<button
							className=" bg-customPurple flex justify-center items-center"
							onClick={() => setLocalBackgroundColor("#d881f8")}
						>
							{localBackgroundColor === "#d881f8" && (
								<svg
									width="15"
									height="11"
									viewBox="0 0 15 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 5.5L4.95263 9.45263L13.4053 1"
										stroke="#161932"
										strokeWidth="2"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
				<div className="flex justify-center w-full">
					<button
						className="relative py-[18px] px-12 bg-customRed rounded-full top-8 font-bold leading-tight hover:brightness-125"
						style={{ fontFamily: localFont }}
						onClick={() => {
							applyChanges();
						}}
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
}
Settings.propTypes = {
	setToggleSettings: PropTypes.func,
};
