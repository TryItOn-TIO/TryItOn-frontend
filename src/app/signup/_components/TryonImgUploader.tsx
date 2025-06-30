"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { SignupRequest } from "@/types/auth";
import BlackButton from "@/components/common/BlackButton";
import Image from "next/image";

type TryonImgUploaderProps<T extends SignupRequest> = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: T;
  setData: Dispatch<SetStateAction<T>>;
};

const TryonImgUploader = <T extends SignupRequest>({
  setStep,
  data,
  setData,
}: TryonImgUploaderProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview("/images/dummy/ex10.png");
      // TODO: S3 업로드 후, 링크로 전송해야 함
      setData((prev) => ({
        ...prev,
        userBaseImageUrl:
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUVBJUIwJTk1JUVDJTk1JTg0JUVDJUE3JTgwJUVCJTkzJUE0fGVufDB8fDB8fHww",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleClickNext = () => {
    if (!data.userBaseImageUrl) {
      alert("전신 사진을 업로드해주세요.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center gap-18">
      <div className="w-full text-start">
        전신이 잘 보이도록 정면에서 찍은 사진을 업로드해주세요.
      </div>

      {/* 미리보기 사진 및 사진 선택 버튼 */}
      <div className="w-full flex flex-col items-center gap-4">
        {preview ? (
          <Image
            src={preview}
            width={300}
            height={400}
            alt="전신 사진 미리보기"
            className="w-48 h-auto rounded-md shadow-md"
          />
        ) : (
          <div className="w-48 h-64 border border-gray-300 flex items-center justify-center rounded-md text-sm text-gray-400">
            미리보기 없음
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          사진 선택
        </button>
      </div>

      {/* submit 버튼 */}
      <BlackButton text="다음" handleClick={handleClickNext} />
    </div>
  );
};

export default TryonImgUploader;
