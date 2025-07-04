"use client";

import ProductCard from "@/components/common/ProductCard";
import { useInfiniteCategoryProducts } from "@/hooks/useInfiniteCategoryProducts";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type Props = {
  categoryId: number;
};

const CategoryProductList = ({ categoryId }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteCategoryProducts(categoryId);

  const observerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: !!hasNextPage,
  });

  if (status === "error") return <p>상품을 불러오는 데 실패했어요.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-6">
      {data?.pages.map((page, pageIndex) =>
        page.products.content.map((product, productIndex) => {
          const isLastItem =
            pageIndex === data.pages.length - 1 &&
            productIndex === page.products.content.length - 1;

          return (
            <div
              key={product.id}
              ref={isLastItem && observerRef ? observerRef : undefined}
            >
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
