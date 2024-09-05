import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import parseTime from "../../utils/parseTime";

export default function Timer({
	timerValue,
	remainingTime,
	setRemainingTime,
	status,
	setStatus,
	backgroundColor,
	font,
}) {
	const intervalRef = useRef(null);
	const pathRef = useRef(null);
	const [pathLength, setPathLength] = useState(0);

	// Calculate the total length of the path once the component is mounted
	useEffect(() => {
		const length = pathRef.current.getTotalLength();
		setPathLength(length);

		// Set the initial stroke-dasharray and stroke-dashoffset
		pathRef.current.style.strokeDasharray = length;
		pathRef.current.style.strokeDashoffset = length;
	}, []);

	// Update the stroke-dashoffset based on remaining time
	useEffect(() => {
		if (pathLength > 0) {
			const offset = (remainingTime / (timerValue * 60)) * pathLength;
			pathRef.current.style.strokeDashoffset = pathLength - offset;
		}
	}, [remainingTime, pathLength, timerValue]);

	// Timer logic
	useEffect(() => {
		if (status === "running") {
			intervalRef.current = setInterval(() => {
				const endTime = localStorage.getItem("endTime");

				if (Date.now() >= endTime) {
					clearInterval(intervalRef.current);
					localStorage.setItem("status", "stopped");
					localStorage.setItem("remainingTime", 0);
					setRemainingTime(0);
					setStatus("stopped");
				} else {
					const timeLeft = Math.ceil((endTime - Date.now()) / 1000);
					setRemainingTime(timeLeft);
				}
			}, 1000);
		} else if (status === "paused") {
			clearInterval(intervalRef.current); // Stop the interval when paused
		}
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [status]);

	// When page reloads, calculate remaining time from stored endTime
	useEffect(() => {
		const storedStatus = localStorage.getItem("status");
		const storedEndTime = localStorage.getItem("endTime");

		if (storedStatus === "running" && storedEndTime) {
			const timeLeft = Math.ceil((storedEndTime - Date.now()) / 1000);
			if (timeLeft > 0) {
				setRemainingTime(timeLeft);
				setStatus("running");
			} else {
				setRemainingTime(0);
				setStatus("stopped");
			}
		}
	}, []);

	function startTimer() {
		const endTime = Date.now() + remainingTime * 1000;
		localStorage.setItem("endTime", endTime);
		localStorage.setItem("status", "running");
		setStatus("running");
	}

	function stopTimer() {
		clearInterval(intervalRef.current);
		localStorage.setItem("status", "paused");
		localStorage.setItem("remainingTime", remainingTime);
		setStatus("paused");
	}

	function resetTimer() {
		clearInterval(intervalRef.current);
		localStorage.setItem("status", "stopped");
		localStorage.setItem("remainingTime", timerValue * 60);
		setRemainingTime(timerValue * 60);
		setStatus("stopped");
	}

	return (
		<div className="relative aspect-square w-[300px] md:w-[410px] rounded-full bg-gradient-to-tl from-gradient-1 p-4 mt-12 shadow-shadow1 shadow-shadow2]">
			<div className="flex flex-col items-center justify-center h-full bg-veryDarkBlue rounded-full relative">
				<svg
					id="visual"
					viewBox="-215 -215 430 430"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					version="1.1"
					className="absolute top-0 z-10 left-0 -rotate-[30deg] w-full h-auto"
					width="300"
					height="300"
					preserveAspectRatio="xMidYMid meet"
					style={{ color: backgroundColor }}
				>
					<g transform="scale(0.9, 0.9)">
						<path
							ref={pathRef}
							id="animatedPath"
							d="M107.5 -186.2C140 -167.4 167.4 -140 186.2 -107.5C204.9 -75 215 -37.5 215 0C215 37.5 204.9 75 186.2 107.5C167.4 140 140 167.4 107.5 186.2C75 204.9 37.5 215 0 215C-37.5 215 -75 204.9 -107.5 186.2C-140 167.4 -167.4 140 -186.2 107.5C-204.9 75 -215 37.5 -215 0C-215 -37.5 -204.9 -75 -186.2 -107.5C-167.4 -140 -140 -167.4 -107.5 -186.2C-75 -204.9 -37.5 -215 0 -215C37.5 -215 75 -204.9 107.5 -186.2"
							fill="none"
							stroke="currentColor"
							strokeWidth="12"
							strokeLinecap="round"
							className="transition-all duration-1000 ease-in-out"
						/>
					</g>
				</svg>
				<p
					className={`uppercase text-[80px] md:text-[100px] leading-[99px] cursor-pointer text-customGray font-bold ${
						font == "Space Mono" ? "tracking-[-5px]" : ""
					}`}
					style={{ fontFamily: font }}
				>
					{parseTime(remainingTime)}
				</p>
				<p
					onClick={() => {
						{
							status === "running"
								? stopTimer()
								: status === "paused"
								? startTimer()
								: status === "stopped" && remainingTime === 0
								? resetTimer()
								: startTimer();
						}
					}}
					className={`uppercase text-sm md:text-base leading-[17px] tracking-[13.13px] md:tracking-[15px] cursor-pointer font-bold text-customGray mt-2 z-30 md:mt-5 transition-all duration-200 ${
						backgroundColor == "#70f3f8"
							? "hover:text-[#70f3f8]"
							: backgroundColor == "#f87070"
							? "hover:text-[#f87070]"
							: backgroundColor == "#d881f8"
							? "hover:text-[#d881f8]"
							: "hover:text-[#f87070]"
					}`}
					style={{ fontFamily: font }}
				>
					{status === "running"
						? "Pause"
						: status === "paused"
						? "Resume"
						: remainingTime === 0
						? "Restart"
						: "Start"}
				</p>
			</div>
		</div>
	);
}

Timer.propTypes = {
	font: PropTypes.string,
	backgroundColor: PropTypes.string,
	timerValue: PropTypes.number,
	setTimerValue: PropTypes.func,
	status: PropTypes.string,
	setStatus: PropTypes.func,
	remainingTime: PropTypes.number,
	setRemainingTime: PropTypes.func,
};
