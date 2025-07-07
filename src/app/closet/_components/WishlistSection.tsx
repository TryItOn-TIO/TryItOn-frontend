"use client";

import ProductCard from "@/components/common/ProductCard";
import CategoryFilter from "./CategoryFilter";
import type { ProductResponse } from "@/types/product";

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
  onCategoryChange 
}: WishlistSectionProps) => {
  // 카테고리 필터링된 찜 목록
  const filteredProducts = selectedCategory === "전체" 
    ? wishlistData
    : wishlistData.filter(
        (product: ProductResponse) => product.categoryName === selectedCategory
      );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">찜 목록</h2>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* 상품 그리드 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          로딩 중...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: ProductResponse) => (
              <ProductCard key={product.id} product={product} />
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
