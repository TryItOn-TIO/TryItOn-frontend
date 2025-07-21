"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAvatarStore } from "@/stores/avatar-store";
import { saveClosetAvatar } from "@/api/closet";
import { fetchLatestAvatarInfo, resetAvatar } from "@/api/avatar";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

const AvatarWearInfo = () => {
  const avatarInfo = useAvatarStore((state) => state.avatarInfo);
  const setAvatarInfo = useAvatarStore((state) => state.setAvatarInfo);
  const selectedProductIds = useAvatarStore(
    (state) => state.selectedProductIds
  );
  const isAvatarLoading = useAvatarStore((state) => state.isLoading);
  const setAvatarLoading = useAvatarStore((state) => state.setLoading);
  const clearSelectedProducts = useAvatarStore(
    (state) => state.clearSelectedProducts
  );

  const [isClosetLoading, setIsClosetLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 컴포넌트가 마운트될 때 아바타 정보를 받아옴
  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data); // 전역 상태 업데이트
        console.log(avatarInfo);

        setAvatarLoading(false);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };

    loadAvatarInfo();
  }, [setAvatarInfo]);

  // 착장한 아바타를 옷장에 추가함
  const handleAddToCloset = async () => {
    console.log("전역 관리 중인 선택된 상품 id: ", selectedProductIds);

    try {
      setIsClosetLoading(true);
      setMessage(null);

      // 선택된 상품이 없는 경우 체크
      if (!selectedProductIds || selectedProductIds.length === 0) {
        setMessage("착용할 상품을 먼저 선택해주세요.");
        return;
      }

      console.log("Sending to closet:", {
        items: selectedProductIds.map((productId) => ({ productId })),
      });

      const response = await saveClosetAvatar({
        items: selectedProductIds.map((productId) => ({ productId })),
      });

      console.log("Closet save response:", response);
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
        setMessage(
          `옷장 추가에 실패했습니다: ${error.message || "알 수 없는 오류"}`
        );
      }

      // 3초 후 메시지 제거
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsClosetLoading(false);
    }
  };

  // 아바타 리셋 처리
  const handleResetAvatar = async () => {
    try {
      setIsResetLoading(true);
      setMessage(null);
      setAvatarLoading(true);

      const response = await resetAvatar();

      if (response.success) {
        // 리셋 성공 후 최신 아바타 정보 다시 불러오기
        const updatedAvatarInfo = await fetchLatestAvatarInfo();
        setAvatarInfo(updatedAvatarInfo);

        // 선택된 상품 목록 초기화
        clearSelectedProducts();

        setMessage("아바타가 초기화되었습니다.");
      } else {
        setMessage(response.message || "아바타 초기화에 실패했습니다.");
      }

      // 3초 후 메시지 제거
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("아바타 리셋 실패:", error);
      setMessage(
        `아바타 초기화에 실패했습니다: ${error.message || "알 수 없는 오류"}`
      );

      // 3초 후 메시지 제거
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsResetLoading(false);
      setAvatarLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col justify-center relative">
      {/* 옷장에 추가 버튼 (우측 상단 고정) */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {/* 아바타 리셋 버튼 */}
        <button
          onClick={handleResetAvatar}
          disabled={isAvatarLoading || isResetLoading}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
            isResetLoading || isAvatarLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          aria-label="아바타 초기화"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          {isResetLoading ? "초기화 중..." : "초기화"}
        </button>

        {/* 옷장에 추가 버튼 */}
        <button
          onClick={handleAddToCloset}
          disabled={isAvatarLoading || isClosetLoading}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isClosetLoading || isAvatarLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-neutral-600"
          }`}
          aria-label="옷장에 추가"
        >
          {isClosetLoading ? "추가 중..." : "옷장에 추가"}
        </button>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div
          className={`absolute top-16 right-4 z-10 px-3 py-2 rounded-lg text-sm ${
            message.includes("성공") || message.includes("초기화되었습니다")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* 아바타 착용 중 안내 메시지 */}
      {isAvatarLoading && (
        <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-lg text-sm bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          옷을 입고 있어요 👕 (최대 1분 소요됩니다)
        </div>
      )}

      {/* 아바타 이미지 */}
      <div className="w-full flex justify-center mb-6 relative">
        {avatarInfo.avatarImgUrl ? (
          <div className="relative">
            <Image
              src={avatarInfo.avatarImgUrl}
              alt="착장한 아바타"
              width={400}
              height={400}
              className={`object-contain transition-opacity duration-300 ${
                isAvatarLoading ? "opacity-50" : "opacity-100"
              }`}
            />
            {isAvatarLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[180px] h-[180px] bg-gray-200 rounded-md flex items-center justify-center">
            {isAvatarLoading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">착용 중...</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">아바타 이미지 없음</span>
            )}
          </div>
        )}
      </div>

      {/* 착장 상품 리스트 */}
      <div className="mt-3">
        {avatarInfo?.products && avatarInfo.products.length > 0 ? (
          <ul className="space-y-2">
            {avatarInfo.products.map((product, idx) => (
              <li key={idx}>
                <Link
                  href={`/detail/${product.productId}`}
                  className="block group transition-all"
                >
                  <span className="text-xs text-gray-400 group-hover:text-gray-500">
                    {product.categoryName}
                  </span>
                  <div className="text-base text-black font-semibold group-hover:underline leading-tight">
                    {product.productName}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            {isAvatarLoading ? "옷을 입는 중입니다." : "입은 상품이 없습니다."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AvatarWearInfo;
