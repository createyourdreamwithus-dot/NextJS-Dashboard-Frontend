"use client";

import React, { createContext, useContext } from "react";
import { notification } from "antd";

interface NotificationContextType {
  openNotification: (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used inside NotificationProvider");
  return context;
};
