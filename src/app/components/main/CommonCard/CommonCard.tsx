"use client";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

interface CommonCardProps {
  children: React.ReactNode;
  variant?: "default" | "bordered" | "grey" | "white";
  onEdit?: () => void;
  onDelete?: () => void;
  showMenu?: boolean;
}

const CommonCard: React.FC<CommonCardProps> = ({
  children,
  variant = "white",
  onEdit,
  onDelete,
  showMenu = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "bordered":
        return "bg-gray-50 border-2 border-blue-300";
      case "grey":
        return "bg-gray-50 border border-gray-200";
      case "white":
        return "bg-gray-50 border border-gray-200";
      default:
        return "bg-gray-50 border border-gray-200";
    }
  };

  return (
    <div
      className={`${getVariantClasses()} rounded-xl overflow-visible transition-all duration-300 ease-out relative ${
        isHovered ? "shadow-lg -translate-y-1" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMenuOpen(false);
      }}
    >
      <div className="p-6">{children}</div>

      {showMenu && (onEdit || onDelete) && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 "
          >
            <MoreOutlined className="text-lg" />
          </button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[140px]">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100"
                >
                  <EditOutlined className="text-base" />
                  <span>Edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <DeleteOutlined className="text-base" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommonCard;