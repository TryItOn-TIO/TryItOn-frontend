"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAvatarStore } from "@/stores/avatar-store";
import { saveClosetAvatar } from "@/api/closet";
import { fetchLatestAvatarInfo, resetAvatar } from "@/api/avatar";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import Modal from "@/components/ui/Modal";

import { getAccessToken } from "@/utils/auth";

interface TryOnResultModalProps {
  onClose: () => void;
}

const TryOnResultModal = ({ onClose }: TryOnResultModalProps) => {
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

  // 로그인 상태 확인
  const token = getAccessToken();
  const isLoggedIn = !!token;

  // 모달이 열리자마자 로그인 여부를 체크해야함 (<- 마운트 시점에 실행되어야함)
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      onClose(); // 모달 닫기
      return;
    }

    const loadAvatarInfo = async () => {
      try {
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
        setAvatarLoading(false);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
      }
    };
    loadAvatarInfo();
  }, [setAvatarInfo, setAvatarLoading]);

  const handleAddToCloset = async () => {
    try {
      setIsClosetLoading(true);
      setMessage(null);

      if (!selectedProductIds || selectedProductIds.length === 0) {
        setMessage("착용할 상품을 먼저 선택해주세요.");
        return;
      }

      await saveClosetAvatar({
        items: selectedProductIds.map((productId) => ({ productId })),
      });

      setMessage("옷장에 성공적으로 추가되었습니다!");
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("옷장 추가 실패:", error);
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
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsClosetLoading(false);
    }
  };

  const handleResetAvatar = async () => {
    try {
      setIsResetLoading(true);
      setMessage(null);
      setAvatarLoading(true);

      const response = await resetAvatar();

      if (response.success) {
        const updatedAvatarInfo = await fetchLatestAvatarInfo();
        setAvatarInfo(updatedAvatarInfo);
        clearSelectedProducts();
        setMessage("아바타가 초기화되었습니다.");
      } else {
        setMessage(response.message || "아바타 초기화에 실패했습니다.");
      }
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error("아바타 리셋 실패:", error);
      setMessage(
        `아바타 초기화에 실패했습니다: ${error.message || "알 수 없는 오류"}`
      );
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsResetLoading(false);
      setAvatarLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="가상 피팅">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800" />
          <div className="flex gap-2">
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
        </div>

        {message && (
          <div
            className={`absolute top-20 right-4 z-10 px-3 py-2 rounded-lg text-sm ${
              message.includes("성공") || message.includes("초기화되었습니다")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
            }`}
          >
            {message}
          </div>
        )}

        {isAvatarLoading && (
          <div className="absolute top-20 left-4 z-10 px-3 py-2 rounded-lg text-sm bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            옷을 입고 있어요 👕 (최대 1분 소요됩니다)
          </div>
        )}

        <div className="w-full flex justify-center my-6 relative">
          {avatarInfo.avatarImgUrl ? (
            <div className="relative">
              <Image
                src={avatarInfo.avatarImgUrl}
                alt="착장한 아바타"
                width={350}
                height={350}
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
                <span className="text-sm text-gray-500">
                  아바타 이미지 없음
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 max-h-[20vh] overflow-y-auto px-2">
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
            <p className="text-sm text-center text-gray-500 mt-2">
              {isAvatarLoading
                ? "옷을 입는 중입니다."
                : "입은 상품이 없습니다."}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TryOnResultModal;
