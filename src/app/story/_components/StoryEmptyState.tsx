import Link from "next/link";

const StoryEmptyState = () => {
  return (
    <div className="w-[40rem] text-center py-16">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">아직 작성된 스토리가 없습니다.</p>
      <Link
        href="/story/create"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        첫 번째 스토리 작성하기
      </Link>
    </div>
  );
};

export default StoryEmptyState;
