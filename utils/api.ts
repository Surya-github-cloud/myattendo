
import axios from 'axios';

// Determine the base URL based on the environment
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side - check if we're in development or production
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:5001/api';
    } else {
      // Production - use the same origin as the frontend
      return '/api';
    }
  }
  // Server-side (for SSR)
  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
