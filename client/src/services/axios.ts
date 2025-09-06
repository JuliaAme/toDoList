import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios'; 

interface RefreshResponse {
  accessToken: string;
}

const requestAxios: AxiosInstance = axios.create({
  baseURL: '/api',
});

let accessToken = '';

export const setAccessToken = (newToken: string): void => {
  accessToken = newToken;
};


requestAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
 config.headers = config.headers ?? {};
 if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

requestAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: InternalAxiosRequestConfig & { sent?: boolean } }) => {
    const prevRequest = error.config;

    if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
      try {
        const response = await requestAxios.get<RefreshResponse>('/tokens/refresh');
        accessToken = response.data.accessToken;

        prevRequest.sent = true;
        prevRequest.headers = prevRequest.headers ?? {};
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;

        return requestAxios(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default requestAxios;