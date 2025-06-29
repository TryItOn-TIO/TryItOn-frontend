import { AvatarProductInfo } from "@/types/avatar";

// 홈 화면(전체 탭) 제품 응답
export type ProductResponse = {
  id: number;
  productName: string;
  img1: string;
  price: number;
  sale: number;
  liked: boolean;
  brand: string;
  wishlistCount: number;
  createdAt: string;
  categoryId: number;
  categoryName: string;
}

// 추천상품, 랭킹상품, 아바타에 입혀본 상품 정보 (전체 탭)
export type MainProductResponse = {
  recommended: ProductResponse[];
  ranked: ProductResponse[];
  avatarInfo: AvatarProductInfo;
}