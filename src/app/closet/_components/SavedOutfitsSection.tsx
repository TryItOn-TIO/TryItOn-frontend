"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SavedOutfitCard from "./SavedOutfitCard";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";
import { Edit3, X } from "@/components/common/icons";
import type { ClosetAvatarResponse } from "@/types/closet";

type SavedOutfitsSectionProps = {
  closetAvatars: ClosetAvatarResponse[];
  isLoading: boolean;
  onDeleteOutfit: (avatarId: number) => void;
  isDeleting: boolean;
};

const SavedOutfitsSection = ({
  closetAvatars,
  isLoading,
  onDeleteOutfit,
  isDeleting,
}: SavedOutfitsSectionProps) => {
  const router = useRouter();
  const [isShareMode, setIsShareMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handleShareModeToggle = () => {
    setIsShareMode(!isShareMode);
    setSelectedAvatar(null);
  };

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatar(selectedAvatar === avatarId ? null : avatarId);
  };

  const handleStoryShare = () => {
    if (!selectedAvatar) {
      alert("스토리에 사용할 착장을 선택해주세요.");
      return;
    }

    router.push(`/story/create?closet_avatar_id=${selectedAvatar}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">저장한 착장</h2>
        {closetAvatars.length > 0 && (
          <Button
            onClick={handleShareModeToggle}
            variant={isShareMode ? "outline" : "default"}
            className={
              isShareMode
                ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                : "bg-black text-white hover:bg-gray-800"
            }
          >
            {isShareMode ? (
              <>
                <X className="h-4 w-4 mr-2" />
                취소
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                스토리로 공유
              </>
            )}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : (
        <>
          {isShareMode && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 mb-3">
                스토리에 사용할 착장을 선택해주세요
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleStoryShare}
                  disabled={!selectedAvatar}
                  className="bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
                >
                  스토리 작성하기
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5">
            {closetAvatars.map((outfit) => (
              <div key={outfit.avatarId} className="relative">
                {isShareMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedAvatar === outfit.avatarId}
                      onCheckedChange={() =>
                        handleAvatarSelect(outfit.avatarId)
                      }
                      className="bg-white border-2 border-gray-300"
                    />
                  </div>
                )}
                <SavedOutfitCard
                  outfit={outfit}
                  onDelete={onDeleteOutfit}
                  isDeleting={isDeleting}
                  isShareMode={isShareMode}
                />
              </div>
            ))}
          </div>

          {closetAvatars.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              저장된 착장이 없습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedOutfitsSection;
