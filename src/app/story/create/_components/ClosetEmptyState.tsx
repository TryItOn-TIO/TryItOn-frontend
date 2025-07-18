import Link from "next/link";

const ClosetEmptyState = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        아바타 선택
      </h2>

      <div className="flex flex-col justify-center items-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        {/* 아이콘 */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* 메시지 */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            옷장이 비어있어요 👗
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            스토리를 작성하려면 먼저 옷장의 아바타를 생성해주세요.
            <br />
            나만의 스타일로 아바타를 꾸며보세요!
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/closet"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            아바타 만들러 가기
          </Link>

          <Link
            href="/story"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            스토리 둘러보기
          </Link>
        </div>

        {/* 도움말 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-blue-800 font-medium mb-1">
                💡 아바타 생성 팁
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                원하는 의류를 선택하고 가상 피팅을 통해 나만의 아바타를
                만들어보세요. <br />
                옷장에 추가 버튼을 통해 옷장에 등록할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosetEmptyState;
