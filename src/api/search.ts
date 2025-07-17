import { axiosWithAuth } from "@/api";
import type { SearchProductResponse } from "@/types/product";

/**
 * 자동완성 검색어 추천 요청
 */
export const fetchSearchSuggestions = async (
  query: string
): Promise<string[]> => {
  try {
    const response = await axiosWithAuth().get(
      "/api/home/products/suggestions",
      {
        params: { query },
      }
    );
    return response.data;
  } catch (error) {
    console.warn("자동완성 요청 실패:", error);
    return [];
  }
};

/**
 * 검색 결과 요청
 */
export const fetchSearchResults = async (
  query: string,
  page: number = 0,
  size: number = 10
): Promise<SearchProductResponse> => {
  try {
    const response = await axiosWithAuth().get("/api/home/products/search", {
      params: { query, page, size },
    });
    return response.data;
  } catch (error) {
    console.warn("검색 결과 요청 실패:", error);
    return { products: [], totalCount: 0 };
  }
};
