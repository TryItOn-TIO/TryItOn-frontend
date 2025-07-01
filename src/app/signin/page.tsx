"use client";

import React, { useState } from "react";
import SigninWithGoogle from "@/app/signin/_components/OAuthGoogle";
import { signin } from "@/api/auth";
import { useRouter } from "next/navigation";
import SigninForm from "@/app/signin/_components/SigninForm";

const Signin = () => {
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
      alert("회원가입이 필요합니다.");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
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
  );
};

export default Signin;
