import { axiosWithAuth } from './index';

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordChangeableResponse {
  canChange: boolean;
  message?: string;
}

export interface PasswordChangeResponse {
  success: boolean;
  message: string;
}

/**
 * 비밀번호 변경 가능 여부 확인
 */
export const checkPasswordChangeable = async (): Promise<PasswordChangeableResponse> => {
  try {
    const response = await axiosWithAuth().get('/api/member/password/changeable');
    return {
      canChange: response.data.canChange ?? true,
      message: response.data.message
    };
  } catch (error: any) {
    console.error('비밀번호 변경 가능 여부 확인 실패:', error);
    
    // 소셜 로그인 사용자인 경우 false 반환
    if (error.response?.status === 403) {
      return {
        canChange: false,
        message: error.response.data?.message || '소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.'
      };
    }
    
    throw new Error(error.response?.data?.message || '비밀번호 변경 가능 여부 확인에 실패했습니다.');
  }
};

/**
 * 비밀번호 변경
 */
export const changePassword = async (data: PasswordChangeRequest): Promise<PasswordChangeResponse> => {
  try {
    const response = await axiosWithAuth().put('/api/member/password/change', data);
    return {
      success: response.data.success ?? true,
      message: response.data.message || '비밀번호가 성공적으로 변경되었습니다.'
    };
  } catch (error: any) {
    console.error('비밀번호 변경 실패:', error);
    
    // 에러 메시지 처리
    let errorMessage = '비밀번호 변경에 실패했습니다.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.status === 400) {
      errorMessage = '입력한 정보를 다시 확인해주세요.';
    } else if (error.response?.status === 401) {
      errorMessage = '현재 비밀번호가 올바르지 않습니다.';
    } else if (error.response?.status === 403) {
      errorMessage = '비밀번호 변경 권한이 없습니다.';
    }
    
    throw new Error(errorMessage);
  }
};
