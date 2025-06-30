export type AvatarProductInfo = {
  avatarImg: string;
  productNames: string[];
};

export type AvatarRequest = {
  productId: number;
};

export type AvatarResponse = {
  id: number;
  avatarImgUrl: string;
  productName: string;
  categoryName: string;
};
