import { axiosWithoutAuth } from "@/api/index";
import type {
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
  GoogleSignupRequest,
  GoogleResponse,
} from "@/types/auth";
import { setAccessToken } from "@/utils/auth";

export const signupWithGoogle = async (
  data: GoogleSignupRequest
): Promise<GoogleResponse> => {
  const response = await axiosWithoutAuth().post(
    "/api/auth/google/signup",
    data
  );
  console.log(response);

  return response.data;
};

export const signinWithGoogle = async (
  idToken: string
): Promise<GoogleResponse> => {
  const response = await axiosWithoutAuth().post("/api/auth/google/login", {
    idToken,
  });
  console.log(response);

  return response.data;
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosWithoutAuth().post("/auth/signup", data);
  return response.data;
};

export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
  const response = await axiosWithoutAuth().post("/auth/signin", data);
  if (response.data?.accessToken) {
    setAccessToken(response.data.accessToken);
  }
  console.log(response.data);

  return response.data;
};
