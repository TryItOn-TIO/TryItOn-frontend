"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAvatarStore } from "@/stores/avatar-store";
import { saveClosetAvatar } from "@/api/closet";
import { AvatarResponse } from "@/types/avatar";

const AvatarWearInfo = () => {
  const avatarImg = useAvatarStore((state) => state.avatarImg);
  const selectedProductIds = useAvatarStore(
    (state) => state.selectedProductIds
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [avatar, setAvatar] = useState<AvatarResponse>({
    avatarId: 1,
    avatarImgUrl: "",
    products: [],
  });

  const handleAddToCloset = async () => {
    try {
      setIsLoading(true);
      setMessage(null);

      const response = await saveClosetAvatar({
        items: [{ productId: 2003 }], // TODO: 아래 코드로 변경
        // items: selectedProductIds.map(productId => ({ productId }))
      });

      setAvatar(response);
      setMessage("옷장에 성공적으로 추가되었습니다!");

      // 3초 후 메시지 제거
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("옷장 추가 실패:", error);

      // 백엔드 에러 상태에 따른 메시지 처리
      if (error.response?.status === 409) {
        setMessage("이미 옷장에 있는 착장입니다.");
      } else if (error.response?.status === 400) {
        setMessage("최대 10개의 착장만 저장할 수 있습니다.");
      } else if (error.response?.status === 404) {
        setMessage("아바타 또는 상품 정보를 찾을 수 없습니다.");
      } else {
        setMessage("옷장 추가에 실패했습니다. 다시 시도해주세요.");
      }

      // 3초 후 메시지 제거
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[85vh] p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col justify-center relative">
      {/* 옷장에 추가 버튼 (우측 상단 고정) */}
      <button
        onClick={handleAddToCloset}
        disabled={isLoading}
        className={`absolute top-4 right-4 z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        aria-label="옷장에 추가"
      >
        {isLoading ? "추가 중..." : "옷장에 추가"}
      </button>

      {/* 메시지 표시 */}
      {message && (
        <div
          className={`absolute top-16 right-4 z-10 px-3 py-2 rounded-lg text-sm ${
            message.includes("성공")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* 아바타 이미지 */}
      <div className="w-full flex justify-center mb-6">
        {avatarImg ? (
          <Image
            src={avatarImg}
            alt="착장한 아바타"
            width={180}
            height={180}
            className="object-contain"
          />
        ) : (
          <div className="w-[180px] h-[180px] bg-gray-200 rounded-md" />
        )}
      </div>

      {/* 착장 상품 리스트 */}
      <div>
        {avatar.products.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {avatar.products.map((product, idx) => (
              <li key={idx}>
                {product.categoryName} / {product.productName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">입은 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AvatarWearInfo;
