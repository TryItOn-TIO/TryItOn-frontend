import { createOrderApi } from "@/api/order";
import { OrderResponseDto, OrderRequestDto } from "@/types/order";

export function useOrderCreation() {
  const createOrder = async (
    orderRequest: OrderRequestDto
  ): Promise<OrderResponseDto> => {
    console.log('주문 생성 함수 호출:', orderRequest);
    
    try {
      if (!orderRequest.addressId) {
        console.error('배송지 ID가 없음:', orderRequest.addressId);
        throw new Error('배송지를 선택해주세요.');
      }

      if (!orderRequest.orderItems || orderRequest.orderItems.length === 0) {
        console.error('주문 상품이 없음:', orderRequest.orderItems);
        throw new Error('주문할 상품이 없습니다.');
      }

      console.log('백엔드로 전송할 주문 데이터:', JSON.stringify(orderRequest, null, 2));
      
      const order = await createOrderApi(orderRequest);

      console.log('주문 생성 성공:', order);
      return order;
    } catch (error) {
      console.error('주문 생성 오류 상세:', error);
      
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message);
        throw error;
      }
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status: number; data?: any } };
        console.error('Axios 에러 상세:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          fullResponse: axiosError.response
        });
        
        // 500 에러의 경우 더 자세한 정보 출력
        if (axiosError.response?.status === 500) {
          console.error('서버 내부 오류 - 요청 데이터 재확인:', orderRequest);
          throw new Error(`서버 내부 오류가 발생했습니다. 요청 데이터를 확인해주세요: ${JSON.stringify(orderRequest)}`);
        } else if (axiosError.response?.status === 400) {
          console.error('400 에러 상세 정보:', {
            status: axiosError.response.status,
            data: axiosError.response.data,
            requestData: orderRequest
          });
          const errorMessage = axiosError.response?.data?.message || '잘못된 요청입니다.';
          throw new Error(`400 에러: ${errorMessage}`);
        } else if (axiosError.response?.status === 404) {
          throw new Error('주문 생성 API를 찾을 수 없습니다. 백엔드 서버를 확인해주세요.');
        } else if (axiosError.response?.status === 401) {
          throw new Error('로그인이 필요합니다.');
        } else if (axiosError.response?.status === 400) {
          const errorMessage = axiosError.response?.data?.message || '주문 정보가 올바르지 않습니다.';
          throw new Error(`잘못된 요청: ${errorMessage}`);
        }
      }
      throw new Error('주문 생성에 실패했습니다.');
    }
  };

  return { createOrder };
}
