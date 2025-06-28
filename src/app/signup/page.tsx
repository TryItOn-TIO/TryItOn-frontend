"use client";

import { GoogleLogin } from "@react-oauth/google";
import { signinWithGoogle } from "@/api/auth";
import { signupWithGoogle } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/app/signup/_components/SignupForm";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [pendingIdToken, setPendingIdToken] = useState<string | null>(null);
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse?.credential) {
      console.error("Google 인증 토큰을 받지 못했습니다.");
      return;
    }

    const idToken = credentialResponse.credential;
    setIsLoading(true);

    try {
      // 먼저 로그인 시도
      const loginRes = await signinWithGoogle(idToken);

      // 로그인 성공
      if (loginRes.accessToken) {
        setAccessToken(loginRes.accessToken);
        console.log("로그인 성공:", loginRes);
        router.push("/"); // 홈으로 리다이렉트
      }
    } catch (error: any) {
      console.error("로그인 에러:", error);

      // 404 에러 또는 회원가입이 필요한 경우
      if (error.response?.status === 404 || error.response?.needsSignup) {
        console.log("회원가입이 필요합니다");
        setPendingIdToken(idToken);
        setShowSignupForm(true);
      } else {
        console.error("로그인 오류:", error.response || error.message);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: any) => {
    if (!pendingIdToken) return;

    setIsLoading(true);
    try {
      const signupRes = await signupWithGoogle({
        idToken: pendingIdToken,
        ...data,
      });

      if (signupRes.accessToken) {
        console.log("회원가입 및 로그인 완료:", signupRes);
        router.push("/"); // 홈으로 리다이렉트
      }
    } catch (error: any) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.log("Google 로그인 실패");
    alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
  };

  if (showSignupForm) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">회원가입 정보 입력</h2>
        <SignupForm onSubmit={handleSignup} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">회원가입</h2>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap={false}
          auto_select={false}
          theme="outline"
          size="large"
          text="signup_with"
          shape="rectangular"
        />
      </div>
      {isLoading && (
        <div className="text-center mt-4">
          <p>처리 중...</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
