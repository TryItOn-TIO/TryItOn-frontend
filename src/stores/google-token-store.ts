// Oauth google 인증 절차의 id token 저장소
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type IdTokenState = {
  idToken: string;
};

export type idTokenActions = {
  setIdToken: (idToken: string) => void;
};

export type IdTokenStore = IdTokenState & idTokenActions;

export const defaultInitState: IdTokenState = {
  idToken: "",
};

export const createIdTokenStore = (
  initState: IdTokenState = defaultInitState
) => {
  return createStore<IdTokenStore>()(
    persist(
      (set) => ({
        ...initState,
        setIdToken: (idToken: string) => set(() => ({ idToken })),
      }),
      {
        name: "google-token-storage",
      }
    )
  );
};

export const idTokenStore = createIdTokenStore();
