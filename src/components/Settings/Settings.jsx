import { useState, useRef } from "react";
import PropTypes from "prop-types";
import TimeInput from "../TimeInput/TimeInput";
import Overlay from "../Overlay";
import bell from "../../assets/bell.wav";

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
    localStorage.getItem("localBackgroundColor") || "#f87070"
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
    localStorage.setItem("localFont", localFont);
    localStorage.setItem("localBackgroundColor", localBackgroundColor);
    setToggleSettings((prev) => !prev);
  }

  // Handle alarm sound file selection and auto-save
  const handleAlarmSoundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Sound = event.target.result; // Base64 encoded string
        localStorage.setItem("alarmSound", base64Sound); // Save to localStorage
        setAlarmSoundURL(base64Sound); // Update state
        console.log("Alarm sound saved to localStorage!");
      };

      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // Play alarm sound
  const playAlarmSound = () => {
    const alarmSoundURL = localStorage.getItem("alarmSound") || bell;
    if (!audioRef.current) {
      audioRef.current = new Audio(alarmSoundURL); // Create the audio object once
    }
    audioRef.current.play(); // Play the sound
    // Stop alarm sound after 10 seconds
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
      {/* Time Customization */}
      <div className="flex flex-col items-center p-6 md:px-10 gap-3 md:gap-4">
        <p
          className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px] w-full text-center md:text-left"
          style={{ fontFamily: localFont }}
        >
          Time (Minutes)
        </p>
        <div className="flex flex-col gap-3 text-black md:flex-row w-full md:w-auto md:gap-5 md:[&_p]:w-full md:[&>div]:gap-[10px]">
          <div className="flex justify-between w-full items-center group md:flex-col ">
            <p
              className="text-sm md:text-base"
              style={{ fontFamily: localFont }}
            >
              pomodoro
            </p>
            <TimeInput
              time={localPomodoro}
              setTime={setLocalPomodoro}
              font={localFont}
            />
          </div>
          <div className="flex justify-between w-full items-center group md:flex-col">
            <p
              className="text-sm md:text-base"
              style={{ fontFamily: localFont }}
            >
              short break
            </p>
            <TimeInput
              time={localShortBreak}
              setTime={setLocalShortBreak}
              defaultValue={localStorage.getItem("localShortBreak") || 5}
              font={localFont}
            />
          </div>
          <div className="flex justify-between w-full items-center group md:flex-col">
            <p
              className="text-sm md:text-base"
              style={{ fontFamily: localFont }}
            >
              long break
            </p>
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
      {/* Font Customization */}
      <div className="flex items-center py-4 px-6 md:py-6 md:px-10 justify-between">
        <p
          className="h-full text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase"
          style={{ fontFamily: localFont }}
        >
          Font
        </p>
        <div className="[&_button]:rounded-full [&_button]:aspect-square [&_button]:w-10 [&_button]:h-10 flex gap-3 items-center md:mt-0">
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
      <hr className="mx-6"></hr>
      {/* Color Customization */}
      <div className="flex items-center py-4 px-6 md:py-6 md:px-10 justify-between">
        <p
          className="text-veryDarkBlue text-[11px] tracking-[4.23px] font-bold uppercase h-full"
          style={{ fontFamily: localFont }}
        >
          Color
        </p>
        <div className="h-full [&>button]:rounded-full [&>button]:aspect-square [&>button]:w-10 [&>button]:h-10 flex gap-3 md:gap-4 md:mt-0 items-center">
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
      <hr className="mx-6"></hr>
      {/* Alarm Sound Settings */}
      <div className="flex flex-col items-center p-6 md:px-10 gap-3 md:gap-4">
        <div className="text-center gap-3">
          <p
            className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px]"
            style={{ fontFamily: localFont }}
          >
            Alarm Sound
          </p>
          <p className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[2px] md:tracking-[4.23px] opacity-50">
            (Max 10 seconds will be played)
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between text-">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAlarmSoundChange}
            />
            <button
              onClick={playAlarmSound}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Play Alarm Sound
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          className="relative py-[18px] px-12 bg-customRed rounded-full top-4 md:top-8 font-bold leading-tight hover:brightness-125"
          style={{ fontFamily: localFont }}
          onClick={() => {
            applyChanges();
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
};
