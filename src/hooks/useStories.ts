import { useStore } from "zustand";
import { storyStore } from "@/stores/story-store";

export const useStories = () =>
  useStore(storyStore, (state) => ({
    stories: state.stories,
    setStories: state.setStories,
  }));
