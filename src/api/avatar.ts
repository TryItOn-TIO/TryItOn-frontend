import { AvatarRequest, AvatarResponse } from "@/types/avatar";
import { axiosWithAuth } from "@/api";
import type { AvatarProductInfo } from "@/types/avatar";

export const createAvatar = async (
  data: AvatarRequest
): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().post("/api/avatars", data);
  return response.data;
};

export const fetchLatestAvatarInfo = async (): Promise<AvatarProductInfo> => {
  const response = await axiosWithAuth().get("/api/avatars/latest-info");
  return response.data;
};
