import { axiosWithAuth } from '@/api/index';
import { OrderResponseDto, OrderRequestDto } from '@/types/order';

export const createOrderApi = async (orderRequest: OrderRequestDto): Promise<OrderResponseDto> => {
  try {
    console.log('=== 주문 API 호출 시작 ===');
    console.log('요청 데이터:', JSON.stringify(orderRequest, null, 2));
    console.log('API URL: /api/orders');
    
    const response = await axiosWithAuth().post('/api/orders', orderRequest);
    
    console.log('=== 주문 API 응답 성공 ===');
    console.log('응답 데이터:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('=== 주문 API 호출 실패 ===');
    console.error('에러 상태:', error.response?.status);
    console.error('에러 메시지:', error.response?.data);
    console.error('요청 데이터:', JSON.stringify(orderRequest, null, 2));
    console.error('전체 에러:', error);
    
    throw error;
  }
};
