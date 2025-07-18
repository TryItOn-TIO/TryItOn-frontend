import StoryCard from "@/app/story/_components/StoryCard";
import { StoryResponse } from "@/types/story";

interface DeletableStoryCardProps {
  story: StoryResponse;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
}

const DeletableStoryCard = ({
  story,
  onClick,
  onDelete,
}: DeletableStoryCardProps) => {
  return (
    <div className="relative group">
      <StoryCard story={story} onClick={() => onClick(story.storyId)} />
      <button
        className="absolute top-3 right-3 z-10 px-2.5 py-1 text-sm bg-black text-white rounded-md 
        hover:bg-neutral-700 transition-colors shadow-md
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(story.storyId);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default DeletableStoryCard;
