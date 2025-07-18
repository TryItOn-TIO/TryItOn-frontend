import { AvatarRequest, AvatarResponse } from "@/types/avatar";
import { axiosWithAuth } from "@/api";

export const createAvatar = async (
  data: AvatarRequest
): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().post("/api/avatars/try-on", data);
  return response.data;
};

export const fetchLatestAvatarInfo = async (): Promise<AvatarResponse> => {
  const response = await axiosWithAuth().get("/api/avatars/latest-info");
  return response.data;
};

// 아바타 베이스 이미지 업데이트 요청 타입
export interface UpdateAvatarBaseImageRequest {
  newBaseImageUrl: string;
}

// 아바타 베이스 이미지 업데이트 응답 타입
export interface UpdateAvatarBaseImageResponse {
  message: string;
  newBaseImageUrl: string;
  newAvatarImageUrl: string;
  success: boolean;
}

/**
 * 아바타 베이스 이미지 업데이트
 * @param data - 새로운 베이스 이미지 URL
 * @returns 업데이트 결과
 */
export const updateAvatarBaseImage = async (
  data: UpdateAvatarBaseImageRequest
): Promise<UpdateAvatarBaseImageResponse> => {
  const response = await axiosWithAuth().put("/api/avatars/base-image", data);
  return response.data;
};

// 아바타 업로드 완료 요청 타입
export interface AvatarUploadCompleteRequest {
  newAvatarImageUrl: string;
}

// 아바타 업로드 완료 응답 타입
export interface AvatarUploadCompleteResponse {
  success: boolean;
  message: string;
  newAvatarImageUrl: string;
}

/**
 * 아바타 업로드 완료 처리
 * S3 업로드 후 백엔드에서 후처리 작업 수행
 * @param data - 새로운 아바타 이미지 URL
 * @returns 처리 결과
 */
export const completeAvatarUpload = async (
  data: AvatarUploadCompleteRequest
): Promise<AvatarUploadCompleteResponse> => {
  const response = await axiosWithAuth().post("/api/avatars/upload-complete", data);
  return response.data;
};

// 아바타 리셋 응답 타입
export interface ResetAvatarResponse {
  success: boolean;
  message?: string;
}

/**
 * 아바타 리셋 - 원본 베이스 이미지로 복원하고 착용 아이템 제거
 * @returns 리셋 결과
 */
export const resetAvatar = async (): Promise<ResetAvatarResponse> => {
  const response = await axiosWithAuth().put("/api/avatars/reset");
  return response.data;
};
