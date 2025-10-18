import axios, { AxiosError } from "axios";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  AuthError,
} from "../../src/app/types/auth.types";
import { ENDPOINTS } from "@/app/services/endpoints";
import { postMethod } from "@/app/services/api-services";

export const setAuthToken = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  export const loginApi = async (phoneNumber: string): Promise<LoginResponse> => {
    try {
      const requestData: LoginRequest = {
        phone_number: phoneNumber,
      };
  
      const response = await postMethod<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        requestData
      );
  
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<AuthError>;
      console.error("Login API failed:", axiosError.response?.data || error);
      throw axiosError;
    }
  };
  
  export const verifyOtpApi = async (
    phoneNumber: string,
    otp: string,
    role: string = "seller"
  ): Promise<VerifyOtpResponse> => {
    try {
      const requestData: VerifyOtpRequest = {
        phone_number: phoneNumber,
        otp,
        role,
      };
  
      const response = await postMethod<VerifyOtpResponse>(
        ENDPOINTS.AUTH.VERIFY_OTP,
        requestData
      );
  
      if (response.data?.token) {
        setAuthToken(response.data.token);
      }
  
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<AuthError>;
      console.error("Verify OTP API failed:", axiosError.response?.data || error);
      throw axiosError;
    }
  };