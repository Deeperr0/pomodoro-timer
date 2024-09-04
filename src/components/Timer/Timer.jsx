import { useState, useEffect, useRef } from "react";

export default function Timer({
	timerValue,
	remainingTime,
	setRemainingTime,
	status,
	setStatus,
}) {
	const intervalRef = useRef(null);
	const endTimeRef = useRef(0);
	useEffect(() => {
		if (remainingTime == 0) {
			setStatus("stopped");
			setRemainingTime(timerValue * 60);
		}
	}, [remainingTime]);

	useEffect(() => {
		if (status === "running") {
			intervalRef.current = setInterval(() => {
				setRemainingTime((prev) => prev - 1);
			}, 1000);
		}
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [status]);

	function startTimer() {
		setStatus("running");
		endTimeRef.current = Date.now() + remainingTime * 1000;
	}
	function stopTimer() {
		setStatus("paused");
	}
	function resetTimer() {
		setStatus("running");
	}
	return (
		<div className="aspect-square w-[300px] rounded-full">
			<div className="flex flex-col items-center justify-center h-full">
				<p>
					{Math.floor(remainingTime / 60)}:{remainingTime % 60}
				</p>
				<p
					onClick={() => {
						{
							status === "running"
								? stopTimer()
								: status === "paused"
								? startTimer()
								: resetTimer();
						}
					}}
				>
					{status === "running"
						? "Pause"
						: status === "paused"
						? "Resume"
						: "Start"}
				</p>
			</div>
		</div>
	);
}
