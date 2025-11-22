export default function getPresetForMode(mode) {
  const defaults = { pomodoro: 25, "short break": 5, "long break": 15 };
  const keyMap = {
    pomodoro: "localPomodoro",
    "short break": "localShortBreak",
    "long break": "localLongBreak",
  };
  const key = keyMap[mode] ?? "localPomodoro";
  const fromStorage = localStorage.getItem(key);
  const minutes = fromStorage ? Number(fromStorage) : defaults[mode] ?? 25;
  return minutes;
}
