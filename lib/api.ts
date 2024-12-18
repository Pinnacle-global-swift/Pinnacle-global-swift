import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from './config';
import Router from 'next/router';

// Define types for API responses and request payloads
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface UserData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  country: string;
  accountType: string;
  gender: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  address: string;
}

interface TransactionLimits {
  dailyTransfer: number;
  dailyWithdrawal: number;
  cardSpending: number;
}

interface CardApplicationData {
  name: string;
  email: string;
  cardType: string;
}

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Add a request interceptor to include the token in the header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401 || error.response?.data?.message === 'Not authorized to access this route') {
      localStorage.removeItem('token'); // Clear any invalid tokens
      Router.push('/login'); // Redirect to the login page
      console.log("voke still testing me")
    }
    return Promise.reject(error); // Reject the error for further handling
  }
);


// Helper function to handle API responses
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message || 'An error occurred');
  }
};

export const api = {
  register: async (userData: UserData): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/register', userData);
  
    return handleResponse(response);
  },

  login: async (email: string, password: string): Promise<{ token: string }> => {
    const response = await axiosInstance.post<ApiResponse<{ token: string }>>('/auth/login', { email, password });
    return handleResponse(response);
  },

  logout: async (): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/logout');
    return handleResponse(response);
  },

  forgotPassword: async (email: string): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return handleResponse(response);
  },
  changePassword: async (email: string): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/forgot-password', { email });
    return handleResponse(response);
  },
  verifyOTP: async (email: string, otp:string): Promise<void> => {
    console.log(email, otp)
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/forgot-password', { email , otp});
    return handleResponse(response);
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>(`/auth/reset-password/${token}`, { password });
    return handleResponse(response);
  },

  verifyEmail: async (token: string): Promise<void> => {
    const response = await axiosInstance.get<ApiResponse<void>>(`/auth/verify/${token}`);
    return handleResponse(response);
  },

  getUserSettings: async (): Promise<any> => {
    const response = await axiosInstance.get<ApiResponse<any>>('/users/settings');
    return handleResponse(response);
  },

  updateUserProfile: async (profileData: ProfileData): Promise<void> => {
    const response = await axiosInstance.put<ApiResponse<void>>('/users/profile', profileData);
    return handleResponse(response);
  },

  updateLanguage: async (language: string): Promise<void> => {
    const response = await axiosInstance.put<ApiResponse<void>>('/users/language', { language });
    return handleResponse(response);
  },

  updateTransactionLimits: async (limits: TransactionLimits): Promise<void> => {
    const response = await axiosInstance.put<ApiResponse<void>>('/users/transaction-limits', limits);
    return handleResponse(response);
  },

  getAccountInfo: async (): Promise<any> => {
    const response = await axiosInstance.get<ApiResponse<any>>('/account/info');
    return handleResponse(response);
  },

  getNotifications: async (): Promise<any[]> => {
    const response = await axiosInstance.get<ApiResponse<any[]>>('/notifications');
    return handleResponse(response);
  },

  markNotificationsAsRead: async (notificationIds: string[]): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/notifications/mark-read', { notificationIds });
    return handleResponse(response);
  },

  cardApplication: async (data: CardApplicationData): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/cards/apply', data);
    return handleResponse(response);
  },
};

