"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/common/ProductCard";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";
import { Users, X } from "@/components/common/icons";
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
  onCategoryChange,
}: WishlistSectionProps) => {
  const router = useRouter();
  const [isShareMode, setIsShareMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // 카테고리 필터링된 찜 목록
  const filteredProducts =
    selectedCategory === "전체"
      ? wishlistData
      : wishlistData.filter(
          (product: ProductResponse) =>
            product.categoryName === selectedCategory
        );

  const handleShareModeToggle = () => {
    setIsShareMode(!isShareMode);
    setSelectedProducts([]);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  const handleFriendShare = () => {
    if (selectedProducts.length === 0) {
      alert("친구와 함께 고를 상품을 선택해주세요.");
      return;
    }

    const productIds = selectedProducts.join(",");
    router.push(`/tryon-room?product_ids=${productIds}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">찜 목록</h2>
        <div className="flex items-center space-x-4">
          {filteredProducts.length > 0 && (
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
                  <Users className="h-4 w-4 mr-2" />
                  친구와 함께 고르기
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="w-full flex mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* 친구와 함께 고르기 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : (
        <>
          {isShareMode && filteredProducts.length > 0 && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 mb-3">
                친구와 함께 고를 상품들을 선택해주세요 (
                {selectedProducts.length}개 선택됨)
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleSelectAll}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  {selectedProducts.length === filteredProducts.length
                    ? "전체 해제"
                    : "전체 선택"}
                </Button>
                <Button
                  onClick={handleFriendShare}
                  disabled={selectedProducts.length === 0}
                  className="bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
                >
                  친구와 함께 고르기
                </Button>
              </div>
            </div>
          )}

          {/* 상품 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: ProductResponse) => (
              <div key={product.id} className="relative">
                {isShareMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleProductSelect(product.id)}
                      className="bg-white border-2 border-gray-300"
                    />
                  </div>
                )}
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
