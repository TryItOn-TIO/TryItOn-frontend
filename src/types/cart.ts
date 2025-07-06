// Cart 관련 타입 정의
export interface CartItem {
  cartItemId: number;
  variantId: number;
  productName: string;
  brand: string;
  size: string;
  color: string;
  originalPrice: number;    // 정가
  salePercentage: number;   // 할인율
  price: number;            // 할인된 가격
  quantity: number;
  imageUrl: string;
}

export interface CartAddRequest {
  variantId: number;
  quantity: number;
}

export interface CartItemUpdateRequest {
  quantity: number;
}

// Cart 상태 관리용 타입
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

// Cart 액션 타입
export type CartAction =
  | { type: 'FETCH_CART_START' }
  | { type: 'FETCH_CART_SUCCESS'; payload: CartItem[] }
  | { type: 'FETCH_CART_ERROR'; payload: string }
  | { type: 'ADD_ITEM_START' }
  | { type: 'ADD_ITEM_SUCCESS'; payload: CartItem[] }
  | { type: 'ADD_ITEM_ERROR'; payload: string }
  | { type: 'UPDATE_ITEM_START' }
  | { type: 'UPDATE_ITEM_SUCCESS'; payload: CartItem[] }
  | { type: 'UPDATE_ITEM_ERROR'; payload: string }
  | { type: 'DELETE_ITEM_START' }
  | { type: 'DELETE_ITEM_SUCCESS'; payload: CartItem[] }
  | { type: 'DELETE_ITEM_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };
