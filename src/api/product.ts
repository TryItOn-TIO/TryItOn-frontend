import { axiosWithAuth } from "@/api";
import type { MainProductResponse } from "@/types/product";
import type { CategoryProductResponse } from "@/types/product";

/* axiosWithAuth() : 인증된 사용자 */

// 홈 메인 화면 상품 (추천 + 랭킹 + 아바타) 불러오기 - 로그인된 사용자용
export const fetchMainProducts = async (): Promise<MainProductResponse> => {
  const response = await axiosWithAuth().get("/api/home/products");
  return response.data;
};

// 메인 화면 상품 - 비로그인 사용자용 (카테고리별 8개씩)
export const fetchMainProductsForGuest = async (): Promise<MainProductResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  console.log('비로그인 사용자 API 호출:', `${API_URL}/api/products/main`);
  
  try {
    const response = await fetch(`${API_URL}/api/products/main`);
    
    if (!response.ok) {
      console.warn(`API 호출 실패: ${response.status} ${response.statusText}`);
      throw new Error(`API 호출 실패: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('비로그인 사용자 API 응답:', data);
    
    return data;
  } catch (error) {
    console.error('API 호출 실패, Mock 데이터 사용:', error);
    // API 호출 실패 시 Mock 데이터 반환
    const { mainProductsDummy } = await import("@/mock/mainProducts");
    return mainProductsDummy;
  }
};

export const fetchCategoryProducts = async ({
  pageParam = 0,
  categoryId,
  size = 10,
}: {
  pageParam?: number;
  categoryId: number;
  size?: number;
}): Promise<CategoryProductResponse> => {
  const response = await axiosWithAuth().get("/api/home/products/category", {
    params: {
      categoryId,
      page: pageParam,
      size,
    },
  });

  return response.data;
};
