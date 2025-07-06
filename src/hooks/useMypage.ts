import { useState, useEffect, useCallback } from 'react';
import { mypageApi } from '@/api/mypage';
import { 
  UserProfile, 
  ProfileUpdateRequest, 
  Order, 
  Address, 
  AddressRequest 
} from '@/types/mypage';

// 프로필 관리 훅
export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mypageApi.getProfile();
      setProfile(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : '프로필 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: ProfileUpdateRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mypageApi.updateProfile(data);
      await fetchProfile(); // 업데이트 후 다시 조회
    } catch (error) {
      setError(error instanceof Error ? error.message : '프로필 수정에 실패했습니다.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
};

// 주문내역 관리 훅
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (page: number = 0, size: number = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mypageApi.getOrders(page, size);
      setOrders(response.content);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error: any) {
      console.error('주문내역 조회 실패:', error);
      
      // 개발 환경에서 API 오류 시 더미 데이터 표시 (선택적)
      if (process.env.NODE_ENV === 'development' && error.response?.status === 404) {
        console.log('개발 환경: 더미 주문 데이터를 표시합니다.');
        setOrders([]);
        setTotalPages(0);
        setCurrentPage(0);
      } else {
        setError(error.response?.data?.message || '주문내역 조회에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    totalPages,
    currentPage,
    isLoading,
    error,
    fetchOrders,
  };
};

// 배송지 관리 훅
export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await mypageApi.getAddresses();
      setAddresses(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : '배송지 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAddress = useCallback(async (data: AddressRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mypageApi.addAddress(data);
      await fetchAddresses(); // 추가 후 다시 조회
    } catch (error) {
      setError(error instanceof Error ? error.message : '배송지 추가에 실패했습니다.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchAddresses]);

  const updateAddress = useCallback(async (addressId: number, data: AddressRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mypageApi.updateAddress(addressId, data);
      await fetchAddresses(); // 수정 후 다시 조회
    } catch (error) {
      setError(error instanceof Error ? error.message : '배송지 수정에 실패했습니다.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchAddresses]);

  const deleteAddress = useCallback(async (addressId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mypageApi.deleteAddress(addressId);
      await fetchAddresses(); // 삭제 후 다시 조회
    } catch (error) {
      setError(error instanceof Error ? error.message : '배송지 삭제에 실패했습니다.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchAddresses]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return {
    addresses,
    isLoading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    refetch: fetchAddresses,
  };
};
