import PropTypes from "prop-types";
import { FONT_CLASS_MAP } from "../../utils/fontClassMap";

export default function NumberInput({ min, max, time, font, setFunction }) {
  const handleChange = (e) => {
    const raw = Number(e.target.value);
    if (Number.isNaN(raw)) {
      setFunction(min); // or 0 or leave as is
      return;
    }

    const clamped = Math.min(max, Math.max(min, raw));
    setFunction(clamped);
  };

  const increment = () => {
    setFunction((prev) => {
      const next = prev + 1;
      return next > max ? max : next;
    });
  };

  const decrement = () => {
    setFunction((prev) => {
      const next = prev - 1;
      return next < min ? min : next;
    });
  };

  return (
    <div className="h-8 md:h-10 bg-customLightGray w-[140px] px-4 rounded-[10px] flex items-center justify-between">
      <input
        type="number"
        value={time}
        onChange={handleChange}
        className={`bg-transparent font-bold text-sm leading-[17px] w-full h-full outline-none ${
          FONT_CLASS_MAP[font] ?? "font-kumbh"
        }`}
      />
      <div
        className="flex flex-col gap-2 select-none"
        onMouseDown={(e) => e.preventDefault()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          onClick={increment}
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
          onClick={decrement}
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

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  time: PropTypes.number,
  font: PropTypes.string,
  setFunction: PropTypes.func,
};
