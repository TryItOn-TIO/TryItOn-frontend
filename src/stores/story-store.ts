// 10개씩 불러와지는 스토리 정보를 저장하는 저장소
import { initialStoriesData, StoriesResponse } from "@/types/story";
import { createStore } from "zustand/vanilla";

export type StoryState = {
  stories: StoriesResponse;
};

export type StoryActions = {
  setStories: (stories: StoriesResponse) => void;
  addStories: (newStories: StoriesResponse) => void;
  clearStories: () => void;
};

export type StoryStore = StoryState & StoryActions;

export const defaultInitState: StoryState = {
  stories: initialStoriesData,
};

export const createStoryStore = (initState: StoryState = defaultInitState) => {
  return createStore<StoryStore>()((set, get) => ({
    ...initState,
    setStories: (stories: StoriesResponse) => set(() => ({ stories })),
    addStories: (newStories: StoriesResponse) => set((state) => {
      // 중복 제거하면서 새로운 스토리 추가
      const existingIds = new Set(state.stories.stories.map(story => story.storyId));
      const uniqueNewStories = newStories.stories.filter(story => !existingIds.has(story.storyId));
      
      return {
        stories: {
          stories: [...state.stories.stories, ...uniqueNewStories],
          length: state.stories.stories.length + uniqueNewStories.length,
        }
      };
    }),
    clearStories: () => set(() => ({ stories: initialStoriesData })),
  }));
};

export const storyStore = createStoryStore();
