// Authentication utility functions for token and session management

import type { UserSession } from "../types/auth.types";

const TOKEN_KEY = "auth_token";
const USER_SESSION_KEY = "user_session";

/**
 * Store authentication token in localStorage
 */
export const saveAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Retrieve authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Store user session data in localStorage
 */
export const saveUserSession = (session: UserSession): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
  }
};

/**
 * Retrieve user session data from localStorage
 */
export const getUserSession = (): UserSession | null => {
  if (typeof window !== "undefined") {
    const sessionData = localStorage.getItem(USER_SESSION_KEY);
    if (sessionData) {
      try {
        return JSON.parse(sessionData) as UserSession;
      } catch (error) {
        console.error("Failed to parse user session:", error);
        return null;
      }
    }
  }
  return null;
};

/**
 * Remove user session data from localStorage
 */
export const removeUserSession = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_SESSION_KEY);
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  removeAuthToken();
  removeUserSession();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * Format phone number with country code
 */
export const formatPhoneNumber = (mobile: string, countryCode: string = "+91"): string => {
  // Remove any existing country code or special characters
  const cleanNumber = mobile.replace(/[^\d]/g, "");
  return `${countryCode}${cleanNumber}`;
};
