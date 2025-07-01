import { ProductDetailResponse } from "@/types/productDetail";
import { axiosWithoutAuth } from "@/api";

export const getProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosWithoutAuth().get(`/api/products/${productId}`);
  return response.data;
};
