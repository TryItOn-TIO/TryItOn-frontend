type StoryContentInputProps = {
  contents: string;
  onContentsChange: (contents: string) => void;
  maxLength?: number;
};

const StoryContentInput = ({
  contents,
  onContentsChange,
  maxLength = 500,
}: StoryContentInputProps) => {
  return (
    <div className="border-t pt-8">
      <label
        htmlFor="contents"
        className="text-lg font-semibold text-gray-800 mb-3 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        스토리 내용
      </label>
      <textarea
        id="contents"
        value={contents}
        onChange={(e) => onContentsChange(e.target.value)}
        placeholder="스토리에 대한 설명을 입력해주세요...&#10;예: 오늘의 OOTD! 심플하면서도 세련된 스타일로 코디했어요 ✨"
        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
        maxLength={maxLength}
      />
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-gray-500">
          💡 팁: 해시태그(#)를 사용해서 스타일을 표현해보세요!
        </div>
        <div
          className={`text-sm ${
            contents.length > maxLength * 0.9 ? "text-red-500" : "text-gray-500"
          }`}
        >
          {contents.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default StoryContentInput;
