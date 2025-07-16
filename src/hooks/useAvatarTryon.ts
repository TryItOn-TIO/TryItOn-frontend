import { useAvatarStore } from "@/stores/avatar-store";
import { useTryOnStore } from "@/stores/try-on-store";
import { createAvatar } from "@/api/avatar";

export const useAvatarTryon = () => {
  const setLoading = useAvatarStore((state) => state.setLoading);
  const setAvatarInfo = useAvatarStore((state) => state.setAvatarInfo);
  const addSelectedProductId = useAvatarStore(
    (state) => state.addSelectedProductId
  );
  const removeSelectedProductId = useAvatarStore(
    (state) => state.removeSelectedProductId
  );

  // try-on-store의 상태 업데이트 함수들을 가져옴
  const { start, setSuccess, setError } = useTryOnStore.getState();

  const tryOnProduct = async (productId: number) => {
    start(); // 프로세스 시작을 알림
    setLoading(true);

    try {
      // API 호출로 아바타에 상품 착용
      const response = await createAvatar({ productId });

      // 성공 시 전역 상태 업데이트
      setAvatarInfo(response);
      addSelectedProductId(productId);
      setSuccess(response.avatarImgUrl); // 성공 상태와 결과 이미지 URL을 스토어에 저장

      return response;
    } catch (error) {
      console.error("착용 중 오류 발생:", error);
      setError(); // 실패 상태를 스토어에 저장
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
