import { create } from "zustand";
import { persist } from "zustand/middleware";

// 타입 정의
type AvatarState = {
  avatarImg: string;
  selectedProductIds: number[];
  isLoading: boolean;

  setAvatarImg: (img: string) => void;
  setSelectedProductIds: (ids: number[]) => void;
  addSelectedProductId: (id: number) => void;
  removeSelectedProductId: (id: number) => void;
  setLoading: (loading: boolean) => void;
};

// persist로 유지할 항목만 따로 저장 (avatarImg, selectedProductIds)
export const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      avatarImg: "",
      selectedProductIds: [],
      isLoading: false,

      setAvatarImg: (img) => set({ avatarImg: img }),
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
        avatarImg: state.avatarImg,
        selectedProductIds: state.selectedProductIds,
      }),
    }
  )
);
