import { axiosWithAuth } from "@/api";
import { DeleteWishlist, PostWishlist } from "@/types/wishlist";

export const addWishlist = async (data: PostWishlist) => {
  const response = await axiosWithAuth().post("/api/wishlist/add", data);
  return response.data;
};

export const removeWishlist = async (data: DeleteWishlist) => {
  const response = await axiosWithAuth().post("/api/wishlist/remove", data);
  return response.data;
};
