import { useRouter } from "next/navigation";
import { StoriesResponse } from "@/types/story";

type UseStoryNavigationProps = {
  storyId: number;
  data: StoriesResponse;
};

const useStoryNavigation = ({ storyId, data }: UseStoryNavigationProps) => {
  const router = useRouter();

  const handleNext = () => {
    console.log("handleNext called", { storyId, data });
    const currentIndex = data.stories.findIndex(
      (story) => story.storyId == storyId
    );
    const nextIndex = currentIndex + 1;

    console.log("Navigation info:", {
      currentIndex,
      nextIndex,
      storiesLength: data.stories.length,
    });

    // data.stories 배열 내에서 다음 스토리가 있는지 확인
    if (
      currentIndex !== -1 &&
      nextIndex < data.stories.length &&
      data.stories[nextIndex]
    ) {
      console.log("Navigating to next story:", data.stories[nextIndex].storyId);
      router.push(`/story/${data.stories[nextIndex].storyId}`);
    } else {
      console.log("No next story available");
    }
  };

  const handlePrev = () => {
    console.log("handlePrev called", { storyId, data });
    const currentIndex = data.stories.findIndex(
      (story) => story.storyId == storyId
    );
    const prevIndex = currentIndex - 1;

    console.log("Navigation info:", {
      currentIndex,
      prevIndex,
      storiesLength: data.stories.length,
    });

    // data.stories 배열 내에서 이전 스토리가 있는지 확인
    if (currentIndex !== -1 && prevIndex >= 0 && data.stories[prevIndex]) {
      console.log("Navigating to prev story:", data.stories[prevIndex].storyId);
      router.push(`/story/${data.stories[prevIndex].storyId}`);
    } else {
      console.log("No previous story available");
    }
  };

  return {
    handleNext,
    handlePrev,
  };
};

export default useStoryNavigation;
