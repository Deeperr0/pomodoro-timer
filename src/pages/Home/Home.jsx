import { useEffect, useState } from "react";
import ModeButton from "../../components/ModeButton";
import Timer from "../../components/Timer";
import Settings from "../../components/Settings";
import Navbar from "../../components/Navbar";
import { useWakeLock } from "../../hooks/useWakeLock";
import getPresetForMode from "../../utils/getPresetForMode";
import { FONT_CLASS_MAP } from "../../utils/fontClassMap";
import Overlay from "../../components/Overlay";

export default function Home() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "pomodoro"
  );
  const [backgroundColor, setBackgroundColor] = useState(
    () => localStorage.getItem("localBackgroundColor") || "#F87070"
  );
  const [font, setFont] = useState(
    () => localStorage.getItem("localFont") || "Kumbh Sans"
  );
  const [remainingTime, setRemainingTime] = useState(() => {
    const stored = localStorage.getItem("remainingTime");
    return stored ? Number(stored) : null;
  });
  const [status, setStatus] = useState(
    () => localStorage.getItem("status") || "stopped"
  );
  const [timerValue, setTimerValue] = useState(() => {
    const stored = getPresetForMode(mode);
    return stored ? Number(stored) : 25;
  });
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
    return saved ? parseInt(saved, 10) : 4;
  });

  const [alarmVersion, setAlarmVersion] = useState(0);

  const { supported, error } = useWakeLock(keepAwake);

  const [toggleResetConfirmation, setToggleResetConfirmation] = useState(false);

  useEffect(() => {
    localStorage.setItem("keepAwake", keepAwake ? "true" : "false");
  }, [keepAwake]);

  function applyPresetForMode(currentMode) {
    const minutes = getPresetForMode(currentMode);
    setTimerValue(minutes);
    setRemainingTime(minutes * 60);
  }

  useEffect(() => {
    // Apply preset when mode changes OR when timer is stopped/reset
    if (!remainingTime || status === "stopped") {
      applyPresetForMode(mode);

      if (status !== "stopped") {
        localStorage.setItem("status", "stopped");
        setStatus("stopped");
      }
    }
  }, [mode, remainingTime, status, toggleSettings]);

  function handleTimerComplete() {
    let nextMode = mode;

    if (mode === "pomodoro") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      localStorage.setItem("pomodoroCount", String(newCount));

      nextMode =
        newCount % sessionsUntilLongBreak === 0 ? "long break" : "short break";
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
      <Navbar />
      {toggleSettings && (
        <Settings
          setToggleSettings={setToggleSettings}
          font={font}
          setFont={setFont}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          keepAwake={keepAwake}
          setKeepAwake={setKeepAwake}
          wakeLockSupported={supported}
          wakeLockError={error}
          sessionsUntilLongBreak={sessionsUntilLongBreak}
          setSessionsUntilLongBreak={setSessionsUntilLongBreak}
          setAlarmVersion={setAlarmVersion}
        />
      )}
      {toggleResetConfirmation && (
        <Overlay>
          <div
            className={`bg-darkBlue p-16 py-24 rounded-xl overflow-hidden flex flex-col gap-4 ${
              FONT_CLASS_MAP[font] ?? "font-kumbh"
            }`}
          >
            <p className="text-white text-2xl font-semibold">
              Are you sure you want to reset?
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <button
                className="text-white px-6 py-2 font-medium text-lg"
                onClick={() => setToggleResetConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-red-50 font-medium px-6 py-2 text-lg rounded-md"
                onClick={() => {
                  setPomodoroCount(0);
                  localStorage.setItem("pomodoroCount", "0");
                  setToggleResetConfirmation(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </Overlay>
      )}
      <div className="flex rounded-full justify-center py-2 px-[6px] bg-veryDarkBlue mx-6 mt-[45px] relative z-20">
        {["pomodoro", "short break", "long break"].map((modeName) => (
          <ModeButton
            key={modeName}
            modeName={modeName}
            mode={mode}
            setMode={setMode}
            backgroundColor={backgroundColor}
            font={font}
            setStatus={setStatus}
          />
        ))}
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
        alarmVersion={alarmVersion}
      />
      <div className="text-center mt-10">
        <p
          className={`mt-4 text-customGray ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Sessions this cycle: {sessionsThisCycle} / {sessionsUntilLongBreak}
        </p>
        <p
          className={`mt-1 text-customGray/70 ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Total pomodoros completed: {pomodoroCount}
        </p>
        <p
          className={`mt-1 text-customGray/70 ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Total cycles completed:{" "}
          {Math.floor(pomodoroCount / sessionsUntilLongBreak)}
        </p>
      </div>
      <button
        className="rounded-lg px-8 py-2 mt-6 text-lg font-medium bg-veryDarkBlue text-white"
        onClick={() => setToggleResetConfirmation(true)}
      >
        Reset
      </button>
      <button
        type="button"
        aria-label="Open settings"
        onClick={() => setToggleSettings(!toggleSettings)}
        className="mt-10 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
          <path
            fill="#D7E0FF"
            d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
            opacity="1"
          />
        </svg>
      </button>
    </div>
  );
}
