import { useStore } from "zustand";
import { idTokenStore } from "@/stores/google-token-store";

// Oauth google 인증 절차의 id token 훅
export const useIdToken = () => useStore(idTokenStore);
