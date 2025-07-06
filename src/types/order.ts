

export type OrderRequestDto = {
  addressId: number;
  amount?: number; // 백엔드 금액 검증을 위해 추가
  orderItems: {
    variantId: number;
    quantity: number;
  }[];
};

export type OrderResponseDto = {
  orderId: string;
  orderName: string;
  amount: number;
};
