import { useState } from 'react';
import { cartApi, CartAddRequestDto } from '@/api/cart';
import { getAccessToken } from '@/utils/auth';

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (variantId: number, quantity: number) => {
    // 로그인 체크
    const token = getAccessToken();
    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/signin';
      return;
    }

    setIsLoading(true);
    
    try {
      const requestDto: CartAddRequestDto = {
        variantId,
        quantity
      };

      await cartApi.addItemToCart(requestDto);
      
      // 성공 메시지
      const confirmGoToCart = confirm('장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?');
      
      if (confirmGoToCart) {
        window.location.href = '/cart';
      }
      
      return true;
    } catch (error: any) {
      console.error('장바구니 추가 실패:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/signin';
      } else {
        alert('장바구니 추가에 실패했습니다. 다시 시도해주세요.');
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToCart,
    isLoading
  };
};
