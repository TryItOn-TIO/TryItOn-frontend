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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      onClose();
      return;
    }
    setIsLoggedIn(true);
  }, [onClose]);

  // 로그인 안된 상태면 아무것도 렌더링하지 않음
  if (!isLoggedIn) {
    return null;
  }

  // 아바타 정보 불러오기 (로그인 후 한 번만)
  useEffect(() => {
    const loadAvatarInfo = async () => {
      try {
        setAvatarLoading(true);
        const data = await fetchLatestAvatarInfo();
        setAvatarInfo(data);
      } catch (error) {
        console.error("아바타 정보 로드 실패", error);
        setMessage("아바타 정보를 불러오는 데 실패했습니다.");
      } finally {
        setAvatarLoading(false);
      }
    };

    loadAvatarInfo();
  }, [setAvatarInfo, setAvatarLoading]);

  // 메시지 3초 후 자동 삭제 함수
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddToCloset = async () => {
    try {
      setIsClosetLoading(true);
      setMessage(null);

      if (!selectedProductIds || selectedProductIds.length === 0) {
        showMessage("착용할 상품을 먼저 선택해주세요.");
        return;
      }

      await saveClosetAvatar({
        items: selectedProductIds.map((productId) => ({ productId })),
      });

      showMessage("옷장에 성공적으로 추가되었습니다!");
    } catch (error: any) {
      console.error("옷장 추가 실패:", error);
      if (error.response?.status === 409) {
        showMessage("이미 옷장에 있는 착장입니다.");
      } else if (error.response?.status === 400) {
        showMessage("최대 10개의 착장만 저장할 수 있습니다.");
      } else if (error.response?.status === 404) {
        showMessage("아바타 또는 상품 정보를 찾을 수 없습니다.");
      } else {
        showMessage(
          `옷장 추가에 실패했습니다: ${error.message || "알 수 없는 오류"}`
        );
      }
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
        showMessage("아바타가 초기화되었습니다.");
      } else {
        showMessage(response.message || "아바타 초기화에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("아바타 리셋 실패:", error);
      showMessage(
        `아바타 초기화에 실패했습니다: ${error.message || "알 수 없는 오류"}`
      );
    } finally {
      setIsResetLoading(false);
      setAvatarLoading(false);
    }
  };

  // 모달 내부 콘텐츠 함수
  const getModalContent = () => {
    if (isAvatarLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
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
    }

    return (
      <>
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
              type="button"
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
              type="button"
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
                <li key={product.productId ?? idx}>
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
      </>
    );
  };

  return (
    <Modal onClose={onClose} title="가상 피팅">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        {getModalContent()}
      </div>
    </Modal>
  );
};

export default TryOnResultModal;
