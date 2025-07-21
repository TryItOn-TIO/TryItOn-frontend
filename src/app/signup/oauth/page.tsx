"use client";

import { signupWithGoogle } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import SignupForm from "@/app/signup/_components/SignupForm";
import { Gender } from "@/constants/Gender";
import { Style } from "@/constants/Style";
import { useIdToken } from "@/hooks/useIdToken";
import { GoogleSignupRequest } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TryonImgUploader from "@/app/signup/_components/TryonImgUploader";
import Spinner from "@/components/common/Spinner";
import CustomAlert from "@/components/ui/CustomAlert";
import { useCustomAlert } from "@/hooks/useCustomAlert";

const Oauth = () => {
  const { idToken } = useIdToken();
  const router = useRouter();
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<GoogleSignupRequest>({
    username: "",
    birthDate: "",
    preferredStyle: Style.CASUAL,
    height: 0,
    weight: 0,
    gender: Gender.F,
    phoneNum: "",
    shoeSize: 0,
    avatarBaseImageUrl: "temp",
    userBaseImageUrl: "",
    idToken: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (fileUrl?: string) => {
    if (!idToken) {
      openAlert({
        title: "인증 오류",
        message: "인증 정보가 없습니다. 다시 로그인해주세요.",
        type: "error",
        onConfirm: () => {
          router.push("/signin");
        },
      });
      return;
    }

    try {
      setIsLoading(true);

      const finalData = fileUrl
        ? {
            ...data,
            userBaseImageUrl: fileUrl,
            idToken,
          }
        : {
            ...data,
            idToken,
          };

      const response = await signupWithGoogle(finalData);

      setIsLoading(false);
      if (response.accessToken) {
        setAccessToken(response.accessToken);
        router.push("/");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      openAlert({
        title: "회원가입 오류",
        message: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        type: "error",
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="w-screen min-h-screen flex justify-center px-4 sm:px-6 md:px-8 lg:px-0 mb-10">
        <div className="w-full max-w-[640px] p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">회원가입 정보 입력</h2>
          {step == 1 && (
            <SignupForm setStep={setStep} data={data} setData={setData} />
          )}
          {step == 2 && (
            <TryonImgUploader
              onSubmit={handleSubmit}
              data={data}
              setData={setData}
            />
          )}
        </div>
      </div>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
    </>
  );
};

export default Oauth;
