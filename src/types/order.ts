

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

// 기존 주문 생성 API (향후 사용 예정)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OrderRequestDto ={
  userId: number; 
  addressId: number;
  orderItems: { variantId: number; quantity: number; }[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OrderResponseDto ={
  orderId: string;
  orderName: string;
  amount: number;
}
