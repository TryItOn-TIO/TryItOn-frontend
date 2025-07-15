import { useState } from 'react';
import { generatePresignedUrl, uploadFileToS3 } from '@/api/files';
import { updateAvatarBaseImage, UpdateAvatarBaseImageResponse } from '@/api/avatar';

export const useAvatarUpdate = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * 아바타 베이스 이미지 업데이트
   * @param file - 업로드할 이미지 파일
   * @returns 업데이트 결과
   */
  const updateAvatarImage = async (file: File): Promise<UpdateAvatarBaseImageResponse | null> => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      // 파일 유효성 검사
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }

      // 파일 크기 제한 (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('파일 크기는 10MB 이하여야 합니다.');
      }

      // 1. Pre-signed URL 생성
      setUploadProgress(20);
      const fileName = `avatar_${Date.now()}_${file.name}`;
      const presignedUrl = await generatePresignedUrl(fileName);

      // 2. S3에 파일 업로드
      setUploadProgress(50);
      await uploadFileToS3(presignedUrl, file);

      // 3. 업로드된 파일의 URL 생성 (Pre-signed URL에서 쿼리 파라미터 제거)
      const uploadedImageUrl = presignedUrl.split('?')[0];

      // 4. 아바타 베이스 이미지 업데이트 API 호출
      setUploadProgress(80);
      const result = await updateAvatarBaseImage({
        newBaseImageUrl: uploadedImageUrl
      });

      setUploadProgress(100);
      return result;

    } catch (error: any) {
      console.error('아바타 이미지 업데이트 실패:', error);
      const errorMessage = error.response?.data?.message || error.message || '아바타 이미지 업데이트에 실패했습니다.';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
      // 진행률 초기화는 약간의 지연 후에
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    setError(null);
  };

  return {
    updateAvatarImage,
    isUploading,
    uploadProgress,
    error,
    clearError
  };
};
