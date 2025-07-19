"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { SignupRequest } from "@/types/auth";
import BlackButton from "@/components/common/BlackButton";
import Image from "next/image";
import { generatePresignedUrl, uploadFileToS3 } from "@/api/files";

type TryonImgUploaderProps<T extends SignupRequest> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  onSubmit: (fileUrl?: string) => void; // fileUrl 파라미터 추가
};

// 기본 이미지 경로
const BASE_AVATAR_URL =
  "https://tio-image-storage-jungle8th.s3.ap-northeast-2.amazonaws.com/base/default_avatar.png";

const TryonImgUploader = <T extends SignupRequest>({
  onSubmit,
  setData,
  data,
}: TryonImgUploaderProps<T>) => {
  const [preview, setPreview] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 파일 타입 검증
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다.");
      return;
    }

    setSelectedFile(file);

    // 미리보기만 생성 (업로드는 하지 않음)
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitWithoutImg = () => {
    // 기본 이미지를 사용하므로 업로드 과정 없이 바로 onSubmit 호출
    console.log("다음에 추가하기 클릭: 기본 이미지 사용", BASE_AVATAR_URL);
    setData((prev) => ({
      ...prev,
      userBaseImageUrl: BASE_AVATAR_URL,
    }));
    onSubmit(BASE_AVATAR_URL);
  };

  const handleSubmit = async () => {
    if (isUploading) return; // 중복 클릭 방지

    // 파일을 선택하지 않았으면
    if (!selectedFile) {
      handleSubmitWithoutImg(); // 기본 이미지로 진행
      return;
    }
    setIsUploading(true);

    try {
      // S3 업로드 실행
      console.log("S3 업로드 시작...");

      // 고유한 파일명 생성 (타임스탬프 + 원본 파일명)
      const timestamp = Date.now();
      const fileName = `temp/${timestamp}_${selectedFile.name}`;

      const presignedUrl = await generatePresignedUrl(fileName);

      if (!presignedUrl) {
        throw new Error("Presigned URL 생성에 실패했습니다.");
      }

      await uploadFileToS3(presignedUrl, selectedFile);
      const fileUrl = presignedUrl.split("?")[0];

      console.log("업로드 성공:", fileUrl);

      // 먼저 데이터 업데이트
      setData((prev) => ({
        ...prev,
        userBaseImageUrl: fileUrl,
      }));

      console.log("TryonImgUploader -> ", data);

      // fileUrl을 직접 onSubmit에 전달
      console.log("onSubmit 호출 시작 - fileUrl:", fileUrl);
      onSubmit(fileUrl);
    } catch (error: any) {
      console.error("업로드 실패:", error);

      let errorMessage = "업로드에 실패했습니다. 다시 시도해주세요.";

      if (
        error.message?.includes("network") ||
        error.code === "NETWORK_ERROR"
      ) {
        errorMessage = "네트워크 연결을 확인하고 다시 시도해주세요.";
      } else if (error.message?.includes("timeout")) {
        errorMessage =
          "업로드 시간이 초과되었습니다. 파일 크기를 확인하고 다시 시도해주세요.";
      } else if (error.status === 403) {
        errorMessage = "파일 업로드 권한이 없습니다. 관리자에게 문의해주세요.";
      } else if (error.status === 413) {
        errorMessage = "파일 크기가 너무 큽니다. 더 작은 파일을 선택해주세요.";
      }

      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-18">
      <div className="w-full text-start">
        전신이 잘 보이도록 정면에서 찍은 사진을 업로드해주세요.
        <div className="text-sm text-gray-500 mt-2">
          • 지원 형식: JPG, PNG, WEBP • 최대 크기: 10MB
        </div>
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
          accept="image/jpeg,image/jpg,image/png,image/webp"
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
          {isUploading ? "업로드 중..." : "사진 선택"}
        </button>

        {selectedFile && (
          <div className="text-sm text-gray-600">
            선택된 파일: {selectedFile.name}
            <div className="text-xs text-gray-400">
              크기: {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
            </div>
          </div>
        )}
      </div>
      {/* submit 버튼 */}
      <div className="w-full flex flex-col items-center gap-3">
        <BlackButton
          text={isUploading ? "진행 중..." : "회원가입"}
          handleClick={handleSubmit}
          disabled={isUploading || !selectedFile}
        />
        <p
          className="underline text-gray-400 text-sm cursor-pointer"
          onClick={handleSubmitWithoutImg}
        >
          다음에 추가하기
        </p>
      </div>
    </div>
  );
};

export default TryonImgUploader;
