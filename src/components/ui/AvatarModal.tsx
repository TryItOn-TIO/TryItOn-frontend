"use client";

import { createAvatar } from "@/api/avatar";
import { useAvatarStore } from "@/stores/avatar-store";
import { AvatarResponse } from "@/types/avatar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type AvatarModalProps = {
  onClose: () => void;
};

const AvatarModal = ({ onClose }: AvatarModalProps) => {
  const params = useParams();
  const id = Number(params?.id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState<AvatarResponse>({
    avatarId: id,
    avatarImg: "",
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
    makeAvatar();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.25)] z-40">
      <div className="relative w-[40rem] h-[80vh] bg-[rgba(233,233,233,0.95)] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
        {/* 닫기 버튼 */}
        <div className="absolute top-6 right-8 cursor-pointer">
          <Image
            src="/images/common/close_icon.svg"
            width={15}
            height={15}
            alt="닫기"
            onClick={onClose}
          />
        </div>

        {/* 로딩 시 */}
        {loading && (
          <div className="text-center text-lg">
            <p>옷을 입고 있어요 👕</p>
            <p className="mt-2 text-sm text-gray-500">
              잠시만 기다려주세요! 최대 1분 소요됩니다
            </p>
          </div>
        )}
        {/* 에러 발생 시 */}
        {error && (
          <div className="text-center text-lg">
            <p>아바타 생성에 실패했습니다. 😢</p>
            <p className="mt-2 text-sm text-gray-500">다시 시도해주세요!</p>
          </div>
        )}
        {/* try on 성공 시 */}
        {!loading && !error && (
          <>
            {/* 상품 정보 */}
            <div className="absolute top-6 left-8">
              <div className="text-sm text-gray-500">
                {avatar.products[0]?.categoryName}
              </div>
              <div className="text-xl font-semibold mb-1">
                {avatar.products[0]?.productName}
              </div>
            </div>
            {avatar.avatarImg && (
              <div className="flex-1 flex items-center justify-center w-full h-full overflow-hidden">
                <Image
                  src={avatar.avatarImg}
                  width={250}
                  height={250}
                  alt="생성된 아바타 이미지"
                  className="rounded-lg border shadow object-contain"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AvatarModal;
