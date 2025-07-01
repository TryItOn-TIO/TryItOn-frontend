export type AvatarProductInfo = {
  avatarImg: string;
  productNames: string[];
  avatarId: number;
  bookmarked: boolean;
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
