import { axiosWithAuth } from "@/api";
import { ProductResponse } from "@/types/product";
import { DeleteWishlist, PostWishlist } from "@/types/wishlist";
import { getAccessToken } from "@/utils/auth";

export const addWishlist = async (data: PostWishlist) => {
  // 토큰 확인
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await axiosWithAuth().post(
    `/api/wishlist/add?productId=${data.productId}`
  );
  return response.data;
};

export const removeWishlist = async (data: DeleteWishlist) => {
  // 토큰 확인
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await axiosWithAuth().delete(
    `/api/wishlist/remove?productId=${data.productId}`
  );
  return response.data;
};

// 전체 찜 목록 조회
export const getWishlist = async (): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get("/api/wishlist");
  return response.data;
};

// 카테고리별 찜 목록 조회
export const getWishlistByCategory = async (
  parentCategoryId: number
): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get(
    `/api/wishlist/category/${parentCategoryId}`
  );
  return response.data;
};
