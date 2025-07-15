"use client";

import { useSearchParams } from "next/navigation";
import BackgroundColorPicker from "@/app/story/create/_components/BackgroundColorPicker";
import BackgroundRemovalToggle from "@/app/story/create/_components/BackgroundRemovalToggle";
import StoryContentInput from "@/app/story/create/_components/StoryContentInput";
import SubmitButtons from "@/app/story/create/_components/SubmitButtons";
import { useAvatarData } from "@/app/story/create/_hooks/useAvatarData";
import { useStoryCreation } from "@/app/story/create/_hooks/useStoryCreation";

const CreateStoryPage = () => {
  const searchParams = useSearchParams();
  const closetAvatarId = searchParams.get('closet_avatar_id');
  
  // 특정 아바타 데이터 로드
  const {
    selectedAvatar,
    avatarLoading,
    hasAvatars,
    error,
  } = useAvatarData(closetAvatarId ? parseInt(closetAvatarId) : undefined);

  // 스토리 생성 로직
  const {
    canvasRef,
    selectedColor,
    setSelectedColor,
    contents,
    setContents,
    isSubmitting,
    handleSubmit,
    handleCancel,
    // 배경 제거 관련
    isBackgroundRemovalEnabled,
    setIsBackgroundRemovalEnabled,
    processedImageUrl,
    setProcessedImageUrl,
  } = useStoryCreation();

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled = isSubmitting || !selectedAvatar || !contents.trim();

  // 로딩 상태
  if (avatarLoading) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">아바타 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !selectedAvatar) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "아바타 정보를 불러올 수 없습니다."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            이전으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 헤더 */}
          <div className="bg-black px-6 py-4">
            <h1 className="text-2xl font-bold text-white">스토리 작성</h1>
            <p className="text-blue-100 mt-1">
              선택한 아바타로 나만의 스타일 스토리를 공유해보세요
            </p>
          </div>

          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(selectedAvatar);
              }}
              className="space-y-8"
            >
              {/* 배경색 선택 및 배경 제거 섹션 */}
              <BackgroundColorPicker
                selectedAvatar={selectedAvatar}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                processedImageUrl={processedImageUrl}
              />
              
              {/* 배경 제거 토글 섹션 */}
              <BackgroundRemovalToggle
                selectedAvatar={selectedAvatar}
                onProcessedImageChange={setProcessedImageUrl}
                isEnabled={isBackgroundRemovalEnabled}
                onToggle={setIsBackgroundRemovalEnabled}
              />

              {/* 내용 입력 섹션 */}
              <StoryContentInput
                contents={contents}
                onContentsChange={setContents}
                maxLength={500}
              />

              {/* 제출 버튼 */}
              <SubmitButtons
                onCancel={handleCancel}
                onSubmit={() => handleSubmit(selectedAvatar)}
                isSubmitting={isSubmitting}
                isDisabled={isSubmitDisabled}
              />
            </form>

            {/* 숨겨진 캔버스 (이미지 생성용) */}
            <canvas
              ref={canvasRef}
              className="hidden"
              width={400}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
