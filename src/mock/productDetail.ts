import { ProductDetailResponse } from "@/types/productDetail";

export const dummyProductDetail: ProductDetailResponse = {
  id: 1,
  productName: "더블니 85283 루즈핏 워크팬츠 2종",
  brand: "디키즈",
  price: 75000,
  sale: 69830,
  content: "비슷한 체형(100cm,00kg)은 M, L을 많이 구매했어요",
  images: [
    "/images/dummy/item1.webp",
    "/images/dummy/item2.webp",
    "/images/dummy/item3.webp",
  ],
  wishlistCount: 1213,
  liked: true,
  variant: [
    {
      variantId: 1,
      size: "S",
      color: "black",
      quantity: 50,
    },
    {
      variantId: 2,
      size: "M",
      color: "black",
      quantity: 50,
    },
    {
      variantId: 3,
      size: "L",
      color: "black",
      quantity: 50,
    },
    {
      variantId: 4,
      size: "S",
      color: "brown",
      quantity: 50,
    },
    {
      variantId: 5,
      size: "M",
      color: "brown",
      quantity: 50,
    },
    {
      variantId: 6,
      size: "L",
      color: "brown",
      quantity: 50,
    },
  ],
};

export const initialProductDetail: ProductDetailResponse = {
  id: 1,
  productName: "",
  brand: "",
  price: 0,
  sale: 0,
  content: "",
  images: [],
  wishlistCount: 0,
  liked: false,
  variant: [],
};
