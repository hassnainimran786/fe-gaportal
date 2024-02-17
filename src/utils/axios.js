import axios from 'axios';
import { toast } from 'sonner';
import config from '../config';

const getToken = () => localStorage.getItem(config.tokenName);

const unProtectedFetch = axios.create({
  baseURL: config.backendServiceBaseURL
});

unProtectedFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response?.data?.message) {
      toast.error(response.data.message);
    }
    return Promise.reject(error);
  }
);

const protectedFetch = axios.create({
  baseURL: config.backendServiceBaseURL
});

protectedFetch.interceptors.request.use(
  (config) => {
    const authToken = 'Bearer ' + getToken();
    config.headers.Authorization = authToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // Handle unauthorized or forbidden errors
      if (status === 401 || status === 403) {
        localStorage.removeItem(config.tokenName);
        toast.error(data.message);
        // window.location.reload();
      } else {
        // Handle other errors here
        toast.error(data.message);
      }
    } else {
      // Handle network errors
      toast('Network error. Please try again.');
    }
    return Promise.reject(error);
  }
);

export { unProtectedFetch, protectedFetch };
