"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAvatarStore } from "@/stores/avatar-store";
import { saveClosetAvatar } from "@/api/closet";
import { fetchLatestAvatarInfo } from "@/api/avatar";
import Link from "next/link";

const AvatarWearInfo = ({ avatarId, productNames }: AvatarWearInfoProps) => {
  const avatarImg = useAvatarStore((state) => state.avatarImg);
  const selectedProductIds = useAvatarStore(
    (state) => state.selectedProductIds
  );
  const [isLoading, setIsLoading] = useState(false);
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

      await saveClosetAvatar({
        avatarId: avatarId,
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

  return (
    <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 헤더 영역 */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">내 아바타</h3>
          <button
            onClick={handleAddToCloset}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isLoading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                추가 중...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                옷장에 추가
              </>
            )}
          </button>
        </div>
      </div>

      {/* 메시지 표시 */}
      {message && (
        <div className="mx-4 mt-4">
          <div
            className={`px-4 py-3 rounded-lg text-sm font-medium ${
              message.includes("성공")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {message.includes("성공") ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              )}
              {message}
            </div>
          </div>
        </div>
      )}

      {/* 아바타 착용 중 안내 메시지 */}
      {isAvatarLoading && (
        <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-lg text-sm bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          옷을 입고 있어요 👕 (최대 1분 소요됩니다)
        </div>
      )}

      {/* 아바타 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* 아바타 이미지 */}
        <div className="relative mb-6">
          <div className="w-64 h-80 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
            {avatarImg ? (
              <Image
                src={avatarImg}
                alt="착장한 아바타"
                width={240}
                height={300}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">아바타를 불러오는 중...</p>
              </div>
            )}
          </div>

          {/* 장식적 요소 */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full opacity-20"></div>
        </div>

        {/* 착장 정보 */}
        <div className="w-full max-w-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            현재 착장
          </h4>

          {productNames.length > 0 ? (
            <div className="space-y-2">
              {productNames.map((name, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-sm text-gray-500">아직 입은 상품이 없습니다</p>
              <p className="text-xs text-gray-400 mt-1">
                상품을 선택해서 아바타에 입혀보세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarWearInfo;
