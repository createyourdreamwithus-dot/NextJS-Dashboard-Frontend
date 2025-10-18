"use client";
import React from "react";
import { Modal, ModalProps } from "antd";

interface CustomModalProps extends ModalProps {
  title?: string;
  children?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  open,
  onOk,
  onCancel,
  children,
  ...rest
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;