import { createStore } from "zustand/vanilla";

export type UserState = {
  username: string;
  email: string;
};

export type userActions = {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
};

export type UserStore = UserState & userActions;

export const defaultInitState: UserState = {
  username: "손님",
  email: "a@naver.com",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUsername: (username: string) => set(() => ({ username })),
    setEmail: (email: string) => set(() => ({ email })),
  }));
};
