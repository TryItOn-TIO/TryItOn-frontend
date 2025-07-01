import { axiosWithAuth } from '@/api/index';
// import { OrderResponseDto, OrderRequestDto, } from '@/types/order';
import {  SimpleOrderResponseDto, SimpleOrderRequestDto } from '@/types/order';

// // 기존 주문 생성 API
// export const createOrderApi = async (orderRequest: OrderRequestDto): Promise<OrderResponseDto> => {
//   const response = await axiosWithAuth().post('/api/orders', orderRequest);
//   return response.data;
// };

// 간단한 주문 생성 API (직접 백엔드 호출)
export const createSimpleOrderApi = async (orderRequest: SimpleOrderRequestDto): Promise<SimpleOrderResponseDto> => {
  console.log('백엔드로 직접 주문 생성 요청:', orderRequest);
  
  const response = await axiosWithAuth().post('/api/orders/simple', orderRequest);
  
  console.log('백엔드 주문 생성 응답:', response.data);
  return response.data;
};
