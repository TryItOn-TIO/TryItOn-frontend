import { axiosWithAuth, axiosWithoutAuth } from "@/api/index";
import type {
  SigninResponse,
  GoogleSignupRequest,
  GoogleSigninRequest,
  EmailSigninRequest,
  VerifyCodeRequest,
  EmailSignupResponse,
  EmailSignupRequest,
  WithdrawRequest,
  WithdrawResponse,
} from "@/types/auth";
import { setAccessToken, deleteAccessToken } from "@/utils/auth";

export const signupWithGoogle = async (
  data: GoogleSignupRequest
): Promise<SigninResponse> => {
  const response = await axiosWithoutAuth().post(
    "/api/auth/google/signup",
    data
  );
  console.log(response);

  return response.data;
};

export const signinWithGoogle = async (
  data: GoogleSigninRequest
): Promise<SigninResponse> => {
  const response = await axiosWithoutAuth().post(
    "/api/auth/google/login",
    data
  );
  console.log(response);

  return response.data;
};

export const sendEmail = async (email: string) => {
  const response = await axiosWithoutAuth().post("/api/auth/mail/send", {
    email,
  });
  return response.data;
};

export const verifyCode = async (data: VerifyCodeRequest): Promise<boolean> => {
  const response = await axiosWithoutAuth().post("/api/auth/mail/verify", data);
  return response.data;
};

export const signup = async (
  data: EmailSignupRequest
): Promise<EmailSignupResponse> => {
  const response = await axiosWithoutAuth().post("/api/auth/mail/signup", data);
  return response.data;
};

export const signin = async (
  data: EmailSigninRequest
): Promise<SigninResponse> => {
  const response = await axiosWithoutAuth().post("/api/auth/mail/login", data);
  if (response.data?.accessToken) {
    setAccessToken(response.data.accessToken);
  }
  console.log(response.data);

  return response.data;
};

export const withdraw = async (
  data: WithdrawRequest
): Promise<WithdrawResponse> => {
  const response = await axiosWithAuth().delete("/api/auth/withdraw", { data });
  if (response.data?.success) {
    deleteAccessToken();
  }
  return response.data;
};
