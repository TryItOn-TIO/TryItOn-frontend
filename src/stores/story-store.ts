// 10개씩 불러와지는 스토리 정보를 저장하는 저장소
import { initialStoriesData, StoryResponse } from "@/types/story";
import { createStore } from "zustand/vanilla";

export type StoryState = {
  stories: StoryResponse[];
};

export type StoryActions = {
  setStories: (stories: StoryResponse[]) => void;
};

export type StoryStore = StoryState & StoryActions;

export const defaultInitState: StoryState = {
  stories: initialStoriesData,
};

export const createStoryStore = (initState: StoryState = defaultInitState) => {
  return createStore<StoryStore>()((set) => ({
    ...initState,
    setStories: (stories: StoryResponse[]) => set(() => ({ stories })),
  }));
};

export const storyStore = createStoryStore();
