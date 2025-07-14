"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "@/app/search/_components/SearchResults";
import type { ProductResponse } from "@/types/product";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useInfiniteSearchProducts } from "@/hooks/useInfiniteSearchProducts";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteSearchProducts(query);

  const observerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: !!hasNextPage,
  });

  if (status === "pending" && !data) {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">"{query}" 검색 결과</h2>
        <p className="text-center mt-6 text-gray-500">검색 중입니다...</p>
      </main>
    );
  }

  // 에러 발생 시 메시지
  if (status === "error") {
    return (
      <main className="max-w-6xl mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">"{query}" 검색 결과</h2>
        <p className="text-center mt-6 text-red-500">
          상품을 불러오는 데 실패했어요: {error?.message || "알 수 없는 에러"}
        </p>
      </main>
    );
  }

  const allProducts: ProductResponse[] =
    data?.pages.flatMap((page) => page.products) || [];

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">"{query}" 검색 결과</h2>

      {/* 검색 결과가 없을 때 메시지 */}
      {allProducts.length === 0 && !isFetchingNextPage && query.trim() && (
        <p className="text-center mt-6 text-gray-500">검색 결과가 없습니다.</p>
      )}

      {/* 제품이 있을 때만 SearchResults 컴포넌트 렌더링 */}
      {allProducts.length > 0 && (
        <SearchResults
          products={allProducts}
          totalCount={totalCount} // 전체 결과 개수
          observerRef={observerRef}
          hasNextPage={!!hasNextPage} // 다음 페이지 존재 여부
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </main>
  );
}
