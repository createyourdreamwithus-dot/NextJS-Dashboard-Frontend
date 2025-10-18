"use client";

import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
  label?: string; 
  icon?: React.ReactNode; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  type = "primary", 
  shape,
  size = "middle",
  className = "",
  ...rest
}) => {
  return (
    <Button
      type={type}
      shape={shape}
      size={size}
      icon={icon}
      className={`rounded-lg font-medium px-6 py-3 ${className}`} 
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
