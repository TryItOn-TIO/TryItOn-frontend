import { axiosWithAuth } from '@/api/index';
import { OrderResponseDto, OrderRequestDto } from '@/types/order';

export const createOrderApi = async (orderRequest: OrderRequestDto): Promise<OrderResponseDto> => {
  const response = await axiosWithAuth().post('/api/orders', orderRequest);
  return response.data;
};
