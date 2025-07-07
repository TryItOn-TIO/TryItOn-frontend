import type { ClosetAvatarResponse } from "@/types/closet";
import type { ProductResponse } from "@/types/product";

// 옷장 아바타 목록 mock data
export const closetAvatarsMock: ClosetAvatarResponse[] = [
  {
    avatarId: 1,
    avatarImage: "/images/dummy/ex10.png",
    itemsByCategory: {
      "상의": {
        productId: 1001,
        productName: "오버핏 크루넥 유니버시티",
        brand: "메이커"
      },
      "하의": {
        productId: 2001,
        productName: "더블니 루즈핏 워크팬츠",
        brand: "메이커"
      },
      "신발": {
        productId: 3001,
        productName: "척테일러 올스타 캔버스",
        brand: "컨버스"
      }
    }
  },
  {
    avatarId: 2,
    avatarImage: "/images/dummy/ex10.png",
    itemsByCategory: {
      "상의": {
        productId: 1002,
        productName: "데일리 쿨 하프 니트",
        brand: "메이커"
      },
      "하의": {
        productId: 2002,
        productName: "스탠다드핏 슬랙스",
        brand: "메이커"
      }
    }
  },
  {
    avatarId: 3,
    avatarImage: "/images/dummy/ex10.png",
    itemsByCategory: {
      "원피스": {
        productId: 4001,
        productName: "플리츠 스커트 슬림 베스트 원피스",
        brand: "메이커"
      },
      "가방": {
        productId: 5001,
        productName: "SQUARE BAG MINI_BLACK",
        brand: "브랜드A"
      }
    }
  },
  {
    avatarId: 4,
    avatarImage: "/images/dummy/ex10.png",
    itemsByCategory: {
      "상의": {
        productId: 1003,
        productName: "린넨라이크 반팔 니트 시리즈",
        brand: "메이커"
      },
      "하의": {
        productId: 2003,
        productName: "Double Knee Bermuda Pants",
        brand: "브랜드B"
      },
      "아우터": {
        productId: 6001,
        productName: "오버사이즈 블레이저",
        brand: "메이커"
      }
    }
  }
];

// 찜 목록 mock data
export const wishlistMock: ProductResponse[] = [
  {
    id: 1,
    productName: "데일리 쿨 하프 니트",
    brand: "메이커",
    price: 25000,
    sale: 25000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 120,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 1,
    categoryName: "상의",
  },
  {
    id: 2,
    productName: "더블니 루즈핏 워크팬츠 2종",
    brand: "메이커",
    price: 39500,
    sale: 39500,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 80,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 2,
    categoryName: "하의",
  },
  {
    id: 3,
    productName: "오버핏 크루넥 유니버시티",
    brand: "메이커",
    price: 13100,
    sale: 13100,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 50,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 1,
    categoryName: "상의",
  },
  {
    id: 4,
    productName: "린넨라이크 반팔 니트 시리즈",
    brand: "메이커",
    price: 29900,
    sale: 29900,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 90,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 1,
    categoryName: "상의",
  },
  {
    id: 5,
    productName: "Double Knee Bermuda Pants",
    brand: "메이커",
    price: 87200,
    sale: 87200,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 60,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 2,
    categoryName: "하의",
  },
  {
    id: 6,
    productName: "플리츠 스커트 슬림 베스트 원피스",
    brand: "메이커",
    price: 45000,
    sale: 45000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 75,
    createdAt: "2025-06-29T10:51:53.469Z",
    categoryId: 3,
    categoryName: "원피스",
  },
  {
    id: 7,
    productName: "오버사이즈 블레이저",
    brand: "브랜드C",
    price: 89000,
    sale: 79000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 45,
    createdAt: "2025-06-28T10:51:53.469Z",
    categoryId: 4,
    categoryName: "아우터",
  },
  {
    id: 8,
    productName: "미니 크로스백",
    brand: "브랜드D",
    price: 35000,
    sale: 35000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 65,
    createdAt: "2025-06-27T10:51:53.469Z",
    categoryId: 5,
    categoryName: "가방",
  },
  {
    id: 9,
    productName: "화이트 스니커즈",
    brand: "브랜드E",
    price: 120000,
    sale: 99000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 85,
    createdAt: "2025-06-26T10:51:53.469Z",
    categoryId: 6,
    categoryName: "슈즈",
  },
  {
    id: 10,
    productName: "플리츠 미디 스커트",
    brand: "메이커",
    price: 42000,
    sale: 42000,
    img1: "/images/dummy/ex10.png",
    liked: true,
    wishlistCount: 55,
    createdAt: "2025-06-25T10:51:53.469Z",
    categoryId: 7,
    categoryName: "스커트",
  }
];
