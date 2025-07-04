import { useState, useEffect, useCallback } from 'react';
import { cartApi, CartItemDto, CartAddRequestDto, CartItemUpdateRequestDto } from '@/api/cart';
import { CartItem, CartState } from '@/types/cart';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const useCart = () => {
  const [state, setState] = useState<CartState>(initialState);

  // 총 수량 및 총 가격 계산
  const calculateTotals = useCallback((items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, []);

  // 장바구니 조회
  const fetchCartItems = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const items = await cartApi.getCartItems();
      const { totalItems, totalPrice } = calculateTotals(items);
      
      setState(prev => ({
        ...prev,
        items,
        totalItems,
        totalPrice,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '장바구니 조회에 실패했습니다.',
        isLoading: false,
      }));
    }
  }, [calculateTotals]);

  // 장바구니에 상품 추가
  const addItemToCart = useCallback(async (requestDto: CartAddRequestDto) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await cartApi.addItemToCart(requestDto);
      // 추가 후 장바구니 다시 조회
      await fetchCartItems();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '상품 추가에 실패했습니다.',
        isLoading: false,
      }));
    }
  }, [fetchCartItems]);

  // 장바구니 상품 수량 변경
  const updateCartItemQuantity = useCallback(async (
    cartItemId: number,
    quantity: number
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await cartApi.updateCartItemQuantity(cartItemId, { quantity });
      // 수정 후 장바구니 다시 조회
      await fetchCartItems();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '수량 변경에 실패했습니다.',
        isLoading: false,
      }));
    }
  }, [fetchCartItems]);

  // 장바구니 상품 삭제
  const deleteCartItem = useCallback(async (cartItemId: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await cartApi.deleteCartItem(cartItemId);
      // 삭제 후 장바구니 다시 조회
      await fetchCartItems();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '상품 삭제에 실패했습니다.',
        isLoading: false,
      }));
    }
  }, [fetchCartItems]);

  // 에러 초기화
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // 컴포넌트 마운트 시 장바구니 조회
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return {
    ...state,
    fetchCartItems,
    addItemToCart,
    updateCartItemQuantity,
    deleteCartItem,
    clearError,
  };
};
