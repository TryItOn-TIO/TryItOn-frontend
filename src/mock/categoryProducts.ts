import type { CategoryProductResponse } from "@/types/product";

const MOCK_PRODUCTS = [
  {
    id: 101,
    productName: "오버핏 후드티",
    img1: "/images/dummy/ex10.png",
    price: 59000,
    sale: 5000,
    liked: false,
    brand: "유니클로",
    wishlistCount: 85,
    createdAt: "2025-06-30T10:51:53.469Z",
    categoryId: 1,
    categoryName: "상의",
  },
  {
    id: 102,
    productName: "슬림 진",
    img1: "/images/dummy/ex10.png",
    price: 75000,
    sale: 0,
    liked: true,
    brand: "리바이스",
    wishlistCount: 42,
    createdAt: "2025-06-29T08:20:13.002Z",
    categoryId: 1,
    categoryName: "하의",
  },
  {
    id: 103,
    productName: "레더 재킷",
    img1: "/images/dummy/ex10.png",
    price: 150000,
    sale: 20000,
    liked: false,
    brand: "자라",
    wishlistCount: 58,
    createdAt: "2025-06-28T14:10:10.500Z",
    categoryId: 1,
    categoryName: "아우터",
  },
  {
    id: 104,
    productName: "화이트 스니커즈",
    img1: "/images/dummy/ex10.png",
    price: 82000,
    sale: 10000,
    liked: true,
    brand: "나이키",
    wishlistCount: 95,
    createdAt: "2025-06-27T18:30:00.000Z",
    categoryId: 2,
    categoryName: "신발",
  },
  {
    id: 105,
    productName: "베이직 티셔츠",
    img1: "/images/dummy/ex10.png",
    price: 20000,
    sale: 0,
    liked: false,
    brand: "H&M",
    wishlistCount: 25,
    createdAt: "2025-06-26T12:00:00.000Z",
    categoryId: 1,
    categoryName: "상의",
  },
];

// 함수에서 페이지네이션 처리
export const getCategoryProducts = (
  categoryId: number,
  page: number,
  size = 10
): CategoryProductResponse => {
  // 카테고리 필터링
  const filtered = MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId);

  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / size);
  const last = page >= totalPages - 1;

  // 현재 페이지에 맞는 상품만 자르기
  const start = page * size;
  const end = start + size;
  const content = filtered.slice(start, end);

  return {
    products: {
      content,
      totalPages,
      totalElements,
      number: page,
      size,
      last,
    },
  };
};
