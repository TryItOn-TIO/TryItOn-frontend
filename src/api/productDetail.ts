import { ProductDetailResponse } from "@/types/productDetail";
import { axiosWithAuth } from "@/api";

export const getProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosWithAuth().get(`/api/products/${productId}`);
  // const response = await axiosWithoutAuth().get(`/api/products/${productId}`);
  return response.data;
};
