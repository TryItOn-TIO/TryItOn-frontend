import { EmailSignupRequest } from "@/types/auth";
import React, { Dispatch, SetStateAction } from "react";
import SignupForm from "./SignupForm";

type AdditionalInfoFormProps = {
  setStep: Dispatch<SetStateAction<number>>;
  data: EmailSignupRequest;
  setData: Dispatch<SetStateAction<EmailSignupRequest>>;
};

const AdditionalInfoForm = ({
  setStep,
  data,
  setData,
}: AdditionalInfoFormProps) => {
  return (
    <div>
      <SignupForm setStep={setStep} data={data} setData={setData} />
    </div>
  );
};

export default AdditionalInfoForm;
