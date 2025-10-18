"use client";

import React, { useEffect, useState } from "react";
import { Form, Button, Input, Space } from "antd";
import { ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";

interface VerifyOtpProps {
  loading: boolean;
  mobileNumber: string;
  onSubmit: (otp: string) => void | Promise<void>;
  onResend: () => void;
  onBack: () => void;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({
  loading,
  onSubmit,
  onResend,
  onBack,
}) => {
  const [counter, setCounter] = useState(60);
  const [form] = Form.useForm();

  const handleFinish = (values: { otp: string }) => {
    onSubmit(values.otp);
  };

  const handleOtpChange = (value: string) => {
    if (value && value.length === 4) {
      onSubmit(value);
    }
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleResend = () => {
    onResend();
    setCounter(60);
    form.resetFields();
  };

  return (
    <div className="w-full">
      {/* Back button */}
      <div className="mb-4">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="p-0 h-auto text-gray-600 hover:text-blue-600"
        >
          Change mobile number
        </Button>
      </div>

      <Form
        form={form}
        name="otp"
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        size="large"
        className="w-full"
      >
        <Form.Item
          name="otp"
          label="Enter OTP"
          rules={[
            { required: true, message: "Please input the OTP!" },
            { 
              validator: (_, value) => {
                if (!value || value.length !== 4) {
                  return Promise.reject(new Error("OTP must be 4 digits!"));
                }
                if (!/^\d+$/.test(value)) {
                  return Promise.reject(new Error("OTP must contain only numbers!"));
                }
                return Promise.resolve();
              }
            },
          ]}
          className="mb-6"
        >
          <Input
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            className="text-center text-2xl font-mono tracking-widest"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              form.setFieldsValue({ otp: value });
              handleOtpChange(value);
            }}
            onPressEnter={() => {
              const otp = form.getFieldValue('otp');
              if (otp && otp.length === 4) {
                handleFinish({ otp });
              }
            }}
          />
        </Form.Item>

        <Space direction="vertical" size="middle" className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="h-12 text-base font-semibold rounded-lg bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Verify OTP
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didnt receive OTP?
            </p>
            <Button
              type="link"
              icon={<ReloadOutlined />}
              onClick={handleResend}
              disabled={counter > 0 || loading}
              className="p-0 h-auto text-blue-600 hover:text-blue-700"
            >
              {counter > 0 ? `Resend OTP in ${counter}s` : "Resend OTP"}
            </Button>
          </div>
        </Space>
      </Form>

    </div>
  );
};

export default VerifyOtp;