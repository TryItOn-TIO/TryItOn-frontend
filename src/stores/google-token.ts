// Oauth google 인증 절차의 id token 저장소 최초에 단일하게 생성
import { createIdTokenStore } from "@/stores/google-token-store";

export const idTokenStore = createIdTokenStore();
