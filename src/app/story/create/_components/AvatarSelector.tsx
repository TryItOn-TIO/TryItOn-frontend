import { ClosetAvatarResponse } from "@/types/closet";
import ClosetEmptyState from "./ClosetEmptyState";

type AvatarSelectorProps = {
  avatars: ClosetAvatarResponse[];
  selectedAvatar: ClosetAvatarResponse | null;
  onAvatarSelect: (avatar: ClosetAvatarResponse) => void;
  isLoading: boolean;
  hasAvatars: boolean;
  error?: string | null;
};

const AvatarSelector = ({
  avatars,
  selectedAvatar,
  onAvatarSelect,
  isLoading,
  hasAvatars,
  error,
}: AvatarSelectorProps) => {
  // 로딩 상태
  if (isLoading) {
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
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">옷장 목록을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
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
        <div className="flex flex-col justify-center items-center py-12 bg-red-50 rounded-xl border border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-800 font-medium mb-2">오류가 발생했습니다</p>
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      </div>
    );
  }

  // 아바타가 없는 경우 빈 상태 컴포넌트 표시
  if (!hasAvatars) {
    return <ClosetEmptyState />;
  }

  // 정상 상태 - 아바타 목록 표시
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
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({avatars.length}개)
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {avatars.map((avatar) => (
          <div
            key={avatar.avatarId}
            className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 hover:shadow-lg ${
              selectedAvatar?.avatarId === avatar.avatarId
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onAvatarSelect(avatar)}
          >
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={avatar.avatarImage}
                alt={`Avatar ${avatar.avatarId}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTA4LjI4NCA3MCA5NS4wMzU3IDc3LjE2MzQgOTUuMDM1NyA4NS43MTQzVjk1LjAzNTdDOTUuMDM1NyAxMDMuNTg3IDEwMS45MTMgMTEwLjQ2NCAxMTAuNDY0IDExMC40NjRIMTEwLjQ2NEMxMTkuMDE2IDExMC40NjQgMTI1Ljg5MyAxMDMuNTg3IDEyNS44OTMgOTUuMDM1N1Y4NS43MTQzQzEyNS44OTMgNzcuMTYzNCAxMTguNzMgNzAgMTEwIDcwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAwIDEzMEMxMTYuNTY5IDEzMCAxMzAgMTQzLjQzMSAxMzAgMTYwVjE3MEgxMDBINzBWMTYwQzcwIDE0My40MzEgODMuNDMxNSAxMzAgMTAwIDEzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                }}
              />
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              {Object.values(avatar.itemsByCategory)
                .slice(0, 2)
                .map((product, index) => (
                  <div key={index} className="truncate font-medium">
                    {product.productName}
                  </div>
                ))}
              {Object.values(avatar.itemsByCategory).length > 2 && (
                <div className="text-gray-400">
                  +{Object.values(avatar.itemsByCategory).length - 2}개 더
                </div>
              )}
            </div>
            {selectedAvatar?.avatarId === avatar.avatarId && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
