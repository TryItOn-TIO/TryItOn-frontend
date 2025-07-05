import { axiosWithAuth } from "@/api";
import type { 
  ClosetResponse, 
  WishlistResponse, 
  SaveOutfitRequest, 
  SavedOutfit 
} from "@/types/closet";

/* 옷장 관련 API - 인증 필요 */

// 옷장 메인 데이터 가져오기 (현재 착장 + 저장된 착장 + 찜 목록)
export const fetchClosetData = async (): Promise<ClosetResponse> => {
  const response = await axiosWithAuth().get("/api/closet");
  return response.data;
};

// 찜 목록 가져오기 (페이징)
export const fetchWishlist = async ({
  pageParam = 0,
  categoryId,
  size = 12,
}: {
  pageParam?: number;
  categoryId?: number;
  size?: number;
}): Promise<WishlistResponse> => {
  const response = await axiosWithAuth().get("/api/closet/wishlist", {
    params: {
      page: pageParam,
      size,
      ...(categoryId && { categoryId }),
    },
  });
  return response.data;
};

// 착장 북마크 토글
export const toggleOutfitBookmark = async (avatarId: number, bookmark: boolean): Promise<void> => {
  await axiosWithAuth().put(`/api/closet/outfits/${avatarId}/bookmark`, null, {
    params: { bookmark }
  });
};

// 찜 추가하기
export const addToWishlist = async (productId: number): Promise<void> => {
  await axiosWithAuth().post(`/api/closet/wishlist/${productId}`);
};

// 찜 제거하기
export const removeFromWishlist = async (productId: number): Promise<void> => {
  await axiosWithAuth().delete(`/api/closet/wishlist/${productId}`);
};

// 착장 저장하기 (기존 avatar API 활용)
export const saveOutfit = async (data: SaveOutfitRequest): Promise<SavedOutfit> => {
  const response = await axiosWithAuth().post("/api/avatar", data);
  return response.data;
};

// 저장된 착장 삭제하기 (기존 avatar API 활용)
export const deleteOutfit = async (avatarId: number): Promise<void> => {
  await axiosWithAuth().delete(`/api/avatar/${avatarId}`);
};
