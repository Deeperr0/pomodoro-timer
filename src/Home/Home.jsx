import { useEffect, useState } from "react";
import ModeButton from "../components/ModeButton";
import Timer from "../components/Timer/Timer";
import Settings from "../components/Settings";
import Navbar from "../Navbar";
import { useWakeLock } from "../customHooks/useWakeLock";

export default function Home() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "pomodoro");
  const backgroundColor =
    localStorage.getItem("localBackgroundColor") || "#F87070";
  const font = localStorage.getItem("localFont");
  const [remainingTime, setRemainingTime] = useState(
    localStorage.getItem("remainingTime")
  );
  const [status, setStatus] = useState(localStorage.getItem("status"));
  const [timerValue, setTimerValue] = useState(25);
  const [toggleSettings, setToggleSettings] = useState(false);

  const [keepAwake, setKeepAwake] = useState(() => {
    const saved = localStorage.getItem("keepAwake");
    return saved === "true";
  });

  const [pomodoroCount, setPomodoroCount] = useState(() => {
    const saved = localStorage.getItem("pomodoroCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState(() => {
    const saved = localStorage.getItem("sessionsUntilLongBreak");
    return saved ? parseInt(saved, 10) : 4; // default 4
  });

  const { supported, error } = useWakeLock(keepAwake);

  useEffect(() => {
    localStorage.setItem("keepAwake", keepAwake ? "true" : "false");
  }, [keepAwake]);

  useEffect(() => {
    if (!remainingTime) {
      switch (mode) {
        case "pomodoro":
          setTimerValue(localStorage.getItem("localPomodoro") || 25);
          setRemainingTime((localStorage.getItem("localPomodoro") || 25) * 60);
          break;
        case "short break":
          setTimerValue(localStorage.getItem("localShortBreak") || 5);
          setRemainingTime((localStorage.getItem("localShortBreak") || 5) * 60);
          break;
        case "long break":
          setTimerValue(localStorage.getItem("localLongBreak") || 15);
          setRemainingTime((localStorage.getItem("localLongBreak") || 15) * 60);
          break;
        default:
          setTimerValue(25);
          setRemainingTime(25 * 60);
      }
      localStorage.setItem("status", "stopped");
      setStatus("stopped");
    }
  }, [mode, remainingTime]);

  useEffect(() => {
    switch (mode) {
      case "pomodoro":
        setTimerValue(localStorage.getItem("localPomodoro") || 25);
        if (status === "stopped") {
          setRemainingTime((localStorage.getItem("localPomodoro") || 25) * 60);
        }
        break;
      case "short break":
        setTimerValue(localStorage.getItem("localShortBreak") || 5);
        if (status === "stopped") {
          setRemainingTime((localStorage.getItem("localShortBreak") || 5) * 60);
        }
        break;
      case "long break":
        setTimerValue(localStorage.getItem("localLongBreak") || 15);
        if (status === "stopped") {
          setRemainingTime((localStorage.getItem("localLongBreak") || 15) * 60);
        }
        break;
      default:
        setTimerValue(25);
        if (status === "stopped") {
          setRemainingTime(25 * 60);
        }
    }
  }, [mode, toggleSettings, status]);

  function handleTimerComplete() {
    let nextMode = mode;

    if (mode === "pomodoro") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      localStorage.setItem("pomodoroCount", String(newCount));

      if (newCount % sessionsUntilLongBreak === 0) {
        nextMode = "long break";
      } else {
        nextMode = "short break";
      }
    } else {
      nextMode = "pomodoro";
    }

    setMode(nextMode);
    localStorage.setItem("mode", nextMode);
  }

  const sessionsThisCycle =
    pomodoroCount % sessionsUntilLongBreak ||
    (pomodoroCount > 0 ? sessionsUntilLongBreak : 0);

  return (
    <div className="flex flex-col items-center pb-10">
      <Navbar backgroundColor={backgroundColor} font={font} />
      {toggleSettings && (
        <Settings
          setToggleSettings={setToggleSettings}
          font={font}
          keepAwake={keepAwake}
          setKeepAwake={setKeepAwake}
          wakeLockSupported={supported}
          wakeLockError={error}
          sessionsUntilLongBreak={sessionsUntilLongBreak}
          setSessionsUntilLongBreak={setSessionsUntilLongBreak}
        />
      )}
      <div className="flex rounded-full justify-center py-2 px-[6px] bg-veryDarkBlue mx-6 mt-[45px] relative z-20">
        <ModeButton
          modeName="pomodoro"
          mode={mode}
          setMode={setMode}
          backgroundColor={backgroundColor}
          font={font}
          setStatus={setStatus}
        />
        <ModeButton
          modeName="short break"
          mode={mode}
          setMode={setMode}
          backgroundColor={backgroundColor}
          font={font}
          setStatus={setStatus}
        />
        <ModeButton
          modeName="long break"
          mode={mode}
          setMode={setMode}
          backgroundColor={backgroundColor}
          font={font}
          setStatus={setStatus}
        />
      </div>
      <Timer
        timerValue={parseInt(timerValue)}
        remainingTime={parseInt(remainingTime)}
        setRemainingTime={setRemainingTime}
        status={status}
        setStatus={setStatus}
        backgroundColor={backgroundColor}
        font={font}
        onComplete={handleTimerComplete}
      />
      <div className="text-center mt-10">
        <p className="mt-4 text-customGray" style={{ fontFamily: font }}>
          Sessions this cycle: {sessionsThisCycle} / {sessionsUntilLongBreak}
        </p>
        <p className="mt-1 text-customGray/70" style={{ fontFamily: font }}>
          Total pomodoros completed: {pomodoroCount}
        </p>
        <p className="mt-1 text-customGray/70" style={{ fontFamily: font }}>
          Total cycles completed:{" "}
          {Math.floor(pomodoroCount / sessionsUntilLongBreak)}
        </p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        onClick={() => {
          setToggleSettings(!toggleSettings);
        }}
        className="mt-20 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-300"
      >
        <path
          fill="#D7E0FF"
          d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
          opacity="1"
        />
      </svg>
    </div>
  );
}
