"use client";

import { useState } from "react";
import SendVerification from "@/app/signup/_components/SendVerification";
import VerifyCode from "@/app/signup/_components/VerifyCode";
import AdditionalInfoForm from "@/app/signup/_components/AdditionalInfoForm";
import Success from "@/app/signup/_components/Success";
import { SignupRequest } from "@/types/auth";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SignupRequest>({
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

  return (
    <div className="w-screen">
      <div className="w-[28rem] mx-auto p-6">
        <h2 className="text-2xl font-bold my-8">회원가입</h2>
        {step === 1 && (
          <SendVerification setStep={setStep} data={data} setData={setData} />
        )}
        {step === 2 && <VerifyCode setStep={setStep} email={data.email} />}
        {step === 3 && (
          <AdditionalInfoForm setStep={setStep} data={data} setData={setData} />
        )}
        {step === 4 && <Success />}
      </div>
    </div>
  );
};

export default Signup;
