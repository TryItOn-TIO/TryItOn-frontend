"use client";

import SavedOutfitCard from "./SavedOutfitCard";
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
  isDeleting 
}: SavedOutfitsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">저장한 착장</h2>
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          로딩 중...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {closetAvatars.map((outfit) => (
              <SavedOutfitCard 
                key={outfit.avatarId} 
                outfit={outfit}
                onDelete={onDeleteOutfit}
                isDeleting={isDeleting}
              />
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
