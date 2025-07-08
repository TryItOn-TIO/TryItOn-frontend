import { axiosWithoutAuth } from "@/api";
import type { SearchProductResponse } from "@/types/product";

/**
 * 자동완성 검색어 추천 요청
 */
export const fetchSearchSuggestions = async (
  query: string
): Promise<string[]> => {
  try {
    const response = await axiosWithoutAuth().get("/api/products/suggestions", {
      params: { query },
    });
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
  query: string
): Promise<SearchProductResponse> => {
  try {
    const response = await axiosWithoutAuth().get("/api/products/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.warn("검색 결과 요청 실패:", error);
    return { products: [], totalCount: 0 };
  }
};
