import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCategoryProducts } from "@/api/product";
import { getCategoryProducts } from "@/mock/categoryProducts"; // 목업 데이터
import { getAccessToken } from "@/utils/auth";
import type { CategoryProductResponse } from "@/types/product";

export const useInfiniteCategoryProducts = (
  categoryId: number,
  initialData?: CategoryProductResponse
) => {
  return useInfiniteQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: ({ pageParam = 0 }) => {
      // 실제 API 호출
      return fetchCategoryProducts({
        categoryId,
        pageParam: pageParam as number,
        size: 10,
      });
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage.products;
      if (!page || page.last === undefined || page.number === undefined)
        return undefined;
      return page.last ? undefined : page.number + 1;
    },
    initialPageParam: 0,
    initialData: initialData
      ? {
          pageParams: [0],
          pages: [initialData],
        }
      : undefined,
  });
};
