// Authentication API Request/Response Types

export interface LoginRequest {
  phone_number: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  meta: {
    request_id: string;
    timestamp: string;
  };
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp: string;
  role: string;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
  data: {
    token: string;
    is_new_user: boolean;
    role: string;
  };
  meta: {
    request_id: string;
    timestamp: string;
  };
}

export interface AuthError {
  status: string;
  message: string;
  error?: string;
}

export interface UserSession {
  token: string;
  role: string;
  isNewUser: boolean;
  phoneNumber: string;
}
