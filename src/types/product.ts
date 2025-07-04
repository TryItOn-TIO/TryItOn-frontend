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
};

// 추천상품, 랭킹상품, 아바타에 입혀본 상품 정보 (전체 탭)
export type MainProductResponse = {
  recommended: ProductResponse[];
  ranked: ProductResponse[];
  avatarInfo: AvatarProductInfo;
};

// 카테고리 제품 응답
export type CategoryProductResponse = {
  products: {
    content: ProductResponse[]; // 페이지의 상품들
    totalPages: number; // 총 페이지 수
    totalElements: number; // 전체 상품 개수
    number: number; // 현재 페이지 번호
    size: number; // 페이지당 크기
    last: boolean; // 페이지 끝을 인식
  };
  avatarInfo: AvatarProductInfo;
};
