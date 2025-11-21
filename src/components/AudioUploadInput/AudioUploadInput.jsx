import { useState, useRef } from "react";
import { Upload, Music } from "lucide-react";
import PropTypes from "prop-types";

export function AudioUploadInput({ onChange, fileName }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("audio/")) {
        const event = {
          target: { files: [file] },
        };
        onChange(event);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      onChange(e);
    }
  };

  const displayName = fileName
    ? fileName.length > 20
      ? fileName.substring(0, 17) + "..."
      : fileName
    : "No file selected";

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          w-full p-4 rounded-lg border-2 border-dashed transition-all duration-200
          flex flex-col items-center gap-2
          ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50"
          }
        `}
      >
        <div
          className={`transition-colors ${
            isDragging ? "text-green-600" : "text-gray-500"
          }`}
        >
          {fileName ? <Music size={24} /> : <Upload size={24} />}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">
            {isDragging ? "Drop your audio file" : "Upload Audio File"}
          </p>
          <p className="text-xs text-gray-500 mt-1">{displayName}</p>
        </div>

        <p className="text-xs text-gray-400 mt-2">or drag and drop</p>
      </button>
    </div>
  );
}

AudioUploadInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  fileName: PropTypes.string,
};
