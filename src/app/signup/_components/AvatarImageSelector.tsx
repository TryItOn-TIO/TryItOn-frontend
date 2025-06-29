import Image from "next/image";
import React, { useState } from "react";
import { SignupRequest } from "@/types/auth";
import BlackButton from "@/components/common/BlackButton";

type AvatarImageSelectorProps<T extends SignupRequest> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: () => void;
};

const sampleAvatars = [
  "/images/signup/female_body_shape1.png",
  "/images/signup/female_body_shape2.png",
  "/images/signup/female_body_shape3.png",
  "/images/signup/female_body_shape4.png",
  "/images/signup/female_body_shape5.png",
  "/images/signup/female_body_shape6.png",
];

const AvatarImageSelector = <T extends SignupRequest>({
  data,
  setData,
  onSubmit,
}: AvatarImageSelectorProps<T>) => {
  const [selected, setSelected] = useState<string>(
    data.avatarBaseImageUrl || ""
  );

  const handleSelect = (url: string) => {
    setSelected(url);
    setData((prev) => ({
      ...prev,
      avatarBaseImageUrl: url,
    }));
  };

  const handleNext = () => {
    if (!selected) {
      alert("아바타 이미지를 선택해주세요.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>나와 유사한 체형을 선택해주세요.</div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {sampleAvatars.map((url, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(url)}
            className={`w-[12rem] h-[12rem] cursor-pointer border-4 rounded ${
              selected === url ? "border-blue-500" : "border-transparent"
            }`}
          >
            <Image
              src={url}
              alt={`body-shape-${idx}`}
              width={200}
              height={200}
              className="rounded object-cover"
            />
          </div>
        ))}
      </div>

      <BlackButton text="회원가입" handleClick={handleNext} />
    </div>
  );
};

export default AvatarImageSelector;
