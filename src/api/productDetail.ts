import { ProductDetailResponse } from "@/types/productDetail";
import { ProductResponse } from "@/types/product";
import { axiosWithAuth, axiosWithoutAuth } from "@/api";

export const getProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosWithAuth().get(`/api/products/${productId}`);
  return response.data;
};

// 유사한 상품 목록 조회
export const getSimilarProducts = async (
  productId: number
): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get(
    `/api/products/${productId}/similar`
  );
  return response.data;
};
