import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "@/mock/categoryProducts"; // 목업 데이터
import type { CategoryProductResponse } from "@/types/product";

const USE_MOCK = true; // 실제 API 연동 시 false로 바꾸기

export const useInfiniteCategoryProducts = (
  categoryId: number,
  initialData?: CategoryProductResponse
) => {
  return useInfiniteQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: ({ pageParam = 0 }) => {
      if (USE_MOCK) {
        return new Promise<CategoryProductResponse>((resolve) => {
          setTimeout(() => {
            resolve(getCategoryProducts(categoryId, pageParam, 10));
          }, 300);
        });
      }

      // 실제 API 연결 시 아래 주석 해제
      // return fetchCategoryProducts({
      //   categoryId,
      //   pageParam: pageParam as number,
      //   size: 10,
      // });

      return Promise.reject("No API or mock selected");
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
