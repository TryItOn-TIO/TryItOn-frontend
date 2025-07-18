import { axiosWithAuth } from "@/api";
import { ProductResponse } from "@/types/product";
import { DeleteWishlist, PostWishlist, WishlistResponse } from "@/types/wishlist";
import { getAccessToken } from "@/utils/auth";

export const addWishlist = async (data: PostWishlist): Promise<WishlistResponse> => {
  // 토큰 확인
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axiosWithAuth().post(
      `/api/wishlist/add?productId=${data.productId}`
    );
    
    // 응답 데이터가 없는 경우 기본 성공 응답 반환
    if (!response.data) {
      return { success: true, message: "찜 목록에 추가되었습니다." };
    }
    
    return response.data;
  } catch (error: any) {
    console.error("찜 추가 API 호출 실패:", error);
    throw error;
  }
};

export const removeWishlist = async (data: DeleteWishlist): Promise<WishlistResponse> => {
  // 토큰 확인
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axiosWithAuth().delete(
      `/api/wishlist/remove?productId=${data.productId}`
    );
    
    // 응답 데이터가 없는 경우 기본 성공 응답 반환
    if (!response.data) {
      return { success: true, message: "찜 목록에서 삭제되었습니다." };
    }
    
    return response.data;
  } catch (error: any) {
    console.error("찜 삭제 API 호출 실패:", error);
    throw error;
  }
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
