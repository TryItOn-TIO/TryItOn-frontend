"use client";

import React, { useState } from "react";
import InputText from "@/components/forms/InputText";
import Button from "@/components/common/BlackButton";
import Link from "next/link";
import SigninWithGoogle from "./_components/OAuthGoogle";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("로그인 버튼 클릭:", { email, password });
  };

  return (
    <div className="w-[28rem] mx-auto p-6">
      <h2 className="text-2xl font-bold my-8">로그인</h2>
      <div className="flex flex-col items-center gap-4">
        <InputText
          value={email}
          handleChange={setEmail}
          placeholder="이메일"
          type="text"
        />
        <InputText
          value={password}
          handleChange={setPassword}
          placeholder="비밀번호"
          type="password"
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
