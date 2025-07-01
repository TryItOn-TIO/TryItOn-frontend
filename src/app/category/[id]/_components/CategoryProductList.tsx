"use client";

import React, { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "@/components/common/ProductCard";
import { getCategoryProducts } from "@/mock/categoryProducts";

type Props = {
  categoryId: number;
};

const PAGE_SIZE = 6;

const CategoryProductList = ({ categoryId }: Props) => {
  // 1. 무한스크롤을 위한 useInfiniteQuery (목업 데이터 사용)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["category-products", categoryId],
      queryFn: ({ pageParam = 0 }) => {
        // 목업 데이터를 Promise로 감싸서 실제 API 호출처럼 처리
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockData = getCategoryProducts(categoryId, pageParam);
            resolve(mockData);
          }, 300); // 로딩 시뮬레이션
        });
      },
      getNextPageParam: (lastPage: any) => {
        const { number, totalPages } = lastPage.products;
        return number + 1 < totalPages ? number + 1 : undefined;
      },
      staleTime: 1000 * 60,
      initialPageParam: 0,
    });

  // 2. IntersectionObserver를 위한 Ref
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 다음 페이지 불러오기
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // 3. 로딩/에러 처리
  if (status === "pending") return <p>상품을 불러오는 중입니다.</p>;
  if (status === "error") return <p>상품을 불러오는 데 실패했어요.</p>;

  // 4. 리스트 렌더링
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
      {data?.pages.map((page: any, pageIndex) =>
        page.products.content.map((product: any, productIndex: number) => {
          const isLastItem =
            pageIndex === data.pages.length - 1 &&
            productIndex === page.products.content.length - 1;

          return (
            <div key={product.id} ref={isLastItem ? lastItemRef : null}>
              <ProductCard product={product} />
            </div>
          );
        })
      )}

      {isFetchingNextPage && (
        <div className="col-span-full text-center text-sm text-gray-500">
          다음 상품 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default CategoryProductList;
