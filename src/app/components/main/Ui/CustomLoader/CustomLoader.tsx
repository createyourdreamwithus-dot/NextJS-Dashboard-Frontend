"use client";
import React from "react";
import { Spin } from "antd";

interface CustomLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  text = "Loading...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-[50vh]" : "py-4"
      }`}
    >
      <Spin size="large" />
      <p className="text-gray-500 text-sm mt-3">{text}</p>
    </div>
  );
};

export default CustomLoader;
