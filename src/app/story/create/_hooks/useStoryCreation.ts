import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { postStories } from "@/api/story";
import { generatePresignedUrl, uploadFileToS3 } from "@/api/files";
import { StoryRequest } from "@/types/story";
import { ClosetAvatarResponse } from "@/types/closet";
import { UseCustomAlertReturn } from "@/hooks/useCustomAlert";

type UseStoryCreationProps = {
  openAlert: UseCustomAlertReturn["openAlert"];
};

export const useStoryCreation = ({ openAlert }: UseStoryCreationProps) => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
  const [contents, setContents] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 배경 제거 관련 상태
  const [isBackgroundRemovalEnabled, setIsBackgroundRemovalEnabled] =
    useState<boolean>(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  );

  const generateStoryImage = async (
    selectedAvatar: ClosetAvatarResponse
  ): Promise<string> => {
    if (!selectedAvatar || !canvasRef.current) {
      throw new Error("아바타 또는 캔버스가 없습니다.");
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("캔버스 컨텍스트를 가져올 수 없습니다.");
    }

    // 캔버스 크기 설정 (3:4 비율)
    canvas.width = 400;
    canvas.height = 600;

    // 배경색 설정
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 사용할 이미지 URL 결정 (배경 제거된 이미지 또는 원본)
    const imageUrl =
      isBackgroundRemovalEnabled && processedImageUrl
        ? processedImageUrl
        : selectedAvatar.avatarImage;

    console.log(
      "사용할 이미지:",
      isBackgroundRemovalEnabled ? "배경 제거됨" : "원본",
      imageUrl
    );

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
                // 파일명 생성 - stories 폴더 사용
                const fileName = `stories/story-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}.png`;

                console.log("Pre-signed URL 요청 중...", fileName);

                // S3 presigned URL 생성
                const presignedUrl = await generatePresignedUrl(fileName);
                console.log("받아온 Pre-signed URL:", presignedUrl);

                // File 객체 생성
                const file = new File(
                  [blob],
                  fileName.split("/").pop() || "story.png",
                  {
                    type: "image/png",
                  }
                );

                console.log("S3 업로드 시작...");

                // S3에 업로드
                await uploadFileToS3(presignedUrl, file);

                // 업로드된 파일의 공개 URL 반환 (presigned URL에서 query parameter 제거)
                const uploadedUrl = presignedUrl.split("?")[0];
                console.log("업로드 성공! 파일 URL:", uploadedUrl);

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
        console.log("아바타 이미지 로드 실패, 배경색만으로 이미지 생성");

        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("캔버스를 이미지로 변환하는데 실패했습니다."));
              return;
            }

            try {
              const fileName = `stories/story-bg-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}.png`;

              console.log("Pre-signed URL 요청 중 (배경만)...", fileName);
              const presignedUrl = await generatePresignedUrl(fileName);

              const file = new File(
                [blob],
                fileName.split("/").pop() || "story-bg.png",
                {
                  type: "image/png",
                }
              );

              console.log("S3 업로드 시작 (배경만)...");
              await uploadFileToS3(presignedUrl, file);

              const uploadedUrl = presignedUrl.split("?")[0];
              console.log("업로드 성공 (배경만)! 파일 URL:", uploadedUrl);

              resolve(uploadedUrl);
            } catch (error) {
              console.error("S3 업로드 실패 (배경만):", error);
              reject(error);
            }
          },
          "image/png",
          0.9
        );
      };

      img.src = imageUrl;
    });
  };

  const handleSubmit = async (selectedAvatar: ClosetAvatarResponse | null) => {
    if (!selectedAvatar || !contents.trim()) {
      openAlert({
        title: "입력 오류",
        message: "아바타를 선택하고 내용을 입력해주세요.",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("스토리 이미지 생성 시작...");
      console.log("배경 제거 사용:", isBackgroundRemovalEnabled);

      // 이미지 생성 및 S3 업로드
      const storyImageUrl = await generateStoryImage(selectedAvatar);

      if (!storyImageUrl) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      console.log("스토리 데이터 전송 중...");

      const storyData: StoryRequest = {
        avatarId: selectedAvatar.avatarId,
        storyImageUrl,
        contents: contents.trim(),
      };

      await postStories(storyData);

      console.log("스토리 작성 완료!");
      openAlert({
        title: "작성 완료",
        message: "스토리가 성공적으로 작성되었습니다!",
        type: "success",
        onConfirm: () => {
          router.push("/story");
        },
      });
    } catch (error) {
      console.error("스토리 작성 실패:", error);

      let errorTitle = "오류";
      let errorMessage = "스토리 작성에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        if (error.message.includes("업로드")) {
          errorMessage =
            "이미지 업로드에 실패했습니다. 네트워크 연결을 확인해주세요.";
        } else if (error.message.includes("변환")) {
          errorMessage = "이미지 처리에 실패했습니다. 다시 시도해주세요.";
        } else if (error.message.includes("아바타")) {
          errorMessage =
            "아바타 이미지를 불러올 수 없습니다. 다른 아바타를 선택해주세요.";
        }
      }

      openAlert({
        title: errorTitle,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    const shouldCancel = await openAlert({
      title: "작성 취소",
      message:
        "스토리 작성을 취소하시겠습니까? 작성 중인 내용은 저장되지 않습니다.",
      type: "warning",
      confirmText: "취소하기",
      cancelText: "계속 작성",
    });

    if (shouldCancel) {
      router.back();
    }
  };

  return {
    canvasRef,
    selectedColor,
    setSelectedColor,
    contents,
    setContents,
    isSubmitting,
    handleSubmit,
    handleCancel,
    isBackgroundRemovalEnabled,
    setIsBackgroundRemovalEnabled,
    processedImageUrl,
    setProcessedImageUrl,
  };
};
