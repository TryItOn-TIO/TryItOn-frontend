"use client";

import Image from "next/image";
import type { ClosetAvatarResponse } from "@/types/closet";

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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[3/4] relative bg-gray-100">
        <Image
          src={outfit.avatarImage || "/images/dummy/ex10.png"}
          alt="저장된 착장"
          fill
          className="object-cover"
        />
        {/* 삭제 버튼 - 공유 모드가 아닐 때만 표시 */}
        {!isShareMode && (
          <button
            onClick={() => onDelete(outfit.avatarId)}
            className="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
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
      <div className="p-3">
        <h4 className="font-medium text-sm mb-1">저장된 착장</h4>
        <div className="space-y-1">
          {Object.values(outfit.itemsByCategory)
            .slice(0, 2)
            .map((item, idx) => (
              <div key={idx} className="text-xs text-gray-600 truncate">
                • {item.productName} ({item.brand})
              </div>
            ))}
          {Object.keys(outfit.itemsByCategory).length > 2 && (
            <div className="text-xs text-gray-400">
              +{Object.keys(outfit.itemsByCategory).length - 2}개 더
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedOutfitCard;
