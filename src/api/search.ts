import { axiosWithAuth, axiosWithoutAuth } from "@/api";
import type { SearchProductResponse } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * 자동완성 검색어 추천 요청
 * @param query 검색어
 */
export const fetchSearchSuggestions = async (
  query: string
): Promise<string[]> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
    if (token) {
      const response = await axiosWithAuth().get("/api/products/suggestions", {
        params: { query },
      });
      return response.data;
    } else {
      const response = await axiosWithoutAuth().get(
        `/api/products/suggestions`,
        { params: { query } }
      );
      return response.data;
    }
  } catch (error) {
    console.warn("자동완성 요청 실패:", error);
    return [];
  }
};

/**
 * 검색어에 해당하는 상품 목록 요청
 * @param query 검색어
 */
export const fetchSearchResults = async (
  query: string
): Promise<SearchProductResponse> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  try {
    if (token) {
      const response = await axiosWithAuth().get("/api/products/search", {
        params: { query },
      });
      return response.data;
    } else {
      const response = await axiosWithoutAuth().get("/api/products/search", {
        params: { query },
      });
      return response.data;
    }
  } catch (error) {
    console.warn("검색 결과 요청 실패:", error);
    return { products: [], totalCount: 0 };
  }
};
