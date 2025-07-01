

// 간단한 주문 생성을 위한 인터페이스
export type SimpleOrderRequestDto ={
  orderName: string;
  amount: number;
  userId: number;
  addressId: number;
}

export type SimpleOrderResponseDto ={
  orderId: string;
  orderName: string;
  amount: number;
}

// 기존 주문 생성 API
type OrderRequestDto ={
  userId: number; 
  addressId: number;
  orderItems: { variantId: number; quantity: number; }[];
}

type OrderResponseDto ={
  orderId: string;
  orderName: string;
  amount: number;
}
