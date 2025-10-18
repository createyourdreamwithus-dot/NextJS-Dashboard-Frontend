"use client";

import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onChange: (newState: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(!isOn)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        isOn ? "bg-[#9a16ca]" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
