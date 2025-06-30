import { axiosWithAuth } from '@/api/index';
import { OrderResponseDto, PaymentConfirmRequestDto, PaymentConfirmResponseDto } from '@/types/payment'; // @는 src를 가리키는 경로 별칭
import axios from 'axios';

interface OrderRequestDto {
  userId: number; addressId: number;
  orderItems: { variantId: number; quantity: number; }[];
}

export const createOrderApi = async (orderRequest: OrderRequestDto): Promise<OrderResponseDto> => {
  const response = await axiosWithAuth().post('/api/orders', orderRequest);
  return response.data;
};

export const confirmPaymentApi = async (confirmRequest: PaymentConfirmRequestDto): Promise<PaymentConfirmResponseDto> => {
  const response = await axiosWithAuth().post('/api/payment/confirm', confirmRequest);
  return response.data;
};

// export async function confirmTossPayment({ paymentKey, orderId, amount }: { paymentKey: string; orderId: string; amount: number; }) {
//   // 백엔드 API 엔드포인트로 요청 (프론트에서 직접 토스 API 호출 X)
//   const response = await axios.post('/api/payment/confirm', {
//     paymentKey,
//     orderId,
//     amount,
//   });
//   return response.data;
// }