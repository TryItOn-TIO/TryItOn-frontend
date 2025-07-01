import { axiosWithAuth } from "@/api";

export const addBookmark = async (avatarId: number) => {
  const res = await axiosWithAuth().post(`/api/closet/${avatarId}/bookmark`);
  return res.data;
};

export const removeBookmark = async (avatarId: number) => {
  const res = await axiosWithAuth().delete(`/api/closet/${avatarId}/bookmark`);
  return res.data;
};
