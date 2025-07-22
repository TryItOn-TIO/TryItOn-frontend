import { useState } from "react";
import { cartApi, CartAddRequestDto } from "@/api/cart";
import { getAccessToken } from "@/utils/auth";

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (variantId: number, quantity: number) => {
    // 로그인 체크
    const token = getAccessToken();
    if (!token) {
      return false;
    }

    setIsLoading(true);

    try {
      const requestDto: CartAddRequestDto = {
        variantId,
        quantity,
      };

      await cartApi.addItemToCart(requestDto);
      return true;
    } catch (error: any) {
      console.error("장바구니 추가 실패:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToCart,
    isLoading,
  };
};
