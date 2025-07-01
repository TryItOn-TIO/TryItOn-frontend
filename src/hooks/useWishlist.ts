import { useState } from "react";
import { addWishlist, removeWishlist } from "@/api/wishlist";

export const useWishlist = (initial: boolean, productId: number) => {
  const [isWished, setIsWished] = useState(initial);

  const toggleWishlist = async () => {
    try {
      if (isWished) {
        await removeWishlist({ productId });
        confirm("찜 목록에서 삭제되었습니다.");
      } else {
        await addWishlist({ productId });
        confirm("찜 목록에 추가되었습니다.");
      }

      setIsWished(!isWished);
      // window.location.reload();
    } catch (error) {
      console.error("찜 토글 중 에러 발생", error);
    }
  };

  return { isWished, toggleWishlist };
};
