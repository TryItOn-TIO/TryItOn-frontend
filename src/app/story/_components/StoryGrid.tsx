import { StoryResponse } from "@/types/story";
import StoryCard from "./StoryCard";
import StoryEmptyState from "./StoryEmptyState";

type StoryGridProps = {
  stories: StoryResponse[];
  onStoryClick: (storyId: number) => void;
  isLoading?: boolean;
};

const StoryGrid = ({ stories, onStoryClick, isLoading }: StoryGridProps) => {
  if (stories.length === 0 && !isLoading) {
    return (
      <div className="w-full">
        <StoryEmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.storyId} story={story} onClick={onStoryClick} />
      ))}
    </div>
  );
};

export default StoryGrid;
