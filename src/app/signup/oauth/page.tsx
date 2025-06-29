"use client";

import { signupWithGoogle } from "@/api/auth";
import SignupForm from "@/app/signup/_components/SignupForm";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";
import { useIdToken } from "@/hooks/useIdToken";
import { GoogleSignupRequest } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TryonImgUploader from "@/app/signup/_components/TryonImgUploader";
import AvatarImageSelector from "@/app/signup/_components/AvatarImageSelector";

const Oauth = () => {
  const { idToken } = useIdToken();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<GoogleSignupRequest>({
    username: "",
    birthDate: "",
    preferredStyle: Style.CASUAL,
    height: 0,
    weight: 0,
    gender: Gender.F,
    phoneNum: "",
    shoeSize: 0,
    avatarBaseImageUrl: "",
    userBaseImageUrl: "",
    idToken: "",
  });

  const handleSubmit = async () => {
    if (!idToken) return;

    try {
      const submitData = {
        ...data,
        idToken,
      };

      const response = await signupWithGoogle(submitData);

      if (response.accessToken) {
        console.log("회원가입 및 로그인 완료:", response);
        router.push("/"); // 홈으로 리다이렉트
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="w-[40rem] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">회원가입 정보 입력</h2>
        {step == 1 && (
          <SignupForm setStep={setStep} data={data} setData={setData} />
        )}
        {step == 2 && (
          <TryonImgUploader setStep={setStep} data={data} setData={setData} />
        )}
        {step == 3 && (
          <AvatarImageSelector
            data={data}
            setData={setData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Oauth;
