import { StoryResponse } from "@/types/story";
import DeletableStoryCard from "./DeletableStoryCard";

interface MyStoryGridProps {
  stories: StoryResponse[];
  onStoryClick: (id: number) => void;
  onStoryDelete: (id: number) => void;
}

const MyStoryGrid = ({ stories, onStoryClick, onStoryDelete }: MyStoryGridProps) => {
  if (stories.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        작성한 스토리가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <DeletableStoryCard
          key={story.storyId}
          story={story}
          onClick={onStoryClick}
          onDelete={onStoryDelete}
        />
      ))}
    </div>
  );
};

export default MyStoryGrid;
