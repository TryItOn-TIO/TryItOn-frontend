import { axiosWithAuth, axiosWithoutAuth } from '@/api/index';
import { PaymentConfirmRequestDto, PaymentConfirmResponseDto } from '@/types/payment';

// 인증이 필요한 경우
export const confirmPaymentApi = async (confirmRequest: PaymentConfirmRequestDto): Promise<PaymentConfirmResponseDto> => {
  const response = await axiosWithAuth().post('/api/payment/confirm', confirmRequest);
  return response.data;
};

// 인증이 필요하지 않은 경우 (결제 승인은 보통 인증 불필요)
export const confirmPaymentApiNoAuth = async (confirmRequest: PaymentConfirmRequestDto): Promise<PaymentConfirmResponseDto> => {
  const response = await axiosWithoutAuth().post('/api/payment/confirm', confirmRequest);
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