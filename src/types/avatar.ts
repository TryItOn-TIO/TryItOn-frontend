// 아바타 상품 정보 타입 (API 응답용)
export type AvatarProductInfo = {
  avatarImg: string;
  productNames: string[];
  avatarId: number;
};

type AvatarProduct = {
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
