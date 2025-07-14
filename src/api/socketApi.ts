import axios from 'axios';
import type { 
  CreateRoomRequest, 
  CreateRoomResponse, 
  RoomListResponse, 
  RoomInfoResponse 
} from '@/types/socket';

// 임시 하드코딩 (개발용)
const SOCKET_API_BASE_URL = 'http://localhost:8081/api';

// 디버깅용 로그
console.log('API URL:', SOCKET_API_BASE_URL);

// 브라우저에서 테스트용 함수 (전역으로 노출)
if (typeof window !== 'undefined') {
  (window as any).testAPI = async () => {
    try {
      console.log('Testing API connection...');
      const response = await fetch(`${SOCKET_API_BASE_URL}/rooms`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API Test Error:', error);
      return error;
    }
  };
}

// 방 생성
export const createRoom = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  console.log('Creating room with data:', data);
  console.log('API URL:', `${SOCKET_API_BASE_URL}/rooms`);
  
  try {
    const response = await fetch(`${SOCKET_API_BASE_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Success response:', result);
    return result;
    
  } catch (error) {
    console.error('Fetch error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
};

// 방 목록 조회
export const getRoomList = async (): Promise<RoomListResponse> => {
  const response = await fetch(`${SOCKET_API_BASE_URL}/rooms`);

  if (!response.ok) {
    throw new Error('방 목록 조회에 실패했습니다.');
  }

  return response.json();
};

// 특정 방 정보 조회
export const getRoomInfo = async (roomId: string): Promise<RoomInfoResponse> => {
  const response = await fetch(`${SOCKET_API_BASE_URL}/rooms/${roomId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('방을 찾을 수 없습니다.');
    }
    throw new Error('방 정보 조회에 실패했습니다.');
  }

  return response.json();
};

// 초대 코드로 방 조회 (새로 추가)
export const getRoomByInviteCode = async (inviteCode: string): Promise<RoomInfoResponse> => {
  const response = await fetch(`${SOCKET_API_BASE_URL}/rooms/invite/${inviteCode}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('유효하지 않은 초대 링크입니다.');
    }
    throw new Error('방 정보 조회에 실패했습니다.');
  }

  return response.json();
};

// axios를 사용한 대안 함수
export const createRoomWithAxios = async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
  console.log('Creating room with axios:', data);
  
  try {
    const response = await axios.post(`${SOCKET_API_BASE_URL}/rooms`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10초 타임아웃
    });
    
    console.log('Axios response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Axios error:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      }
      if (error.response) {
        throw new Error(`서버 오류: ${error.response.status} ${error.response.data?.message || ''}`);
      }
      if (error.request) {
        throw new Error('서버로부터 응답을 받을 수 없습니다.');
      }
    }
    throw error;
  }
};
