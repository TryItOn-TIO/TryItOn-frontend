import BlackButton from "@/components/common/BlackButton";
import InputText from "@/components/forms/InputText";
import { EmailSignupRequest } from "@/types/auth";
import { validatePassword } from "@/utils/validator";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

type PasswordFormProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: EmailSignupRequest;
  setData: Dispatch<SetStateAction<EmailSignupRequest>>;
};

const PasswordForm = ({ setStep, data, setData }: PasswordFormProps) => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (error) {
      openAlert({
        title: "비밀번호 안내",
        message:
          "비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요.",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handelChange = (value: string) => {
    setData((prev) => ({ ...prev, password: value }));
  };

  useEffect(() => {
    if (!validatePassword(data.password)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [data.password]);

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
      <div className="flex flex-col gap-6">
        <div className="mb-14">비밀번호를 입력해주세요.</div>
        <InputText
          value={data.password}
          onChange={handelChange}
          placeholder="비밀번호"
          type="password"
          isInvalid={error}
          errorMessage="비밀번호는 8자 이상으로 영문, 숫자, 특수문자를 포함해 주세요."
        />
        <BlackButton text="다음" handleClick={handleSubmit} />
      </div>
    </>
  );
};

export default PasswordForm;
