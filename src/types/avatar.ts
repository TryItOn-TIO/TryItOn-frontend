type AvatarProduct = {
  productName: string;
  categoryName: string;
};

export type AvatarRequest = {
  productId: number;
};

export type AvatarResponse = {
  avatarId: number;
  avatarImg: string;
  products: AvatarProduct[];
};
