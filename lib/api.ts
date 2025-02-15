import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from './config';

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

interface KYCData extends FormData {
  // We don't need to define properties since FormData is dynamic
}

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  // timeout: 10000, // Timeout set to 10 seconds
});


// Add a request interceptor to include the token in the header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const resetToken = localStorage.getItem('resetToken');
    if (token ||  resetToken) {
      config.headers['Authorization'] = `Bearer ${ resetToken || token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);


// Add a response interceptor to handle unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    console.log(error)
    if (error.response?.status === 401 || error.response?.data?.message === 'Not authorized to access this route') {
      localStorage.removeItem('token'); // Clear any invalid tokens
      // Router.push('/login'); // Redirect to the login page
    }
    return Promise.reject(error); // Reject the error for further handling
  }
);


// Updated helper function to handle API responses
const handleResponse = <T>(response: AxiosResponse): any => {
  // Check if response has data property
  if (!response?.data) {
    throw new Error('Invalid response format');
  }

  // Handle JSON responses
  if (typeof response.data === 'object') {
    if (response.data.success) {
      return response.data;
    }
    throw new Error(response.data.message || 'An error occurred');
  }

  // If response is not JSON, return the raw data
  return response.data;
};

export const api = {
  register: async (userData: UserData): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/register', userData);
    return handleResponse(response);
  },

  login: async (email: string, password: string): Promise<any > => {
    const response = await axiosInstance.post<ApiResponse<any>>('/auth/login', { email, password });
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
  verifyOTP: async (email: any, otp:string): Promise<void> => {
    console.log(email, otp)
    const response = await axiosInstance.post<ApiResponse<void>>('/auth/verify-otp', { email , otp});
    return handleResponse(response);
  },
  verifyResetOTP: async (email: any, otp:string): Promise<any> => {
    console.log(email, otp)
    const response = await axiosInstance.post<any>('/auth/verify-reset-otp', { email , otp});
    return handleResponse(response);
  },

  resetPassword: async ( password: string): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>(`/auth/reset-password`, { password });
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
  getUserDetails: async (): Promise<any> => {
    const response = await axiosInstance.get<ApiResponse<any>>('/users/details');
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

  getNotifications: async (): Promise<any> => {
    const response = await axiosInstance.get<ApiResponse<any[]>>('/notifications');
    return handleResponse(response);
  },

  markNotificationsAsRead: async (notificationIds: any): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/notifications/mark-read', { notificationIds });
    return handleResponse(response);
  },
  cardApplication: async (data: any): Promise<void> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/cards/apply', data);
    return handleResponse(response);
  },

  withdraw: async (data: any): Promise<any> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/withdrawals', data);
    return handleResponse(response);
  },
  transfer: async (data: any): Promise<any> => {
    const response = await axiosInstance.post<ApiResponse<void>>('/transfer', data);
    return handleResponse(response);
  },
  applyCard: async (data: any): Promise<any> => {
    const response = await axiosInstance.post('/cards/apply', data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add responseType to handle potential binary responses
      responseType: 'json',
    });
    return handleResponse(response);
  },
  activateCard: async (data: FormData): Promise<any> => {
    const response = await axiosInstance.post('/cards/apply', data);
    return handleResponse(response);
  },
  activatePin: async (data: any): Promise<any> => {
    const response = await axiosInstance.post('/cards/set', data);
    return handleResponse(response);
  },
  cardStatus: async (): Promise<any> => {
    const response = await axiosInstance.get('/cards/status');
    return handleResponse(response);
  },
  spending: async (): Promise<any> => {
    const response = await axiosInstance.get('/transactions/stats/totals');
    return handleResponse(response);
  },
  submitkyc: async (data: FormData): Promise<any> => {
    const response = await axiosInstance.post('/kyc/submit', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add responseType to handle potential binary responses
      responseType: 'json',
    });
    return handleResponse(response);
  },
  statuskyc: async (): Promise<any> => {
    const response = await axiosInstance.get('/kyc/status');
    return handleResponse(response);
  },
  transactions: async (page: number = 1, limit: number = 50): Promise<any> => {
    const response = await axiosInstance.get(`/transactions/history?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },
    // Helper function to check token expiry
    isTokenExpired: (expiry: number) => {
      return expiry * 1000 < Date.now() // Convert expiry to milliseconds
    },
};

