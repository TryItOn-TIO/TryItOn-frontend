import { useAvatarStore } from "@/stores/avatar-store";
import { createAvatar } from "@/api/avatar";

export const useAvatarTryon = () => {
  const setLoading = useAvatarStore((state) => state.setLoading);
  const setAvatarImg = useAvatarStore((state) => state.setAvatarImg);
  const addSelectedProductId = useAvatarStore((state) => state.addSelectedProductId);
  const removeSelectedProductId = useAvatarStore((state) => state.removeSelectedProductId);

  const tryOnProduct = async (productId: number) => {
    try {
      setLoading(true);
      
      // API 호출로 아바타에 상품 착용
      const response = await createAvatar({ productId });
      
      // 성공 시 전역 상태 업데이트
      setAvatarImg(response.avatarImgUrl);
      addSelectedProductId(productId);
      
      return response;
    } catch (error) {
      console.error("착용 중 오류 발생:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      setLoading(true);
      
      // 상품 제거 API 호출 (실제 API 만들어야함)
      // const response = await removeAvatarProduct({ productId });
      
      // 임시로 상품 ID만 제거
      removeSelectedProductId(productId);
      
      // 실제로는 새로운 아바타 이미지를 받아와야 함
      // setAvatarImg(response.avatarImgUrl);
      
    } catch (error) {
      console.error("상품 제거 중 오류 발생:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    tryOnProduct,
    removeProduct,
  };
};
