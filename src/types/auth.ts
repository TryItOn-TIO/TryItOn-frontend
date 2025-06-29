import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";

export type VerifyCodeRequest = {
  email: string;
  code: string;
};

// 회원가입 요청 공통 필드
export type SignupRequest = {
  username: string;
  birthDate: string;
  preferredStyle: Style;
  height: number;
  weight: number;
  gender: Gender;
  phoneNum: string;
  shoeSize: number;
  avatarBaseImageUrl: string;
  userBaseImageUrl: string;
};

// 로그인 응답 공통 필드
export type SigninResponse = {
  email: string;
  username: string;
  accessToken: string;
};

// 이메일 인증 회원가입 요청
export type EmailSignupRequest = SignupRequest & {
  email: string;
  password: string;
};

// 이메일 인증 회원가입 응답
export type EmailSignupResponse = {
  email: string;
  username: string;
};

// 이메일 인증 로그인 요청
export type EmailSigninRequest = {
  email: string;
  password: string;
};

// OAuth Google 로그인 요청
export type GoogleSigninRequest = {
  idToken: string;
};

// OAuth Google 회원가입 요청
export type GoogleSignupRequest = SignupRequest & {
  idToken: string;
};
