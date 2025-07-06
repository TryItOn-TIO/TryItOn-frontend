import { axiosWithAuth } from "@/api";
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
