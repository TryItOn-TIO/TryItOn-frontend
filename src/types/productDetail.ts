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
  price: number;
  sale: number;
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
  contents: "",
  images: [],
  wishlistCount: 0,
  liked: false,
  variant: [],
};
