"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { SignupRequest } from "@/types/auth";
import BlackButton from "@/components/common/BlackButton";
import Image from "next/image";
import { generatePresignedUrl, uploadFileToS3 } from "@/api/files";

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
  const [preview, setPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // 미리보기만 생성 (업로드는 하지 않음)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClickNext = async () => {
    if (!selectedFile) {
      alert("전신 사진을 선택해주세요.");
      return;
    }

    setIsUploading(true);

    try {
      // S3 업로드 실행
      console.log("S3 업로드 시작...");
      const presignedUrl = await generatePresignedUrl(
        `temp/${selectedFile.name}`
      );
      await uploadFileToS3(presignedUrl, selectedFile);
      const fileUrl = presignedUrl.split("?")[0];

      setData((prev) => ({
        ...prev,
        userBaseImageUrl: fileUrl,
      }));

      console.log("업로드 성공:", fileUrl);
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
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
          disabled={isUploading}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:opacity-50"
        >
          사진 선택
        </button>

        {selectedFile && (
          <div className="text-sm text-gray-600">
            선택된 파일: {selectedFile.name}
          </div>
        )}
      </div>

      {/* submit 버튼 */}
      <BlackButton
        text={isUploading ? "업로드 중..." : "다음"}
        handleClick={handleClickNext}
      />
    </div>
  );
};

export default TryonImgUploader;
