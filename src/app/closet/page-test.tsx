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

import { closetAvatarsMock, wishlistMock } from "@/mock/closet";

const categories = [
  "전체",
  "상의",
  "아우터",
  "바지",
  "원피스",
  "스커트",
  "슈즈",
];

// 테스트 모드 설정 (true: mock data 사용, false: 실제 API 사용)
const USE_MOCK_DATA = false;

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

        if (USE_MOCK_DATA) {
          // Mock data 사용 (UI 테스트용)
          setTimeout(() => {
            setClosetAvatars(closetAvatarsMock);
            setIsLoadingCloset(false);
          }, 500); // 로딩 상태 시뮬레이션
        } else {
          // 실제 API 호출
          const data = await getClosetAvatars();
          setClosetAvatars(data);
          setIsLoadingCloset(false);
        }
      } catch (error) {
        console.error("옷장 데이터 로드 실패:", error);
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

        if (USE_MOCK_DATA) {
          // 🎯 Mock data 사용 (UI 테스트용)
          setTimeout(() => {
            setWishlistData(wishlistMock);
            setIsLoadingWishlist(false);
          }, 300); // 로딩 상태 시뮬레이션
        } else {
          // 실제 API 호출
          const data = await getWishlist();
          setWishlistData(data);
          setIsLoadingWishlist(false);
        }
      } catch (error) {
        console.error("찜 목록 로드 실패:", error);
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

      if (USE_MOCK_DATA) {
        // 🎯 Mock data에서 삭제 시뮬레이션
        setTimeout(() => {
          setClosetAvatars((prev) =>
            prev.filter((avatar) => avatar.avatarId !== avatarId)
          );
          alert("착장이 삭제되었습니다!");
          setIsDeleting(false);
        }, 500);
      } else {
        // 실제 API 호출
        await deleteClosetAvatar(avatarId);
        setClosetAvatars((prev) =>
          prev.filter((avatar) => avatar.avatarId !== avatarId)
        );
        alert("착장이 삭제되었습니다!");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("착장 삭제 실패:", error);
      alert("착장 삭제에 실패했습니다.");
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
