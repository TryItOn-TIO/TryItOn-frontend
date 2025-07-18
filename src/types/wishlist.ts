export type PostWishlist = {
  productId: number;
};

export type DeleteWishlist = {
  productId: number;
};

export type WishlistResponse = {
  success: boolean;
  message?: string;
  data?: any;
};
