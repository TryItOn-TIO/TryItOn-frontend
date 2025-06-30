import { AvatarRequest, AvatarResponse } from "@/types/avatar";
import { axiosWithAuth } from "@/api";

export const createAvatar = async (
  data: AvatarRequest
): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().post("/api/avatar", data);
  return response.data;
};
