import React from "react";
import ProductCard from "@/components/common/ProductCard";
import type { ProductResponse } from "@/types/product";

type Props = {
  products: ProductResponse[];
  totalCount: number;
  observerRef?: React.Ref<HTMLDivElement>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export default function SearchResults({
  products,
  totalCount,
  observerRef,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  if (totalCount === 0) {
    return (
      <p className="text-center mt-6 text-gray-500">검색 결과가 없습니다.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
      {products.map((product, index) => {
        // 현재 아이템이 마지막 아이템인지 확인
        const isLastItem = index === products.length - 1;

        return (
          // 마지막 아이템이고 다음 페이지가 있을 경우에만 observerRef를 연결
          <div
            key={product.id}
            ref={isLastItem && hasNextPage ? observerRef : undefined}
          >
            <ProductCard product={product} />
          </div>
        );
      })}
      {/* 다음 페이지를 불러오는 중일 때 로딩 인디케이터 표시 */}
      {isFetchingNextPage && (
        <div className="col-span-full text-center text-sm text-gray-500 mt-4">
          다음 상품 불러오는 중...
        </div>
      )}
    </div>
  );
}
