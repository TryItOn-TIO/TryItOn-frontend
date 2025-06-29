"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BlackButton from "@/components/common/BlackButton";

const Success = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/signin"); // 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-12 py-20">
      <div className="text-3xl font-bold text-sky-700">🎉 가입 완료!</div>
      <p className="text-slate-600 text-base mb-14">
        환영합니다! 회원가입이 성공적으로 완료되었습니다.
        <br />
        지금 바로 로그인해서 서비스를 이용해보세요.
      </p>
      <BlackButton text="로그인하러 가기" handleClick={handleGoToLogin} />
    </div>
  );
};

export default Success;
