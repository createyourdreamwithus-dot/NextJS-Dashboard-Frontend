import axios from "axios";
import { API_BASE_URL } from "./endpoints";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";


export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null);
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const getMethod = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

export const postMethod = async <T = any, D = any>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axios.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

export const putMethod = async <T = any, D = any>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axios.put<T>(url, data);
    return response.data;
  } catch (error) {
    console.error("PUT request failed:", error);
    throw error;
  }
};
export const patchMethod = async <T = any, D = any>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axios.patch<T>(url, data);
    return response.data;
  } catch (error) {
    console.error("PATCH request failed:", error);
    throw error;
  }
};

export const deleteMethod = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.delete<T>(url);
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error;
  }
};