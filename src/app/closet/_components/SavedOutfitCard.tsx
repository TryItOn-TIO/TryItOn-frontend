"use client";

import Image from "next/image";
import type { ClosetAvatarResponse } from "@/types/closet";
import Link from "next/link";

type SavedOutfitCardProps = {
  outfit: ClosetAvatarResponse;
  onDelete: (avatarId: number) => void;
  isDeleting: boolean;
  isShareMode?: boolean;
};

const SavedOutfitCard = ({
  outfit,
  onDelete,
  isDeleting,
  isShareMode = false,
}: SavedOutfitCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full">
      {/* 이미지 영역 */}
      <div className="relative w-full h-[260px] bg-gray-100 overflow-hidden">
        <Image
          src={outfit.avatarImage || "/images/dummy/ex10.png"}
          alt="저장된 착장"
          fill
          className="object-contain object-top"
        />
        {!isShareMode && (
          <button
            onClick={() => onDelete(outfit.avatarId)}
            className="absolute top-2 right-2 bg-[rgba(255,255,255,0.25)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.50)] transition-colors disabled:opacity-50"
            disabled={isDeleting}
          >
            <Image
              src={"/images/common/close_icon.svg"}
              alt="x"
              width={10}
              height={10}
            />
          </button>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="p-4 space-y-3">
        {Object.entries(outfit.itemsByCategory)
          .slice(0, 2)
          .map(([categoryName, item], idx) => (
            <Link
              key={idx}
              href={`/detail/${item.productId}`}
              className="block hover:scale-101 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 tracking-wide">
                  {categoryName}
                </span>
                <span className="text-xs font-medium text-gray-700 truncate">
                  {item.brand}
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-900 truncate leading-tight">
                {item.productName}
              </div>
            </Link>
          ))}

        {Object.keys(outfit.itemsByCategory).length > 2 && (
          <div className="text-xs text-gray-400">
            +{Object.keys(outfit.itemsByCategory).length - 2}개 더
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedOutfitCard;
