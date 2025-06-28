import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";

export type VerifyCodeRequest = {
  email: string;
  code: string;
};

export type SignupRequest = {
  email: string;
  password: string;
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

export type SignupResponse = {
  email: string;
  username: string;
};

export type SigninRequest = {
  email: string;
  password: string;
};

export type SigninResponse = {
  email: string;
  username: string;
  accessToken: string;
};

export type GoogleSignupRequest = {
  username: string;
  birthDate: string;
  gender: Gender;
  phoneNum: string;
  preferredStyle: Style;
  height: number;
  weight: number;
  shoeSize: number;
  avatarBaseImageUrl: string;
  userBaseImageUrl: string;
};

export type GoogleResponse = {
  username: string;
  email: string;
  accessToken: string;
};
