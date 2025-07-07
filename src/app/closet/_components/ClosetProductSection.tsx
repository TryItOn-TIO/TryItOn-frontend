"use client";

import SavedOutfitsSection from "./SavedOutfitsSection";
import WishlistSection from "./WishlistSection";
import type { ClosetAvatarResponse } from "@/types/closet";
import type { ProductResponse } from "@/types/product";

type ClosetProductSectionProps = {
  closetAvatars: ClosetAvatarResponse[];
  wishlistData: ProductResponse[];
  isLoadingCloset: boolean;
  isLoadingWishlist: boolean;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onDeleteOutfit: (avatarId: number) => void;
  isDeleting: boolean;
};

const ClosetProductSection = ({
  closetAvatars,
  wishlistData,
  isLoadingCloset,
  isLoadingWishlist,
  selectedCategory,
  categories,
  onCategoryChange,
  onDeleteOutfit,
  isDeleting
}: ClosetProductSectionProps) => {
  return (
    <div className="w-full space-y-8 px-4 py-8">
      {/* 저장된 착장 섹션 (상단) */}
      <SavedOutfitsSection
        closetAvatars={closetAvatars}
        isLoading={isLoadingCloset}
        onDeleteOutfit={onDeleteOutfit}
        isDeleting={isDeleting}
      />

      {/* 찜 목록 섹션 (하단) */}
      <WishlistSection
        wishlistData={wishlistData}
        isLoading={isLoadingWishlist}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
};

export default ClosetProductSection;
