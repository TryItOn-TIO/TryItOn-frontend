'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useSocket } from '@/hooks/useSocket';
import { getRoomByInviteCode } from '@/api/socketApi';
import type { Room, MessageData } from '@/types/socket';

export default function ChatRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const inviteCode = params.inviteCode as string;
  const isCreator = searchParams.get('creator') === 'true';
  const userName = searchParams.get('userName') || '';
  const userId = searchParams.get('userId') || '';
  
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isConnected,
    currentRoom,
    currentUser,
    messages,
    connect,
    disconnect,
    joinRoom,
    sendMessage,
    leaveRoom
  } = useSocket();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    if (inviteCode && userName && userId) {
      initializeRoom();
    }
    
    return () => {
      disconnect();
    };
  }, [inviteCode, userName, userId]);

  // 메시지가 업데이트될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 방 입장 상태 확인
  useEffect(() => {
    if (currentRoom && currentRoom.currentUsers >= 2) {
      setIsWaiting(false);
    } else if (currentRoom && currentRoom.currentUsers === 1) {
      setIsWaiting(true);
    }
  }, [currentRoom]);

  const initializeRoom = async () => {
    try {
      setLoading(true);
      
      // 방 정보 조회
      const response = await getRoomByInviteCode(inviteCode);
      setRoomInfo(response.room);
      
      // Socket 연결
      connect();
      
    } catch (error: any) {
      console.error('방 초기화 실패:', error);
      setError(error.message || '방에 입장할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Socket 연결 후 방 입장 처리
  useEffect(() => {
    if (isConnected && roomInfo && userName && userId) {
      console.log('Socket 연결 완료 - 방 입장 시도');
      joinRoom(roomInfo.id, userName, userId);
    }
  }, [isConnected, roomInfo, userName, userId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('메시지 전송 시도:', newMessage);
    console.log('Socket 연결 상태:', isConnected);
    
    if (!newMessage.trim() || !isConnected) {
      console.log('메시지 전송 취소 - 빈 메시지 또는 연결 안됨');
      return;
    }
    
    sendMessage({
      message: newMessage.trim(),
      type: 'text'
    });
    
    setNewMessage('');
  };

  const handleLeaveRoom = () => {
    if (confirm('정말로 방을 나가시겠습니까?')) {
      leaveRoom();
      router.push('/rooms');
    }
  };

  const handleCopyInviteLink = async () => {
    if (!roomInfo) return;
    
    try {
      await navigator.clipboard.writeText(roomInfo.inviteLink);
      alert('초대 링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">채팅방에 입장하는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/rooms')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            방 만들기로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {roomInfo?.name || '채팅방'}
            </h1>
            <p className="text-sm text-gray-600">
              {isCreator ? '방장' : '참가자'} • {userName}
            </p>
          </div>
          
          <div className="flex space-x-2">
            {isCreator && (
              <button
                onClick={handleCopyInviteLink}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                초대 링크 복사
              </button>
            )}
            <button
              onClick={handleLeaveRoom}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              나가기
            </button>
          </div>
        </div>
      </div>

      {/* 대기 상태 표시 */}
      {isWaiting && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-yellow-600">
              {isCreator ? (
                <div>
                  <p className="font-medium">친구를 기다리고 있습니다...</p>
                  <p className="text-sm mt-1">초대 링크를 공유해서 친구를 초대하세요!</p>
                </div>
              ) : (
                <p className="font-medium">방장을 기다리고 있습니다...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>아직 메시지가 없습니다.</p>
                <p className="text-sm mt-1">첫 번째 메시지를 보내보세요!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.userId === userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.userId === userId
                        ? 'bg-blue-600 text-white'
                        : message.name === 'SERVER'
                        ? 'bg-gray-200 text-gray-700 text-center'
                        : 'bg-white text-gray-800 shadow'
                    }`}
                  >
                    {message.name !== 'SERVER' && message.userId !== userId && (
                      <p className="text-xs text-gray-500 mb-1">{message.name}</p>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 메시지 입력 영역 */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
              disabled={!isConnected}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={!isConnected || !newMessage.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              전송
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
