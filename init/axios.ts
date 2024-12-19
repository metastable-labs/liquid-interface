import axios from 'axios';
import { apiUrl } from '@/constants/env';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // user not authenticated
    }
    return Promise.reject(error);
  }
);

const setTokenHeader = async (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeTokenHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

// ======================
// STRATEGY API INSTANCE
// ======================

const strategyAxiosInstance = axios.create({
  baseURL: `${apiUrl}/strategy/strategies/`,
});

strategyAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // user not authenticated
    }
    return Promise.reject(error);
  }
);

const setStrategyTokenHeader = async (token: string) => {
  strategyAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeStrategyTokenHeader = () => {
  delete strategyAxiosInstance.defaults.headers.common.Authorization;
};

// ======================
// AUTH API INSTANCE
// ======================

const authAxiosInstance = axios.create({
  baseURL: `${apiUrl}/auth/auth/`,
});

authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // user not authenticated
    }
    return Promise.reject(error);
  }
);

const setAuthTokenHeader = async (token: string) => {
  authAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthTokenHeader = () => {
  delete authAxiosInstance.defaults.headers.common.Authorization;
};

export {
  axiosInstance,
  setTokenHeader,
  removeTokenHeader,
  strategyAxiosInstance,
  setStrategyTokenHeader,
  removeStrategyTokenHeader,
  authAxiosInstance,
  setAuthTokenHeader,
  removeAuthTokenHeader,
};
