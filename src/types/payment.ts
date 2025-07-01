// 토스 결제 위젯의 타입을 명확하게 정의하여 'any' 타입 사용을 방지합니다.
export type TossPaymentWidget ={
    renderPaymentMethods: (selector: string, amount: { value: number }, options?: Record<string, unknown>) => Promise<void>;
    renderAgreement: (selector: string, options?: Record<string, unknown>) => void;
    requestPayment: (paymentInfo: {
      orderId: string;
      orderName: string;
      successUrl: string;
      failUrl: string;
    }) => Promise<void>;
  }
  
  // 백엔드 Spring Boot의 DTO와 1:1로 매칭되는 타입들입니다.
  export type OrderResponseDto ={
    orderId: string; // 문자열로 변경
    orderName: string;
    amount: number;
  }
  export type PaymentConfirmRequestDto ={
    paymentKey: string;
    orderId: string; // 문자열로 변경
    amount: number;
  }
  export type PaymentConfirmResponseDto ={
      orderId: string;
      totalAmount: number;
      paymentKey: string;
      method: string;
  }
  
export type Amount = {
  currency: string;
  value: number;
};
  