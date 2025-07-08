import axios, { type AxiosInstance } from "axios";
import {
  getAccessToken,
  deleteAccessToken,
  clearSessionStorage,
} from "@/utils/auth";

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
      console.log("API Error:", error);
      console.log("Current URL:", window.location.pathname);

      if (error.response.status === 401 || error.response.status === 403) {
        // 결제 성공 페이지에서는 자동 리다이렉트 하지 않음
        if (window.location.pathname === "/success") {
          console.warn(
            "결제 성공 페이지에서 인증 오류 발생 - 자동 리다이렉트 방지"
          );
          return Promise.reject(error);
        }

        // 메인 페이지에서는 팝업 방지 (비로그인 사용자도 접근 가능)
        if (window.location.pathname === "/") {
          console.warn("메인 페이지에서 인증 오류 발생 - 팝업 방지");
          deleteAccessToken();
          return Promise.reject(error);
        }

        // 상세페이지에서는 팝업 방지 (비로그인 사용자도 접근 가능)
        if (window.location.pathname.startsWith("/detail/")) {
          console.warn("상세페이지에서 인증 오류 발생 - 팝업 방지");
          deleteAccessToken();
          return Promise.reject(error);
        }

        // 1. 토큰, 기타 세션 정보 삭제
        deleteAccessToken();
        clearSessionStorage();

        // 2. 확인창으로 안내
        const shouldRedirect = confirm(
          "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
        );

        if (shouldRedirect) {
          // 3. 리다이렉트 (SPA 라우팅용)
          window.location.href = "/signin";
        }
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
