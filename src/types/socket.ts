// Socket.IO 타입 정의
export interface User {
  id: string;        // 소켓 ID
  userId: string;    // 사용자 ID
  name: string;      // 사용자 이름
  roomId: string;    // 방 ID
  side: 'left' | 'right';  // 할당된 사이드
}

export interface Room {
  id: string;           // 방 고유 ID
  name: string;         // 방 이름
  creator: string;      // 생성자 이름
  maxUsers: number;     // 최대 인원
  currentUsers: number; // 현재 인원
  users: User[];        // 현재 사용자 목록
  inviteCode: string;   // 초대 코드 (8자리 대문자+숫자)
  inviteLink: string;   // 전체 초대 링크
  createdAt: string;    // 생성 시간 (ISO 8601)
}

export interface ProductInfo {
  id: number;
  name: string;
  category?: string;
}

// REST API 요청/응답 타입
export interface CreateRoomRequest {
  roomName: string;      // 방 이름 (필수)
  creatorName: string;   // 생성자 이름 (필수)
  maxUsers?: number;     // 최대 인원 (선택, 기본값: 2)
}

export interface CreateRoomResponse {
  success: boolean;
  message: string;
  room: Room;
}

export interface RoomListResponse {
  success: boolean;
  rooms: {
    id: string;
    name: string;
    creator: string;
    currentUsers: number;
    maxUsers: number;
    inviteCode: string;
    inviteLink: string;
    createdAt: string;
  }[];
}

export interface RoomInfoResponse {
  success: boolean;
  room: Room;
}

// Socket.IO 이벤트 데이터 타입
export interface JoinRoomData {
  roomId: string;    // 방 ID (필수)
  userName: string;  // 사용자 이름 (필수)
  userId: string;    // 사용자 ID (필수)
}

export interface SendMessageData {
  message: string;   // 메시지 내용 (필수)
  type?: string;     // 메시지 타입 (선택)
}

export interface UpdateAvatarData {
  avatarUrl: string;     // 아바타 이미지 URL (필수)
  productInfo?: ProductInfo;  // 상품 정보 (선택)
}

export interface JoinRoomSuccessData {
  room: Room;
  userInfo: User;
}

export interface UserJoinedData {
  type: 'connect';
  name: 'SERVER';
  message: string;
  userInfo: User;
}

export interface UserLeftData {
  type: 'disconnect';
  name: 'SERVER';
  message: string;
  userInfo: User;
}

export interface MessageData {
  message: string;
  name: string;
  userId: string;
  socketId: string;
  side: 'left' | 'right';
  timestamp: string;    // ISO 8601 형식
  type?: string;
}

export interface AvatarUpdateData {
  side: 'left' | 'right';
  userId: string;
  avatarUrl: string;
  productInfo?: ProductInfo;
}

// Socket.IO 이벤트 타입 정의
export interface ServerToClientEvents {
  joinRoomSuccess: (data: JoinRoomSuccessData) => void;
  joinRoomError: (error: { message: string }) => void;
  userJoined: (data: UserJoinedData) => void;
  userLeft: (data: UserLeftData) => void;
  update: (message: MessageData) => void;
  avatarUpdated: (data: AvatarUpdateData) => void;
  roomListUpdate: (rooms: Room[]) => void;
  messageError: (error: { message: string }) => void;
  avatarError: (error: { message: string }) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: JoinRoomData) => void;
  message: (data: SendMessageData) => void;
  updateAvatar: (data: UpdateAvatarData) => void;
  leaveRoom: () => void;
}
