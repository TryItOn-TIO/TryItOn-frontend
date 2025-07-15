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
    try {
      console.log('=== 프로필 조회 API 호출 시작 ===');
      const response = await axiosWithAuth().get('/api/mypage/profile');
      console.log('=== 프로필 조회 성공 ===');
      console.log('전체 응답 데이터:', response.data);
      console.log('아바타 관련 필드들:');
      console.log('- avatarImageUrl:', response.data.avatarImageUrl);
      console.log('- avatarBaseImageUrl:', response.data.avatarBaseImageUrl);
      console.log('- userBaseImageUrl:', response.data.userBaseImageUrl);
      console.log('========================');
      return response.data;
    } catch (error: any) {
      console.error('=== 프로필 조회 실패 ===');
      console.error('에러 상태:', error.response?.status);
      console.error('에러 메시지:', error.response?.data);
      console.error('요청 URL:', error.config?.url);
      console.error('전체 에러:', error);
      console.error('========================');
      
      // 인증 오류인 경우 더 구체적인 에러 메시지
      if (error.response?.status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (error.response?.status === 403) {
        throw new Error('접근 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        throw new Error('프로필 정보를 찾을 수 없습니다.');
      }
      
      throw error;
    }
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

  // 주문 삭제
  deleteOrder: async (orderId: number): Promise<void> => {
    await axiosWithAuth().delete(`/api/orders/${orderId}`);
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

  // 배송지 삭제
  deleteAddress: async (addressId: number): Promise<void> => {
    await axiosWithAuth().delete(`/api/addresses/${addressId}`);
  },
};
