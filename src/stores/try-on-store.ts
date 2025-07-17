import { create } from 'zustand';

type TryOnStatus = 'idle' | 'loading' | 'success' | 'error';

interface TryOnState {
  status: TryOnStatus;
  resultImageUrl: string | null;
  notificationViewed: boolean;
  start: () => void;
  setSuccess: (imageUrl: string) => void;
  setError: () => void;
  viewNotification: () => void;
  reset: () => void;
}

export const useTryOnStore = create<TryOnState>((set) => ({
  status: 'idle',
  resultImageUrl: null,
  notificationViewed: true,
  start: () =>
    set({
      status: 'loading',
      resultImageUrl: null,
      notificationViewed: true,
    }),
  setSuccess: (imageUrl) =>
    set({
      status: 'success',
      resultImageUrl: imageUrl,
      notificationViewed: false, // 성공 시 알림을 표시해야 하므로 false로 설정
    }),
  setError: () =>
    set({
      status: 'error',
      resultImageUrl: null,
      notificationViewed: false, // 오류 발생도 알림 표시
    }),
  viewNotification: () => set({ notificationViewed: true }),
  reset: () =>
    set({
      status: 'idle',
      resultImageUrl: null,
      notificationViewed: true,
    }),
}));
