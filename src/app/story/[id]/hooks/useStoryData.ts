import { useState, useEffect, useCallback, useMemo } from "react";
import { StoriesResponse, initialStoriesData } from "@/types/story";
import { getStories, getNextStories } from "@/api/story";
import { SortType } from "@/constants/SortType";

type UseStoryDataProps = {
  storyId: number;
};

const useStoryData = ({ storyId }: UseStoryDataProps) => {
  const [data, setData] = useState<StoriesResponse>(initialStoriesData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  // 현재 스토리 찾기
  const currentStory = useMemo(() => {
    return data.stories.find((story) => story.storyId === storyId);
  }, [data.stories, storyId]);

  // 현재 스토리의 인덱스
  const currentIndex = useMemo(() => {
    return data.stories.findIndex((story) => story.storyId === storyId);
  }, [data.stories, storyId]);

  // 최초 스토리 데이터 fetch
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    try {
      const response = await getStories(SortType.LATEST, 10);
      setData(response);
    } catch {
      console.error("스토리를 불러오는 중 에러 발생");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // 다음 스토리 데이터 fetch
  const fetchNextData = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getNextStories(storyId, SortType.LATEST, 10);

      // 기존 스토리에 새로운 스토리 추가 (중복 제거)
      const existingIds = new Set(data.stories.map((story) => story.storyId));
      const newStories = response.stories.filter(
        (story) => !existingIds.has(story.storyId)
      );

      if (newStories.length > 0) {
        setData((prevData) => ({
          stories: [...prevData.stories, ...newStories],
          length: prevData.stories.length + newStories.length,
        }));
      }

      setHasNextPage(response.stories.length >= 10);
    } catch {
      console.error("다음 스토리를 불러오는 중 에러 발생");
      setError("다음 스토리를 불러올 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [storyId, isLoading, hasNextPage, data.stories]);

  // 최초 데이터 로드
  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData]);

  return {
    data,
    setData,
    currentStory,
    currentIndex,
    isLoading,
    error,
    hasNextPage,
    fetchData,
    fetchNextData,
  };
};

export default useStoryData;
