"use client";

import React, { useState } from "react";
import SigninWithGoogle from "@/app/signin/_components/OAuthGoogle";
import { signin } from "@/api/auth";
import { useRouter } from "next/navigation";
import SigninForm from "@/app/signin/_components/SigninForm";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

const SigninClient = () => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await signin({ email, password });
      console.log(response);
      router.push("/");
    } catch (error) {
      console.error(error);
      openAlert({
        title: "회원가입 안내",
        message: "회원가입이 필요합니다.",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />

      <div className="w-[28rem] mx-auto p-6">
        <h2 className="text-2xl font-bold my-8">로그인</h2>
        <SigninForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
        />
        <SigninWithGoogle />
      </div>
    </>
  );
};

export default SigninClient;
