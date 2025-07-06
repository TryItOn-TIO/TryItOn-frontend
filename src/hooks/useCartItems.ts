import { useState, useEffect } from 'react';
import { cartApi, CartItemDto, CartItemUpdateRequestDto } from '@/api/cart';
import { getAccessToken } from '@/utils/auth';

export const useCartItems = () => {
  const [items, setItems] = useState<CartItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 장바구니 아이템 조회
  const fetchCartItems = async () => {
    const token = getAccessToken();
    if (!token) {
      setError('로그인이 필요합니다.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const cartItems = await cartApi.getCartItems();
      setItems(cartItems || []);
    } catch (error: any) {
      console.error('장바구니 조회 실패:', error);
      if (error.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('장바구니를 불러오는데 실패했습니다.');
      }
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 장바구니 아이템 수량 변경
  const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
    try {
      const requestDto: CartItemUpdateRequestDto = { quantity };
      await cartApi.updateCartItemQuantity(cartItemId, requestDto);
      
      // 성공 후 장바구니 다시 조회
      await fetchCartItems();
    } catch (error: any) {
      console.error('수량 변경 실패:', error);
      throw error;
    }
  };

  // 장바구니 아이템 삭제
  const deleteCartItem = async (cartItemId: number) => {
    try {
      await cartApi.deleteCartItem(cartItemId);
      
      // 성공 후 장바구니 다시 조회
      await fetchCartItems();
    } catch (error: any) {
      console.error('아이템 삭제 실패:', error);
      throw error;
    }
  };

  // 에러 클리어
  const clearError = () => {
    setError(null);
  };

  // 컴포넌트 마운트 시 장바구니 조회
  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    items,
    isLoading,
    error,
    updateCartItemQuantity,
    deleteCartItem,
    clearError,
    refetch: fetchCartItems
  };
};
