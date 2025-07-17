"use client";

import { useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import CategoryFilter from "./CategoryFilter";
import type { ProductResponse } from "@/types/product";
import { useIsMobile } from "@/hooks/useMediaQuery";

type WishlistSectionProps = {
  wishlistData: ProductResponse[];
  isLoading: boolean;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
};

const WishlistSection = ({
  wishlistData,
  isLoading,
  selectedCategory,
  categories,
  onCategoryChange,
}: WishlistSectionProps) => {
  const [isShareMode, setIsShareMode] = useState(false);
  const isMobile = useIsMobile(); // 모바일 여부 판단

  const filteredProducts = wishlistData;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">찜 목록</h2>
      </div>
      <div className="w-full flex mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : (
        <>
          {/* 반응형 상품 그리드 */}
          <div
            className={
              isMobile
                ? "grid grid-cols-2 gap-4"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            }
          >
            {filteredProducts.map((product: ProductResponse) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} isShareMode={isShareMode} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {selectedCategory === "전체"
                ? "찜한 상품이 없습니다."
                : `${selectedCategory} 카테고리에 찜한 상품이 없습니다.`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WishlistSection;
