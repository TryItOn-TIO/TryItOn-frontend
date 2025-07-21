"use client";

import { useState, useEffect } from "react";
import AvatarLayout from "@/components/layout/AvatarProducts";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import ClosetProductSection from "./_components/ClosetProductSection";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { getClosetAvatars, deleteClosetAvatar } from "@/api/closet";
import { getWishlist, getWishlistByCategory } from "@/api/wishlist";
import type { ClosetAvatarResponse } from "@/types/closet";
import type { ProductResponse } from "@/types/product";
import { useRouter } from "next/navigation";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

const categories = [
  "전체",
  "상의",
  "아우터",
  "하의",
  "원피스/스커트",
  "신발",
  "소품/ACC",
];

const CATEGORY_ID_MAP: Record<string, number> = {
  전체: 0,
  상의: 1,
  아우터: 2,
  하의: 3,
  "원피스/스커트": 4,
  신발: 5,
  "소품/ACC": 6,
};

const ClosetPage = () => {
  useAuthGuard();
  const router = useRouter();

  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [closetAvatars, setClosetAvatars] = useState<ClosetAvatarResponse[]>(
    []
  );
  const [wishlistData, setWishlistData] = useState<ProductResponse[]>([]);
  const [isLoadingCloset, setIsLoadingCloset] = useState(true);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadWishlistByCategory = async (category: string) => {
    try {
      setIsLoadingWishlist(true);

      const categoryId = CATEGORY_ID_MAP[category];

      if (categoryId === 0) {
        const data = await getWishlist(); // 전체
        setWishlistData(data);
      } else {
        const data = await getWishlistByCategory(categoryId); // number 넘김
        setWishlistData(data);
      }
    } catch (error) {
      console.error("찜 목록 로딩 실패:", error);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

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

  // 착장 삭제 핸들러
  const handleDeleteOutfit = (avatarId: number) => {
    openAlert({
      title: "삭제 확인",
      message: "이 착장을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      type: "info",
      async onConfirm() {
        try {
          setIsDeleting(true);
          await deleteClosetAvatar(avatarId);

          // 로컬 상태에서 삭제된 아이템 제거
          setClosetAvatars((prev) =>
            prev.filter((avatar) => avatar.avatarId !== avatarId)
          );
          window.location.reload();
        } catch (error) {
          console.error("착장 삭제 실패:", error);
          openAlert({
            title: "스토리 삭제하러 가기",
            message: "이 착장으로 업로드된 스토리가 존재합니다.",
            confirmText: "확인",
            cancelText: "취소",
            type: "info",

            onConfirm: () => {
              router.push("/mypage/story");
            },
          });
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    loadWishlistByCategory(category); // 카테고리별 API 호출
  };

  // 초기 렌더 시 전체 찜 목록을 불러오기 위해 필요함
  useEffect(() => {
    loadWishlistByCategory("전체");
  }, []);

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />
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
    </>
  );
};

export default ClosetPage;
