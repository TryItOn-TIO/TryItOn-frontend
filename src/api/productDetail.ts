import { ProductDetailResponse } from "@/types/productDetail";
import { axiosWithAuth } from "@/api";
import { ProductResponse } from "@/types/product";

export const getProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosWithAuth().get(`/api/products/${productId}`);
  return response.data;
};

export const getSimilarProducts = async (
  productId: number
): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get(
    `/api/products/${productId}/similar`
  );
  return response.data;
};
