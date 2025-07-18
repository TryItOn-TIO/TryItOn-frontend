import { useState } from "react";
import { addWishlist, removeWishlist } from "@/api/wishlist";
import { getAccessToken } from "@/utils/auth";

export const useWishlist = (initial: boolean, productId: number) => {
  const [isWished, setIsWished] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async () => {
    try {
      // 로그인 확인
      const token = getAccessToken();
      if (!token) {
        alert("로그인이 필요한 기능입니다.");
        return false; // 로그인되지 않았음을 알리는 false 반환
      }

      if (isLoading) return false; // 이미 로딩 중이면 중복 요청 방지
      
      setIsLoading(true);

      try {
        if (isWished) {
          console.log(`찜 해제 요청 시작: 상품 ID ${productId}`);
          const response = await removeWishlist({ productId });
          console.log(`찜 해제 응답:`, response);
          
          // 찜 해제 성공 여부 확인
          if (response && response.success) {
            console.log(`찜 해제 성공: 상품 ID ${productId}`);
            setIsWished(false);
            return true;
          } else {
            console.error(`찜 해제 실패: 상품 ID ${productId}`, response);
            return false;
          }
        } else {
          console.log(`찜 추가 요청 시작: 상품 ID ${productId}`);
          const response = await addWishlist({ productId });
          console.log(`찜 추가 응답:`, response);
          
          // 찜 추가 성공 여부 확인
          if (response && response.success) {
            console.log(`찜 추가 성공: 상품 ID ${productId}`);
            setIsWished(true);
            return true;
          } else {
            console.error(`찜 추가 실패: 상품 ID ${productId}`, response);
            return false;
          }
        }
      } finally {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(`찜 토글 중 에러 발생: 상품 ID ${productId}`, error);
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);

      if (error.message === "로그인이 필요합니다.") {
        alert("로그인이 필요한 기능입니다.");
      } else {
        alert("찜 기능에 오류가 발생했습니다. 다시 시도해주세요.");
      }
      return false; // 에러 발생으로 인한 실패를 알리는 false 반환
    }
  };

  return { isWished, isLoading, toggleWishlist };
};
