import { AvatarResponse } from "@/types/avatar";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 타입 정의
type AvatarState = {
  avatarInfo: AvatarResponse;
  selectedProductIds: number[];
  previousProductIds: number[]; // 마지막으로 확인한 상태에서의 아이템 ID
  isLoading: boolean;
  hasAvatarUpdate: boolean; // 아바타에 새로운 변경이 감지 되었는지 (알림 띄우는 기준)

  setAvatarInfo: (info: AvatarResponse) => void;
  setSelectedProductIds: (ids: number[]) => void;
  addSelectedProductId: (id: number) => void;
  removeSelectedProductId: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setHasAvatarUpdate: (hasUpdate: boolean) => void;
};

export const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      avatarInfo: { avatarId: 1, avatarImgUrl: "", products: [] },
      selectedProductIds: [],
      previousProductIds: [],
      isLoading: false,

      // 초기값 추가
      hasAvatarUpdate: false,

      // setter 함수 추가
      setHasAvatarUpdate: (hasUpdate) => set({ hasAvatarUpdate: hasUpdate }),

      setAvatarInfo: (info) =>
        set((state) => {
          const newIds = [...info.products.map((p) => p.productId)].sort();
          const prevIds = [...state.previousProductIds].sort();
          const changed =
            newIds.length !== prevIds.length ||
            newIds.some((id, i) => id !== prevIds[i]);

          return {
            avatarInfo: info,
            hasAvatarUpdate: changed,
            previousProductIds: newIds,
          };
        }),
      setSelectedProductIds: (ids) => set({ selectedProductIds: ids }),
      addSelectedProductId: (id) =>
        set((state) => ({
          selectedProductIds: state.selectedProductIds.includes(id)
            ? state.selectedProductIds
            : [...state.selectedProductIds, id],
        })),
      removeSelectedProductId: (id) =>
        set((state) => ({
          selectedProductIds: state.selectedProductIds.filter((i) => i !== id),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "avatar-storage", // localStorage 키 이름
      partialize: (state) => ({
        avatarInfo: state.avatarInfo,
        selectedProductIds: state.selectedProductIds,
        previousProductIds: state.previousProductIds,
      }),
    }
  )
);
