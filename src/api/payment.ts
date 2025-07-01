import { axiosWithAuth } from '@/api/index';
import { PaymentConfirmRequestDto, PaymentConfirmResponseDto } from '@/types/payment';

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