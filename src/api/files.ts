import { axiosWithAuth } from './index';

export interface FileUploadResponse {
  presignedUrl: string;
}

/**
 * S3 Pre-signed URL 생성 요청
 * @param fileName - 업로드할 파일명
 * @returns Pre-signed URL
 */
export const generatePresignedUrl = async (fileName: string): Promise<string> => {
  const response = await axiosWithAuth().get<string>('/api/files', {
    params: {
      fileName,
    },
  });
  
  return response.data;
};

/**
 * S3에 파일 직접 업로드
 * @param presignedUrl - Pre-signed URL
 * @param file - 업로드할 파일
 */
export const uploadFileToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
};
