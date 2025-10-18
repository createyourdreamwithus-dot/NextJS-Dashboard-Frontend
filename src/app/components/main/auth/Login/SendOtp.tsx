"use client";

import React from "react";
import { Form, Button, Input } from "antd";

interface SendOtpProps {
  loading: boolean;
  onSubmit: (mobile: string) => void | Promise<void>;
}

const SendOtp: React.FC<SendOtpProps> = ({ loading, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { mobile: string }) => {
    onSubmit(values.mobile);
  };

  return (
    <Form
      form={form}
      name="mobile"
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
      size="large"
      className="w-full"
    >
      <Form.Item
        name="mobile"
        label="Mobile Number"
        rules={[
          { required: true, message: "Please Enter your mobile number!" },
          {
            pattern: /^[6-9]\d{9}$/,
            message: "Please enter a valid 10-digit mobile number!",
          },
        ]}
        className="mb-6"
      >
        <Input
          prefix={<span className="text-gray-600 font-medium">+91</span>}
          placeholder="Enter your mobile number"
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            form.setFieldsValue({ mobile: value });
          }}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
        className="h-12 text-base mt-5 font-semibold rounded-lg "
      >
        Send OTP
      </Button>
    </Form>
  );
};

export default SendOtp;
