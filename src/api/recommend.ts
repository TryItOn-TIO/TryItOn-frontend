import { axiosWithAuth } from "@/api";
import { ProductResponse } from "@/types/product";

// 개인화 추천 상품
export const getRecommendProducts = async (): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get("/api/recommend/for-you");
  return response.data;
};

// 인기 상품
export const getTrendingProducts = async (): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get("/api/recommend/trending");
  return response.data;
};

// 연령대별 인기 상품
export const getAgeGroupProducts = async (): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get("/api/recommend/age-group");
  return response.data;
};

// 특정 상품과 유사한 상품
export const getSimilarProducts = async (
  productId: number
): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get(
    `/api/recommend/similar-to/${productId}`
  );
  return response.data;
};
