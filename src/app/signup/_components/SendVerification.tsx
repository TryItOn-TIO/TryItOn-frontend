import { sendEmail } from "@/api/auth";
import BlackButton from "@/components/common/BlackButton";
import Spinner from "@/components/common/Spinner";
import InputText from "@/components/forms/InputText";
import { EmailSignupRequest } from "@/types/auth";
import { validateEmail } from "@/utils/validator";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type SendVerificationProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: EmailSignupRequest;
  setData: Dispatch<SetStateAction<EmailSignupRequest>>;
};

const SendVerification = ({
  setStep,
  data,
  setData,
}: SendVerificationProps) => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handelChange = (value: string) => {
    setData((prev) => ({ ...prev, email: value }));
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error) {
      openAlert({
        title: "이메일 형식 안내",
        message: "이메일 형식이 올바르지 않습니다.",
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      await sendEmail(data.email);
      setIsLoading(false);

      if (confirm("인증번호가 발송되었습니다.")) {
        setStep((prev) => prev + 1);
      }
    } catch (error) {
      openAlert({
        title: "안내",
        message: "이미 가입된 이메일입니다.",
        type: "error",
      });
      console.log("인증번호 발송 에러", error);
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (!validateEmail(data.email)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data.email]);

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
      {isLoading && <Spinner />}
      <div className="flex flex-col gap-10">
        어서오세요!
        <br />
        가입하실 이메일을 입력해주세요.
        <form onSubmit={handleClick} className="my-10 flex flex-col gap-8">
          <InputText
            placeholder="이메일"
            value={data.email}
            onChange={handelChange}
            type="email"
            isInvalid={error}
            errorMessage="이메일 형식이 올바르지 않습니다."
          />
          <BlackButton text="인증번호 발송" />
        </form>
      </div>
    </>
  );
};

export default SendVerification;
