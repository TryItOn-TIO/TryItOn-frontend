import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { fetchSearchResults } from "@/api/search";
import { SearchProductResponse } from "@/types/product";

const SEARCH_PAGE_SIZE = 10;

/**
 * 무한 스크롤 검색 결과를 위한 React Query 훅
 * @param query
 */
export const useInfiniteSearchProducts = (query: string) => {
  return useInfiniteQuery<
    SearchProductResponse,
    Error,
    InfiniteData<SearchProductResponse, number>,
    string[],
    number
  >({
    queryKey: ["searchProducts", query],
    queryFn: async ({ pageParam = 0 }) => {
      return await fetchSearchResults(query, pageParam, SEARCH_PAGE_SIZE);
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (acc, page) => acc + page.products.length,
        0
      );
      if (loadedCount < lastPage.totalCount) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
