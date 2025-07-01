'use client';

import React, { useState } from 'react';
import { generatePresignedUrl, uploadFileToS3 } from '@/api/files';

interface ImageUploaderProps {
  onUploadSuccess?: (fileUrl: string) => void;
  onUploadError?: (error: Error) => void;
  accept?: string;
  maxSize?: number; // MB 단위
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  accept = 'image/*',
  maxSize = 10, // 기본 10MB
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // 파일 크기 검증
    if (file.size > maxSize * 1024 * 1024) {
      alert(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일을 먼저 선택해주세요.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 1. 백엔드에 Pre-signed URL 요청
      console.log('Pre-signed URL 요청 중...');
      const presignedUrl = await generatePresignedUrl(selectedFile.name);
      console.log('받아온 Pre-signed URL:', presignedUrl);
      
      setUploadProgress(30);

      // 2. S3에 파일 업로드
      console.log('S3 업로드 시작...');
      await uploadFileToS3(presignedUrl, selectedFile);
      
      setUploadProgress(100);

      // 3. 업로드된 파일의 공개 URL 생성 (S3 버킷 설정에 따라 다름)
      const fileUrl = presignedUrl.split('?')[0]; // 쿼리 파라미터 제거
      
      console.log('업로드 성공! 파일 URL:', fileUrl);
      alert('업로드 성공!');
      
      // 성공 콜백 호출
      onUploadSuccess?.(fileUrl);
      
      // 상태 초기화
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다.');
      onUploadError?.(error as Error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          id="file-input"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {selectedFile && (
        <div className="text-sm text-gray-600">
          선택된 파일: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isUploading ? '업로드 중...' : '이미지 업로드'}
      </button>
    </div>
  );
};

export default ImageUploader;
