"use client";

import { signupWithGoogle } from "@/api/auth";
import SignupForm from "@/app/signup/_components/SignupForm";
import { useIdToken } from "@/hooks/useIdToken";
import { useRouter } from "next/navigation";

const Oauth = () => {
  const { idToken } = useIdToken();
  const router = useRouter();

  const handleSignup = async (data: any) => {
    if (!idToken) return;

    try {
      const signupRes = await signupWithGoogle({
        idToken: idToken,
        ...data,
      });

      if (signupRes.accessToken) {
        console.log("회원가입 및 로그인 완료:", signupRes);
        router.push("/"); // 홈으로 리다이렉트
      }
    } catch (error: any) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">회원가입 정보 입력</h2>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default Oauth;
