import { ClosetAvatarResponse } from "@/types/closet";

type BackgroundColorPickerProps = {
  selectedAvatar: ClosetAvatarResponse;
  selectedColor: string;
  onColorChange: (color: string) => void;
  processedImageUrl?: string | null; // 처리된 이미지 URL 추가
};

const backgroundColors = [
  "#ffffff",
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#6c757d",
  "#495057",
  "#343a40",
  "#212529",
  "#fff3cd",
  "#d4edda",
  "#d1ecf1",
  "#f8d7da",
  "#e2e3e5",
  "#ffeaa7",
  "#fab1a0",
  "#fd79a8",
  "#fdcb6e",
  "#e17055",
];

const BackgroundColorPicker = ({
  selectedAvatar,
  selectedColor,
  onColorChange,
  processedImageUrl, // 처리된 이미지 URL
}: BackgroundColorPickerProps) => {
  // 표시할 이미지 URL 결정 (처리된 이미지가 있으면 그것을, 없으면 원본을)
  const displayImageUrl = processedImageUrl || selectedAvatar.avatarImage;

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
            d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm6-11a1 1 0 011-1h1a1 1 0 011 1v2H9V4zm4 0a1 1 0 011-1h1a1 1 0 011 1v2h-3V4zM9 7h6v8a2 2 0 11-4 0V9a1 1 0 00-2 0v6z"
            clipRule="evenodd"
          />
        </svg>
        배경색 선택
      </h2>

      {/* 색상 팔레트 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">기본 색상</h3>
        <div className="grid grid-cols-10 gap-2">
          {backgroundColors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${
                selectedColor === color
                  ? "border-gray-800 scale-110 shadow-lg ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* 커스텀 색상 입력 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label
          htmlFor="custom-color"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          커스텀 색상
        </label>
        <div className="flex items-center space-x-3">
          <input
            id="custom-color"
            type="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            placeholder="#ffffff"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      </div>

      {/* 미리보기 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">미리보기</h3>
          {processedImageUrl && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              ✨ 배경 제거됨
            </span>
          )}
        </div>
        <div className="flex justify-center">
          <div
            className="w-52 h-72 rounded-xl border-2 border-gray-200 flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden"
            style={{ backgroundColor: selectedColor }}
          >
            <img
              src={displayImageUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg transition-all duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* 배경 제거 상태 안내 */}
        {processedImageUrl && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              배경이 제거된 이미지로 스토리가 생성됩니다
            </p>
          </div>
        )}

        {/* 선택된 색상 표시 */}
        <div className="text-center mt-4">
          <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
            선택된 색상: {selectedColor}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorPicker;
