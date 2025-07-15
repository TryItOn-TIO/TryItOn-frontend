"use client";

import { useState } from "react";
import SendVerification from "@/app/signup/_components/SendVerification";
import VerifyCode from "@/app/signup/_components/VerifyCode";
import Success from "@/app/signup/_components/Success";
import { EmailSignupRequest } from "@/types/auth";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";
import TryonImgUploader from "@/app/signup/_components/TryonImgUploader";
import { signup } from "@/api/auth";
import PasswordForm from "@/app/signup/_components/PasswordForm";
import SignupForm from "@/app/signup/_components/SignupForm";
import { useRouter } from "next/navigation";

const SignupClient = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<EmailSignupRequest>({
    email: "",
    password: "",
    username: "",
    birthDate: "",
    preferredStyle: Style.CASUAL,
    height: 0,
    weight: 0,
    gender: Gender.F,
    phoneNum: "",
    shoeSize: 0,
    avatarBaseImageUrl: "temp",
    userBaseImageUrl: "",
  });

  const router = useRouter();

  const handleSubmit = async (fileUrl?: string) => {
    // 필수 필드 검증

    if (!data.username || !data.birthDate || !data.phoneNum) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    try {
      // fileUrl이 전달되면 data 상태 업데이트
      const finalData = fileUrl
        ? {
            ...data,
            userBaseImageUrl: fileUrl,
          }
        : {
            ...data,
          };

      console.log(data);
      console.log("이메일 회원가입 데이터:", finalData);
      const response = await signup(finalData);

      if (response) {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
      console.log("회원가입 에러", error);
      router.push("/signin");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center px-4 sm:px-6 md:px-8 lg:px-0 mb-10">
      <div className="w-full max-w-[640px] p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold my-6 md:my-8">회원가입</h2>

        {step === 1 && (
          <SendVerification setStep={setStep} data={data} setData={setData} />
        )}
        {step === 2 && <VerifyCode setStep={setStep} email={data.email} />}
        {step === 3 && (
          <PasswordForm setStep={setStep} data={data} setData={setData} />
        )}
        {step === 4 && (
          <SignupForm setStep={setStep} data={data} setData={setData} />
        )}
        {step === 5 && (
          <TryonImgUploader
            onSubmit={handleSubmit}
            data={data}
            setData={setData}
          />
        )}
        {step === 6 && <Success />}
      </div>
    </div>
  );
};

export default SignupClient;
