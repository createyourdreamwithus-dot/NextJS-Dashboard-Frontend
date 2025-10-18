"use client";

import React, { useState } from "react";
import { Card, Typography, Space } from "antd";
import { useRouter } from "next/navigation";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import { loginApi, verifyOtpApi } from "@/hooks/authapi";
import {
  formatPhoneNumber,
  saveAuthToken,
  saveUserSession,
} from "@/app/utils/auth.utils";
import { useNotification } from "@/app/components/providers/NotificationProvider";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();
  const { openNotification } = useNotification();

  const handleMobileSubmit = async (mobile: string) => {
    try {
      setLoading(true);
      const formattedPhoneNumber = formatPhoneNumber(mobile);
      const response = await loginApi(formattedPhoneNumber);

      if (response.status === "success") {
        openNotification("success", response.message);
        setMobileNumber(formattedPhoneNumber);
        setStep("otp");
      } else {
        openNotification("error", "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      openNotification("error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    try {
      setLoading(true);
      const response = await verifyOtpApi(mobileNumber, otp, "seller");

      if (response.status === "success" && response.data) {
        openNotification("success", response.message);
        saveAuthToken(response.data.token);
        saveUserSession({
          token: response.data.token,
          role: response.data.role,
          isNewUser: response.data.is_new_user,
          phoneNumber: mobileNumber,
        });
        router.push("/admin/dashboard");
      } else {
        openNotification("error", "OTP verification failed. Please try again.");
      }
    } catch (error) {
      openNotification("error", "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await loginApi(mobileNumber);

      if (response.status === "success") {
        openNotification("success", "New OTP sent successfully!");
      } else {
        openNotification("error", "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      openNotification("error", "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMobile = () => {
    setStep("mobile");
    setMobileNumber("");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #5a189a 0%, #1e0834 100%)",
      }}
    >
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center text-white px-12 relative z-10">
        <div className="max-w-lg">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold mb-4 tracking-tight color-primary">
              CRISPYMINDS
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              Empowering your business with innovative solutions
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-8 sm:px-6 lg:px-8 relative z-10">
        <Card
          className="w-full max-w-md border-0 rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)"
          }}
        >
          <div className="p-6 sm:p-8">
            <Space direction="vertical" size="large" className="w-full">
              <div className="text-center lg:text-left">
                <Title
                  level={2}
                  className="!text-2xl sm:!text-3xl !font-bold !mb-2"
                  style={{ color: "var(--primary-color)" }}
                >
                  {step === "mobile" ? "Welcome Back" : "Verify OTP"}
                </Title>
                <p className="text-sm sm:text-base text-gray-600">
                  {step === "mobile"
                    ? "Enter your mobile number to receive OTP"
                    : `We've sent a code to ${mobileNumber}`}
                </p>
              </div>

              <div className="pt-2">
                {step === "mobile" ? (
                  <SendOtp loading={loading} onSubmit={handleMobileSubmit} />
                ) : (
                  <VerifyOtp
                    loading={loading}
                    mobileNumber={mobileNumber}
                    onSubmit={handleOtpSubmit}
                    onResend={handleResendOtp}
                    onBack={handleBackToMobile}
                  />
                )}
              </div>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;