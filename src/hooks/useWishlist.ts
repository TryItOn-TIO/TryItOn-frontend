import { useState } from "react";
import { addWishlist, removeWishlist } from "@/api/wishlist";
import { getAccessToken } from "@/utils/auth";
import { AlertOptions } from "@/hooks/useCustomAlert";

type UseWishlistProps = {
  initial: boolean;
  productId: number;
  openAlert: (options: AlertOptions) => Promise<boolean>;
};

export const useWishlist = ({
  initial,
  productId,
  openAlert,
}: UseWishlistProps) => {
  const [isWished, setIsWished] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async () => {
    try {
      // 로그인 확인
      const token = getAccessToken();
      if (!token) {
        await openAlert({
          title: "로그인 필요",
          message: "로그인이 필요한 기능입니다.",
          type: "info",
          confirmText: "확인",
        });
        return false;
      }

      if (isLoading) return false;

      setIsLoading(true);

      try {
        if (isWished) {
          console.log(`찜 해제 요청 시작: 상품 ID ${productId}`);
          const response = await removeWishlist({ productId });
          console.log(`찜 해제 응답:`, response);

          if (response && response.success) {
            console.log(`찜 해제 성공: 상품 ID ${productId}`);
            setIsWished(false);
            // await openAlert({
            //   title: "찜 해제",
            //   message: "상품이 찜 목록에서 제거되었습니다.",
            //   type: "info",
            // });
            return true;
          } else {
            console.error(`찜 해제 실패: 상품 ID ${productId}`, response);
            // await openAlert({
            //   title: "오류",
            //   message: "찜 해제에 실패했습니다. 다시 시도해주세요.",
            //   type: "error",
            // });
            return false;
          }
        } else {
          console.log(`찜 추가 요청 시작: 상품 ID ${productId}`);
          const response = await addWishlist({ productId });
          console.log(`찜 추가 응답:`, response);

          if (response && response.success) {
            console.log(`찜 추가 성공: 상품 ID ${productId}`);
            setIsWished(true);
            // await openAlert({
            //   title: "찜 추가",
            //   message: "상품이 찜 목록에 추가되었습니다.",
            //   type: "info",
            // });
            return true;
          } else {
            console.error(`찜 추가 실패: 상품 ID ${productId}`, response);
            // await openAlert({
            //   title: "오류",
            //   message: "찜 추가에 실패했습니다. 다시 시도해주세요.",
            //   type: "error",
            // });
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
        await openAlert({
          title: "로그인 필요",
          message: "로그인이 필요한 기능입니다.",
          type: "warning",
        });
      } else {
        await openAlert({
          title: "오류",
          message: "찜 기능에 오류가 발생했습니다. 다시 시도해주세요.",
          type: "error",
        });
      }
      return false;
    }
  };

  return { isWished, isLoading, toggleWishlist };
};
