import { axiosWithAuth } from "@/api";
import type { ClosetAvatarResponse, ClosetAvatarSaveRequest } from "@/types/closet";

// 옷장에 아바타 착장 저장
export const saveClosetAvatar = async (requestData: ClosetAvatarSaveRequest) => {
  const response = await axiosWithAuth().post("/api/closet", requestData);
  return response.data;
};

// 옷장 목록 조회
export const getClosetAvatars = async (): Promise<ClosetAvatarResponse[]> => {
  const response = await axiosWithAuth().get("/api/closet");
  return response.data;
};

// 옷장 착장 삭제
export const deleteClosetAvatar = async (closetAvatarId: number) => {
  const response = await axiosWithAuth().delete(`/api/closet/${closetAvatarId}`);
  return response.data;
};
