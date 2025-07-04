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
import AvatarImageSelector from "@/app/signup/_components/AvatarImageSelector";
import { useRouter } from "next/navigation";

const Signup = () => {
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
    avatarBaseImageUrl: "",
    userBaseImageUrl: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    // 필수 필드 검증
    console.log(data);

    if (!data.username || !data.birthDate || !data.phoneNum) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }
    try {
      const response = await signup(data);

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
    <div className="w-screen mb-10">
      <div className="w-[40rem] mx-auto p-6">
        <h2 className="text-2xl font-bold my-8">회원가입</h2>
        {step == 1 && (
          <SendVerification setStep={setStep} data={data} setData={setData} />
        )}
        {step == 2 && <VerifyCode setStep={setStep} email={data.email} />}
        {step == 3 && (
          <PasswordForm setStep={setStep} data={data} setData={setData} />
        )}
        {step == 4 && (
          <SignupForm setStep={setStep} data={data} setData={setData} />
        )}
        {step == 5 && (
          <TryonImgUploader setStep={setStep} data={data} setData={setData} />
        )}
        {step == 6 && (
          <AvatarImageSelector
            data={data}
            setData={setData}
            onSubmit={handleSubmit}
          />
        )}
        {step == 7 && <Success />}
      </div>
    </div>
  );
};

export default Signup;
