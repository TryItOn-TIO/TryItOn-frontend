import { createSimpleOrderApi, SimpleOrderResponseDto } from "@/api/order";

export function useOrderCreation() {
  const createOrder = async (
    orderName: string,
    amount: number
  ): Promise<SimpleOrderResponseDto> => {
    try {
      console.log('주문 생성 시도:', { orderName, amount });
      
      const order = await createSimpleOrderApi({
        orderName: orderName,
        amount: amount,
        userId: 1, // 실제 로그인된 사용자 ID로 변경 필요
        addressId: 1 // 실제 배송지 ID로 변경 필요
      });

      console.log('주문 생성 성공:', order);
      return order;
    } catch (error) {
      console.error('주문 생성 오류:', error);
      
      // 에러 메시지 개선
      if (error.response?.status === 404) {
        throw new Error('주문 생성 API를 찾을 수 없습니다. 백엔드 서버를 확인해주세요.');
      } else if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다.');
      } else if (error.response?.status === 400) {
        throw new Error('주문 정보가 올바르지 않습니다.');
      } else {
        throw new Error('주문 생성에 실패했습니다.');
      }
    }
  };

  return { createOrder };
}
