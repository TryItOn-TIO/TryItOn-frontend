import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { 
  fetchClosetData, 
  fetchWishlist, 
  toggleOutfitBookmark,
  addToWishlist,
  removeFromWishlist,
  saveOutfit, 
  deleteOutfit
} from "@/api/closet";
import type { SaveOutfitRequest } from "@/types/closet";

// 옷장 메인 데이터 조회
export const useClosetData = () => {
  return useQuery({
    queryKey: ["closet"],
    queryFn: fetchClosetData,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 찜 목록 조회 (무한 스크롤)
export const useWishlist = (categoryId?: number) => {
  return useInfiniteQuery({
    queryKey: ["wishlist", categoryId],
    queryFn: ({ pageParam = 0 }) => 
      fetchWishlist({ pageParam, categoryId, size: 12 }),
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.currentPage + 1;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

// 착장 북마크 토글
export const useToggleOutfitBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ avatarId, bookmark }: { avatarId: number; bookmark: boolean }) => 
      toggleOutfitBookmark(avatarId, bookmark),
    onSuccess: () => {
      // 옷장 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["closet"] });
    },
  });
};

// 찜 추가
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: number) => addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closet"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

// 찜 제거
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closet"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

// 착장 저장
export const useSaveOutfit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SaveOutfitRequest) => saveOutfit(data),
    onSuccess: () => {
      // 옷장 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ["closet"] });
    },
  });
};

// 착장 삭제
export const useDeleteOutfit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (avatarId: number) => deleteOutfit(avatarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["closet"] });
    },
  });
};
