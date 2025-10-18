"use client";
import React from "react";
import { Modal, Alert, Button, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

interface WarningModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  onConfirm,
  onCancel,
  message = "Are you sure you want to delete this item?",
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={true}
      width={450}
      centered
      styles={{
        content: { padding: 0 },  
        body: { padding: 0 }       
      }}
    >
      <Alert
        message="Warning: Permanent Action"
        description={
          <div>
            <p style={{ margin: "8px 0 16px 0" }}>{message}</p>
            <div style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={onCancel}>Cancel</Button>
                <Button type="primary" danger onClick={onConfirm}>
                  Delete
                </Button>
              </Space>
            </div>
          </div>
        }
        type="error"
        icon={<CloseCircleOutlined />}
        showIcon
      />
    </Modal>
  );
};

export default WarningModal;