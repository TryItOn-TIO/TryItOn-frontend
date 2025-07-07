import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { 
  ServerToClientEvents, 
  ClientToServerEvents,
  Room,
  MessageData,
  AvatarUpdateData,
  JoinRoomSuccessData,
  User
} from '@/types/socket';

const SOCKET_URL = 'http://localhost:8081';

export const useSocket = () => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);

  // Socket 연결 초기화
  const connect = () => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true
      });

      // 연결 이벤트
      socketRef.current.on('connect', () => {
        console.log('✅ Socket 연결 성공:', socketRef.current?.id);
        setIsConnected(true);
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('❌ Socket 연결 해제:', reason);
        setIsConnected(false);
        setCurrentRoom(null);
        setCurrentUser(null);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket 연결 에러:', error);
        setIsConnected(false);
      });

      // 방 입장 관련 이벤트
      socketRef.current.on('joinRoomSuccess', (data: JoinRoomSuccessData) => {
        console.log('방 입장 성공:', data);
        setCurrentRoom(data.room);
        setCurrentUser(data.userInfo);
        setMessages([]); // 새 방 입장 시 메시지 초기화
      });

      socketRef.current.on('joinRoomError', (error) => {
        console.error('방 입장 실패:', error);
        const errorMessage = error?.message || error || '방 입장에 실패했습니다.';
        alert(`방 입장 실패: ${errorMessage}`);
      });

      // 사용자 입장/퇴장 이벤트
      socketRef.current.on('userJoined', (data) => {
        console.log('사용자 입장:', data.message);
        setMessages(prev => [...prev, {
          message: data.message,
          name: data.name,
          userId: '',
          socketId: '',
          side: 'left',
          timestamp: new Date().toISOString(),
          type: 'system'
        }]);
      });

      socketRef.current.on('userLeft', (data) => {
        console.log('사용자 퇴장:', data.message);
        setMessages(prev => [...prev, {
          message: data.message,
          name: data.name,
          userId: '',
          socketId: '',
          side: 'left',
          timestamp: new Date().toISOString(),
          type: 'system'
        }]);
      });

      // 메시지 수신
      socketRef.current.on('update', (message: MessageData) => {
        console.log('메시지 수신:', message);
        setMessages(prev => [...prev, message]);
      });

      // 아바타 업데이트
      socketRef.current.on('avatarUpdated', (data: AvatarUpdateData) => {
        console.log('아바타 업데이트:', data);
        // 아바타 업데이트 로직은 부모 컴포넌트에서 처리
      });

      // 방 목록 업데이트
      socketRef.current.on('roomListUpdate', (rooms: Room[]) => {
        console.log('방 목록 업데이트:', rooms);
        setRoomList(rooms);
      });

      // 에러 이벤트
      socketRef.current.on('messageError', (error) => {
        console.error('메시지 에러:', error.message);
        alert(`메시지 전송 실패: ${error.message}`);
      });

      socketRef.current.on('avatarError', (error) => {
        console.error('아바타 에러:', error.message);
        alert(`아바타 업데이트 실패: ${error.message}`);
      });
    }
  };

  // Socket 연결 해제
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setCurrentRoom(null);
      setCurrentUser(null);
      setMessages([]);
    }
  };

  // 방 입장
  const joinRoom = (roomId: string, userName: string, userId: string) => {
    console.log('방 입장 시도:', { roomId, userName, userId });
    console.log('Socket 연결 상태:', isConnected);
    console.log('Socket 실제 연결:', socketRef.current?.connected);
    
    if (socketRef.current?.connected) {
      console.log('joinRoom 이벤트 전송');
      socketRef.current.emit('joinRoom', {
        roomId,
        userName,
        userId
      });
    } else {
      console.error('Socket이 연결되지 않음');
    }
  };

  // 메시지 전송
  const sendMessage = (data: { message: string; type?: string }) => {
    console.log('메시지 전송 시도:', data);
    
    if (socketRef.current && data.message.trim()) {
      console.log('메시지 전송 중...');
      socketRef.current.emit('message', {
        message: data.message.trim(),
        type: data.type || 'text'
      });
    } else {
      console.error('메시지 전송 실패 - Socket 연결 또는 메시지 내용 확인');
    }
  };

  // 아바타 업데이트
  const updateAvatar = (avatarUrl: string, productInfo?: any) => {
    if (socketRef.current) {
      socketRef.current.emit('updateAvatar', {
        avatarUrl,
        productInfo
      });
    }
  };

  // 방 나가기
  const leaveRoom = () => {
    if (socketRef.current) {
      socketRef.current.emit('leaveRoom');
      setCurrentRoom(null);
      setCurrentUser(null);
      setMessages([]);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    // 상태
    isConnected,
    currentRoom,
    currentUser,
    messages,
    roomList,
    
    // 메서드
    connect,
    disconnect,
    joinRoom,
    sendMessage,
    updateAvatar,
    leaveRoom,
    
    // Socket 인스턴스 (필요시 직접 접근)
    socket: socketRef.current
  };
};
