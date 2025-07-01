export type AvatarProductInfo = {
  avatarImg: string;
  productNames: string[];
};

type AvatarProduct = {
  productName: string;
  categoryName: string;
};

export type AvatarRequest = {
  productId: number;
};

export type AvatarResponse = {
  id: number;
  avatarImgUrl: string;
  products: AvatarProduct[];
};
