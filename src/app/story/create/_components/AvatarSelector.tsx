import { AvatarResponse } from "@/types/avatar";

type AvatarSelectorProps = {
  avatars: AvatarResponse[];
  selectedAvatar: AvatarResponse | null;
  onAvatarSelect: (avatar: AvatarResponse) => void;
  isLoading: boolean;
};

const AvatarSelector = ({
  avatars,
  selectedAvatar,
  onAvatarSelect,
  isLoading,
}: AvatarSelectorProps) => {
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
          <span className="ml-3 text-gray-600">
            아바타 목록을 불러오는 중...
          </span>
        </div>
      </div>
    );
  }

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
                src={avatar.avatarImgUrl}
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
              {avatar.products.slice(0, 2).map((product, index) => (
                <div key={index} className="truncate font-medium">
                  {product.productName}
                </div>
              ))}
              {avatar.products.length > 2 && (
                <div className="text-gray-400">
                  +{avatar.products.length - 2}개 더
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
