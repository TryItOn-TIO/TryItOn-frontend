// 옷장 아바타 응답 타입
export type ClosetAvatarResponse = {
  closetAvatarId: number;
  avatarImage: string;
  productNames: string[];
  createdAt: string;
};

// 옷장 아바타 아이템 요청 타입
export type ClosetAvatarItemRequest = {
  productId: number;
};

// 옷장 아바타 저장 요청 타입 (avatarId 기반)
export type ClosetAvatarSaveRequest = {
  avatarId: number;
  items: ClosetAvatarItemRequest[];
};
