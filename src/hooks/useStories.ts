import { useState, useCallback, useEffect } from "react";
import { StoriesResponse, initialStoriesData } from "@/types/story";

// 전역 상태를 위한 간단한 상태 관리
let globalStories: StoriesResponse = initialStoriesData;
const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useStories = () => {
  const [stories, setStoriesState] = useState<StoriesResponse>(globalStories);

  // 컴포넌트 마운트 시 리스너 등록
  useEffect(() => {
    const listener = () => {
      setStoriesState(globalStories);
    };
    listeners.add(listener);
    
    // 현재 상태로 즉시 업데이트
    setStoriesState(globalStories);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setStories = useCallback((newStories: StoriesResponse) => {
    console.log("setStories called with:", newStories); // 디버깅 로그
    globalStories = newStories;
    notifyListeners();
  }, []);

  const addStories = useCallback((newStories: StoriesResponse) => {
    console.log("addStories called with:", newStories); // 디버깅 로그
    // 중복 제거하면서 새로운 스토리 추가
    const existingIds = new Set(globalStories.stories.map(story => story.storyId));
    const uniqueNewStories = newStories.stories.filter(story => !existingIds.has(story.storyId));
    
    globalStories = {
      stories: [...globalStories.stories, ...uniqueNewStories],
      length: globalStories.stories.length + uniqueNewStories.length,
    };
    notifyListeners();
  }, []);

  const clearStories = useCallback(() => {
    globalStories = initialStoriesData;
    notifyListeners();
  }, []);

  return {
    stories,
    setStories,
    addStories,
    clearStories,
  };
};
