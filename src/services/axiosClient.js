import axios from 'axios';
import store from '../store';
import { selectAccessToken } from '../features/auth/authSlice';

const API_BASE_URL = 'https://backend.lexbanglaai.com/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = selectAccessToken(state);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Token may have expired');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
