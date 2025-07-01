// Oauth google 인증 절차의 id token 저장소
import { createStore } from "zustand/vanilla";

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
  return createStore<IdTokenStore>()((set) => ({
    ...initState,
    setIdToken: (idToken: string) => set(() => ({ idToken })),
  }));
};

export const idTokenStore = createIdTokenStore();
