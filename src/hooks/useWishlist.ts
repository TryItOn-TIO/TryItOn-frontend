import { useState } from "react";
import { addWishlist, removeWishlist } from "@/api/wishlist";
import { getAccessToken } from "@/utils/auth";

export const useWishlist = (initial: boolean, productId: number) => {
  const [isWished, setIsWished] = useState(initial);

  const toggleWishlist = async () => {
    try {
      // 로그인 확인
      const token = getAccessToken();
      if (!token) {
        alert("로그인이 필요한 기능입니다.");
        return;
      }

      if (isWished) {
        await removeWishlist({ productId });
        // alert("찜 목록에서 삭제되었습니다.");
        // window.location.reload();
      } else {
        await addWishlist({ productId });
        // alert("찜 목록에 추가되었습니다.");
        // window.location.reload();
      }

      setIsWished(!isWished);
    } catch (error: any) {
      console.error("찜 토글 중 에러 발생", error);

      if (error.message === "로그인이 필요합니다.") {
        alert("로그인이 필요한 기능입니다.");
      } else {
        alert("찜 기능에 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return { isWished, toggleWishlist };
};
