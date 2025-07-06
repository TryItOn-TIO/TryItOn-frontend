import { useState } from 'react';
import { mypageApi } from '@/api/mypage';

export const useOrderDeletion = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteOrder = async (orderId: number): Promise<boolean> => {
    try {
      setIsDeleting(true);
      await mypageApi.deleteOrder(orderId);
      return true;
    } catch (error) {
      console.error('주문 삭제 실패:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteOrder,
    isDeleting
  };
};
