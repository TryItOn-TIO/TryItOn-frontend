import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";

export type SignupRequest = {
  email: string;
  password: string;
  username: string;
  preferredStyle: string;
  height: number; // cm
  weight: number; // kg
  age: number;
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
  username: string;
  email: string;
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
};

export type GoogleResponse = {
  username: string;
  email: string;
  accessToken: string;
};
