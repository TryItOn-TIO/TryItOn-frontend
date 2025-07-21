import Link from "next/link";
import { SortType } from "@/constants/SortType";

type StoryHeaderProps = {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
};

const StoryHeader = ({ sortType, onSortChange }: StoryHeaderProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          스토리
        </h1>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* 스토리 관리 버튼 */}
          <Link
            href="/mypage/story"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            스토리 관리
          </Link>
          {/* 스토리 작성 버튼 */}
          <Link
            href="/story/create"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            스토리 작성
          </Link>
        </div>
      </div>

      {/* 정렬 옵션 */}
      <div className="w-full flex justify-end mb-4">
        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={SortType.LATEST}>최신순</option>
          <option value={SortType.POPULAR}>인기순</option>
        </select>
      </div>
    </>
  );
};

export default StoryHeader;
