"use client";

import { MainProductResponse } from "@/types/product";
import MainProductList from "@/app/(home)/_components/MainProductList";
import CategoryProductList from "@/app/(home)/_components/CategoryProductList";
import AvatarLayout from "@/components/layout/AvatarProducts";
import { getAccessToken } from "@/utils/auth";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";

type HomeClientProps = {
  initialData: MainProductResponse;
};

const HomeClient = ({ initialData }: HomeClientProps) => {
  // 로그인 상태 확인
  const token = getAccessToken();
  const isLoggedIn = !!token;

  // 기본 아바타 슬롯 (비로그인 사용자용)
  const defaultAvatarSlot = (
    <div className="w-full h-screen p-4 bg-gray-50 rounded-xl shadow-sm flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">👤</div>
      <p className="text-gray-600 text-center mb-2">
        나만의 아바타로 옷을 입어보세요!
      </p>
      <p className="text-gray-500 text-sm text-center">
        {isLoggedIn
          ? "아바타 정보를 불러오는 중..."
          : "로그인하면 개인화된 아바타를 사용할 수 있습니다."}
      </p>
    </div>
  );

  // 로그인된 사용자와 비로그인 사용자 구분 처리
  if (isLoggedIn && initialData.recommended && initialData.ranked) {
    // 로그인된 사용자 - 기존 추천/인기 상품 방식
    console.log("로그인된 사용자 - 추천/인기 상품 표시");
    const recommended = initialData.recommended;
    const ranked = initialData.ranked;

    return (
      <AvatarLayout
        avatarSlot={<AvatarWearInfo />}
        productSlot={
          <MainProductList recommended={recommended} ranked={ranked} />
        }
      />
    );
  } else if (initialData.categories) {
    // 비로그인 사용자 - 카테고리별 표시
    console.log("비로그인 사용자 - 카테고리별 상품 표시");
    const categories = initialData.categories;

    return (
      <AvatarLayout
        avatarSlot={defaultAvatarSlot}
        productSlot={<CategoryProductList categories={categories} />}
      />
    );
  } else {
    // 데이터가 없는 경우
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">상품 정보를 불러올 수 없습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }
};

export default HomeClient;
