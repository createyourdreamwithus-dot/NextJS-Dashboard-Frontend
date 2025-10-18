"use client";
import React from "react";
import { Empty } from "antd";

interface CustomEmptyProps {
  message?: string;
  fullScreen?: boolean;
}

const CustomEmpty: React.FC<CustomEmptyProps> = ({
  message = "No Data Found",
  fullScreen = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-[50vh]" : "py-4"
      }`}
    >
      <Empty description={message} />
    </div>
  );
};

export default CustomEmpty;
