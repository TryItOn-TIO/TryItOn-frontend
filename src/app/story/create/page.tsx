"use client";

import AvatarSelector from "@/app/story/create/_components/AvatarSelector";
import BackgroundColorPicker from "@/app/story/create/_components/BackgroundColorPicker";
import StoryContentInput from "@/app/story/create/_components/StoryContentInput";
import SubmitButtons from "@/app/story/create/_components/SubmitButtons";
import { useAvatarData } from "@/app/story/create/_hooks/useAvatarData";
import { useStoryCreation } from "@/app/story/create/_hooks/useStoryCreation";

const CreateStoryPage = () => {
  // 아바타 데이터 관리
  const {
    avatars,
    avatarLoading,
    selectedAvatar,
    setSelectedAvatar,
    hasAvatars,
    error,
  } = useAvatarData();

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
  } = useStoryCreation();

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled = isSubmitting || !selectedAvatar || !contents.trim();

  return (
    <div className="w-screen min-h-screen py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 헤더 */}
          <div className="bg-black px-6 py-4">
            <h1 className="text-2xl font-bold text-white">스토리 작성</h1>
            <p className="text-blue-100 mt-1">
              나만의 스타일 스토리를 공유해보세요
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
              {/* 아바타 선택 섹션 */}
              <AvatarSelector
                avatars={avatars}
                selectedAvatar={selectedAvatar}
                onAvatarSelect={setSelectedAvatar}
                isLoading={avatarLoading}
                hasAvatars={hasAvatars}
                error={error}
              />

              {/* 배경색 선택 섹션 - 아바타가 선택된 경우에만 표시 */}
              {selectedAvatar && hasAvatars && (
                <div className="border-t pt-8">
                  <BackgroundColorPicker
                    selectedAvatar={selectedAvatar}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                  />
                </div>
              )}

              {/* 내용 입력 섹션 - 아바타가 있는 경우에만 표시 */}
              {hasAvatars && (
                <StoryContentInput
                  contents={contents}
                  onContentsChange={setContents}
                  maxLength={500}
                />
              )}

              {/* 제출 버튼 - 아바타가 있는 경우에만 표시 */}
              {hasAvatars && (
                <SubmitButtons
                  onCancel={handleCancel}
                  onSubmit={() => handleSubmit(selectedAvatar)}
                  isSubmitting={isSubmitting}
                  isDisabled={isSubmitDisabled}
                />
              )}
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
