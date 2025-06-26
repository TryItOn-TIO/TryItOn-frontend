import axios, { type AxiosInstance } from "axios";
import { getAccessToken, deleteAccessToken } from "@/utils/auth";

// 인증 필요한 인스턴스
let authInstance: AxiosInstance | null = null;

// 인증 없는 인스턴스
let noAuthInstance: AxiosInstance | null = null;

// 요청 인터셉터 설정
function setRequestInterceptor(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return instance;
}

// 응답 인터셉터 설정
function setResponseInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // 1. 토큰 삭제
        deleteAccessToken();

        // 2. 리다이렉트 (SPA 라우팅용)
        window.location.href = "/signin";
      }
      return Promise.reject(error);
    }
  );
}

// 인증용 인스턴스 반환
export const axiosWithAuth = (): AxiosInstance => {
  if (!authInstance) {
    authInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    setRequestInterceptor(authInstance);
    setResponseInterceptor(authInstance);
  }
  return authInstance;
};

// 인증 없는 인스턴스 반환
export const axiosWithoutAuth = (): AxiosInstance => {
  if (!noAuthInstance) {
    noAuthInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }
  return noAuthInstance;
};
