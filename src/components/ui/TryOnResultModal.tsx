"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTryOnStore } from "@/stores/try-on-store";
import { useAvatarStore } from "@/stores/avatar-store";
import Modal from "@/components/ui/Modal";
import { saveClosetAvatar } from "@/api/closet";
import { fetchLatestAvatarInfo, resetAvatar } from "@/api/avatar";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface TryOnResultModalProps {
  onClose: () => void;
}

const TryOnResultModal = ({ onClose }: TryOnResultModalProps) => {
  const isMobile = useIsMobile(); // 모바일 여부 판단

  const { status, resultImageUrl, viewNotification } = useTryOnStore();

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

  useEffect(() => {
    if (status === "success") {
      const loadAvatarInfo = async () => {
        try {
          setAvatarLoading(true);
          const data = await fetchLatestAvatarInfo();
          setAvatarInfo(data);
        } catch (error) {
          console.error("아바타 정보 로드 실패", error);
        } finally {
          setAvatarLoading(false);
        }
      };
      loadAvatarInfo();
    }
  }, [status, setAvatarInfo, setAvatarLoading]);

  const handleClose = () => {
    viewNotification();
    onClose();
    setMessage(null);
  };

  const handleAddToCloset = async () => {
    try {
      setIsClosetLoading(true);
      setMessage(null);

      if (!selectedProductIds || selectedProductIds.length === 0) {
        setMessage("착용할 상품을 먼저 선택해주세요.");
        return;
      }

      const response = await saveClosetAvatar({
        items: selectedProductIds.map((productId) => ({ productId })),
      });

      console.log("Closet save response:", response);
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

      const response = await resetAvatar(); // 아바타 초기화 API 호출

      if (response.success) {
        const updatedAvatarInfo = await fetchLatestAvatarInfo(); // 초기화 후 최신 아바타 정보 다시 불러오기
        setAvatarInfo(updatedAvatarInfo); // AvatarStore의 아바타 정보 업데이트
        clearSelectedProducts(); // 선택된 상품 목록 초기화
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

  const getModalContent = () => {
    const displayImageUrl = avatarInfo.avatarImgUrl || resultImageUrl;

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
            {isAvatarLoading && (
              <div className="mt-4 px-3 py-2 rounded-lg text-sm bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                옷을 입고 있어요 👕 (최대 1분 소요됩니다)
              </div>
            )}
          </div>
        );
      case "success":
        return (
          <div className="p-4">
            {message && (
              <div
                className={`mb-4 px-3 py-2 rounded-lg text-sm text-center ${
                  message.includes("성공") ||
                  message.includes("초기화되었습니다")
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {message}
              </div>
            )}

            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 mb-4">
              {displayImageUrl ? (
                <Image
                  src={displayImageUrl}
                  alt="완성된 아바타"
                  fill
                  className={`object-contain transition-opacity duration-300 ${
                    isAvatarLoading ? "opacity-50" : "opacity-100"
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                  {isAvatarLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600">착용 중...</span>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      이미지 로드 실패
                    </p>
                  )}
                </div>
              )}
              {isAvatarLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="mt-3 mb-6">
              {avatarInfo?.products && avatarInfo.products.length > 0 ? (
                <ul className="space-y-2">
                  {avatarInfo.products.map((product, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/detail/${product.productId}`}
                        className="block group transition-all"
                        onClick={handleClose}
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
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {isAvatarLoading
                    ? "옷을 입는 중입니다."
                    : "입은 상품이 없습니다."}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCloset}
                disabled={isAvatarLoading || isClosetLoading}
                className={`w-full py-3 rounded-md transition-colors ${
                  isClosetLoading || isAvatarLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-neutral-600"
                }`}
              >
                {isClosetLoading ? "추가 중..." : "옷장에 추가하기"}
              </button>
              <button
                onClick={handleResetAvatar}
                disabled={isAvatarLoading || isResetLoading}
                className={`w-full py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center ${
                  isResetLoading || isAvatarLoading
                    ? "cursor-not-allowed opacity-70"
                    : ""
                }`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isResetLoading ? "초기화 중..." : "아바타 초기화"}
              </button>
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
            <button
              onClick={handleResetAvatar}
              disabled={isAvatarLoading || isResetLoading}
              className={`mt-4 py-2 px-4 rounded-md transition-colors ${
                isResetLoading || isAvatarLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isResetLoading ? "초기화 중..." : "다시 시도 / 초기화"}
            </button>
            {message && (
              <div className="mt-4 px-3 py-2 rounded-lg text-sm bg-yellow-100 text-yellow-800 border border-yellow-200 text-center">
                {message}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal onClose={handleClose} title="가상 피팅">
      {isMobile ? (
        <div className="w-full max-w-[340px] mx-auto">{getModalContent()}</div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-[85vh] mx-auto">{getModalContent()}</div>
        </div>
      )}
    </Modal>
  );
};

export default TryOnResultModal;
