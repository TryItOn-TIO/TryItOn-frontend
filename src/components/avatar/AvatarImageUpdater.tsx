"use client";

import { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { generatePresignedUrl, uploadFileToS3 } from '@/api/files';
import { completeAvatarUpload } from '@/api/avatar';

interface AvatarImageUpdaterProps {
  currentAvatarUrl?: string;
  onUpdateSuccess?: (newAvatarUrl: string) => void;
  className?: string;
}

export default function AvatarImageUpdater({ 
  currentAvatarUrl, 
  onUpdateSuccess,
  className = ""
}: AvatarImageUpdaterProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setSuccess(false);
    
    // 파일 선택 즉시 업로드 시작
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // 1단계: 프리사인드 URL 생성 (30%)
      console.log('프리사인드 URL 생성 중...');
      setUploadProgress(30);

      const timestamp = Date.now();
      const fileName = `users/avatar_${timestamp}_${file.name}`;
      const presignedUrl = await generatePresignedUrl(fileName);

      if (!presignedUrl) {
        throw new Error('프리사인드 URL 생성에 실패했습니다.');
      }

      // 2단계: S3에 파일 업로드 (70%)
      console.log('S3에 파일 업로드 중...');
      setUploadProgress(70);

      await uploadFileToS3(presignedUrl, file);
      const fileUrl = presignedUrl.split("?")[0];

      console.log('S3 업로드 완료:', fileUrl);

      // 3단계: 백엔드 후처리 API 호출 (90%)
      console.log('백엔드 후처리 중...');
      setUploadProgress(90);

      const response = await completeAvatarUpload({
        newAvatarImageUrl: fileUrl,
      });

      if (response.success) {
        console.log('아바타 업데이트 완료:', response.newAvatarImageUrl);
        setUploadProgress(100);
        setSuccess(true);
        
        // 성공 콜백 호출
        onUpdateSuccess?.(response.newAvatarImageUrl);
        
        // 상태 초기화
        setTimeout(() => {
          setSelectedFile(null);
          setSuccess(false);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
      } else {
        throw new Error(response.message || '아바타 업데이트에 실패했습니다.');
      }

    } catch (error: any) {
      console.error('아바타 업데이트 실패:', error);

      let errorMessage = '아바타 업데이트에 실패했습니다. 다시 시도해주세요.';

      if (error.message?.includes('network') || error.code === 'NETWORK_ERROR') {
        errorMessage = '네트워크 연결을 확인하고 다시 시도해주세요.';
      } else if (error.message?.includes('timeout')) {
        errorMessage = '업로드 시간이 초과되었습니다. 파일 크기를 확인하고 다시 시도해주세요.';
      } else if (error.status === 403) {
        errorMessage = '파일 업로드 권한이 없습니다. 로그인 상태를 확인해주세요.';
      } else if (error.status === 413) {
        errorMessage = '파일 크기가 너무 큽니다. 더 작은 파일을 선택해주세요.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 파일 선택 버튼 */}
      <div className="text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        <button
          onClick={handleButtonClick}
          disabled={isUploading}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 
                     disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors
                     flex items-center space-x-2 mx-auto"
        >
          <Upload className="w-5 h-5" />
          <span>{isUploading ? '업로드 중...' : '새 아바타 이미지 선택'}</span>
        </button>
        <p className="text-xs text-gray-500 mt-2">
          JPG, PNG, WEBP 형식 • 최대 10MB
        </p>
      </div>

      {/* 업로드 진행률 */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {uploadProgress < 30 && '프리사인드 URL 생성 중...'}
              {uploadProgress >= 30 && uploadProgress < 70 && 'S3에 업로드 중...'}
              {uploadProgress >= 70 && uploadProgress < 90 && '백엔드 처리 중...'}
              {uploadProgress >= 90 && '완료 중...'}
            </span>
            <span className="text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 성공 메시지 */}
      {success && (
        <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>아바타가 성공적으로 업데이트되었습니다!</span>
        </div>
      )}

      {/* 안내 메시지 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">⚠️ 주의사항</h4>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• 아바타를 업데이트하면 기존 아바타와 관련 데이터가 모두 삭제됩니다</li>
          <li>• 기존 가상 피팅 결과와 캐시가 초기화됩니다</li>
          <li>• 전신이 명확하게 보이는 정면 사진을 사용해주세요</li>
          <li>• 업데이트 후에는 되돌릴 수 없으니 신중하게 선택해주세요</li>
        </ul>
      </div>
    </div>
  );
}
