import { axiosWithAuth } from "@/api";
import type { MainProductResponse } from "@/types/product";

/* axiosWithAuth() : 인증된 사용자 */

// 홈 메인 화면 상품 (추천 + 랭킹 + 아바타) 불러오기
export const fetchMainProducts = async (
  userId: number
): Promise<MainProductResponse> => {
  const response = await axiosWithAuth().get("/api/home/products", {
    params: { userId },
  });

  return response.data;
};
