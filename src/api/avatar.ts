import { AvatarRequest, AvatarResponse } from "@/types/avatar";
import { axiosWithAuth } from "@/api";

export const createAvatar = async (
  data: AvatarRequest
): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().post("/api/avatars/try-on", data);
  return response.data;
};

export const fetchLatestAvatarInfo = async (): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().get("/api/avatars/latest-info");
  return response.data;
};
