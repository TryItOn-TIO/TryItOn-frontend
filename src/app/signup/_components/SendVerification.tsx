import { sendEmail } from "@/api/auth";
import BlackButton from "@/components/common/BlackButton";
import InputText from "@/components/forms/InputText";
import { SignupRequest } from "@/types/auth";
import { validateEmail } from "@/utils/validator";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type SendVerificationProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: SignupRequest;
  setData: Dispatch<SetStateAction<SignupRequest>>;
};

const SendVerification = ({
  setStep,
  data,
  setData,
}: SendVerificationProps) => {
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!validateEmail(data.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    await sendEmail(data.email);

    if (confirm("인증번호가 발송되었습니다.")) {
      setStep(2);
    }
  };

  useEffect(() => {
    if (!validateEmail(data.email)) {
      setError("이메일 형식이 올바르지 않습니다.");
    } else {
      setError("");
    }
  }, [data.email]);

  return (
    <div className="flex flex-col gap-10">
      어서오세요!
      <br />
      가입하실 이메일을 입력해주세요.
      <div className="my-10 flex flex-col gap-8">
        <InputText
          placeholder="이메일"
          value={data.email}
          handleChange={(value: string) =>
            setData((prev) => ({ ...prev, email: value }))
          }
          type="email"
          isValid={error == ""}
          errorMessage={error}
        />
        <BlackButton text="인증번호 발송" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default SendVerification;
