import { useState, useRef } from "react";
import PropTypes from "prop-types";
import NumberInput from "../NumberInput/NumberInput";
import bell from "../../assets/bell.wav";
import Overlay from "../Overlay";
import handleAlarmSoundChange from "../../utils/alarmUtils";
import KeepAwakeToggle from "../KeepAwakeToggle";
import AudioUploadInput from "../AudioUploadInput";
import { FONT_CLASS_MAP } from "../../utils/fontClassMap";

export default function Settings({
  setToggleSettings,
  font,
  setFont,
  backgroundColor,
  setBackgroundColor,
  keepAwake,
  setKeepAwake,
  wakeLockSupported,
  wakeLockError,
  sessionsUntilLongBreak,
  setSessionsUntilLongBreak,
  setAlarmVersion,
}) {
  const [localPomodoro, setLocalPomodoro] = useState(
    parseInt(localStorage.getItem("localPomodoro")) || 25
  );
  const [localShortBreak, setLocalShortBreak] = useState(
    parseInt(localStorage.getItem("localShortBreak")) || 5
  );
  const [localLongBreak, setLocalLongBreak] = useState(
    parseInt(localStorage.getItem("localLongBreak")) || 15
  );
  const [alarmSoundURL, setAlarmSoundURL] = useState(() =>
    localStorage.getItem("alarmSound")
  );
  const audioRef = useRef(null); // Persistent reference to the Audio object
  const alarmTimeoutRef = useRef(null); // Reference to stop the alarm after 10 seconds

  function applyChanges() {
    localStorage.setItem("localPomodoro", localPomodoro);
    localStorage.setItem("localShortBreak", localShortBreak);
    localStorage.setItem("localLongBreak", localLongBreak);
    localStorage.setItem("localFont", font);
    localStorage.setItem("localBackgroundColor", backgroundColor);
    localStorage.setItem("keepAwake", keepAwake);
    localStorage.setItem("sessionsUntilLongBreak", sessionsUntilLongBreak);
    setToggleSettings((prev) => !prev);
    setAlarmVersion((prev) => prev + 1);
  }

  // Play alarm sound
  const playAlarmSound = () => {
    audioRef.current = new Audio(alarmSoundURL || bell);
    audioRef.current.play();
    alarmTimeoutRef.current = setTimeout(() => {
      stopAlarmSound();
    }, 10000);
  };

  // Stop alarm sound
  const stopAlarmSound = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset playback to the start
    }
  };

  return (
    <Overlay>
      <div className="flex justify-between p-6 md:px-10 md:py-6 items-center">
        <p
          className={`text-veryDarkBlue text-xl font-bold ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Settings
        </p>
        <button
          type="button"
          aria-label="Close settings"
          onClick={() => {
            setToggleSettings((prev) => !prev);
            stopAlarmSound();
          }}
          className="cursor-pointer text-darkBlue opacity-50 group-hover/container:opacity-100 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
              opacity="1"
            />
          </svg>
        </button>
      </div>
      <hr></hr>
      {/* Time Customization */}
      <div className="flex flex-col items-center p-6 md:px-10 gap-3 md:gap-4">
        <p
          className={`text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px] w-full text-center md:text-left ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Time (Minutes)
        </p>
        <div className="flex flex-col gap-3 text-black md:flex-row w-full md:w-auto md:gap-5 md:[&_p]:w-full md:[&>div]:gap-[10px]">
          <div className="flex justify-between w-full items-center group md:flex-col ">
            <p
              className={`text-sm md:text-base ${
                FONT_CLASS_MAP[font] ?? "font-kumbh"
              }`}
            >
              pomodoro
            </p>
            <NumberInput
              min={1}
              max={180}
              time={localPomodoro}
              setFunction={setLocalPomodoro}
              font={font}
            />
          </div>
          <div className="flex justify-between w-full items-center group md:flex-col">
            <p
              className={`text-sm md:text-base ${
                FONT_CLASS_MAP[font] ?? "font-kumbh"
              }`}
            >
              short break
            </p>
            <NumberInput
              min={1}
              max={30}
              time={localShortBreak}
              setFunction={setLocalShortBreak}
              font={font}
            />
          </div>
          <div className="flex justify-between w-full items-center group md:flex-col">
            <p
              className={`text-sm md:text-base ${
                FONT_CLASS_MAP[font] ?? "font-kumbh"
              }`}
            >
              long break
            </p>
            <NumberInput
              min={1}
              max={180}
              time={localLongBreak}
              setFunction={setLocalLongBreak}
              font={font}
            />
          </div>
        </div>
      </div>
      <hr className="mx-6"></hr>
      {/* Font Customization */}
      <div className="flex items-center py-4 px-6 md:py-6 md:px-10 justify-between">
        <p
          className={`h-full text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Font
        </p>
        <div className="[&_button]:rounded-full [&_button]:aspect-square [&_button]:w-10 [&_button]:h-10 flex gap-3 items-center md:mt-0">
          <button
            className={`font-kumbh ${
              font === "Kumbh Sans"
                ? "text-white bg-veryDarkBlue"
                : "text-darkBlue bg-customLightGray"
            } font-bold`}
            onClick={() => setFont("Kumbh Sans")}
          >
            Aa
          </button>
          <button
            className={`font-roboto ${
              font === "Roboto Slab"
                ? "text-white bg-veryDarkBlue"
                : "text-darkBlue bg-customLightGray"
            } font-bold`}
            onClick={() => setFont("Roboto Slab")}
          >
            Aa
          </button>
          <button
            className={`font-spaceMono ${
              font === "Space Mono"
                ? "text-white bg-veryDarkBlue"
                : "text-darkBlue bg-customLightGray"
            } font-bold`}
            onClick={() => setFont("Space Mono")}
          >
            Aa
          </button>
        </div>
      </div>
      <hr className="mx-6"></hr>
      {/* Color Customization */}
      <div className="flex items-center py-4 px-6 md:py-6 md:px-10 justify-between">
        <p
          className={`text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase h-full ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Color
        </p>
        <div className="h-full [&>button]:rounded-full [&>button]:aspect-square [&>button]:w-10 [&>button]:h-10 flex gap-3 md:gap-4 md:mt-0 items-center">
          <button
            className="bg-customRed flex justify-center items-center"
            onClick={() => setBackgroundColor("#f87070")}
          >
            {backgroundColor === "#f87070" && (
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
            onClick={() => setBackgroundColor("#70f3f8")}
          >
            {backgroundColor === "#70f3f8" && (
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
            onClick={() => setBackgroundColor("#d881f8")}
          >
            {backgroundColor === "#d881f8" && (
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
      <hr className="mx-6"></hr>
      {/* Alarm Sound Settings */}
      <div className="flex flex-col items-center p-6 md:px-10 gap-3 md:gap-4 shrink-0">
        <div className="text-center gap-3">
          <p
            className={`text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px] ${
              FONT_CLASS_MAP[font] ?? "font-kumbh"
            }`}
          >
            Alarm Sound
          </p>
          <p className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[2px] md:tracking-[4.23px] opacity-50">
            (Only the first 10 seconds will be played)
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3 text-sm md:text-base">
            <AudioUploadInput
              onChange={(e) => handleAlarmSoundChange(e, setAlarmSoundURL)}
              fileName={alarmSoundURL ? "Custom Audio" : null}
            />
            <button
              onClick={playAlarmSound}
              className="px-4 py-2 bg-blue-600 text-white rounded-md w-fit mx-auto"
            >
              Play Alarm Sound
            </button>
          </div>
        </div>
      </div>
      <hr className="mx-6"></hr>
      <div className={`${FONT_CLASS_MAP[font] ?? "font-kumbh"}`}>
        <KeepAwakeToggle
          keepAwake={keepAwake}
          setKeepAwake={setKeepAwake}
          supported={wakeLockSupported}
          error={wakeLockError}
        />
      </div>
      <hr className="mx-6"></hr>
      <div className="flex justify-between items-center p-6 md:px-10 gap-3 md:gap-4 shrink-0">
        <span
          className={`text-sm md:text-base text-veryDarkBlue ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
        >
          Sessions until long break
        </span>
        <div className="text-center rounded-lg px-3 py-2 text-sm font-bold text-veryDarkBlue outline-none">
          <NumberInput
            min={1}
            max={12}
            time={sessionsUntilLongBreak}
            font={font}
            setFunction={setSessionsUntilLongBreak}
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          className={`relative text-sm md:text-base py-4 px-10 md:py-[18px] md:px-12 bg-customRed rounded-full top-5 -mt-8 md:-mt-4 font-bold leading-tight hover:brightness-125 ${
            FONT_CLASS_MAP[font] ?? "font-kumbh"
          }`}
          onClick={() => {
            applyChanges();
            stopAlarmSound();
          }}
        >
          Apply
        </button>
      </div>
    </Overlay>
  );
}

Settings.propTypes = {
  setToggleSettings: PropTypes.func,
  font: PropTypes.string,
  setFont: PropTypes.func,
  backgroundColor: PropTypes.string,
  setBackgroundColor: PropTypes.func,
  keepAwake: PropTypes.bool,
  setKeepAwake: PropTypes.func,
  wakeLockSupported: PropTypes.bool,
  wakeLockError: PropTypes.string,
  sessionsUntilLongBreak: PropTypes.number,
  setSessionsUntilLongBreak: PropTypes.func,
  setAlarmVersion: PropTypes.func,
};
