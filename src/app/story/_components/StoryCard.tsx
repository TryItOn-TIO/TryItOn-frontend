import { StoryResponse } from "@/types/story";
import UserAvatar from "@/components/common/UserAvatar";

type StoryCardProps = {
  story: StoryResponse;
  onClick: (storyId: number) => void;
};

const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-w-[18rem] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer my-1"
      onClick={() => onClick(story.storyId)}
    >
      {/* 스토리 이미지 */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        {story.storyImageUrl ? (
          <img
            src={story.storyImageUrl}
            alt={`Story ${story.storyId}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 스토리 정보 */}
      <div className="p-4">
        <p className="text-gray-800 mb-3 line-clamp-3">
          {story.contents.slice(0, 17)} ...
        </p>

        {/* 작성자 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <UserAvatar
              src={story.author.profileImage}
              alt={story.author.username}
              size="sm"
            />
            <span>{story.author.username}</span>
          </div>
          <span>{formatDate(story.createdAt)}</span>
        </div>

        {/* 좋아요 및 댓글 수 */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{story.likeCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{story.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
