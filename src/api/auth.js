import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

let messageApi = null;

export const setMessageApi = (api) => {
  messageApi = api;
};

const showMessage = (type, content) => {
  if (messageApi) {
    messageApi[type](content);
  } else {
    console.warn(`Message (${type}):`, content);
  }
};

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      config.headers.Authorization = `Bearer ${userData.id}`;
    }
    return config;
  },
  (error) => {
    showMessage('error', 'Request failed. Please try again.');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      showMessage('error', 'Request timeout. Please check your internet connection.');
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          showMessage('error', 'Bad request. Please check your input.');
          break;
        case 401:
          showMessage('error', 'Session expired. Please login again.');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          showMessage('error', 'Access denied. You do not have permission.');
          break;
        case 404:
          showMessage('error', 'Resource not found.');
          break;
        case 500:
          showMessage('error', 'Server error. Please try again later.');
          break;
        case 503:
          showMessage('error', 'Service unavailable. Please try again later.');
          break;
        default:
          showMessage('error', 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      showMessage('error', 'Network error. Please check your internet connection.');
    } else {
      showMessage('error', 'An unexpected error occurred.');
    }
    return Promise.reject(error);
  }
);

export default api;