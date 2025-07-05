import { useState, useEffect } from "react";
import { StoriesResponse } from "@/types/story";
import { getStories, getNextStories } from "@/api/story";
import { SortType } from "@/constants/SortType";
import { dummyStories } from "@/mock/story";

type UseStoryDataProps = {
  storyId: number;
};

const useStoryData = ({ storyId }: UseStoryDataProps) => {
  // TODO: API 연결 테스트 후, 아래 코드로 바꿔껴야 합니다.
  // const { stories: data, setStories: setData } = useStories();
  const [data, setData] = useState<StoriesResponse>(dummyStories);
  // const [data, setData] = useState<StoriesResponse>(initialStoriesData);

  const currentStory = data.stories.find((story) => story.storyId == storyId);

  // 최초 스토리 데이터 get 요청
  const fetchData = async () => {
    try {
      const response = await getStories(SortType.LATEST, 10);
      setData(response);
    } catch (error) {
      console.error("스토리를 불러오는 중 에러 발생", error);
    }
  };

  // 이후 스토리 데이터 get 요청
  const fetchNextData = async () => {
    try {
      const response = await getNextStories(storyId, SortType.LATEST, 10);
      setData(response);
    } catch (error) {
      console.error("스토리를 불러오는 중 에러 발생", error);
    }
  };

  // 최초 스토리 10개 요청
  useEffect(() => {
    if (data.stories.length == 0) {
      // fetchData();
    }
  }, []);

  // 마지막 스토리일 때 다음 10개 요청
  useEffect(() => {
    const currentIndex = data.stories.findIndex(
      (story) => story.storyId == storyId
    );
    if (currentIndex !== -1 && currentIndex == data.stories.length - 1) {
      // fetchNextData();
    }
  }, [storyId, data.stories]);

  return {
    data,
    setData,
    currentStory,
    fetchData,
    fetchNextData,
  };
};

export default useStoryData;
