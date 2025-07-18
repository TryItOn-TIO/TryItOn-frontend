type ClosetAvatarItemRequest = {
  productId: number;
};

export type ClosetAvatarSaveRequest = {
  items: ClosetAvatarItemRequest[];
};

// 옷장 아바타 응답 타입
export type ClosetAvatarItemResponse = {
  productId: number;
  productName: string;
  brand: string;
};

export type ClosetAvatarResponse = {
  avatarId: number;
  avatarImage: string;
  itemsByCategory: {
    [categoryName: string]: ClosetAvatarItemResponse;
  };
};

export const initailavatarResponse: ClosetAvatarResponse = {
  avatarId: 1,
  avatarImage: "",
  itemsByCategory: {
    상의: {
      productId: 1,
      productName: "",
      brand: "",
    },
    하의: {
      productId: 2,
      productName: "",
      brand: "",
    },
  },
};
