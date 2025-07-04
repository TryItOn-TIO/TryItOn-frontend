import { axiosWithAuth } from './index';

// Cart 관련 타입 정의
export interface CartItemDto {
  cartItemId: number;
  variantId: number;
  productName: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartAddRequestDto {
  variantId: number;
  quantity: number;
}

export interface CartItemUpdateRequestDto {
  quantity: number;
}

// Cart API 함수들
export const cartApi = {
  // 장바구니 조회
  getCartItems: async (): Promise<CartItemDto[]> => {
    const response = await axiosWithAuth().get('/api/cart');
    return response.data;
  },

  // 장바구니에 상품 추가
  addItemToCart: async (requestDto: CartAddRequestDto): Promise<void> => {
    await axiosWithAuth().post('/api/cart/items', requestDto);
  },

  // 장바구니 상품 수량 변경
  updateCartItemQuantity: async (
    cartItemId: number,
    requestDto: CartItemUpdateRequestDto
  ): Promise<void> => {
    await axiosWithAuth().put(`/api/cart/items/${cartItemId}`, requestDto);
  },

  // 장바구니 상품 삭제
  deleteCartItem: async (cartItemId: number): Promise<void> => {
    await axiosWithAuth().delete(`/api/cart/items/${cartItemId}`);
  },
};
