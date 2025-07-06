export type ProductVariant = {
  variantId: number;
  size: string;
  color: string;
  quantity: number;
};

export type ProductDetailResponse = {
  id: number;
  productName: string;
  brand: string;
  price: number; // 정가
  sale: number; // 할인율
  salePrice?: number; // 할인된 가격 (optional로 변경)
  contents: string;
  images: string[];
  wishlistCount: number;
  liked: boolean;
  variant: ProductVariant[];
};

export const initialProductDetail: ProductDetailResponse = {
  id: 1,
  productName: "",
  brand: "",
  price: 0,
  sale: 0,
  salePrice: 0,
  contents: "",
  images: [],
  wishlistCount: 0,
  liked: false,
  variant: [],
};
