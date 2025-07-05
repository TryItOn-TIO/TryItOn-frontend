import { ProductResponse } from "./product";
import { AvatarProductInfo } from "./avatar";

// 현재 착장 아이템
export type CurrentOutfitItem = {
  id: number;
  name: string;
  image: string;
  category: string;
};

// 저장된 착장 (Avatar 기반)
export type SavedOutfit = {
  id: number;
  name?: string;
  avatarImg: string;
  productNames: string[];
  createdAt: string;
  bookmarked: boolean;
};

// 옷장 메인 응답 (백엔드 ClosetPageResponse와 매칭)
export type ClosetResponse = {
  latestAvatar: AvatarProductInfo | null;
  bookmarkedAvatars: AvatarProductInfo[];
  wishlistProducts: ProductResponse[];
};

// 찜 목록 페이징 응답 (백엔드 WishlistPageResponseDto와 매칭)
export type WishlistResponse = {
  products: ProductResponse[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  last: boolean;
};

// 착장 저장 요청
export type SaveOutfitRequest = {
  name?: string;
  productIds: number[];
  modelImage?: string;
};
