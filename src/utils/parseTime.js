function parseTime(time) {
	return `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
}

export default parseTime;
