"use client";

import { useState } from "react";
import Image from "next/image";
import AvatarProducts from "@/components/layout/AvatarProducts";
import AvatarWearInfo from "@/components/common/AvatarWearInfo";
import ProductCard from "@/components/common/ProductCard";
import { useClosetData, useWishlist, useToggleOutfitBookmark } from "@/hooks/useCloset";
import type { ProductResponse } from "@/types/product";
import type { AvatarProductInfo } from "@/types/avatar";

const categories = ["전체", "상의", "아우터", "바지", "원피스", "스커트", "슈즈"];

export default function ClosetPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  
  // 실제 API 호출
  const { data: closetData, isLoading: isClosetLoading, error: closetError } = useClosetData();
  const { data: wishlistData, isLoading: isWishlistLoading, fetchNextPage, hasNextPage } = useWishlist();
  const toggleBookmark = useToggleOutfitBookmark();

  // 로딩 상태
  if (isClosetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">옷장 데이터를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (closetError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!closetData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">옷장 데이터가 없습니다.</div>
      </div>
    );
  }

  // 찜 목록 데이터 평탄화
  const allWishlistProducts = wishlistData?.pages.flatMap(page => page.products) || [];
  
  // 카테고리 필터링
  const filteredProducts = selectedCategory === "전체" 
    ? allWishlistProducts 
    : allWishlistProducts.filter(product => product.categoryName === selectedCategory);

  // 북마크 토글 핸들러
  const handleBookmarkToggle = (avatarId: number, currentBookmark: boolean) => {
    toggleBookmark.mutate({ avatarId, bookmark: !currentBookmark });
  };

  // 아바타 섹션 (왼쪽 20%)
  const AvatarSection = () => (
    <div className="w-full h-full">
      {closetData.latestAvatar ? (
        <AvatarWearInfo avatarInfo={closetData.latestAvatar} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          최근 착장이 없습니다.
        </div>
      )}
      
      {/* 착장 관리 버튼들 */}
      <div className="mt-4 space-y-2 px-4">
        <button className="w-full px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          새 착장 만들기
        </button>
        <button className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          현재 착장 저장
        </button>
      </div>
    </div>
  );

  // 저장된 착장 카드 컴포넌트
  const SavedOutfitCard = ({ outfit }: { outfit: AvatarProductInfo }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[3/4] relative bg-gray-100">
        <Image
          src={outfit.avatarImg || "/images/dummy/ex10.png"}
          alt="저장된 착장"
          fill
          className="object-cover"
        />
        {/* 북마크 아이콘 */}
        <button 
          onClick={() => handleBookmarkToggle(outfit.avatarId, outfit.bookmarked)}
          className="absolute top-2 right-2"
          disabled={toggleBookmark.isPending}
        >
          <Image
            src={outfit.bookmarked ? "/images/common/bookmark_filled.svg" : "/images/common/bookmark.svg"}
            width={20}
            height={20}
            alt="북마크"
          />
        </button>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm mb-1">저장된 착장</h4>
        <div className="text-xs text-gray-500 mb-2">{new Date(outfit.createdAt).toLocaleDateString()}</div>
        <div className="space-y-1">
          {outfit.productNames.slice(0, 2).map((name, idx) => (
            <div key={idx} className="text-xs text-gray-600 truncate">• {name}</div>
          ))}
          {outfit.productNames.length > 2 && (
            <div className="text-xs text-gray-400">+{outfit.productNames.length - 2}개 더</div>
          )}
        </div>
      </div>
    </div>
  );

  // 상품 섹션 (오른쪽 80%) - 세로로 저장된 착장 + 찜목록
  const ProductSection = () => (
    <div className="w-full space-y-8">
      {/* 저장된 착장 섹션 (상단) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">저장한 착장</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {closetData.bookmarkedAvatars.map((outfit) => (
            <SavedOutfitCard key={outfit.avatarId} outfit={outfit} />
          ))}
        </div>
        {closetData.bookmarkedAvatars.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            저장된 착장이 없습니다.
          </div>
        )}
      </div>

      {/* 찜 목록 섹션 (하단) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">찜 목록</h2>
          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 그리드 */}
        {isWishlistLoading ? (
          <div className="text-center py-8">찜 목록을 불러오는 중...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* 더 보기 버튼 */}
            {hasNextPage && (
              <div className="text-center mt-6">
                <button
                  onClick={() => fetchNextPage()}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  더 보기
                </button>
              </div>
            )}
          </>
        )}
        
        {filteredProducts.length === 0 && !isWishlistLoading && (
          <div className="text-center py-8 text-gray-500">
            {selectedCategory === "전체" ? "찜한 상품이 없습니다." : `${selectedCategory} 카테고리에 찜한 상품이 없습니다.`}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AvatarProducts
      avatarSlot={<AvatarSection />}
      productSlot={<ProductSection />}
    />
  );
}
