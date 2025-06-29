import { verifyCode } from "@/api/auth";
import BlackButton from "@/components/common/BlackButton";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

type VerifyCodeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
};

const VerifyCode = ({ setStep, email }: VerifyCodeProps) => {
  const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // 숫자 한 글자만 허용
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    // 다음 input으로 이동
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = codeDigits.join("");
    if (code.length < 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }
    try {
      const response = await verifyCode({ code, email });

      if (response) {
        setStep((prev) => prev + 1);
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("다시 시도해 주세요.");
      console.log("인증번호 확인 에러", error);
      router.push("/signin");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-sm text-gray-700 mt-10 mb-8">
        메일로 발송된 인증코드 6자리를 입력해주세요
      </div>
      <div className="flex gap-2 mb-24">
        {codeDigits.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            className="w-10 h-12 text-center border border-gray-300 rounded text-lg"
          />
        ))}
      </div>
      <BlackButton text="확인" handleClick={handleSubmit} />
    </div>
  );
};

export default VerifyCode;
