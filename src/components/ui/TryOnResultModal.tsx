"use client";

import React from "react";
import Image from "next/image";
import { useTryOnStore } from "@/stores/try-on-store";
import Modal from "@/components/ui/Modal";

interface TryOnResultModalProps {
  onClose: () => void;
}

const TryOnResultModal = ({ onClose }: TryOnResultModalProps) => {
  const { status, resultImageUrl, viewNotification } = useTryOnStore();

  const handleClose = () => {
    viewNotification(); // 모달이 닫힐 때 알림을 확인했음을 상태에 기록
    onClose();
  };

  const getModalContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <Image
              src="/images/common/spinner.gif"
              width={60}
              height={60}
              alt="로딩 중"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              옷을 입어보는 중입니다...
            </p>
            <p className="text-sm text-gray-500">잠시만 기다려주세요.</p>
          </div>
        );
      case "success":
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
              아바타 착용 완료!
            </h3>
            <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-lg overflow-hidden bg-gray-100">
              {resultImageUrl ? (
                <Image
                  src={resultImageUrl}
                  alt="완성된 아바타"
                  fill
                  className="object-contain"
                />
              ) : (
                <p className="text-center text-gray-500">이미지 로드 실패</p>
              )}
            </div>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-lg font-semibold text-red-500">
              오류가 발생했습니다.
            </p>
            <p className="mt-2 text-sm text-gray-600">다시 시도해주세요.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal onClose={handleClose} title="아바타 착용 결과">
      <div className="w-full max-w-[340px] mx-auto">{getModalContent()}</div>
    </Modal>
  );
};

export default TryOnResultModal;
