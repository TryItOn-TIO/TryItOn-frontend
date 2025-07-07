export type AvatarProductInfo = {
  avatarImg: string;
  productNames: string[];
  avatarId: number;
};

type AvatarProduct = {
  // productId: number;
  productName: string;
  categoryName: string;
};

export type AvatarRequest = {
  productId: number;
};

export type AvatarResponse = {
  avatarId: number;
  avatarImgUrl: string;
  products: AvatarProduct[];
};
