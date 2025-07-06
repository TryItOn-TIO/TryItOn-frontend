import { axiosWithAuth } from "@/api";
import { ClosetAvatarResponse } from "@/types/closet";

export const getCloset = async (): Promise<ClosetAvatarResponse[]> => {
  const response = await axiosWithAuth().get(`/api/closet`);
  return response.data;
};
