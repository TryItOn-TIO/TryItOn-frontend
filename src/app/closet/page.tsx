"use client";

import { useState, useEffect } from "react";
import AvatarLayout from "@/components/layout/AvatarProducts";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import ClosetProductSection from "./_components/ClosetProductSection";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { getClosetAvatars, deleteClosetAvatar } from "@/api/closet";
import { getWishlist } from "@/api/wishlist";
import type { ClosetAvatarResponse } from "@/types/closet";
import type { ProductResponse } from "@/types/product";

// TODO: 확인! parent category name으로 받아와야 함
const categories = [
  "전체",
  "상의",
  "아우터",
  "하의",
  "원피스/스커트",
  "신발",
  "소품/ACC",
];

const ClosetPage = () => {
  useAuthGuard();

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [closetAvatars, setClosetAvatars] = useState<ClosetAvatarResponse[]>(
    []
  );
  const [wishlistData, setWishlistData] = useState<ProductResponse[]>([]);
  const [isLoadingCloset, setIsLoadingCloset] = useState(true);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // 옷장 데이터 로드
  useEffect(() => {
    const loadClosetData = async () => {
      try {
        setIsLoadingCloset(true);
        const data = await getClosetAvatars();
        setClosetAvatars(data);
      } catch (error) {
        console.error("옷장 데이터 로드 실패:", error);
      } finally {
        setIsLoadingCloset(false);
      }
    };

    loadClosetData();
  }, []);

  // 찜 목록 데이터 로드
  useEffect(() => {
    const loadWishlistData = async () => {
      try {
        setIsLoadingWishlist(true);
        const data = await getWishlist();
        setWishlistData(data);
      } catch (error) {
        console.error("찜 목록 로드 실패:", error);
      } finally {
        setIsLoadingWishlist(false);
      }
    };

    loadWishlistData();
  }, []);

  // 착장 삭제 핸들러
  const handleDeleteOutfit = async (avatarId: number) => {
    if (!confirm("이 착장을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteClosetAvatar(avatarId);

      // 로컬 상태에서 삭제된 아이템 제거
      setClosetAvatars((prev) =>
        prev.filter((avatar) => avatar.avatarId !== avatarId)
      );
      alert("착장이 삭제되었습니다!");
    } catch (error) {
      console.error("착장 삭제 실패:", error);
      alert("착장 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <AvatarLayout
      avatarSlot={<AvatarWearInfo />}
      productSlot={
        <ClosetProductSection
          closetAvatars={closetAvatars}
          wishlistData={wishlistData}
          isLoadingCloset={isLoadingCloset}
          isLoadingWishlist={isLoadingWishlist}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          onDeleteOutfit={handleDeleteOutfit}
          isDeleting={isDeleting}
        />
      }
    />
  );
};

export default ClosetPage;
