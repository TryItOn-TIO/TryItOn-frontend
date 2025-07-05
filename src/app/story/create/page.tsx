"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { postStories } from "@/api/story";
import { generatePresignedUrl, uploadFileToS3 } from "@/api/files";
import { StoryRequest } from "@/types/story";
import { AvatarResponse } from "@/types/avatar";
import AvatarSelector from "@/app/story/create/_components/AvatarSelector";
import BackgroundColorPicker from "@/app/story/create/_components/BackgroundColorPicker";
import StoryContentInput from "@/app/story/create/_components/StoryContentInput";
import SubmitButtons from "@/app/story/create/_components/SubmitButtons";
import { dummyAvatar } from "@/mock/avatar";

const CreateStoryPage = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [avatars, setAvatars] = useState<AvatarResponse[]>(dummyAvatar);
  const [avatarLoading, setAvatarLoading] = useState(false); // TODO: API 테스트 후 true로 변경
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarResponse | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const [contents, setContents] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const generateStoryImage = async (): Promise<string> => {
    if (!selectedAvatar || !canvasRef.current) return "";

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // 캔버스 크기 설정 (3:4 비율)
    canvas.width = 400;
    canvas.height = 600;

    // 배경색 설정
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 아바타 이미지 로드 및 그리기
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        try {
          // 이미지 비율 계산
          const imgAspectRatio = img.width / img.height;
          const canvasAspectRatio = canvas.width / canvas.height;

          let drawWidth, drawHeight, drawX, drawY;

          // 이미지가 캔버스에 맞도록 비율 조정 (contain 방식)
          if (imgAspectRatio > canvasAspectRatio) {
            // 이미지가 더 넓은 경우
            drawWidth = canvas.width * 0.8; // 80% 크기로 조정
            drawHeight = drawWidth / imgAspectRatio;
          } else {
            // 이미지가 더 높은 경우
            drawHeight = canvas.height * 0.8; // 80% 크기로 조정
            drawWidth = drawHeight * imgAspectRatio;
          }

          // 중앙 정렬
          drawX = (canvas.width - drawWidth) / 2;
          drawY = (canvas.height - drawHeight) / 2;

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

          // 캔버스를 Blob으로 변환
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                reject(new Error("캔버스를 이미지로 변환하는데 실패했습니다."));
                return;
              }

              try {
                // 파일명 생성
                const fileName = `story-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}.png`;

                // S3 presigned URL 생성
                const presignedUrl = await generatePresignedUrl(fileName);

                // File 객체 생성
                const file = new File([blob], fileName, { type: "image/png" });

                // S3에 업로드
                await uploadFileToS3(presignedUrl, file);

                // 업로드된 파일의 URL 반환 (presigned URL에서 query parameter 제거)
                const uploadedUrl = presignedUrl.split("?")[0];
                resolve(uploadedUrl);
              } catch (error) {
                console.error("S3 업로드 실패:", error);
                reject(error);
              }
            },
            "image/png",
            0.9
          );
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => {
        // 이미지 로드 실패 시에도 배경색만으로 이미지 생성
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("캔버스를 이미지로 변환하는데 실패했습니다."));
              return;
            }

            try {
              const fileName = `story-bg-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}.png`;
              const presignedUrl = await generatePresignedUrl(fileName);
              const file = new File([blob], fileName, { type: "image/png" });
              await uploadFileToS3(presignedUrl, file);
              const uploadedUrl = presignedUrl.split("?")[0];
              resolve(uploadedUrl);
            } catch (error) {
              console.error("S3 업로드 실패:", error);
              reject(error);
            }
          },
          "image/png",
          0.9
        );
      };
      img.src = selectedAvatar.avatarImgUrl;
    });
  };

  const handleSubmit = async () => {
    if (!selectedAvatar || !contents.trim()) {
      alert("아바타를 선택하고 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 이미지 생성 및 S3 업로드
      const storyImageUrl = await generateStoryImage();

      if (!storyImageUrl) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const storyData: StoryRequest = {
        avatarId: selectedAvatar.avatarId,
        storyImageUrl,
        contents: contents.trim(),
      };

      await postStories(storyData);
      alert("스토리가 성공적으로 작성되었습니다!");
      router.push("/story");
    } catch (error) {
      console.error("스토리 작성 실패:", error);

      // 에러 타입에 따른 메시지 분기
      let errorMessage = "스토리 작성에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        if (error.message.includes("업로드")) {
          errorMessage =
            "이미지 업로드에 실패했습니다. 네트워크 연결을 확인해주세요.";
        } else if (error.message.includes("변환")) {
          errorMessage = "이미지 처리에 실패했습니다. 다시 시도해주세요.";
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const isSubmitDisabled = isSubmitting || !selectedAvatar || !contents.trim();

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-4 sm:py-8">
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
                handleSubmit();
              }}
              className="space-y-8"
            >
              {/* 아바타 선택 섹션 */}
              <AvatarSelector
                avatars={avatars}
                selectedAvatar={selectedAvatar}
                onAvatarSelect={setSelectedAvatar}
                isLoading={avatarLoading}
              />

              {/* 배경색 선택 섹션 */}
              {selectedAvatar && (
                <div className="border-t pt-8">
                  <BackgroundColorPicker
                    selectedAvatar={selectedAvatar}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                  />
                </div>
              )}

              {/* 내용 입력 섹션 */}
              <StoryContentInput
                contents={contents}
                onContentsChange={setContents}
                maxLength={500}
              />

              {/* 제출 버튼 */}
              <SubmitButtons
                onCancel={handleCancel}
                onSubmit={handleSubmit}
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
