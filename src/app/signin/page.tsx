"use client";

import React, { useEffect, useState } from "react";
import InputText from "@/components/forms/InputText";
import Button from "@/components/common/BlackButton";
import Link from "next/link";
import SigninWithGoogle from "./_components/OAuthGoogle";
import { signin } from "@/api/auth";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validator";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (emailError || passwordError) {
      alert("형식에 맞게 다시 입력해 주세요.");
    }
    try {
      const response = await signin({ email, password });
      console.log(response);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("회원가입이 필요합니다.");
    }
  };

  useEffect(() => {
    // 이메일 필드 유효성 검사
    if (!validateEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // 비밀번호 필드 유효성 검사
    if (!validatePassword(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [email, password]);

  return (
    <div className="w-[28rem] mx-auto p-6">
      <h2 className="text-2xl font-bold my-8">로그인</h2>
      <div className="flex flex-col items-center gap-4">
        <InputText
          value={email}
          handleChange={setEmail}
          placeholder="이메일"
          type="text"
          isInvalid={emailError}
          errorMessage="이메일 형식에 맞게 입력해 주세요."
        />
        <InputText
          value={password}
          handleChange={setPassword}
          placeholder="비밀번호"
          type="password"
          isInvalid={passwordError}
          errorMessage="비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요."
        />
        <div className="w-full mt-6">
          <Button text="로그인" handleClick={handleSubmit} />
        </div>
      </div>
      <div className="w-full flex gap-4 justify-end my-3">
        <Link href={"/signup"} className="text-sm text-gray-400 cursor-pointer">
          이메일로 가입하기
        </Link>
        <p className="text-sm text-gray-400 cursor-pointer">비밀번호 찾기</p>
      </div>

      <SigninWithGoogle />
    </div>
  );
};

export default Signin;
