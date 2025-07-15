"use client";

import { createAvatar } from "@/api/avatar";
import { AvatarResponse } from "@/types/avatar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

type AvatarModalProps = {
  onClose: () => void;
  isLoggedIn: boolean;
};

const AvatarModal = ({ onClose, isLoggedIn }: AvatarModalProps) => {
  const params = useParams();
  const id = Number(params?.id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState<AvatarResponse>({
    avatarId: id,
    avatarImgUrl: "",
    products: [],
  });

  const makeAvatar = async () => {
    try {
      setLoading(true);
      const response = await createAvatar({ productId: id });
      setAvatar(response);
    } catch (error) {
      console.error("아바타 생성 실패", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      makeAvatar();
    }
  }, [isLoggedIn]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center px-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 콘텐츠 */}
        <div className="flex flex-col items-center text-center mt-4">
          {/* 로그인 안 된 경우 */}
          {!isLoggedIn && (
            <>
              <p className="text-lg font-semibold text-gray-800">
                아바타를 만들려면 로그인해주세요.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                로그인 후 아바타를 생성할 수 있어요!
              </p>
            </>
          )}

          {/* 로딩 */}
          {isLoggedIn && loading && (
            <>
              <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                옷을 입고 있어요 👕
              </p>
              <p className="text-sm text-gray-500 mt-2">
                잠시만 기다려주세요. 최대 1분 정도 소요될 수 있어요!
              </p>
            </>
          )}

          {/* 에러 */}
          {isLoggedIn && error && (
            <>
              <p className="text-lg font-semibold text-red-500">
                아바타 생성에 실패했습니다. 😢
              </p>
              <p className="text-sm text-gray-500 mt-2">다시 시도해주세요!</p>
            </>
          )}

          {/* 완료 */}
          {isLoggedIn && !loading && !error && avatar.avatarImgUrl && (
            <>
              {/* 상품 정보 */}
              <div className="text-left w-full mb-4">
                <div className="text-sm text-gray-400">
                  {avatar.products[0]?.categoryName}
                </div>
                <div className="text-xl font-semibold text-gray-800">
                  {avatar.products[0]?.productName}
                </div>
              </div>

              {/* 아바타 이미지 */}
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border shadow">
                <Image
                  src={avatar.avatarImgUrl}
                  alt="생성된 아바타"
                  fill
                  className="object-contain"
                />

                {/* 알림 애니메이션 */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
              </div>

              <p className="text-sm text-gray-600 mt-4">
                착용 완료! 총 {avatar.products.length}개의 아이템을 입었어요.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
