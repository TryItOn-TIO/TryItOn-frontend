import { axiosWithAuth } from '@/api/index';
import { 
  UserProfile, 
  ProfileUpdateRequest, 
  OrdersResponse, 
  Address, 
  AddressRequest 
} from '@/types/mypage';

// 프로필 관리 API
export const mypageApi = {
  // 내 프로필 조회
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosWithAuth().get('/api/mypage/profile');
    return response.data;
  },

  // 프로필 수정
  updateProfile: async (data: ProfileUpdateRequest): Promise<void> => {
    await axiosWithAuth().put('/api/mypage/profile', data);
  },

  // 주문내역 조회 (페이징)
  getOrders: async (
    page: number = 0, 
    size: number = 10, 
    sort: string = 'createdAt,desc'
  ): Promise<OrdersResponse> => {
    const response = await axiosWithAuth().get('/api/mypage/orders', {
      params: { page, size, sort }
    });
    return response.data;
  },

  // 배송지 목록 조회
  getAddresses: async (): Promise<Address[]> => {
    const response = await axiosWithAuth().get('/api/addresses');
    return response.data;
  },

  // 배송지 추가
  addAddress: async (data: AddressRequest): Promise<void> => {
    await axiosWithAuth().post('/api/addresses', data);
  },

  // 배송지 수정
  updateAddress: async (addressId: number, data: AddressRequest): Promise<void> => {
    await axiosWithAuth().put(`/api/addresses/${addressId}`, data);
  },

  // 배송지 삭제 (API 명세에는 없지만 일반적으로 필요)
  deleteAddress: async (addressId: number): Promise<void> => {
    await axiosWithAuth().delete(`/api/addresses/${addressId}`);
  },
};
