"use client";

import React from "react";
import Image from "next/image";
import { AvatarProductInfo } from "@/types/avatar";
import { useBookmarkToggle } from "@/hooks/useBookmarkToggle";

type AvatarWearInfoProps = {
  avatarInfo: AvatarProductInfo & { avatarId: number; bookmarked: boolean };
};

const AvatarWearInfo = ({ avatarInfo }: AvatarWearInfoProps) => {
  const { avatarImg, productNames, avatarId, bookmarked } = avatarInfo;
  const { isBookmarked, toggleBookmark } = useBookmarkToggle(
    bookmarked,
    avatarId
  );

  return (
    <div className="w-full h-[85vh] p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col justify-center relative">
      {/* 북마크 아이콘 (우측 상단 고정) */}
      <button
        onClick={toggleBookmark}
        className="absolute top-4 right-4 z-10"
        aria-label="북마크 토글"
      >
        <Image
          src={
            isBookmarked
              ? "/images/common/bookmark_filled.svg"
              : "/images/common/bookmark.svg"
          }
          width={24}
          height={24}
          alt="북마크 아이콘"
        />
      </button>

      {/* 아바타 이미지 */}
      <div className="w-full flex justify-center mb-6">
        <Image
          src={avatarImg}
          alt="착장한 아바타"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>

      {/* 착장 상품 리스트 */}
      <div>
        {productNames.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {productNames.map((name, idx) => (
              <li key={idx}>{name}</li>
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
