import { useState, useEffect, useRef } from "react";
import { ClosetAvatarResponse } from "@/types/closet";
import { useBackgroundRemoval } from "../_hooks/useBackgroundRemoval";

type BackgroundRemovalToggleProps = {
  selectedAvatar: ClosetAvatarResponse;
  onProcessedImageChange: (processedImageUrl: string | null) => void;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
};

const BackgroundRemovalToggle = ({
  selectedAvatar,
  onProcessedImageChange,
  isEnabled,
  onToggle,
}: BackgroundRemovalToggleProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { removeBackground } = useBackgroundRemoval();

  // 캐시된 결과 저장
  const [cachedResults, setCachedResults] = useState<Map<string, string>>(
    new Map()
  );
  const currentAvatarId = useRef<number | null>(null);

  // 아바타가 변경되면 캐시 초기화
  useEffect(() => {
    if (currentAvatarId.current !== selectedAvatar?.avatarId) {
      currentAvatarId.current = selectedAvatar?.avatarId || null;
      setCachedResults(new Map());
      setError(null);
    }
  }, [selectedAvatar?.avatarId]);

  // 토글 상태 변경 시 처리
  useEffect(() => {
    if (isEnabled && selectedAvatar) {
      handleBackgroundRemoval();
    } else if (!isEnabled) {
      // 토글이 꺼지면 원본 이미지 사용
      onProcessedImageChange(null);
      setError(null);
    }
  }, [isEnabled, selectedAvatar?.avatarId]);

  const handleBackgroundRemoval = async () => {
    if (!selectedAvatar?.avatarImage) return;

    const imageUrl = selectedAvatar.avatarImage;

    // 캐시된 결과가 있는지 확인
    const cachedResult = cachedResults.get(imageUrl);
    if (cachedResult) {
      console.log("캐시된 배경 제거 결과 사용:", cachedResult);
      onProcessedImageChange(cachedResult);
      return;
    }

    // 캐시된 결과가 없으면 API 호출
    setIsProcessing(true);
    setError(null);

    try {
      console.log("새로운 배경 제거 요청...");

      const processedImageUrl = await removeBackground(imageUrl);

      // 결과를 캐시에 저장
      setCachedResults((prev) =>
        new Map(prev).set(imageUrl, processedImageUrl)
      );

      onProcessedImageChange(processedImageUrl);
      console.log("배경 제거 완료 및 캐시 저장");
    } catch (error) {
      console.error("배경 제거 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "배경 제거에 실패했습니다. 원본 이미지를 사용합니다."
      );
      onProcessedImageChange(null);
      onToggle(false); // 토글을 자동으로 끔
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleChange = (checked: boolean) => {
    onToggle(checked);
  };

  // 캐시 상태 확인
  const hasCachedResult = selectedAvatar?.avatarImage
    ? cachedResults.has(selectedAvatar.avatarImage)
    : false;

  return (
    <div className="border-t pt-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            배경 제거
            {hasCachedResult && (
              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                처리됨
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            아바타의 배경을 자동으로 제거하여 더 깔끔한 스토리를 만들어보세요
            {hasCachedResult && (
              <span className="text-green-600 font-medium">
                {" "}
                (이미 처리된 이미지)
              </span>
            )}
          </p>
        </div>

        {/* 토글 스위치 */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => handleToggleChange(e.target.checked)}
            disabled={isProcessing}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 disabled:opacity-50"></div>
        </label>
      </div>

      {/* 처리 중 상태 */}
      {isProcessing && (
        <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
          <div>
            <p className="text-sm font-medium text-purple-800">
              배경을 제거하고 있습니다...
            </p>
            <p className="text-xs text-purple-600">
              잠시만 기다려주세요 (약 10-15초 소요)
            </p>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg
            className="w-5 h-5 text-red-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* 안내 메시지 */}
      {isEnabled && !isProcessing && !error && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-green-700 font-medium">
              배경 제거가 완료되었습니다!
            </p>
          </div>
        </div>
      )}

      {/* 주의사항 */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-2">💡 사용 팁</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 한 번 처리된 이미지는 캐시되어 즉시 적용됩니다</li>
          <li>
            • 사람이 명확하게 보이는 아바타에서 가장 좋은 결과를 얻을 수
            있습니다
          </li>
          <li>• 결과가 만족스럽지 않다면 토글을 끄고 원본을 사용하세요</li>
        </ul>
      </div>
    </div>
  );
};

export default BackgroundRemovalToggle;
