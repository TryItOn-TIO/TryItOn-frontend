import BlackButton from "@/components/common/BlackButton";
import InputText from "@/components/forms/InputText";
import { EmailSignupRequest } from "@/types/auth";
import { validatePassword } from "@/utils/validator";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PasswordFormProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: EmailSignupRequest;
  setData: Dispatch<SetStateAction<EmailSignupRequest>>;
};

const PasswordForm = ({ setStep, data, setData }: PasswordFormProps) => {
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (error) {
      alert("비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (!validatePassword(data.password)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data.password]);

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-14">비밀번호를 입력해주세요.</div>
      <InputText
        value={data.password}
        handleChange={(value) =>
          setData((prev) => ({ ...prev, password: value }))
        }
        placeholder="비밀번호"
        type="password"
        isInvalid={error}
        errorMessage="비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요."
      />
      <BlackButton text="다음" handleClick={handleSubmit} />
    </div>
  );
};

export default PasswordForm;
