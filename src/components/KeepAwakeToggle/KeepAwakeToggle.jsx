export function KeepAwakeToggle({ keepAwake, setKeepAwake, supported, error }) {
  if (!supported) {
    return (
      <div className="px-6 md:px-10 py-4 md:py-6">
        <p className="text-veryDarkBlue text-sm opacity-50">
          Keep Awake not supported on this device
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-4 md:py-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-veryDarkBlue text-[11px] font-bold uppercase tracking-[4.23px]">
          Keep Screen Awake
        </p>
        {error && <p className="text-red-500 text-xs opacity-75">{error}</p>}
      </div>

      {/* Toggle Switch */}
      <button
        onClick={() => setKeepAwake(!keepAwake)}
        className={`
          relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300
          ${keepAwake ? "bg-blue-600" : "bg-gray-300"}
          focus:outline-none
        `}
        aria-pressed={keepAwake}
        aria-label="Keep awake toggle"
      >
        {/* Sliding Circle */}
        <span
          className={`
            inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300
            ${keepAwake ? "translate-x-7" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
