"use client";

import BlackButton from "@/components/common/BlackButton";
import InputText from "@/components/forms/InputText";
import { validateEmail, validatePassword } from "@/utils/validator";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type SigninFormProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
};

const SigninForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: SigninFormProps) => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // submit시, 유효성 검사
  const handleSubmit = () => {
    if (emailError || passwordError) {
      openAlert({
        title: "로그인 안내",
        message: "형식에 맞게 다시 입력해 주세요.",
        type: "error",
      });
      return;
    }
    onSubmit();
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
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />

      <div className="flex flex-col items-center gap-4">
        <InputText
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          type="text"
          isInvalid={emailError}
          errorMessage="이메일 형식에 맞게 입력해 주세요."
        />
        <InputText
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호"
          type="password"
          isInvalid={passwordError}
          errorMessage="비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요."
        />
        <div className="w-full mt-6">
          <BlackButton text="로그인" handleClick={handleSubmit} />
        </div>
      </div>
      <div className="w-full flex gap-4 justify-end my-3">
        <Link href={"/signup"} className="text-sm text-gray-400 cursor-pointer">
          이메일로 가입하기
        </Link>
        {/* <p className="text-sm text-gray-400 cursor-pointer">비밀번호 찾기</p> */}
      </div>
    </>
  );
};

export default SigninForm;
