import { useCallback, useState } from 'react';
import { getAccessToken } from '@/utils/auth';

export const useBackgroundRemoval = () => {
  const [isInitialized, setIsInitialized] = useState(true); // 백엔드 API는 항상 준비됨

  const initializeModel = useCallback(async () => {
    // 백엔드 API는 별도 초기화 불필요
    setIsInitialized(true);
    return true;
  }, []);

  const removeBackground = useCallback(async (imageUrl: string): Promise<string> => {
    try {
      console.log('백엔드 배경 제거 API 호출 시작:', imageUrl);
      
      const token = getAccessToken();
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      // 백엔드 API 호출 (환경변수 사용)
      const encodedImageUrl = encodeURIComponent(imageUrl);
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const apiUrl = `${apiBaseUrl}/api/avatars/remove-background?imageUrl=${encodedImageUrl}`;
      
      console.log('API 호출 URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // 성공 시 text/plain으로 처리된 이미지 URL 반환
        const processedImageUrl = await response.text();
        
        if (!processedImageUrl || processedImageUrl.trim() === '') {
          throw new Error('처리된 이미지 URL을 받지 못했습니다.');
        }

        console.log('배경 제거 완료:', processedImageUrl);
        return processedImageUrl.trim();

      } else {
        // 에러 시 응답 처리
        let errorMessage = '배경 제거에 실패했습니다.';
        
        try {
          // JSON 에러 응답 파싱 시도
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // JSON 파싱 실패 시 text로 시도
          try {
            const textError = await response.text();
            if (textError) {
              errorMessage = textError;
            }
          } catch {
            // 둘 다 실패하면 상태 코드별 기본 메시지
          }
        }

        console.error('백엔드 API 호출 실패:', response.status, errorMessage);
        
        // 상태 코드별 사용자 친화적 에러 메시지
        if (response.status === 401) {
          throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        } else if (response.status === 400) {
          throw new Error('잘못된 이미지 URL입니다.');
        } else if (response.status === 500) {
          // Remove.bg API 관련 에러 메시지 처리
          if (errorMessage.includes('Invalid API key')) {
            throw new Error('서버 설정 오류입니다. 관리자에게 문의해주세요.');
          } else if (errorMessage.includes('Insufficient credits')) {
            throw new Error('배경 제거 서비스 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.');
          } else if (errorMessage.includes('Unsupported image format')) {
            throw new Error('지원하지 않는 이미지 형식입니다. JPG, PNG 파일을 사용해주세요.');
          } else if (errorMessage.includes('File too large')) {
            throw new Error('이미지 파일이 너무 큽니다. 12MB 이하의 파일을 사용해주세요.');
          } else if (errorMessage.includes('S3 업로드 실패')) {
            throw new Error('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
          } else {
            throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          }
        } else {
          throw new Error(errorMessage);
        }
      }

    } catch (error) {
      console.error('배경 제거 처리 실패:', error);
      
      // 네트워크 에러 처리
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('네트워크 연결을 확인해주세요.');
      }
      
      // 기타 에러는 그대로 전달
      throw error;
    }
  }, []);

  return {
    removeBackground,
    isInitialized,
    initializeModel
  };
};
