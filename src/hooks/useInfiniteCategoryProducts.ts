import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCategoryProducts } from "@/api/product";
import type { CategoryProductResponse } from "@/types/product";

export const useInfiniteCategoryProducts = (
  categoryId: number,
  initialData?: CategoryProductResponse
) => {
  return useInfiniteQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number) ?? 0;
      return await fetchCategoryProducts(categoryId, page, 10);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.products.last ? undefined : lastPage.products.number + 1;
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
